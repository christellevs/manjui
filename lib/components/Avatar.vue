<template>
    <img
        v-if="src"
        class="Avatar"
        :class="[
            `Avatar-${size}`,
            `Avatar-${shape}`,
            `Avatar-${kind}`,
            { 'Avatar-hoverable': hoverable }
        ]"
        :src="src"
        :alt="alt"
        :title="alt" />
    <div
        v-else
        class="Avatar Avatar-stub"
        :class="[
            `Avatar-${size}`,
            `Avatar-${shape}`,
            `Avatar-${kind}`,
            { 'Avatar-hoverable': hoverable }
        ]"
        :title="alt">
        <slot>
            <span v-if="initials">{{ initials }}</span>
            <i
                v-else
                :class="icon" />
        </slot>
    </div>
</template>

<script>
export default {

    props: {
        src: { type: String, default: '' },
        alt: { type: String, default: '' },
        name: { type: String, default: '' },
        icon: { type: String, default: 'fas fa-user' },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        shape: {
            type: String,
            default: 'circle',
            validator: function (value) {
                return ['circle', 'square', 'rounded'].includes(value);
            }
        },
        kind: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'].includes(value);
            }
        },
        hoverable: { type: Boolean, default: false },
    },

    computed: {

        initials() {
            if (!this.name) {
                return '';
            }
            return this.name
                .split(/\b/)
                .map(function (word) { return word.trim()[0]; })
                .filter(Boolean)
                .slice(0, 2)
                .join('')
                .toUpperCase();
        },

    },

};
</script>

<style scoped>
.Avatar {
    /* Component-level variables */
    --Avatar-size: 40px;
    --Avatar-font-size: var(--font-size);
    --Avatar-bg: var(--color-base-2);
    --Avatar-color: var(--color-text-1);
    --Avatar-border-color: var(--color-base-4);
    --Avatar-shadow: var(--shadow-brutal-sm);

    /* Neo-brutal transition */
    --Avatar-ease: var(--ease-out, cubic-bezier(0, 0, 0.2, 1));
    --Avatar-duration: var(--duration-fast, 120ms);

    position: relative;
    width: var(--Avatar-size);
    height: var(--Avatar-size);
    flex-shrink: 0;
    object-fit: cover;
    box-sizing: border-box;

    /* Neo-brutal: visible border */
    border: 2px solid var(--Avatar-border-color);

    /* Neo-brutal: offset shadow */
    box-shadow: var(--Avatar-shadow);

    transition:
        box-shadow var(--Avatar-duration) var(--Avatar-ease),
        transform var(--Avatar-duration) var(--Avatar-ease);
}

/* Sizes */
.Avatar-small {
    --Avatar-size: 28px;
    --Avatar-font-size: var(--font-size-small);
}

.Avatar-normal {
    --Avatar-size: 40px;
    --Avatar-font-size: var(--font-size);
}

.Avatar-large {
    --Avatar-size: 56px;
    --Avatar-font-size: var(--font-size-large);
}

/* Shapes */
.Avatar-circle {
    border-radius: 50%;
}

.Avatar-square {
    border-radius: 0;
}

.Avatar-rounded {
    border-radius: var(--border-radius);
}

/* Kinds */
.Avatar-default {
    --Avatar-bg: var(--color-base-1);
    --Avatar-color: var(--color-text-0);
    --Avatar-border-color: var(--color-primary-2);
    --Avatar-shadow: var(--shadow-brutal-primary);
    --Avatar-shadow-hover: var(--shadow-hover-primary);
}

.Avatar-primary {
    --Avatar-bg: var(--color-primary-2);
    --Avatar-color: var(--color-primary-text);
    --Avatar-border-color: var(--color-primary-3);
    --Avatar-shadow: var(--shadow-brutal-primary);
    --Avatar-shadow-hover: var(--shadow-hover-primary);
}

.Avatar-secondary {
    --Avatar-bg: var(--color-secondary-2);
    --Avatar-color: var(--color-secondary-text);
    --Avatar-border-color: var(--color-secondary-3);
    --Avatar-shadow: var(--shadow-brutal-secondary);
    --Avatar-shadow-hover: var(--shadow-hover-secondary);
}

.Avatar-tertiary {
    --Avatar-bg: var(--color-tertiary-2);
    --Avatar-color: var(--color-tertiary-text);
    --Avatar-border-color: var(--color-tertiary-3);
    --Avatar-shadow: var(--shadow-brutal-tertiary);
    --Avatar-shadow-hover: var(--shadow-hover-tertiary);
}

.Avatar-success {
    --Avatar-bg: var(--color-success-2);
    --Avatar-color: var(--color-success-text);
    --Avatar-border-color: var(--color-success-3);
    --Avatar-shadow: var(--shadow-brutal-success);
    --Avatar-shadow-hover: var(--shadow-hover-success);
}

.Avatar-warning {
    --Avatar-bg: var(--color-warning-3);
    --Avatar-color: var(--color-warning-text);
    --Avatar-border-color: var(--color-warning-4);
    --Avatar-shadow: var(--shadow-brutal-warning);
    --Avatar-shadow-hover: var(--shadow-hover-warning);
}

.Avatar-danger {
    --Avatar-bg: var(--color-danger-2);
    --Avatar-color: var(--color-danger-text);
    --Avatar-border-color: var(--color-danger-3);
    --Avatar-shadow: var(--shadow-brutal-danger);
    --Avatar-shadow-hover: var(--shadow-hover-danger);
}

/* Stub (fallback) */
.Avatar-stub {
    background: var(--Avatar-bg);
    color: var(--Avatar-color);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: var(--Avatar-font-size);
    font-weight: var(--font-weight-bold);
}

/* Hoverable - Neo-brutal lift effect */
.Avatar-hoverable {
    cursor: pointer;
}

.Avatar-hoverable:hover {
    transform: translate(-2px, -2px);
    box-shadow: var(--Avatar-shadow-hover);
}

.Avatar-hoverable:active {
    transform: translate(1px, 1px);
    box-shadow: var(--shadow-pressed);
}
</style>
