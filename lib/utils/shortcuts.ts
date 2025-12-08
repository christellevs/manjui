import { Event } from 'nanoevent';

export interface KeyPressedSpec {
    key: string;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
    metaKey: boolean;
}

import { isInputElement } from './dom.js';
import { DomEventProxy } from './event-proxy.js';

export interface KeyboardShortcut {
    key: string;
    alt?: boolean;
    shift?: boolean;
    cmdOrCtrl?: boolean;
}

export interface ShortcutBinding {
    shortcut: KeyboardShortcut;
    fn: () => void;
}

/**
 * An utility class to allow registering keyboard shortcuts on a specific target.
 */
export class ShortcutHandler {

    private bindings: ShortcutBinding[] = [];
    private targetProxy: DomEventProxy | null = null;

    blocked = false;

    /**
     * Emits the event when the key is pressed on the target
     * that does not match any specified shortcuts.
     * Useful for stacking shortcut handlers (e.g. have one processing one set of shortcuts,
     * falling back to another one).
     */
    otherKeyPressed = new Event<KeyPressedSpec>();

    bind(shortcut: KeyboardShortcut | KeyboardShortcut[], fn: () => void) {
        if (Array.isArray(shortcut)) {
            for (const s of shortcut) {
                this.bind(s, fn);
            }
            return;
        }
        this.bindings.push({
            shortcut,
            fn
        });
    }

    attach(target: EventTarget) {
        if (this.targetProxy) {
            this.targetProxy.removeAll();
        }
        this.targetProxy = new DomEventProxy(target);
        this.targetProxy.add('keydown', ev => this.onKeyDown(ev));
    }

    detach() {
        if (this.targetProxy) {
            this.targetProxy.removeAll();
            this.targetProxy = null;
        }
    }

    handleKeyPressed(spec: KeyPressedSpec): boolean {
        for (const handler of this.bindings) {
            if (matchShortcut(spec, handler.shortcut)) {
                handler.fn();
                return true;
            }
        }
        return false;
    }

    private onKeyDown(ev: KeyboardEvent) {
        if (this.blocked) {
            return;
        }
        if (isInputElement(ev.target) && ev.key !== 'Escape') {
            return;
        }
        const spec = this.parseKeyPressedSpec(ev);
        const match = this.handleKeyPressed(spec);
        if (match) {
            ev.preventDefault();
        } else {
            this.otherKeyPressed.emit(spec);
        }
    }

    private parseKeyPressedSpec(ev: KeyboardEvent): KeyPressedSpec {
        return {
            key: ev.key,
            altKey: ev.altKey,
            ctrlKey: ev.ctrlKey,
            shiftKey: ev.shiftKey,
            metaKey: ev.metaKey,
        };
    }

}

function parseShortcut(shortcut: KeyboardShortcut): KeyboardShortcut {
    return {
        alt: !!shortcut.alt,
        shift: !!shortcut.shift,
        cmdOrCtrl: !!shortcut.cmdOrCtrl,
        key: parseShortcutKey(shortcut.key),
    };
}

export function matchShortcut(spec: KeyPressedSpec, shortcut: KeyboardShortcut): boolean {
    const ss = parseShortcut(shortcut);
    return (
        spec.key.toLowerCase() === ss.key.toLowerCase() &&
        spec.altKey === ss.alt &&
        spec.shiftKey === ss.shift &&
        (ss.cmdOrCtrl ? (spec.ctrlKey || spec.metaKey) : (!spec.ctrlKey && !spec.metaKey))
    );
}

function parseShortcutKey(key: string): string {
    switch (key) {
        case 'Space':
            return ' ';
        case 'Esc':
            return 'Escape';
        default:
            return key;
    }
}
