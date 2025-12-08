<template>
    <div
        class="ErrorMessage"
        :class="{ 'ErrorMessage-dismissible': dismissible }">
        <div
            v-if="icon"
            class="ErrorMessageIcon">
            <i :class="icon" />
        </div>
        <div
            v-else
            class="ErrorMessageIcon">
            <i class="fa-solid fa-circle-exclamation" />
        </div>
        <div class="ErrorMessageContent">
            <div
                v-if="title"
                class="ErrorMessageTitle">
                {{ title }}
            </div>
            <div
                v-if="message"
                class="ErrorMessageText">
                {{ message }}
            </div>
        </div>
        <button
            v-if="dismissible"
            type="button"
            class="ErrorMessageDismiss"
            @click="onDismiss">
            <i class="fa-solid fa-xmark" />
        </button>
    </div>
</template>

<script>
export default {

    props: {
        title: {
            type: String,
            default: ''
        },
        message: {
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

    methods: {
        onDismiss() {
            this.$emit('dismiss');
        }
    }

};
</script>

<style scoped>
.ErrorMessage {
    --ErrorMessage-bg: var(--color-danger-0);
    --ErrorMessage-border: var(--color-danger-2);
    --ErrorMessage-text: var(--color-danger-4);
    --ErrorMessage-icon: var(--color-danger-2);
    --ErrorMessage-shadow: var(--shadow-brutal-danger);

    display: flex;
    align-items: flex-start;
    gap: var(--sp1-5);
    padding: var(--sp2);

    background: var(--ErrorMessage-bg);
    border: 2px solid var(--ErrorMessage-border);
    border-radius: var(--border-radius);
    box-shadow: var(--ErrorMessage-shadow);
}

.ErrorMessageIcon {
    flex-shrink: 0;
    font-size: 20px;
    color: var(--ErrorMessage-icon);
    line-height: 1;
    padding-top: 2px;
}

.ErrorMessageContent {
    flex: 1;
    min-width: 0;
}

.ErrorMessageTitle {
    font-size: var(--font-size);
    font-weight: var(--font-weight-bold, 600);
    color: var(--ErrorMessage-text);
    line-height: 1.3;
    margin-bottom: var(--sp0-5);
}

.ErrorMessageText {
    font-size: var(--font-size-small, 14px);
    color: var(--ErrorMessage-text);
    line-height: 1.5;
    opacity: 0.9;
}

.ErrorMessageDismiss {
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
    color: var(--ErrorMessage-text);
    cursor: pointer;
    opacity: 0.7;

    transition:
        opacity var(--duration-fast) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out);
}

.ErrorMessageDismiss:hover {
    opacity: 1;
    background: var(--color-danger-1);
}

.ErrorMessageDismiss:focus-visible {
    outline: 2px solid var(--ErrorMessage-border);
    outline-offset: 2px;
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .ErrorMessageDismiss {
        transition: none;
    }
}
</style>
