<template>
    <span
        class="Badge"
        :class="[
            `Badge-${kind}`,
            `Badge-${size}`,
            {
                'Badge-dot': dot,
                'Badge-pill': pill,
            }
        ]">
        <slot>
            <template v-if="!dot">
                {{ value }}
            </template>
        </slot>
    </span>
</template>

<script>
export default {

    props: {
        value: { type: [String, Number], default: '' },
        kind: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'secondary', 'success', 'warning', 'danger'].includes(value);
            }
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        dot: { type: Boolean, default: false },
        pill: { type: Boolean, default: false },
    },

};
</script>

<style scoped>
.Badge {
    --Badge-bg: var(--color-base-2);
    --Badge-color: var(--color-text-0);
    --Badge-border: var(--color-base-3);
    --Badge-font-size: var(--font-size-small);
    --Badge-padding: 0.125em 0.5em;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: var(--Badge-padding);
    font-size: var(--Badge-font-size);
    font-weight: var(--font-weight-bold);
    line-height: 1.4;

    background: var(--Badge-bg);
    color: var(--Badge-color);
    border: 1px solid var(--Badge-border);
    border-radius: var(--border-radius-small);
}

/* Sizes */
.Badge-small {
    --Badge-font-size: 0.7rem;
    --Badge-padding: 0.1em 0.4em;
}

.Badge-normal {
    --Badge-font-size: var(--font-size-small);
    --Badge-padding: 0.125em 0.5em;
}

.Badge-large {
    --Badge-font-size: var(--font-size);
    --Badge-padding: 0.2em 0.6em;
}

/* Pill shape */
.Badge-pill {
    border-radius: 999px;
}

/* Dot mode (no content) */
.Badge-dot {
    --Badge-size: 8px;
    width: var(--Badge-size);
    height: var(--Badge-size);
    padding: 0;
    border-radius: 50%;
}

.Badge-dot.Badge-small {
    --Badge-size: 6px;
}

.Badge-dot.Badge-large {
    --Badge-size: 10px;
}

/* Kind variants */
.Badge-default {
    --Badge-bg: var(--color-base-2);
    --Badge-color: var(--color-text-0);
    --Badge-border: var(--color-base-3);
}

.Badge-primary {
    --Badge-bg: var(--color-primary);
    --Badge-color: var(--color-primary-contrast);
    --Badge-border: var(--color-primary-2);
}

.Badge-secondary {
    --Badge-bg: var(--color-secondary);
    --Badge-color: var(--color-secondary-contrast);
    --Badge-border: var(--color-secondary-2);
}

.Badge-success {
    --Badge-bg: var(--color-success);
    --Badge-color: var(--color-success-contrast);
    --Badge-border: var(--color-success-2);
}

.Badge-warning {
    --Badge-bg: var(--color-warning);
    --Badge-color: var(--color-warning-contrast);
    --Badge-border: var(--color-warning-2);
}

.Badge-danger {
    --Badge-bg: var(--color-danger);
    --Badge-color: var(--color-danger-contrast);
    --Badge-border: var(--color-danger-2);
}
</style>
