<template>
    <div
        class="TreeView"
        :class="{
            'TreeView-selectable': selectable,
        }">
        <TreeViewItem
            v-for="item of items"
            :key="item.id"
            :item="item"
            :level="0"
            :selectable="selectable"
            :multiSelect="multiSelect"
            :selectedIds="normalizedSelectedIds"
            :expandedIds="internalExpandedIds"
            @select="onItemSelect"
            @toggle="onItemToggle">
            <template #label="{ item: slotItem }">
                <slot
                    name="item"
                    :item="slotItem" />
            </template>
        </TreeViewItem>

        <div
            v-if="items.length === 0"
            class="TreeViewEmpty">
            <slot name="empty">
                No items
            </slot>
        </div>
    </div>
</template>

<script>
import TreeViewItem from './TreeViewItem.vue';

export default {

    components: {
        TreeViewItem,
    },

    props: {
        items: { type: Array, default: function () { return []; } },
        modelValue: { type: [String, Number, Array], default: null },
        selectable: { type: Boolean, default: true },
        multiSelect: { type: Boolean, default: false },
        expandAll: { type: Boolean, default: false },
    },

    emits: [
        'update:modelValue',
        'expand',
        'collapse',
        'select',
    ],

    data() {
        return {
            internalExpandedIds: new Set(),
        };
    },

    computed: {

        normalizedSelectedIds() {
            if (this.modelValue == null) {
                return new Set();
            }
            if (Array.isArray(this.modelValue)) {
                return new Set(this.modelValue);
            }
            return new Set([this.modelValue]);
        },

    },

    watch: {

        expandAll: {
            immediate: true,
            handler: function (newVal) {
                if (newVal) {
                    this.expandAllNodes(this.items);
                }
            },
        },

        items: {
            immediate: true,
            handler: function () {
                if (this.expandAll) {
                    this.expandAllNodes(this.items);
                } else {
                    this.initializeExpandedFromItems(this.items);
                }
            },
        },

    },

    methods: {

        expandAllNodes(items) {
            for (const item of items) {
                if (item.children && item.children.length > 0) {
                    this.internalExpandedIds.add(item.id);
                    this.expandAllNodes(item.children);
                }
            }
        },

        initializeExpandedFromItems(items) {
            for (const item of items) {
                if (item.expanded && item.children && item.children.length > 0) {
                    this.internalExpandedIds.add(item.id);
                }
                if (item.children) {
                    this.initializeExpandedFromItems(item.children);
                }
            }
        },

        onItemSelect(item) {
            if (!this.selectable || item.disabled) {
                return;
            }

            let newValue;
            if (this.multiSelect) {
                const currentIds = new Set(this.normalizedSelectedIds);
                if (currentIds.has(item.id)) {
                    currentIds.delete(item.id);
                } else {
                    currentIds.add(item.id);
                }
                newValue = Array.from(currentIds);
            } else {
                newValue = this.normalizedSelectedIds.has(item.id) ? null : item.id;
            }

            this.$emit('update:modelValue', newValue);
            this.$emit('select', item);
        },

        onItemToggle(item) {
            const isExpanded = this.internalExpandedIds.has(item.id);

            if (isExpanded) {
                this.internalExpandedIds.delete(item.id);
                this.$emit('collapse', item);
            } else {
                this.internalExpandedIds.add(item.id);
                this.$emit('expand', item);
            }

            // Force reactivity
            this.internalExpandedIds = new Set(this.internalExpandedIds);
        },

    },

};
</script>

<style scoped>
.TreeView {
    --TreeView-indent: var(--sp3);
    --TreeView-item-height: var(--sp5);
    --TreeView-item-radius: var(--border-radius);
    --TreeView-border-color: var(--color-base-3);
    --TreeView-hover-bg: var(--color-base-1);
    --TreeView-selected-bg: var(--color-primary-0);
    --TreeView-selected-border: var(--color-primary-2);

    position: relative;
    user-select: none;
}

.TreeViewEmpty {
    padding: var(--sp2);
    color: var(--color-text-2);
    font-size: var(--font-size-small);
    text-align: center;
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .TreeView {
        transition: none;
    }
}
</style>
