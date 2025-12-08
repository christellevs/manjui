<template>
    <div
        class="Notification"
        :class="[
            `Notification-${kind}`,
            { 'Notification-dismissible': dismissible }
        ]">
        <div class="NotificationIcon">
            <i :class="iconClass" />
        </div>
        <div class="NotificationContent">
            <div
                v-if="title"
                class="NotificationTitle">
                {{ title }}
            </div>
            <div
                v-if="message"
                class="NotificationMessage">
                {{ message }}
            </div>
        </div>
        <button
            v-if="dismissible"
            type="button"
            class="NotificationDismiss"
            @click="onDismiss">
            <i class="fa-solid fa-xmark" />
        </button>
        <div
            v-if="duration > 0"
            class="NotificationProgress"
            :style="progressStyle" />
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
        message: {
            type: String,
            default: ''
        },
        duration: {
            type: Number,
            default: 5000
        },
        dismissible: {
            type: Boolean,
            default: true
        }
    },

    emits: ['dismiss'],

    data() {
        return {
            timeoutId: null
        };
    },

    computed: {
        iconClass() {
            const icons = {
                info: 'fa-solid fa-circle-info',
                success: 'fa-solid fa-circle-check',
                warning: 'fa-solid fa-triangle-exclamation',
                error: 'fa-solid fa-circle-exclamation'
            };
            return icons[this.kind];
        },

        progressStyle() {
            if (this.duration <= 0) {
                return { display: 'none' };
            }
            return {
                animationDuration: this.duration + 'ms'
            };
        }
    },

    mounted() {
        if (this.duration > 0) {
            this.timeoutId = setTimeout(this.onDismiss, this.duration);
        }
    },

    unmounted() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    },

    methods: {
        onDismiss() {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
                this.timeoutId = null;
            }
            this.$emit('dismiss');
        }
    }

};
</script>

<style scoped>
.Notification {
    --Notification-bg: var(--surface-card);
    --Notification-border: var(--color-base-4);
    --Notification-text: var(--color-text-0);
    --Notification-icon: var(--color-text-1);
    --Notification-shadow: var(--shadow-brutal-sm);
    --Notification-accent: var(--color-primary-2);

    position: relative;
    display: flex;
    align-items: flex-start;
    gap: var(--sp1-5);
    padding: var(--sp2);
    min-width: 280px;
    max-width: 400px;

    background: var(--Notification-bg);
    border: 2px solid var(--Notification-border);
    border-radius: var(--border-radius);
    box-shadow: var(--Notification-shadow);
    overflow: hidden;

    animation: Notification-slideIn var(--duration-normal) var(--ease-spring);
}

.NotificationIcon {
    flex-shrink: 0;
    font-size: 18px;
    color: var(--Notification-icon);
    line-height: 1;
    padding-top: 2px;
}

.NotificationContent {
    flex: 1;
    min-width: 0;
}

.NotificationTitle {
    font-size: var(--font-size);
    font-weight: var(--font-weight-bold, 600);
    color: var(--Notification-text);
    line-height: 1.3;
}

.NotificationMessage {
    font-size: var(--font-size-small, 14px);
    color: var(--color-text-1);
    line-height: 1.5;
    margin-top: var(--sp0-5);
}

.NotificationDismiss {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
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

.NotificationDismiss:hover {
    color: var(--Notification-text);
    background: var(--color-black-a5);
}

.NotificationDismiss:focus-visible {
    outline: 2px solid var(--Notification-accent);
    outline-offset: 2px;
}

.NotificationProgress {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: var(--Notification-accent);
    transform-origin: left;
    animation: Notification-progress linear forwards;
}

@keyframes Notification-slideIn {
    from {
        opacity: 0;
        transform: translateX(100%);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes Notification-progress {
    from {
        transform: scaleX(1);
    }
    to {
        transform: scaleX(0);
    }
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.Notification-info {
    --Notification-border: var(--color-primary-1);
    --Notification-icon: var(--color-primary-2);
    --Notification-accent: var(--color-primary-2);
    --Notification-shadow: var(--shadow-brutal-primary);
}

.Notification-success {
    --Notification-border: var(--color-success-1);
    --Notification-icon: var(--color-success-2);
    --Notification-accent: var(--color-success-2);
    --Notification-shadow: var(--shadow-brutal-success);
}

.Notification-warning {
    --Notification-border: var(--color-warning-2);
    --Notification-icon: var(--color-warning-3);
    --Notification-accent: var(--color-warning-3);
    --Notification-shadow: var(--shadow-brutal-warning);
}

.Notification-error {
    --Notification-border: var(--color-danger-1);
    --Notification-icon: var(--color-danger-2);
    --Notification-accent: var(--color-danger-2);
    --Notification-shadow: var(--shadow-brutal-danger);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .Notification {
        animation: none;
    }
    .NotificationProgress {
        animation: none;
        transform: scaleX(0);
    }
    .NotificationDismiss {
        transition: none;
    }
}
</style>
