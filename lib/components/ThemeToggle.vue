<template>
    <div
        v-if="variant === 'toggle'"
        class="ThemeToggle"
        :class="[
            `ThemeToggle-${size}`,
            `ThemeToggle-${kind}`,
        ]"
        role="radiogroup"
        aria-label="Theme selection">
        <div
            class="Indicator"
            :style="indicatorStyle" />
        <button
            v-for="(option, index) in themeOptions"
            :key="option.value"
            type="button"
            class="Option"
            :class="{ 'Option-active': currentTheme === option.value }"
            :title="option.title"
            :aria-checked="currentTheme === option.value"
            role="radio"
            @click="selectTheme(option.value, index)">
            <i
                :class="option.icon"
                class="OptionIcon" />
            <span
                v-if="showLabels"
                class="OptionLabel">
                {{ option.label }}
            </span>
        </button>
    </div>
    <button
        v-else
        type="button"
        class="ThemeBtn"
        :title="themeTitle"
        @click="cycleTheme">
        <i :class="themeIcon" />
    </button>
</template>

<script>
export default {

    inject: ['themeManager'],

    props: {
        variant: {
            type: String,
            default: 'button',
            validator: function (value) {
                return ['button', 'toggle'].includes(value);
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
        showLabels: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            currentTheme: 'auto',
            activeIndex: 0,
        };
    },

    computed: {

        themeOptions() {
            return [
                { value: 'light', label: 'Light', icon: 'fa fa-sun', title: 'Light theme' },
                { value: 'auto', label: 'Auto', icon: 'fa fa-circle-half-stroke', title: 'System theme' },
                { value: 'dark', label: 'Dark', icon: 'fa fa-moon', title: 'Dark theme' },
            ];
        },

        indicatorStyle() {
            const count = this.themeOptions.length;
            const widthPercent = 100 / count;
            const offsetPercent = this.activeIndex * widthPercent;
            return {
                width: `calc(${widthPercent}% - 4px)`,
                transform: `translateX(calc(${offsetPercent / (widthPercent / 100)}% + 2px))`,
            };
        },

        themeIcon() {
            const theme = this.currentTheme === 'auto' ?
                this.getSystemTheme() :
                this.currentTheme;
            return theme === 'dark' ? 'fa fa-moon' : 'fa fa-sun';
        },

        themeTitle() {
            const theme = this.currentTheme === 'auto' ?
                `Auto (${this.getSystemTheme()})` :
                this.currentTheme;
            return `Theme: ${theme}`;
        },

    },

    mounted() {
        if (this.themeManager) {
            this.currentTheme = this.themeManager.currentTheme;
            this.updateActiveIndex();
            window.addEventListener('themeChanged', this.updateTheme);
        }
    },

    beforeUnmount() {
        window.removeEventListener('themeChanged', this.updateTheme);
    },

    methods: {

        updateActiveIndex() {
            const index = this.themeOptions.findIndex(function (opt) {
                return opt.value === this.currentTheme;
            }.bind(this));
            this.activeIndex = index >= 0 ? index : 1;
        },

        selectTheme(theme, index) {
            this.activeIndex = index;
            if (this.themeManager) {
                this.themeManager.setTheme(theme);
            }
        },

        cycleTheme() {
            if (this.themeManager) {
                this.themeManager.toggleTheme();
            }
        },

        updateTheme() {
            if (this.themeManager) {
                this.currentTheme = this.themeManager.currentTheme;
                this.updateActiveIndex();
            }
        },

        getSystemTheme() {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return isDark ? 'dark' : 'light';
        },

    }

};
</script>

<style scoped>
.ThemeToggle {
    /* Component variables - Soft neo-brutalism */
    --Toggle-height: 36px;
    --Toggle-padding: 3px;
    --Toggle-gap: 0;
    --Toggle-font-size: var(--font-size-small, 14px);
    --Toggle-border-width: 2px;
    --Toggle-border-radius: var(--border-radius, 8px);
    --Toggle-bg: var(--color-base-2);
    --Toggle-border-color: var(--color-base-4);
    --Toggle-shadow: 2px 2px 0 var(--color-base-4);
    --Toggle-indicator-color: var(--color-primary-2);
    --Toggle-indicator-border: var(--color-primary-3);
    --Toggle-text-active: var(--color-primary-text, #fff);
    --Toggle-text-inactive: var(--color-text-2);

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

/* Soft neo-brutal hover lift */
.ThemeToggle:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 var(--color-base-4);
}

/* Soft neo-brutal active press */
.ThemeToggle:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 var(--color-base-4);
}

/* Sliding indicator */
.Indicator {
    position: absolute;
    top: var(--Toggle-padding);
    left: 0;
    height: calc(var(--Toggle-height) - var(--Toggle-padding) * 2 - var(--Toggle-border-width) * 2);
    background: var(--Toggle-indicator-color);
    border: 2px solid var(--Toggle-indicator-border);
    border-radius: calc(var(--Toggle-border-radius) - var(--Toggle-padding) - 1px);
    box-shadow: 1px 1px 0 var(--Toggle-indicator-border);
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
    border-radius: calc(var(--Toggle-border-radius) - var(--Toggle-padding) - 1px);
    background: transparent;
    color: var(--Toggle-text-inactive);
    font-family: var(--font-main, inherit);
    font-size: var(--Toggle-font-size);
    font-weight: var(--font-weight-medium, 500);
    cursor: pointer;
    transition:
        color var(--duration-fast, 120ms) var(--ease-out, ease);
}

.Option:hover:not(.Option-active) {
    color: var(--color-text-0);
}

.Option-active {
    color: var(--Toggle-text-active);
    font-weight: var(--font-weight-bold, 600);
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
    box-shadow: inset 0 0 0 2px var(--color-primary-1);
}

/* ===========================================
   SIZE VARIANTS
   =========================================== */

.ThemeToggle-small {
    --Toggle-height: 28px;
    --Toggle-font-size: var(--font-size-xs, 12px);
}

.ThemeToggle-small .Option {
    padding: 0 var(--sp1, 8px);
    min-width: var(--sp4, 32px);
}

.ThemeToggle-large {
    --Toggle-height: 44px;
    --Toggle-font-size: var(--font-size, 16px);
}

.ThemeToggle-large .Option {
    padding: 0 var(--sp2, 16px);
    min-width: var(--sp6, 48px);
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.ThemeToggle-default {
    --Toggle-indicator-color: var(--color-base-0);
    --Toggle-indicator-border: var(--color-base-4);
    --Toggle-text-active: var(--color-text-0);
}

.ThemeToggle-primary {
    --Toggle-indicator-color: var(--color-primary-2);
    --Toggle-indicator-border: var(--color-primary-3);
    --Toggle-text-active: var(--color-primary-text);
}

.ThemeToggle-secondary {
    --Toggle-indicator-color: var(--color-secondary-2);
    --Toggle-indicator-border: var(--color-secondary-3);
    --Toggle-text-active: var(--color-secondary-text);
}

.ThemeToggle-tertiary {
    --Toggle-indicator-color: var(--color-tertiary-2);
    --Toggle-indicator-border: var(--color-tertiary-3);
    --Toggle-text-active: var(--color-tertiary-text);
}

/* ===========================================
   BUTTON VARIANT
   =========================================== */

.ThemeBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    padding: 0;
    border: 2px solid var(--color-base-4);
    border-radius: var(--border-radius, 8px);
    background: var(--color-base-2);
    color: var(--color-text-1);
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 2px 2px 0 var(--color-base-4);
    transition:
        transform var(--duration-fast, 120ms) var(--ease-out, ease),
        box-shadow var(--duration-fast, 120ms) var(--ease-out, ease),
        color var(--duration-fast, 120ms) var(--ease-out, ease);
}

.ThemeBtn:hover {
    transform: translate(-1px, -1px);
    box-shadow: 3px 3px 0 var(--color-base-4);
    color: var(--color-text-0);
}

.ThemeBtn:active {
    transform: translate(1px, 1px);
    box-shadow: 1px 1px 0 var(--color-base-4);
}

.ThemeBtn:focus-visible {
    outline: none;
    box-shadow: 3px 3px 0 var(--color-base-4), 0 0 0 2px var(--color-primary-1);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .ThemeToggle,
    .ThemeBtn,
    .Indicator,
    .Option {
        transition: none;
    }
}
</style>
