<template>
    <component
        :is="tagName"
        class="InputBase"
        :class="[
            `InputBase-${size}`,
            {
                'InputBase-block': block,
                'InputBase-round': round,
                'InputBase-disabled': disabled,
                'InputBase-invalid': invalid,
                'InputBase-fixed-height': fixedHeight,
                'InputBase-pseudo-focus': pseudoFocus,
                'InputBase-pseudo-hover': pseudoHover,
            }
        ]">
        <Tab
            v-if="label"
            class="Label"
            :label="label" />
        <div class="Container">
            <slot />
        </div>
    </component>
</template>

<script>
import Tab from './Tab.vue';

export default {

    components: {
        Tab,
    },

    props: {
        tagName: { default: 'label' },
        label: { type: String },
        size: { type: String, default: 'normal' },
        fixedHeight: { type: Boolean, default: true },
        round: { type: Boolean, default: false },
        block: { type: Boolean },
        disabled: { type: Boolean, default: false },
        invalid: { type: Boolean, default: false },
        pseudoFocus: { type: Boolean, default: false },
        pseudoHover: { type: Boolean, default: false },
    }

};
</script>

<style scoped>
.InputBase {
    --InputBase-size: var(--input-size);

    --InputBase-padding: var(--sp1-5);
    --InputBase-font-size: var(--font-size);
    --InputBase-text-color: var(--color-text-0);
    --InputBase-surface: var(--color-base-0);

    --InputBase-outline-color: transparent;
    --InputBase-outline-color-focus: var(--color-tertiary-focus);
    --InputBase-outline-color-invalid: var(--color-danger-focus);

    --InputBase-border-color: var(--color-base-4);
    --InputBase-border-color-focus: var(--color-tertiary);
    --InputBase-border-color-invalid: var(--color-danger);

    --InputBase-label-color: var(--color-text-0);
    --InputBase-label-color-focus: var(--color-tertiary-4);
    --InputBase-label-color-invalid: var(--color-danger-4);

    --InputBase-label-surface: var(--color-base-1);
    --InputBase-label-surface-focus: var(--InputBase-outline-color-focus);
    --InputBase-label-surface-invalid: var(--InputBase-outline-color-invalid);

    --InputBase-border-radius: var(--border-radius);
    --InputBase-shadow: var(--shadow-brutal-xs);
    --InputBase-shadow-focus: var(--shadow-brutal-sm);

    position: relative;
    display: flex;
    flex-flow: column nowrap;
}

.Container {
    position: relative;
    z-index: 1;

    display: inline-flex;
    align-items: center;
    border-radius: var(--border-radius-small);
    box-sizing: border-box;
    padding: var(--InputBase-padding);
    gap: var(--sp);
    width: 100%;
    min-height: var(--InputBase-size);

    color: var(--InputBase-text-color);
    background: var(--InputBase-surface);
    outline: none;
    border: 2px solid var(--InputBase-border-color);
    border-radius: var(--InputBase-border-radius);
    font-size: var(--InputBase-font-size);

    /* Neo-brutal: offset shadow */
    box-shadow: var(--InputBase-shadow);

    transition:
        color var(--duration-fast, 120ms) var(--ease-out, ease),
        border-color var(--duration-fast, 120ms) var(--ease-out, ease),
        box-shadow var(--duration-fast, 120ms) var(--ease-out, ease),
        transform var(--duration-fast, 120ms) var(--ease-out, ease),
        filter var(--duration-fast, 120ms) var(--ease-out, ease);
}

.InputBase-fixed-height .Container {
    height: var(--InputBase-size);
}

.Label.Label {
    align-self: flex-start;
    position: relative;
    z-index: 0;
    margin: 0 var(--sp2);
    max-width: calc(100% - 2 * var(--sp2));

    --Tab-surface: var(--InputBase-label-surface);
    --Tab-color: var(--InputBase-label-color);
    --Tab-size: calc(.75 * var(--InputBase-size));
    --Tab-cap-size: calc(.75 * var(--InputBase-size));

    font-size: var(--InputBase-font-size);
}

/* Focus state - Neo-brutal: lift up */
.InputBase:not(.InputBase-disabled):focus-within .Container,
.InputBase.InputBase-pseudo-focus .Container {
    transform: translate(-1px, -1px);
    box-shadow: var(--InputBase-shadow-focus);
    border-color: var(--InputBase-border-color-focus);
}

.InputBase:not(.InputBase-disabled):focus-within, .InputBase.InputBase-pseudo-focus {
    z-index: 10;
    --InputBase-border-color: var(--InputBase-border-color-focus);
    --InputBase-label-color: var(--InputBase-label-color-focus);
    --InputBase-label-surface: var(--InputBase-label-surface-focus);
}

/* Hover state */
.InputBase:not(.InputBase-disabled):hover .Container {
    border-color: var(--InputBase-border-color-focus);
}

.InputBase-invalid {
    --InputBase-border-color: var(--InputBase-border-color-invalid);
    --InputBase-label-color: var(--InputBase-label-color-invalid);
    --InputBase-label-surface: var(--InputBase-label-surface-invalid);
}

.InputBase-invalid .Container {
    box-shadow: 2px 2px 0 var(--color-danger-3);
}

.InputBase-round {
    --InputBase-border-radius: var(--border-radius-round);
}

.InputBase-block {
    flex: 1 1 auto;
    display: flex;
}

.InputBase-disabled .Container {
    --InputBase-surface: var(--color-base-1);
    opacity: .64;
    filter: saturate(40%);
    cursor: not-allowed;
}

.InputBase-small {
    --InputBase-size: var(--input-size-small);
    --InputBase-font-size: var(--font-size-small);
    --InputBase-padding: var(--sp);
}

.InputBase-large {
    --InputBase-size: var(--input-size-large);
    --InputBase-font-size: var(--font-size-large);
    --InputBase-padding: var(--sp2);
}
</style>
