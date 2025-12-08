<template>
    <component
        :is="tagName"
        ref="button"
        class="Btn button"
        :class="[
            `Btn-${size}`,
            `Btn-${actualKind}`,
            `Btn-iconPos-${iconPos}`,
            {
                'Btn-disabled': disabled || blocked,
                'Btn-square': square,
                'Btn-round': round,
                'Btn-outline': outline,
                'Btn-block': block,
                'Btn-pseudo-focus': pseudoFocus,
                'Btn-pseudo-hover': pseudoHover,
                'Btn-pseudo-active': pseudoActive,
            },
        ]"
        :disabled="disabled || blocked"
        :title="title ?? label"
        :href="href"
        @click="createRipple($event)"
        @uiactivate="onUiActivate($event)"
        @mouseenter="hover = true"
        @mouseleave="hover = false">

        <span class="Btn-ripple-container"></span>

        <slot
            name="icon"
            :hover="hover"
            :blocked="blocked">
            <i
                v-if="icon"
                :class="icon"
                class="Icon" />
        </slot>

        <span
            v-if="label"
            class="Label">
            {{ label }}
        </span>

        <slot
            :hover="hover"
            :blocked="blocked" />

    </component>
</template>

<script>
export default {

    props: {
        label: { type: String },
        title: { type: String },
        icon: { type: String, required: false },
        iconPos: { type: String, default: 'left' },
        kind: { type: String, default: 'default' },
        hoverKind: { type: String },
        customTag: { type: String },
        href: { type: String },
        debounce: { type: Number, default: 0 },
        disabled: { type: Boolean, default: false },
        size: { type: String, default: 'normal' },
        square: { type: Boolean, default: false },
        block: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        pseudoFocus: { type: Boolean, default: false },
        pseudoHover: { type: Boolean, default: false },
        pseudoActive: { type: Boolean, default: false },
    },

    data() {
        return {
            hover: false,
            blocked: false,
        };
    },

    computed: {

        tagName() {
            return this.customTag ?? 'button';
        },

        actualKind() {
            const { kind, hoverKind, hover } = this;
            return hover ? (hoverKind ?? kind) : kind;
        },

    },

    methods: {

        onUiActivate() {
            if (this.debounce > 0) {
                this.blocked = true;
                setTimeout(() => {
                    this.blocked = false;
                }, this.debounce);
            }
        },

        createRipple(event) {
            if (this.disabled || this.blocked) return;
            
            const button = this.$refs.button;
            const rippleContainer = button.querySelector('.Btn-ripple-container');
            const rect = button.getBoundingClientRect();
            
            const ripple = document.createElement('span');
            ripple.className = 'Btn-ripple';
            
            const diameter = Math.max(rect.width, rect.height);
            const radius = diameter / 2;
            
            ripple.style.width = ripple.style.height = `${diameter}px`;
            ripple.style.left = `${event.clientX - rect.left - radius}px`;
            ripple.style.top = `${event.clientY - rect.top - radius}px`;
            
            rippleContainer.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        },

    }

};
</script>

<style scoped>
.Btn {
    /* Component-level variables */
    --Btn-padding: var(--sp2);
    --Btn-gap: var(--sp);
    --Btn-size: var(--input-size);
    --Btn-font-size: var(--font-size);
    --Btn-text-color: inherit;
    --Btn-bg-color: transparent;
    --Btn-border-radius: var(--border-radius);
    --Btn-bg-hover-color: color-mix(in srgb, var(--Btn-bg-color) 92%, white);

    /* Use global transition and state layer variables */
    --Btn-ease: var(--ease-standard, cubic-bezier(0.2, 0, 0, 1));
    --Btn-duration-short: var(--duration-fast, 120ms);
    --Btn-duration: var(--duration-normal, 200ms);
    --Btn-duration-long: var(--duration-slow, 320ms);
    --state-layer-hover-opacity: var(--state-layer-hover, 0.08);
    --state-layer-focus-opacity: var(--state-layer-focus, 0.12);
    --state-layer-pressed-opacity: var(--state-layer-pressed, 0.12);

    -webkit-appearance: none;
    appearance: none;

    position: relative;
    margin: 0;
    padding: 0 var(--Btn-padding);
    height: var(--Btn-size);
    line-height: var(--Btn-size);
    min-width: calc(var(--Btn-size) * 2);
    box-sizing: border-box;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    gap: var(--Btn-gap);

    border: none;
    border-radius: var(--Btn-border-radius);
    cursor: pointer;
    user-select: none;
    overflow: hidden;
    vertical-align: middle;

    font-family: var(--font-main);
    font-size: var(--Btn-font-size);
    font-weight: var(--font-weight-bold);
    letter-spacing: 0.01em;

    color: var(--Btn-text-color);
    background-color: var(--Btn-bg-color);
    box-shadow: var(--elevation-1);

    transition: 
        background-color var(--Btn-duration) var(--Btn-ease),
        box-shadow var(--Btn-duration) var(--Btn-ease),
        color var(--Btn-duration) var(--Btn-ease),
        border-color var(--Btn-duration) var(--Btn-ease),
        transform var(--Btn-duration) var(--Btn-ease);
    will-change: box-shadow, transform;
    -webkit-tap-highlight-color: transparent;
}

/* State layer overlay (Material 3) */
.Btn::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-color: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
}

/* Ripple container */
.Btn-ripple-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
    border-radius: inherit;
    pointer-events: none;
}

/* Ripple effect */
.Btn-ripple {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, hsla(0, 0%, 100%, 0.2) 0%, transparent 70%);
    transform: scale(0);
    animation: ripple-animation 0.7s var(--Btn-ease);
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

/* Hover state */
.Btn:not(:disabled):hover, .Btn.Btn-pseudo-hover {
    box-shadow: var(--elevation-3);
    transform: translateY(-1px);
    /* apply per-kind hover color */
    --Btn-bg-color: var(--Btn-bg-hover-color);
}
.Btn:not(:disabled):hover::before,
.Btn.Btn-pseudo-hover::before {
    opacity: var(--state-layer-hover-opacity);
}

/* Focus state - Material style focus */
.Btn:not(:disabled):focus-visible, .Btn.Btn-pseudo-focus {
    outline: none;
    box-shadow: var(--elevation-3);
}

.Btn:not(:disabled):focus-visible::after {
    content: '';
    position: absolute;
    inset: calc(var(--sp0-5) * -1);
    border-radius: calc(var(--Btn-border-radius) + var(--sp0-5));
    border: 2px solid var(--Btn-focus-color, var(--color-primary-focus));
    pointer-events: none;
}
.Btn:not(:disabled):focus-visible::before,
.Btn.Btn-pseudo-focus::before {
    opacity: var(--state-layer-focus-opacity);
}

/* Active state */
.Btn:not(:disabled):active, .Btn.Btn-pseudo-active {
    box-shadow: var(--elevation-1);
    transform: translateY(0);
}
.Btn:not(:disabled):active::before,
.Btn.Btn-pseudo-active::before {
    opacity: var(--state-layer-pressed-opacity);
}

.Btn:disabled::before,
.Btn.Btn-disabled::before {
    opacity: 0 !important;
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .Btn {
        transition: none;
    }
    .Btn::before {
        transition: none;
    }
    .Btn-ripple {
        animation: none;
    }
}

.Label {
    line-height: var(--Btn-size);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Icon {
    width: var(--sp2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--Btn-font-size);
}

.Btn-square {
    padding-left: 0;
    padding-right: 0;
    width: var(--Btn-size);
    justify-content: center;
}

.Btn-round {
    --Btn-border-radius: calc(var(--Btn-size) / 2);
}

.Btn-disabled {
    opacity: .38;
    cursor: not-allowed;
    box-shadow: none !important;
    pointer-events: none;
}

.Btn-block {
    flex: 1 1 auto;
    display: flex;
    justify-content: center;
}

.Btn-outline {
    --Btn-outline-color-effective: var(--Btn-outline-color);
}

/* Sizes - Using design system variables */

.Btn-large {
    --Btn-size: var(--input-size-large);
    --Btn-font-size: var(--font-size-large);
    --Btn-padding: var(--sp3);
}

.Btn-small {
    --Btn-size: var(--input-size-small);
    --Btn-font-size: var(--font-size-small);
    --Btn-padding: var(--sp1-5);
    --Btn-gap: var(--sp0-5);
}

.Btn-iconPos-right .Icon {
    order: 100;
}

/* Kinds - Material Design style */

.Btn-default {
    --Btn-text-color: var(--color-text-0);
    --Btn-bg-color: var(--color-base-1);
    --Btn-focus-color: var(--color-text-2);
    --Btn-bg-hover-color: var(--color-base-2);
}

.Btn-primary {
    --Btn-text-color: var(--color-primary-text);
    --Btn-bg-color: var(--color-primary-2);
    --Btn-focus-color: var(--color-primary-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-primary-2) 92%, white);
}

.Btn-primary .Btn-ripple {
    background: radial-gradient(circle, hsla(310deg, 64%, 90%, 0.4) 0%, transparent 70%);
}

.Btn-secondary {
    --Btn-text-color: var(--color-secondary-text);
    --Btn-bg-color: var(--color-secondary-2);
    --Btn-focus-color: var(--color-secondary-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-secondary-2) 92%, white);
}

.Btn-secondary .Btn-ripple {
    background: radial-gradient(circle, hsla(290deg, 50%, 90%, 0.4) 0%, transparent 70%);
}

.Btn-tertiary {
    --Btn-text-color: var(--color-tertiary-text);
    --Btn-bg-color: var(--color-tertiary-2);
    --Btn-focus-color: var(--color-tertiary-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-tertiary-2) 92%, white);
}

.Btn-tertiary .Btn-ripple {
    background: radial-gradient(circle, hsla(176deg, 50%, 90%, 0.4) 0%, transparent 70%);
}

.Btn-success {
    --Btn-text-color: var(--color-success-text);
    --Btn-bg-color: var(--color-success-2);
    --Btn-focus-color: var(--color-success-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-success-2) 92%, white);
}

.Btn-success .Btn-ripple {
    background: radial-gradient(circle, hsla(96deg, 60%, 90%, 0.4) 0%, transparent 70%);
}

.Btn-warning {
    --Btn-text-color: var(--color-warning-text);
    --Btn-bg-color: var(--color-warning-3);
    --Btn-focus-color: var(--color-warning-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-warning-3) 92%, black);
}

.Btn-warning .Btn-ripple {
    background: radial-gradient(circle, hsla(48deg, 88%, 20%, 0.2) 0%, transparent 70%);
}

.Btn-danger {
    --Btn-text-color: var(--color-danger-text);
    --Btn-bg-color: var(--color-danger-2);
    --Btn-focus-color: var(--color-danger-0);
    --Btn-bg-hover-color: color-mix(in srgb, var(--color-danger-2) 92%, white);
}

.Btn-danger .Btn-ripple {
    background: radial-gradient(circle, hsla(350deg, 88%, 90%, 0.4) 0%, transparent 70%);
}


/* Text/Link buttons - Material text button style */
.Btn-link-default,
.Btn-link-primary,
.Btn-link-secondary,
.Btn-link-tertiary,
.Btn-link-success,
.Btn-link-warning,
.Btn-link-danger {
    --Btn-bg-color: transparent;
    box-shadow: none;
}

.Btn-link-default:not(:disabled):hover,
.Btn-link-primary:not(:disabled):hover,
.Btn-link-secondary:not(:disabled):hover,
.Btn-link-tertiary:not(:disabled):hover,
.Btn-link-success:not(:disabled):hover,
.Btn-link-warning:not(:disabled):hover,
.Btn-link-danger:not(:disabled):hover {
    box-shadow: none;
    color: color-mix(in srgb, currentColor 88%, white);
}

.Btn-link-default {
    --Btn-text-color: var(--color-text-0);
    --Btn-focus-color: var(--color-text-1);
}

.Btn-link-primary {
    --Btn-text-color: var(--color-primary-2);
    --Btn-focus-color: var(--color-primary-0);
}

.Btn-link-secondary {
    --Btn-text-color: var(--color-secondary-2);
    --Btn-focus-color: var(--color-secondary-0);
}

.Btn-link-tertiary {
    --Btn-text-color: var(--color-tertiary-2);
    --Btn-focus-color: var(--color-tertiary-0);
}

.Btn-link-success {
    --Btn-text-color: var(--color-success-2);
    --Btn-focus-color: var(--color-success-0);
}

.Btn-link-warning {
    --Btn-text-color: var(--color-warning-3);
    --Btn-focus-color: var(--color-warning-0);
}

.Btn-link-danger {
    --Btn-text-color: var(--color-danger-2);
    --Btn-focus-color: var(--color-danger-0);
}

/* Outlined buttons - Material style */
.Btn-outline {
    --Btn-bg-color: transparent;
    border: 1px solid currentColor;
    box-shadow: none;
}

.Btn-outline.Btn-default {
    border-color: var(--color-base-3);
    --Btn-text-color: var(--color-text-0);
}

.Btn-outline.Btn-primary {
    border-color: var(--color-primary-2);
    --Btn-text-color: var(--color-primary-2);
}

.Btn-outline.Btn-secondary {
    border-color: var(--color-secondary-2);
    --Btn-text-color: var(--color-secondary-2);
}

.Btn-outline.Btn-tertiary {
    border-color: var(--color-tertiary-2);
    --Btn-text-color: var(--color-tertiary-2);
}

.Btn-outline.Btn-success {
    border-color: var(--color-success-2);
    --Btn-text-color: var(--color-success-2);
}

.Btn-outline.Btn-warning {
    border-color: var(--color-warning-3);
    --Btn-text-color: var(--color-warning-3);
}

.Btn-outline.Btn-danger {
    border-color: var(--color-danger-2);
    --Btn-text-color: var(--color-danger-2);
}

.Btn-outline:not(:disabled):hover {
    box-shadow: none;
    color: color-mix(in srgb, currentColor 88%, white);
    border-color: color-mix(in srgb, currentColor 88%, white);
}
</style>
