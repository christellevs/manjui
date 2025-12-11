<template>
    <div
        ref="trigger"
        class="ContextMenuTrigger"
        @click="onTriggerClick"
        @contextmenu="onTriggerContextMenu">
        <slot />
    </div>
    <ContextPopup
        v-if="isOpen"
        :dir="dir"
        :align="align"
        :anchorRef="anchorRef"
        :atCursor="atCursor"
        :anchorDir="anchorDir"
        @hide="hide()"
        @ready="initialize()">
        <div
            ref="menu"
            class="ContextMenu"
            :class="{
                'ContextMenu-search': search,
            }">
            <InputText
                v-if="search"
                ref="search"
                v-model="searchQuery"
                autoFocus
                class="ContextMenuSearch"
                icon="fas fa-search"
                placeholder="Search"
                data-menu-item-id="#"
                @update:modelValue="doSearch()"
                @keydown.enter="activate()" />
            <div
                class="ContextMenuItems"
                @keydown.backspace="selectSearch()">
                <template
                    v-for="(item, i) in filteredItems"
                    :key="i">
                    <div
                        v-if="item.kind === 'separator' || item.divider"
                        class="ContextMenuDivider" />
                    <div
                        v-else-if="item.kind === 'title'"
                        class="ContextMenuSectionTitle"
                        v-text="getItemTitle(item)" />
                    <div
                        v-else
                        class="ContextMenuItem"
                        :class="[
                            {
                                'ContextMenuItem-selected': isItemSelected(i),
                                'ContextMenuItem-disabled': item.disabled,
                                'ContextMenuItem-checked': item.checked,
                            },
                            item.kind ? `ContextMenuItem-${item.kind}` : ''
                        ]"
                        :data-menu-item-id="i"
                        tabindex="0"
                        :title="getItemTitle(item)"
                        @click="activateItem(item)"
                        @keydown.enter="activateItem(item)">
                        <div class="ContextMenuItemLine">
                            <i
                                v-if="item.icon"
                                :class="item.icon"
                                class="ContextMenuItemIcon" />
                            <div class="ContextMenuItemTitle">
                                {{ getItemTitle(item) }}
                            </div>
                            <i
                                v-if="item.checked"
                                class="fas fa-check fa-sm" />
                        </div>
                        <div
                            v-if="item.description"
                            class="ContextMenuItemDescription">
                            {{ item.description }}
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </ContextPopup>
</template>

<script>
import { ListNavController } from '../controllers/ListNavController.js';
import ContextPopup from './ContextPopup.vue';
import InputText from './InputText.vue';

export default {

    components: {
        ContextPopup,
        InputText,
    },

    props: {
        dir: {
            type: String,
            default: 'v',
        },
        align: {
            type: String,
            default: 'auto',
        },
        size: {
            type: String,
            default: undefined,
        },
        items: {
            type: Array,
            default: function () {
                return [];
            },
        },
        atCursor: {
            type: Boolean,
            default: false,
        },
        anchorRef: {
            type: String,
            default: undefined,
        },
        anchorDir: {
            type: String,
            default: 'middle',
        },
        search: {
            type: Boolean,
            default: false,
        },
        autoDismiss: {
            type: Boolean,
            default: true,
        },
        trigger: {
            type: String,
            default: 'click',
        },
    },

    emits: ['hide', 'select'],

    data() {
        return {
            isOpen: false,
            listNav: new ListNavController({
                selector: '[data-menu-item-id]',
                resolveId: function (el) {
                    return el.getAttribute('data-menu-item-id') || '';
                },
            }),
            searchQuery: '',
            filteredItems: this.items,
        };
    },

    watch: {
        items: {
            handler: function (newItems) {
                this.filteredItems = newItems;
                this.searchQuery = '';
            },
            immediate: true,
        },
    },

    unmounted() {
        this.listNav.destroy();
    },

    methods: {

        onTriggerClick(event) {
            if (this.trigger === 'click') {
                event.stopPropagation();
                this.show();
            }
        },

        onTriggerContextMenu(event) {
            if (this.trigger === 'contextmenu') {
                event.preventDefault();
                event.stopPropagation();
                this.show();
            }
        },

        show() {
            this.isOpen = true;
        },

        initialize() {
            this.listNav.mount(this.$refs.menu);
        },

        isItemSelected(i) {
            return this.listNav.selection.isSelected(String(i));
        },

        getItemTitle(item) {
            return item.title || item.label || '';
        },

        activate() {
            const idx = this.listNav.selection.getFirst();
            const item = this.filteredItems[idx];
            if (item) {
                this.activateItem(item);
            }
        },

        activateItem(item) {
            if (item.disabled) {
                return;
            }

            const hasAction = item.activate || item.action;
            if (!hasAction) {
                return;
            }

            this.$emit('select', item);

            if (item.activate) {
                item.activate();
            } else if (item.action) {
                item.action(item);
            }

            if (this.autoDismiss) {
                this.hide();
            } else {
                item.checked = !item.checked;
            }
        },

        doSearch() {
            const q = this.searchQuery.trim().toLowerCase();
            if (!q) {
                this.filteredItems = this.items;
                return;
            }
            const results = [];
            for (const item of this.items) {
                const title = this.getItemTitle(item).toLowerCase();
                if (title.includes(q)) {
                    results.push(item);
                }
            }
            this.filteredItems = results;
        },

        selectSearch() {
            if (this.$refs.search) {
                const input = this.$refs.search.$el.querySelector('input');
                if (input) {
                    input.focus();
                }
            }
        },

        hide() {
            this.isOpen = false;
            this.$emit('hide');
        },

    },

};
</script>

<style scoped>
.ContextMenuTrigger {
    display: inline-block;
}

.ContextMenu {
    --ContextMenu-bg: var(--color-base-0);
    --ContextMenu-border: var(--color-base-4);
    --ContextMenu-shadow: var(--shadow-brutal-sm);
    --ContextMenu-item-hover: var(--color-base-2);
    --ContextMenu-item-focus: var(--color-primary-a10);

    display: flex;
    flex-flow: column nowrap;
    min-width: 200px;
    max-height: 40vh;
}

.ContextMenu-search {
    width: 240px;
}

.ContextMenuSearch {
    flex: 0 0 auto;
}

.ContextMenuItems {
    overflow-y: auto;
    padding: var(--sp0-5) 0;
}

.ContextMenuItem {
    display: flex;
    flex-flow: column nowrap;
    gap: var(--sp0-5);
    padding: var(--sp1) var(--sp2);
    cursor: pointer;
    user-select: none;
    outline: 0;
    transition: background-color 0.1s ease;
}

.ContextMenuItem-primary {
    color: var(--color-primary);
}

.ContextMenuItem-danger {
    color: var(--color-danger);
}

.ContextMenuItem-checked {
    color: var(--color-primary);
}

.ContextMenuItem-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.ContextMenuItem:hover,
.ContextMenuItem-selected {
    background: var(--ContextMenu-item-hover);
}

.ContextMenuItems:focus-within .ContextMenuItem.ContextMenuItem-selected {
    background: var(--ContextMenu-item-focus);
}

.ContextMenuDivider {
    margin: var(--sp0-5) 0;
    border-top: 1px solid var(--color-base-3);
}

.ContextMenuSectionTitle {
    padding: var(--sp1) var(--sp2);
    color: var(--color-text-2);
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-small);
    text-transform: uppercase;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.ContextMenuItemLine {
    display: flex;
    align-items: center;
    gap: var(--sp1-5);
}

.ContextMenuItemTitle {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: var(--font-size);
    color: var(--color-text-0);
}

.ContextMenuItemIcon {
    flex: 0 0 var(--sp2);
    width: var(--sp2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-small);
    color: var(--color-text-1);
}

.ContextMenuItemDescription {
    font-size: var(--font-size-small);
    color: var(--color-text-2);
}

@media (prefers-reduced-motion: reduce) {
    .ContextMenuItem {
        transition: none;
    }
}
</style>
