<template>
    <div
        class="Box"
        :class="[
            `Box-${kind}`,
            `Box-padding-${padding}`,
            {
                'Box-border': border,
                'Box-shadow': shadow,
                'Box-rounded': rounded,
            }
        ]">
        <slot />
    </div>
</template>

<script>
export default {

    props: {
        kind: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'secondary', 'tertiary'].includes(value);
            }
        },
        padding: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['none', 'small', 'normal', 'large'].includes(value);
            }
        },
        border: { type: Boolean, default: false },
        shadow: { type: Boolean, default: false },
        rounded: { type: Boolean, default: true },
    },

};
</script>

<style scoped>
.Box {
    --Box-bg: var(--color-base-1);
    --Box-border-color: var(--color-base-4);
    --Box-shadow: var(--shadow-brutal-sm);

    background: var(--Box-bg);
    box-sizing: border-box;
}

/* Padding variants */
.Box-padding-none { padding: 0; }
.Box-padding-small { padding: var(--sp); }
.Box-padding-normal { padding: var(--sp2); }
.Box-padding-large { padding: var(--sp3); }

/* Kind variants */
.Box-default {
    --Box-bg: var(--color-base-1);
    --Box-border-color: var(--color-base-4);
    --Box-shadow: var(--shadow-brutal-sm);
}

.Box-primary {
    --Box-bg: var(--color-primary-a10);
    --Box-border-color: var(--color-primary-2);
    --Box-shadow: var(--shadow-brutal-primary);
}

.Box-secondary {
    --Box-bg: var(--color-secondary-a10);
    --Box-border-color: var(--color-secondary-2);
    --Box-shadow: var(--shadow-brutal-secondary);
}

.Box-tertiary {
    --Box-bg: var(--color-tertiary-a10);
    --Box-border-color: var(--color-tertiary-2);
    --Box-shadow: var(--shadow-brutal-tertiary);
}

/* Modifiers */
.Box-border {
    border: 2px solid var(--Box-border-color);
}

.Box-shadow {
    box-shadow: var(--Box-shadow);
}

.Box-rounded {
    border-radius: var(--border-radius);
}
</style>
