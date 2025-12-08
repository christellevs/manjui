<template>
    <div
        class="TreeViewItem"
        :class="{
            'TreeViewItem-disabled': item.disabled,
        }">
        <div
            class="TreeViewItemLine"
            :class="{
                'TreeViewItemLine-selected': isSelected,
                'TreeViewItemLine-disabled': item.disabled,
            }"
            :style="lineStyle"
            :tabindex="item.disabled ? -1 : 0"
            role="treeitem"
            :aria-expanded="hasChildren ? isExpanded : undefined"
            :aria-selected="isSelected"
            @click="onLineClick"
            @keydown.enter="onLineClick"
            @keydown.space.prevent="onLineClick"
            @keydown.right="onExpandKey"
            @keydown.left="onCollapseKey">

            <button
                v-if="hasChildren"
                type="button"
                class="TreeViewItemToggle"
                :class="{ 'TreeViewItemToggle-expanded': isExpanded }"
                tabindex="-1"
                @click.stop="onToggle">
                <svg
                    class="TreeViewItemToggleIcon"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                        d="M6 4L10 8L6 12"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </button>
            <span
                v-else
                class="TreeViewItemToggleSpacer" />

            <span
                v-if="multiSelect && selectable"
                class="TreeViewItemCheckbox"
                :class="{ 'TreeViewItemCheckbox-checked': isSelected }"
                @click.stop="onSelect">
                <svg
                    v-if="isSelected"
                    class="TreeViewItemCheckIcon"
                    viewBox="0 0 16 16"
                    fill="none">
                    <path
                        d="M3.5 8.5L6.5 11.5L12.5 4.5"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>
            </span>

            <i
                v-if="item.icon"
                class="TreeViewItemIcon"
                :class="item.icon" />

            <span class="TreeViewItemLabel">
                <slot
                    name="label"
                    :item="item">
                    {{ item.label }}
                </slot>
            </span>
        </div>

        <div
            v-if="hasChildren && isExpanded"
            class="TreeViewItemChildren">
            <TreeViewItem
                v-for="child of item.children"
                :key="child.id"
                :item="child"
                :level="level + 1"
                :selectable="selectable"
                :multiSelect="multiSelect"
                :selectedIds="selectedIds"
                :expandedIds="expandedIds"
                @select="$emit('select', $event)"
                @toggle="$emit('toggle', $event)">
                <template #label="{ item: slotItem }">
                    <slot
                        name="label"
                        :item="slotItem" />
                </template>
            </TreeViewItem>
        </div>
    </div>
</template>

<script>
export default {

    name: 'TreeViewItem',

    props: {
        item: { type: Object, required: true },
        level: { type: Number, default: 0 },
        selectable: { type: Boolean, default: true },
        multiSelect: { type: Boolean, default: false },
        selectedIds: { type: Set, default: function () { return new Set(); } },
        expandedIds: { type: Set, default: function () { return new Set(); } },
    },

    emits: [
        'select',
        'toggle',
    ],

    computed: {

        hasChildren() {
            return this.item.children && this.item.children.length > 0;
        },

        isExpanded() {
            return this.expandedIds.has(this.item.id);
        },

        isSelected() {
            return this.selectedIds.has(this.item.id);
        },

        lineStyle() {
            return {
                paddingLeft: `calc(${this.level} * var(--TreeView-indent, var(--sp3)))`,
            };
        },

    },

    methods: {

        onLineClick() {
            if (this.item.disabled) {
                return;
            }
            if (this.selectable && !this.multiSelect) {
                this.onSelect();
            } else if (this.hasChildren) {
                this.onToggle();
            }
        },

        onSelect() {
            if (!this.item.disabled) {
                this.$emit('select', this.item);
            }
        },

        onToggle() {
            if (this.hasChildren) {
                this.$emit('toggle', this.item);
            }
        },

        onExpandKey() {
            if (this.hasChildren && !this.isExpanded) {
                this.onToggle();
            }
        },

        onCollapseKey() {
            if (this.hasChildren && this.isExpanded) {
                this.onToggle();
            }
        },

    },

};
</script>

<style scoped>
.TreeViewItem {
    position: relative;
}

.TreeViewItemLine {
    display: flex;
    align-items: center;
    gap: var(--sp);
    min-height: var(--TreeView-item-height, var(--sp5));
    padding: var(--sp0-5) var(--sp);
    border-radius: var(--TreeView-item-radius, var(--border-radius));
    cursor: pointer;

    /* Neo-brutal: subtle border on hover */
    border: 2px solid transparent;

    transition:
        background-color var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);
}

.TreeViewItemLine:hover {
    background: var(--TreeView-hover-bg, var(--color-base-1));
    border-color: var(--color-base-3);
}

.TreeViewItemLine:focus-visible {
    outline: none;
    background: var(--TreeView-hover-bg, var(--color-base-1));
    border-color: var(--color-primary-2);
    box-shadow: 0 0 0 2px var(--color-primary-0);
}

/* Neo-brutal: lift effect on hover */
.TreeViewItemLine:hover:not(.TreeViewItemLine-disabled) {
    transform: translateX(-1px);
}

.TreeViewItemLine:active:not(.TreeViewItemLine-disabled) {
    transform: translateX(1px);
}

/* Selected state - Neo-brutal style */
.TreeViewItemLine-selected {
    background: var(--TreeView-selected-bg, var(--color-primary-0));
    border-color: var(--TreeView-selected-border, var(--color-primary-2));
    box-shadow: 2px 2px 0 var(--color-primary-1);
}

.TreeViewItemLine-selected:hover {
    background: color-mix(in srgb, var(--TreeView-selected-bg, var(--color-primary-0)) 80%, var(--color-primary-1));
    border-color: var(--TreeView-selected-border, var(--color-primary-2));
}

/* Disabled state */
.TreeViewItemLine-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/* Toggle button */
.TreeViewItemToggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp3);
    height: var(--sp3);
    padding: 0;
    border: none;
    border-radius: var(--radius-sm, 4px);
    background: transparent;
    color: var(--color-text-1);
    cursor: pointer;
    flex-shrink: 0;

    transition:
        transform var(--duration-fast) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out);
}

.TreeViewItemToggle:hover {
    background: var(--color-base-2);
}

.TreeViewItemToggleIcon {
    width: 14px;
    height: 14px;
    transition: transform var(--duration-normal) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.TreeViewItemToggle-expanded .TreeViewItemToggleIcon {
    transform: rotate(90deg);
}

.TreeViewItemToggleSpacer {
    width: var(--sp3);
    flex-shrink: 0;
}

/* Checkbox for multiSelect */
.TreeViewItemCheckbox {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-base-4);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-base-0);
    flex-shrink: 0;
    cursor: pointer;

    /* Neo-brutal shadow */
    box-shadow: 1px 1px 0 var(--color-base-3);

    transition:
        background-color var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);
}

.TreeViewItemCheckbox:hover {
    border-color: var(--color-primary-2);
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--color-base-4);
}

.TreeViewItemCheckbox-checked {
    background: var(--color-primary-2);
    border-color: var(--color-primary-3);
    box-shadow: 1px 1px 0 var(--color-primary-3);
}

.TreeViewItemCheckbox-checked:hover {
    background: color-mix(in srgb, var(--color-primary-2) 85%, black);
    box-shadow: 2px 2px 0 var(--color-primary-3);
}

.TreeViewItemCheckIcon {
    width: 12px;
    height: 12px;
    color: white;
}

/* Icon */
.TreeViewItemIcon {
    width: var(--sp2);
    color: var(--color-text-1);
    font-size: var(--font-size-small);
    flex-shrink: 0;
}

/* Label */
.TreeViewItemLabel {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 1.4;
}

/* Children container */
.TreeViewItemChildren {
    position: relative;
}

/* Connecting line for children */
.TreeViewItemChildren::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: var(--sp2);
    left: calc(var(--sp) + var(--sp1-5));
    width: 1px;
    background: var(--TreeView-border-color, var(--color-base-3));
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .TreeViewItemLine,
    .TreeViewItemToggle,
    .TreeViewItemToggleIcon,
    .TreeViewItemCheckbox {
        transition: none;
    }
}
</style>
