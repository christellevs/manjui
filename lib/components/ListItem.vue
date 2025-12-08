<template>
    <div
        class="ListItem"
        :class="{
            'ListItem-clickable': clickable,
            'ListItem-selected': selected,
            'ListItem-disabled': disabled,
            'ListItem-divider': divider,
        }"
        :tabindex="clickable && !disabled ? 0 : undefined"
        :role="clickable ? 'button' : undefined"
        @click="onClick"
        @keydown.enter="onClick"
        @keydown.space.prevent="onClick">
        <div
            v-if="$slots.prefix"
            class="ListItemPrefix">
            <slot name="prefix" />
        </div>
        <div class="ListItemContent">
            <slot />
        </div>
        <div
            v-if="$slots.suffix"
            class="ListItemSuffix">
            <slot name="suffix" />
        </div>
    </div>
</template>

<script>
export default {

    props: {
        clickable: { type: Boolean, default: false },
        selected: { type: Boolean, default: false },
        disabled: { type: Boolean, default: false },
        divider: { type: Boolean, default: false },
    },

    emits: ['click'],

    methods: {

        onClick(event) {
            if (this.clickable && !this.disabled) {
                this.$emit('click', event);
            }
        },

    },

};
</script>

<style scoped>
.ListItem {
    --ListItem-bg: transparent;
    --ListItem-bg-hover: var(--color-base-1);
    --ListItem-bg-active: var(--color-base-2);
    --ListItem-bg-selected: var(--color-primary-a10);
    --ListItem-border-selected: var(--color-primary-2);

    display: flex;
    align-items: center;
    gap: var(--sp1-5);
    padding: var(--sp1-5) var(--sp2);
    min-height: var(--sp5);
    box-sizing: border-box;

    background: var(--ListItem-bg);
    border-radius: var(--border-radius);
    color: var(--color-text-0);

    transition:
        background-color var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);
}

/* Clickable state */
.ListItem-clickable {
    cursor: pointer;
    user-select: none;
}

.ListItem-clickable:hover {
    background: var(--ListItem-bg-hover);
}

.ListItem-clickable:active {
    background: var(--ListItem-bg-active);
}

.ListItem-clickable:focus-visible {
    outline: 2px solid var(--color-primary-2);
    outline-offset: -2px;
}

/* Selected state */
.ListItem-selected {
    background: var(--ListItem-bg-selected);
    border-left: 3px solid var(--ListItem-border-selected);
    padding-left: calc(var(--sp2) - 3px);
}

.ListItem-selected.ListItem-clickable:hover {
    background: color-mix(in srgb, var(--ListItem-bg-selected) 80%, var(--ListItem-bg-hover));
}

/* Disabled state */
.ListItem-disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}

/* Divider */
.ListItem-divider {
    border-bottom: 1px solid var(--color-base-3);
}

.ListItem-divider:not(.ListItem-selected) {
    border-radius: 0;
}

/* Prefix slot (icon/avatar area) */
.ListItemPrefix {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--sp3);
    color: var(--color-text-1);
}

/* Content area */
.ListItemContent {
    flex: 1;
    min-width: 0;
    line-height: 1.4;
}

/* Suffix slot (action area) */
.ListItemSuffix {
    display: flex;
    align-items: center;
    gap: var(--sp);
    flex-shrink: 0;
    color: var(--color-text-1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .ListItem {
        transition: none;
    }
}
</style>
