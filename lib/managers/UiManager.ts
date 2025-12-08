import { Event as NanoEvent } from 'nanoevent';

import { isDragAllowed } from '../utils/dom.js';
import { init } from '../utils/init.js';
import { provide } from '../utils/provide.js';

function pointsEqual(p1: { x: number; y: number }, p2: { x: number; y: number }, threshold: number): boolean {
    return Math.abs(p1.x - p2.x) <= threshold && Math.abs(p1.y - p2.y) <= threshold;
}

@provide('ui')
export class UiManager {

    lastMousePos = { x: window.innerWidth * .5, y: window.innerHeight * .5 };
    lastMouseDownPos = { x: window.innerWidth * .5, y: window.innerHeight * .5 };
    lastMouseDownTarget: EventTarget | null = null;
    lmbPressed = false;
    rmbPressed = false;
    mmbPressed = false;

    altKey = false;
    ctrlKey = false;
    metaKey = false;
    shiftKey = false;

    clickVicinity = 4;
    inVicinity = false;
    dragTarget: EventTarget | null = null;

    escapePressed = new NanoEvent<void>();

    @init()
    init() {
        window.addEventListener('mousedown', ev => this.onMouseDown(ev));
        window.addEventListener('mousemove', ev => this.onMouseMove(ev));
        window.addEventListener('mouseup', ev => this.onMouseUp(ev));
        window.addEventListener('keydown', ev => this.onKeyDown(ev));
        window.addEventListener('keyup', ev => this.onKeyUp(ev));
    }

    get ctrlOrMetaKey() {
        return this.ctrlKey || this.metaKey;
    }

    protected onMouseDown(ev: MouseEvent) {
        if (ev.button === 0) {
            this.lastMouseDownPos = { x: ev.pageX, y: ev.pageY };
            this.lastMouseDownTarget = ev.target;
            this.inVicinity = true;
        }
        this.lmbPressed = ev.button === 0;
        this.mmbPressed = ev.button === 1;
        this.rmbPressed = ev.button === 2;
    }

    protected onMouseMove(ev: MouseEvent) {
        if (ev.button !== 0) {
            return;
        }
        this.lastMousePos = { x: ev.pageX, y: ev.pageY };
        if (this.dragTarget) {
            this.dragTarget.dispatchEvent(new MouseEvent('uidragmove', ev));
        } else if (this.inVicinity && !pointsEqual(this.lastMousePos, this.lastMouseDownPos, 4)) {
            // Mouse left the vicinity of original mouse down pos
            this.inVicinity = false;
            const target = this.lastMouseDownTarget;
            if (target && isDragAllowed(target)) {
                this.dragTarget = target;
                target.dispatchEvent(new MouseEvent('uidragstart', ev));
            }
        }
    }

    protected onMouseUp(ev: MouseEvent) {
        if (ev.button !== 0) {
            return;
        }
        if (this.dragTarget) {
            this.dragTarget.dispatchEvent(new MouseEvent('uidragend', ev));
        }
        if (
            this.inVicinity &&
            pointsEqual(this.lastMousePos, this.lastMouseDownPos, 4) &&
            this.lastMouseDownTarget
        ) {
            this.lastMouseDownTarget.dispatchEvent(new MouseEvent('uiclick', ev));
            this.dispatchActivate(this.lastMouseDownTarget, ev);
        }
        this.inVicinity = false;
        this.lmbPressed = false;
        this.rmbPressed = false;
        this.mmbPressed = false;
        this.lastMouseDownTarget = null;
        this.dragTarget = null;
    }

    protected onKeyDown(ev: KeyboardEvent) {
        this.updateModifierKeys(ev);
        switch (ev.key) {
            case 'Enter':
            case ' ': {
                if (ev.target === document.body) {
                    // Prevent scrolling with Space
                    ev.preventDefault();
                }
                this.dispatchActivate(ev.target!, ev);
                break;
            }
            case 'Escape':
                this.escapePressed.emit();
        }
    }

    protected onKeyUp(ev: KeyboardEvent) {
        this.updateModifierKeys(ev);
    }

    protected updateModifierKeys(ev: KeyboardEvent) {
        this.altKey = ev.altKey;
        this.ctrlKey = ev.ctrlKey;
        this.metaKey = ev.metaKey;
        this.shiftKey = ev.shiftKey;
    }

    dispatchActivate(target: EventTarget, baseEvent: Event) {
        const el = target as HTMLElement;
        if (el.closest(':disabled')) {
            return;
        }
        const event = new CustomEvent('uiactivate', baseEvent);
        target.dispatchEvent(event);
    }

}
