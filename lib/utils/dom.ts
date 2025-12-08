export interface Point {
    x: number;
    y: number;
}

export type AnchorDir = 'middle' | 'top' | 'bottom' | 'left' | 'right';

export function randomId() {
    return 'a' + Math.random().toString(36).substring(2);
}

export function isInputElement(el: any) {
    if (!(el instanceof Element)) {
        return false;
    }
    return !!el.closest('input, textarea, select, [role="textbox"]');
}

export function isDragAllowed(el: any) {
    if (!(el instanceof Element)) {
        return false;
    }
    if (isInputElement(el)) {
        return false;
    }
    return !el.closest('button, a');
}

export function calcOffsetFrom(el: HTMLElement, offsetAncestor: HTMLElement): Point {
    let x = 0;
    let y = 0;
    let curr: HTMLElement | null = el;
    while (curr && curr !== offsetAncestor) {
        x += curr.offsetLeft;
        y += curr.offsetTop;
        curr = curr.offsetParent as HTMLElement;
    }
    return { x, y };
}

export function getAnchorPoint(el: HTMLElement, dir: AnchorDir): Point {
    const box = el.getBoundingClientRect();
    const { top, left, width, height } = box;
    switch (dir) {
        case 'left':
            return { x: left, y: top + height * .5 };
        case 'right':
            return { x: left + width, y: top + height * .5 };
        case 'top':
            return { x: left + width * .5, y: top };
        case 'bottom':
            return { x: left + width * .5, y: top + height };
        case 'middle':
        default:
            return { x: left + width * .5, y: top + height * .5 };
    }
}

export function getCssProperty(prop: string, el: HTMLElement | null | undefined, fallback = ''): string {
    el = el || document.documentElement;
    const st = getComputedStyle(el).getPropertyValue(prop);
    return st || fallback;
}

export function clearSelection() {
    const selection = window.getSelection();
    selection?.removeAllRanges();
}
