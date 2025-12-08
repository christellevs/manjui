import { Event } from 'nanoevent';

import { ListNavController } from './ListNavController.js';

export interface TreeItem {
    id: string;
    children?: TreeItem[];
    [key: string]: any;
}

export interface TreeViewConfig<T> {
    localStorageId: string;
    showEmptyHandle: boolean;
    multiSelect: boolean;
    allowDrag: boolean;
    allowDropToRoot: boolean;
    canDropTo: (item: T) => boolean;
}

function parseJson<T>(str: string, fallback: T): T {
    try {
        return JSON.parse(str) as T;
    } catch {
        return fallback;
    }
}

export class TreeViewController<T extends TreeItem> {

    items: T[] = [];
    itemMap = new Map<string, T>();
    listNav = new ListNavController({
        selector: '.TreeViewItem [data-item-id]',
        resolveId: el => el.getAttribute('data-item-id') ?? '',
        canExpand: id => {
            const item = this.getItemById(id);
            return item ? this.canExpand(item) : false;
        },
        multiSelect: this.config.multiSelect,
        allowDrag: this.config.allowDrag,
    });

    onDrop = new Event<T | null>();

    constructor(readonly config: TreeViewConfig<T>) {
        this.listNav.expander.changed.on(() => {
            const ids = [...this.listNav.expander.expandedIds];
            this.saveExpandedIds(ids);
        });
    }

    mount(container: HTMLElement) {
        this.listNav.mount(container);
        const expandedIds = this.loadExpandedIds();
        this.listNav.expander.setExpandedIds(expandedIds);
    }

    unmount() {
        this.listNav.destroy();
    }

    getItemById(id: string): T | null {
        return this.itemMap.get(id) ?? null;
    }

    canExpand(item: T) {
        return item.children != null;
    }

    setItems(items: T[]) {
        this.items = items;
        this.itemMap.clear();
        for (const item of this.traverse(items)) {
            this.itemMap.set(item.id, item as T);
        }
    }

    getSelectedItems(): T[] {
        const ids = this.listNav.selection.getSelectedIds();
        return ids.flatMap(id => this.getItemById(id) ?? []);
    }

    setSelectedIds(ids: Iterable<string>) {
        this.listNav.selection.setSelectedIds(ids);
    }

    getDraggingItems() {
        if (!this.listNav.isDragging()) {
            return [];
        }
        return this.getSelectedItems();
    }

    dispatchDrop(target: T | null) {
        const allowed =
            (target == null && this.config.allowDropToRoot) ||
            (target != null && this.config.canDropTo(target));
        if (allowed && this.getDraggingItems().length > 0) {
            this.onDrop.emit(target);
        }
    }

    isValidDropTarget(target: T) {
        return this.listNav.isDragging() && this.config.canDropTo(target);
    }

    expandAll() {
        for (const item of this.traverse(this.items)) {
            if (this.canExpand(item)) {
                this.listNav.expander.expand(item.id);
            }
        }
    }

    collapseAll() {
        this.listNav.expander.collapseAll();
    }

    *traverse<T extends TreeItem>(items: T[]): Iterable<T> {
        for (const item of items) {
            yield item;
            yield* this.traverse<T>((item.children ?? []) as T[]);
        }
    }

    private loadExpandedIds() {
        return parseJson(localStorage.getItem(`treeView:${this.config.localStorageId}`) ?? '', []);
    }

    private saveExpandedIds(ids: string[]) {
        localStorage.setItem(`treeView:${this.config.localStorageId}`, JSON.stringify(ids));
    }

}
