<template>
    <Teleport to="body">
        <div
            class="Notifications"
            :class="[`Notifications-${position}`]">
            <TransitionGroup name="Notifications">
                <Notification
                    v-for="notification in notifications"
                    :key="notification.id"
                    :kind="notification.kind"
                    :title="notification.title"
                    :message="notification.message"
                    :duration="notification.duration"
                    :dismissible="notification.dismissible"
                    @dismiss="removeNotification(notification.id)" />
            </TransitionGroup>
        </div>
    </Teleport>
</template>

<script>
import Notification from './Notification.vue';

let notificationId = 0;

export default {

    components: {
        Notification
    },

    props: {
        position: {
            type: String,
            default: 'top-right',
            validator: function(value) {
                return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value);
            }
        }
    },

    data() {
        return {
            notifications: []
        };
    },

    methods: {
        add(options) {
            const notification = {
                id: ++notificationId,
                kind: options.kind || 'info',
                title: options.title || '',
                message: options.message || '',
                duration: options.duration !== undefined ? options.duration : 5000,
                dismissible: options.dismissible !== undefined ? options.dismissible : true
            };
            this.notifications.push(notification);
            return notification.id;
        },

        info(title, message, options) {
            return this.add({ kind: 'info', title: title, message: message, ...options });
        },

        success(title, message, options) {
            return this.add({ kind: 'success', title: title, message: message, ...options });
        },

        warning(title, message, options) {
            return this.add({ kind: 'warning', title: title, message: message, ...options });
        },

        error(title, message, options) {
            return this.add({ kind: 'error', title: title, message: message, ...options });
        },

        removeNotification(id) {
            const index = this.notifications.findIndex(function(n) {
                return n.id === id;
            });
            if (index !== -1) {
                this.notifications.splice(index, 1);
            }
        },

        clear() {
            this.notifications = [];
        }
    }

};
</script>

<style scoped>
.Notifications {
    position: fixed;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: var(--sp);
    padding: var(--sp2);
    pointer-events: none;
}

.Notifications > * {
    pointer-events: auto;
}

/* ===========================================
   POSITION VARIANTS
   =========================================== */

.Notifications-top-right {
    top: 0;
    right: 0;
    align-items: flex-end;
}

.Notifications-top-left {
    top: 0;
    left: 0;
    align-items: flex-start;
}

.Notifications-bottom-right {
    bottom: 0;
    right: 0;
    align-items: flex-end;
    flex-direction: column-reverse;
}

.Notifications-bottom-left {
    bottom: 0;
    left: 0;
    align-items: flex-start;
    flex-direction: column-reverse;
}

/* ===========================================
   TRANSITION CLASSES
   =========================================== */

.Notifications-enter-active,
.Notifications-leave-active {
    transition:
        opacity var(--duration-normal) var(--ease-standard),
        transform var(--duration-normal) var(--ease-spring);
}

.Notifications-enter-from {
    opacity: 0;
    transform: translateX(100%);
}

.Notifications-top-left .Notifications-enter-from,
.Notifications-bottom-left .Notifications-enter-from {
    transform: translateX(-100%);
}

.Notifications-leave-to {
    opacity: 0;
    transform: translateX(100%);
}

.Notifications-top-left .Notifications-leave-to,
.Notifications-bottom-left .Notifications-leave-to {
    transform: translateX(-100%);
}

.Notifications-move {
    transition: transform var(--duration-normal) var(--ease-spring);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .Notifications-enter-active,
    .Notifications-leave-active,
    .Notifications-move {
        transition: none;
    }
    .Notifications-enter-from,
    .Notifications-leave-to {
        opacity: 0;
        transform: none;
    }
}
</style>
