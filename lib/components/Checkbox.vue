<template>
    <label
        class="Checkbox"
        :class="[
            `Checkbox-${size}`,
            `Checkbox-${kind}`,
            {
                'Checkbox-checked': modelValue,
                'Checkbox-disabled': disabled,
                'Checkbox-switch': toggle
            }
        ]">
        <input
            type="checkbox"
            class="CheckboxInput"
            :checked="modelValue"
            :disabled="disabled"
            @change="onChange" />

        <span class="CheckboxControl">
            <svg
                v-if="!toggle"
                class="CheckboxIcon"
                viewBox="0 0 16 16"
                fill="none">
                <path
                    class="CheckboxCheck"
                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <span
                v-if="toggle"
                class="CheckboxThumb" />
        </span>

        <span
            v-if="label"
            class="CheckboxLabel">
            {{ label }}
        </span>

        <slot />
    </label>
</template>

<script>
export default {

    props: {
        modelValue: { type: Boolean, default: false },
        label: { type: String },
        kind: {
            type: String,
            default: 'primary',
            validator: value => ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'].includes(value)
        },
        size: {
            type: String,
            default: 'normal',
            validator: value => ['small', 'normal', 'large'].includes(value)
        },
        disabled: { type: Boolean, default: false },
        toggle: { type: Boolean, default: false }
    },

    emits: ['update:modelValue'],

    methods: {
        onChange(event) {
            this.$emit('update:modelValue', event.target.checked);
        }
    }

};
</script>

<style scoped>
.Checkbox {
    --Checkbox-size: 20px;
    --Checkbox-radius: var(--radius-sm, 4px);
    --Checkbox-color: var(--color-primary-2);
    --Checkbox-bg: var(--surface-card, #fff);
    --Checkbox-border: var(--surface-border, #ddd);
    --Checkbox-gap: var(--sp1, 8px);

    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--Checkbox-gap);
    cursor: pointer;
    user-select: none;
    font-size: var(--font-size, 16px);
}

.CheckboxInput {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    pointer-events: none;
}

.CheckboxControl {
    position: relative;
    width: var(--Checkbox-size);
    height: var(--Checkbox-size);
    flex-shrink: 0;
    border: 2px solid var(--Checkbox-border);
    border-radius: var(--Checkbox-radius);
    background: var(--Checkbox-bg);
    transition:
        background-color var(--duration-fast, 120ms) var(--ease-standard, ease),
        border-color var(--duration-fast, 120ms) var(--ease-standard, ease),
        box-shadow var(--duration-fast, 120ms) var(--ease-standard, ease),
        transform var(--duration-fast, 120ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.CheckboxIcon {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    color: white;
}

.CheckboxCheck {
    stroke-dasharray: 20;
    stroke-dashoffset: 20;
    transition: stroke-dashoffset var(--duration-normal, 200ms) var(--ease-emphasized-decelerate, ease-out);
}

/* Checked state */
.Checkbox-checked .CheckboxControl {
    background: var(--Checkbox-color);
    border-color: var(--Checkbox-color);
}

.Checkbox-checked .CheckboxCheck {
    stroke-dashoffset: 0;
}

/* Hover state */
.Checkbox:not(.Checkbox-disabled):hover .CheckboxControl {
    border-color: var(--Checkbox-color);
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--Checkbox-color) 15%, transparent);
}

.Checkbox-checked:not(.Checkbox-disabled):hover .CheckboxControl {
    background: color-mix(in srgb, var(--Checkbox-color) 85%, black);
    transform: scale(1.05);
}

/* Focus state */
.CheckboxInput:focus-visible + .CheckboxControl {
    outline: none;
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--Checkbox-color) 30%, transparent);
}

/* Active/pressed state */
.Checkbox:not(.Checkbox-disabled):active .CheckboxControl {
    transform: scale(0.92);
}

/* Disabled state */
.Checkbox-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.CheckboxLabel {
    line-height: 1.4;
}

/* ===========================================
   SIZE VARIANTS
   =========================================== */

.Checkbox-small {
    --Checkbox-size: 16px;
    --Checkbox-gap: var(--sp0-5, 4px);
    font-size: var(--font-size-sm, 14px);
}

.Checkbox-large {
    --Checkbox-size: 24px;
    --Checkbox-gap: var(--sp1-5, 12px);
    font-size: var(--font-size-lg, 18px);
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.Checkbox-default { --Checkbox-color: var(--color-text-1); }
.Checkbox-primary { --Checkbox-color: var(--color-primary-2); }
.Checkbox-secondary { --Checkbox-color: var(--color-secondary-2); }
.Checkbox-tertiary { --Checkbox-color: var(--color-tertiary-2); }
.Checkbox-success { --Checkbox-color: var(--color-success-2); }
.Checkbox-warning { --Checkbox-color: var(--color-warning-3); }
.Checkbox-danger { --Checkbox-color: var(--color-danger-2); }

/* ===========================================
   TOGGLE/SWITCH VARIANT
   =========================================== */

.Checkbox-switch .CheckboxControl {
    --Checkbox-thumb-size: calc(var(--Checkbox-size) - 4px);
    --Checkbox-switch-width: calc(var(--Checkbox-size) * 1.75);
    --Checkbox-thumb-offset: 2px;
    --Checkbox-thumb-travel: calc(var(--Checkbox-switch-width) - var(--Checkbox-thumb-size) - var(--Checkbox-thumb-offset) * 2);

    width: var(--Checkbox-switch-width);
    height: var(--Checkbox-size);
    border-radius: var(--Checkbox-size);
    background: var(--Checkbox-border);
    border: none;
}

.CheckboxThumb {
    position: absolute;
    top: var(--Checkbox-thumb-offset);
    left: var(--Checkbox-thumb-offset);
    width: var(--Checkbox-thumb-size);
    height: var(--Checkbox-thumb-size);
    border-radius: 50%;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1);
    transition:
        transform var(--duration-normal, 200ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
        background-color var(--duration-fast, 120ms) var(--ease-standard, ease);
}

.Checkbox-switch.Checkbox-checked .CheckboxControl {
    background: var(--Checkbox-color);
}

.Checkbox-switch.Checkbox-checked .CheckboxThumb {
    transform: translateX(var(--Checkbox-thumb-travel));
}

.Checkbox-switch:not(.Checkbox-disabled):hover .CheckboxControl {
    box-shadow: none;
    border-color: transparent;
}

.Checkbox-switch:not(.Checkbox-disabled):hover .CheckboxThumb {
    box-shadow: 0 2px 4px rgba(0,0,0,0.2), 0 1px 2px rgba(0,0,0,0.1);
}

/* Switch focus */
.Checkbox-switch .CheckboxInput:focus-visible + .CheckboxControl {
    box-shadow: 0 0 0 3px color-mix(in srgb, var(--Checkbox-color) 30%, transparent);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .CheckboxControl,
    .CheckboxCheck,
    .CheckboxThumb {
        transition: none;
    }
}
</style>
