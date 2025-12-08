<template>
    <div
        class="Callout"
        :class="[
            `Callout-${kind}`,
            { 'Callout-dismissible': dismissible }
        ]">
        <div
            v-if="icon || defaultIcon"
            class="CalloutIcon">
            <i :class="icon || defaultIcon" />
        </div>
        <div class="CalloutContent">
            <div
                v-if="title"
                class="CalloutTitle">
                {{ title }}
            </div>
            <div class="CalloutBody">
                <slot />
            </div>
        </div>
        <button
            v-if="dismissible"
            type="button"
            class="CalloutDismiss"
            @click="onDismiss">
            <i class="fa-solid fa-xmark" />
        </button>
    </div>
</template>

<script>
export default {

    props: {
        kind: {
            type: String,
            default: 'info',
            validator: function(value) {
                return ['info', 'success', 'warning', 'error'].includes(value);
            }
        },
        title: {
            type: String,
            default: ''
        },
        icon: {
            type: String,
            default: ''
        },
        dismissible: {
            type: Boolean,
            default: false
        }
    },

    emits: ['dismiss'],

    computed: {
        defaultIcon() {
            const icons = {
                info: 'fa-solid fa-circle-info',
                success: 'fa-solid fa-circle-check',
                warning: 'fa-solid fa-triangle-exclamation',
                error: 'fa-solid fa-circle-exclamation'
            };
            return icons[this.kind];
        }
    },

    methods: {
        onDismiss() {
            this.$emit('dismiss');
        }
    }

};
</script>

<style scoped>
.Callout {
    --Callout-bg: var(--color-base-0);
    --Callout-border: var(--color-base-3);
    --Callout-text: var(--color-text-0);
    --Callout-icon: var(--color-text-1);
    --Callout-accent: var(--color-base-4);

    display: flex;
    align-items: flex-start;
    gap: var(--sp1-5);
    padding: var(--sp2);

    background: var(--Callout-bg);
    border: 1px solid var(--Callout-border);
    border-left: 4px solid var(--Callout-accent);
    border-radius: var(--border-radius);
}

.CalloutIcon {
    flex-shrink: 0;
    font-size: 18px;
    color: var(--Callout-icon);
    line-height: 1;
    padding-top: 2px;
}

.CalloutContent {
    flex: 1;
    min-width: 0;
}

.CalloutTitle {
    font-size: var(--font-size);
    font-weight: var(--font-weight-bold, 600);
    color: var(--Callout-text);
    line-height: 1.3;
    margin-bottom: var(--sp0-5);
}

.CalloutBody {
    font-size: var(--font-size);
    color: var(--color-text-1);
    line-height: 1.5;
}

.CalloutDismiss {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    padding: 0;
    margin: calc(var(--sp0-5) * -1);

    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    color: var(--color-text-2);
    cursor: pointer;

    transition:
        color var(--duration-fast) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out);
}

.CalloutDismiss:hover {
    color: var(--color-text-0);
    background: var(--color-base-2);
}

.CalloutDismiss:focus-visible {
    outline: 2px solid var(--Callout-accent);
    outline-offset: 2px;
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.Callout-info {
    --Callout-accent: var(--color-primary-2);
    --Callout-icon: var(--color-primary-2);
}

.Callout-success {
    --Callout-accent: var(--color-success-2);
    --Callout-icon: var(--color-success-2);
}

.Callout-warning {
    --Callout-accent: var(--color-warning-3);
    --Callout-icon: var(--color-warning-3);
}

.Callout-error {
    --Callout-accent: var(--color-danger-2);
    --Callout-icon: var(--color-danger-2);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .CalloutDismiss {
        transition: none;
    }
}
</style>
