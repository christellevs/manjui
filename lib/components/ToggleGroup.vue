<template>
    <div
        class="ToggleGroup"
        :class="[
            `ToggleGroup-${size}`,
            `ToggleGroup-${kind}`,
        ]"
        role="radiogroup"
        :aria-label="ariaLabel">
        <div
            class="Indicator"
            :style="indicatorStyle" />
        <button
            v-for="(option, index) in normalizedOptions"
            :key="option.value"
            ref="options"
            type="button"
            class="Option"
            :class="{ 'Option-active': modelValue === option.value }"
            :title="option.title || option.label"
            :aria-checked="modelValue === option.value"
            role="radio"
            @click="selectOption(option.value, index)">
            <i
                v-if="option.icon"
                :class="option.icon"
                class="OptionIcon" />
            <span
                v-if="option.label && !iconOnly"
                class="OptionLabel">
                {{ option.label }}
            </span>
        </button>
    </div>
</template>

<script>
export default {

    props: {
        modelValue: {
            type: [String, Number, Boolean],
            default: null
        },
        options: {
            type: Array,
            required: true,
            validator: function (value) {
                return value.length > 0;
            }
        },
        kind: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['default', 'primary', 'secondary', 'tertiary'].includes(value);
            }
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        iconOnly: {
            type: Boolean,
            default: false
        },
        ariaLabel: {
            type: String,
            default: 'Toggle selection'
        }
    },

    emits: ['update:modelValue'],

    data() {
        return {
            activeIndex: 0,
        };
    },

    computed: {

        normalizedOptions() {
            const result = [];
            for (const opt of this.options) {
                if (typeof opt === 'object') {
                    result.push(opt);
                } else {
                    result.push({ value: opt, label: String(opt) });
                }
            }
            return result;
        },

        indicatorStyle() {
            const count = this.normalizedOptions.length;
            const widthPercent = 100 / count;
            const offsetPercent = this.activeIndex * widthPercent;
            return {
                width: `calc(${widthPercent}% - 4px)`,
                transform: `translateX(calc(${offsetPercent / (widthPercent / 100)}% + 2px))`,
            };
        },

    },

    watch: {

        modelValue: {
            immediate: true,
            handler(newVal) {
                this.updateActiveIndex(newVal);
            }
        },

        options: {
            handler() {
                this.updateActiveIndex(this.modelValue);
            }
        }

    },

    mounted() {
        this.updateActiveIndex(this.modelValue);
    },

    methods: {

        updateActiveIndex(value) {
            const index = this.normalizedOptions.findIndex(function (opt) {
                return opt.value === value;
            });
            this.activeIndex = index >= 0 ? index : 0;
        },

        selectOption(value, index) {
            this.activeIndex = index;
            this.$emit('update:modelValue', value);
        },

    }

};
</script>

<style scoped>
.ToggleGroup {
    /* Component variables */
    --Toggle-height: 36px;
    --Toggle-padding: 2px;
    --Toggle-gap: 0;
    --Toggle-font-size: var(--font-size-small, 14px);
    --Toggle-border-width: 2px;
    --Toggle-border-radius: var(--border-radius-pill, 9999px);
    --Toggle-bg: var(--color-base-3);
    --Toggle-border-color: var(--color-base-4);
    --Toggle-shadow: var(--shadow-brutal-sm, 2px 2px 0 var(--color-base-4));
    --Toggle-indicator-color: var(--color-primary-2);
    --Toggle-indicator-shadow: 1px 1px 0 var(--color-primary-3);
    --Toggle-text-active: var(--color-primary-text, #fff);
    --Toggle-text-inactive: var(--color-text-0);

    position: relative;
    display: inline-flex;
    align-items: center;
    height: var(--Toggle-height);
    padding: var(--Toggle-padding);
    gap: var(--Toggle-gap);
    background: var(--Toggle-bg);
    border: var(--Toggle-border-width) solid var(--Toggle-border-color);
    border-radius: var(--Toggle-border-radius);
    box-shadow: var(--Toggle-shadow);
    user-select: none;
    transition:
        box-shadow var(--duration-fast, 120ms) var(--ease-out, ease),
        transform var(--duration-fast, 120ms) var(--ease-out, ease);
}

/* Neo-brutal hover lift */
.ToggleGroup:hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-hover, 3px 3px 0 var(--color-base-4));
}

/* Neo-brutal active press */
.ToggleGroup:active {
    transform: translate(1px, 1px);
    box-shadow: none;
}

/* Sliding indicator */
.Indicator {
    position: absolute;
    top: var(--Toggle-padding);
    left: 0;
    height: calc(var(--Toggle-height) - var(--Toggle-padding) * 2 - var(--Toggle-border-width) * 2);
    background: var(--Toggle-indicator-color);
    border-radius: calc(var(--Toggle-border-radius) - var(--Toggle-padding));
    box-shadow: var(--Toggle-indicator-shadow);
    transition:
        transform var(--duration-normal, 200ms) var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1)),
        width var(--duration-normal, 200ms) var(--ease-out, ease);
    z-index: 1;
}

/* Option buttons */
.Option {
    position: relative;
    z-index: 2;
    flex: 1;
    height: 100%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp0-5, 4px);
    padding: 0 var(--sp1-5, 12px);
    min-width: var(--sp5, 40px);
    border: none;
    border-radius: calc(var(--Toggle-border-radius) - var(--Toggle-padding));
    background: transparent;
    color: var(--Toggle-text-inactive);
    font-family: var(--font-main, inherit);
    font-size: var(--Toggle-font-size);
    font-weight: var(--font-weight-bold, 700);
    letter-spacing: 0.02em;
    cursor: pointer;
    transition:
        color var(--duration-fast, 120ms) var(--ease-out, ease);
}

.Option:hover:not(.Option-active) {
    color: var(--color-text-0);
}

.Option-active {
    color: var(--Toggle-text-active);
}

.OptionIcon {
    font-size: 1em;
    line-height: 1;
}

.OptionLabel {
    white-space: nowrap;
}

/* Focus state */
.Option:focus-visible {
    outline: none;
    box-shadow: inset 0 0 0 2px var(--color-primary-focus, var(--color-primary-0));
}

/* ===========================================
   SIZE VARIANTS
   =========================================== */

.ToggleGroup-small {
    --Toggle-height: 28px;
    --Toggle-font-size: var(--font-size-xs, 12px);
}

.ToggleGroup-small .Option {
    padding: 0 var(--sp1, 8px);
    min-width: var(--sp4, 32px);
}

.ToggleGroup-large {
    --Toggle-height: 44px;
    --Toggle-font-size: var(--font-size, 16px);
}

.ToggleGroup-large .Option {
    padding: 0 var(--sp2, 16px);
    min-width: var(--sp6, 48px);
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.ToggleGroup-default {
    --Toggle-indicator-color: var(--color-text-0);
    --Toggle-indicator-shadow: 1px 1px 0 var(--color-text-2);
    --Toggle-text-active: var(--color-base-0);
}

.ToggleGroup-primary {
    --Toggle-indicator-color: var(--color-primary-2);
    --Toggle-indicator-shadow: 1px 1px 0 var(--color-primary-3);
    --Toggle-text-active: var(--color-primary-text);
}

.ToggleGroup-secondary {
    --Toggle-indicator-color: var(--color-secondary-2);
    --Toggle-indicator-shadow: 1px 1px 0 var(--color-secondary-3);
    --Toggle-text-active: var(--color-secondary-text);
}

.ToggleGroup-tertiary {
    --Toggle-indicator-color: var(--color-tertiary-2);
    --Toggle-indicator-shadow: 1px 1px 0 var(--color-tertiary-3);
    --Toggle-text-active: var(--color-tertiary-text);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .ToggleGroup,
    .Indicator,
    .Option {
        transition: none;
    }
}
</style>
