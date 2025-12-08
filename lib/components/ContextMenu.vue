<template>
    <div
        ref="trigger"
        class="ContextMenu"
        @click="onTriggerClick"
        @contextmenu="onContextMenu">
        <slot />
        <Teleport to="body">
            <div
                v-if="isOpen"
                ref="overlay"
                class="ContextMenuOverlay"
                @click="close"
                @contextmenu.prevent="close" />
            <div
                v-if="isOpen"
                ref="menu"
                class="ContextMenuPopup"
                :style="menuStyle"
                @keydown="onKeyDown">
                <template
                    v-for="(item, index) in items"
                    :key="index">
                    <div
                        v-if="item.divider"
                        class="ContextMenuDivider" />
                    <div
                        v-else
                        class="ContextMenuItem"
                        :class="{
                            'ContextMenuItem-disabled': item.disabled,
                            'ContextMenuItem-focused': focusedIndex === index,
                        }"
                        tabindex="0"
                        @click="selectItem(item, index)"
                        @mouseenter="focusedIndex = index">
                        <i
                            v-if="item.icon"
                            :class="item.icon"
                            class="ContextMenuItemIcon" />
                        <span class="ContextMenuItemLabel">{{ item.label }}</span>
                    </div>
                </template>
            </div>
        </Teleport>
    </div>
</template>

<script>
export default {

    props: {
        items: {
            type: Array,
            default: function () {
                return [];
            },
        },
        trigger: {
            type: String,
            default: 'contextmenu',
            validator: function (value) {
                return ['click', 'contextmenu'].includes(value);
            },
        },
        position: {
            type: String,
            default: 'auto',
        },
    },

    emits: ['select', 'open', 'close'],

    data() {
        return {
            isOpen: false,
            menuX: 0,
            menuY: 0,
            focusedIndex: -1,
        };
    },

    computed: {

        menuStyle() {
            return {
                left: this.menuX + 'px',
                top: this.menuY + 'px',
            };
        },

        selectableItems() {
            const result = [];
            for (let i = 0; i < this.items.length; i++) {
                const item = this.items[i];
                if (!item.divider && !item.disabled) {
                    result.push({ item: item, index: i });
                }
            }
            return result;
        },

    },

    mounted() {
        this.handleDocumentKeyDown = this.onDocumentKeyDown.bind(this);
        document.addEventListener('keydown', this.handleDocumentKeyDown);
    },

    unmounted() {
        document.removeEventListener('keydown', this.handleDocumentKeyDown);
    },

    methods: {

        onTriggerClick(event) {
            if (this.trigger === 'click') {
                event.preventDefault();
                event.stopPropagation();
                this.openAt(event.clientX, event.clientY);
            }
        },

        onContextMenu(event) {
            if (this.trigger === 'contextmenu') {
                event.preventDefault();
                event.stopPropagation();
                this.openAt(event.clientX, event.clientY);
            }
        },

        openAt(x, y) {
            this.menuX = x;
            this.menuY = y;
            this.focusedIndex = -1;
            this.isOpen = true;
            this.$emit('open');

            this.$nextTick(function () {
                this.adjustPosition();
            });
        },

        adjustPosition() {
            const menu = this.$refs.menu;
            if (!menu) {
                return;
            }

            const rect = menu.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (rect.right > viewportWidth) {
                this.menuX = Math.max(8, viewportWidth - rect.width - 8);
            }

            if (rect.bottom > viewportHeight) {
                this.menuY = Math.max(8, viewportHeight - rect.height - 8);
            }
        },

        close() {
            if (this.isOpen) {
                this.isOpen = false;
                this.$emit('close');
            }
        },

        selectItem(item, index) {
            if (item.disabled) {
                return;
            }

            this.$emit('select', item, index);

            if (item.action && typeof item.action === 'function') {
                item.action(item);
            }

            this.close();
        },

        onKeyDown(event) {
            if (!this.isOpen) {
                return;
            }

            switch (event.key) {
                case 'ArrowDown':
                    event.preventDefault();
                    this.focusNext();
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    this.focusPrevious();
                    break;
                case 'Enter':
                case ' ':
                    event.preventDefault();
                    if (this.focusedIndex >= 0 && this.focusedIndex < this.items.length) {
                        this.selectItem(this.items[this.focusedIndex], this.focusedIndex);
                    }
                    break;
                case 'Escape':
                    event.preventDefault();
                    this.close();
                    break;
            }
        },

        onDocumentKeyDown(event) {
            if (this.isOpen && event.key === 'Escape') {
                event.preventDefault();
                this.close();
            }
        },

        focusNext() {
            if (this.selectableItems.length === 0) {
                return;
            }

            let currentPos = -1;
            for (let i = 0; i < this.selectableItems.length; i++) {
                if (this.selectableItems[i].index === this.focusedIndex) {
                    currentPos = i;
                    break;
                }
            }

            const nextPos = (currentPos + 1) % this.selectableItems.length;
            this.focusedIndex = this.selectableItems[nextPos].index;
        },

        focusPrevious() {
            if (this.selectableItems.length === 0) {
                return;
            }

            let currentPos = -1;
            for (let i = 0; i < this.selectableItems.length; i++) {
                if (this.selectableItems[i].index === this.focusedIndex) {
                    currentPos = i;
                    break;
                }
            }

            const prevPos = currentPos <= 0 ? this.selectableItems.length - 1 : currentPos - 1;
            this.focusedIndex = this.selectableItems[prevPos].index;
        },

    },

};
</script>

<style scoped>
.ContextMenu {
    display: inline-block;
    position: relative;
}

.ContextMenuOverlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9998;
}

.ContextMenuPopup {
    --ContextMenu-bg: var(--color-base-0);
    --ContextMenu-border: var(--color-base-4);
    --ContextMenu-shadow: var(--shadow-brutal-sm);
    --ContextMenu-item-hover: var(--color-base-2);
    --ContextMenu-item-focus: var(--color-primary-a10);

    position: fixed;
    z-index: 9999;
    min-width: 160px;
    max-width: 280px;
    padding: var(--sp0-5) 0;

    background: var(--ContextMenu-bg);
    border: 2px solid var(--ContextMenu-border);
    border-radius: var(--border-radius);
    box-shadow: var(--ContextMenu-shadow);

    animation: contextMenuFadeIn 0.15s ease-out;
}

@keyframes contextMenuFadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.ContextMenuItem {
    display: flex;
    align-items: center;
    gap: var(--sp1-5);
    padding: var(--sp1) var(--sp2);

    cursor: pointer;
    user-select: none;
    outline: none;

    transition: background-color 0.1s ease;
}

.ContextMenuItem:hover,
.ContextMenuItem-focused {
    background: var(--ContextMenu-item-hover);
}

.ContextMenuItem:focus-visible,
.ContextMenuItem-focused:focus-visible {
    background: var(--ContextMenu-item-focus);
    outline: none;
}

.ContextMenuItem-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

.ContextMenuItemIcon {
    flex-shrink: 0;
    width: var(--sp2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--font-size-small);
    color: var(--color-text-1);
}

.ContextMenuItemLabel {
    flex: 1;
    font-size: var(--font-size);
    color: var(--color-text-0);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.ContextMenuDivider {
    margin: var(--sp0-5) 0;
    border-top: 1px solid var(--color-base-3);
}

@media (prefers-reduced-motion: reduce) {
    .ContextMenuPopup {
        animation: none;
    }
    .ContextMenuItem {
        transition: none;
    }
}
</style>
