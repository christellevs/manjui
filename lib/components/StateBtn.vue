<template>
    <Btn
        class="StateBtn"
        :class="[
            {
                'StateBtn-loading': loading,
                'StateBtn-success': showSuccess,
                'StateBtn-error': showError,
            }
        ]"
        :label="currentLabel"
        :kind="currentKind"
        :size="size"
        :disabled="disabled || loading"
        :icon="icon"
        :iconPos="iconPos"
        :square="square"
        :round="round"
        :outline="outline"
        :block="block"
        v-bind="$attrs"
        @click="onClick">
        <template #icon="{ hover, blocked }">
            <Spinner
                v-if="loading"
                class="StateBtn-spinner"
                :size="spinnerSize" />
            <svg
                v-else-if="showSuccess"
                class="StateBtn-icon StateBtn-icon-success"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                    d="M3 8L6.5 11.5L13 4"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
            <svg
                v-else-if="showError"
                class="StateBtn-icon StateBtn-icon-error"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round" />
            </svg>
            <slot
                v-else
                name="icon"
                :hover="hover"
                :blocked="blocked">
                <i
                    v-if="icon"
                    :class="icon"
                    class="Icon" />
            </slot>
        </template>
        <slot v-if="!loading && !showSuccess && !showError" />
    </Btn>
</template>

<script>
import Btn from './Btn.vue';
import Spinner from './Spinner.vue';

export default {

    components: {
        Btn,
        Spinner,
    },

    props: {
        label: { type: String },
        kind: { type: String, default: 'default' },
        size: { type: String, default: 'normal' },
        disabled: { type: Boolean, default: false },
        icon: { type: String },
        iconPos: { type: String, default: 'left' },
        square: { type: Boolean, default: false },
        round: { type: Boolean, default: false },
        outline: { type: Boolean, default: false },
        block: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        success: { type: Boolean, default: false },
        error: { type: Boolean, default: false },
        loadingText: { type: String },
        successText: { type: String },
        errorText: { type: String },
        autoResetDelay: { type: Number, default: 2000 },
    },

    emits: ['click'],

    data() {
        return {
            showSuccess: false,
            showError: false,
            resetTimer: null,
        };
    },

    computed: {

        currentLabel() {
            if (this.loading && this.loadingText) {
                return this.loadingText;
            }
            if (this.showSuccess && this.successText) {
                return this.successText;
            }
            if (this.showError && this.errorText) {
                return this.errorText;
            }
            return this.label;
        },

        currentKind() {
            if (this.showSuccess) {
                return 'success';
            }
            if (this.showError) {
                return 'danger';
            }
            return this.kind;
        },

        spinnerSize() {
            if (this.size === 'small') {
                return 'small';
            }
            return 'small';
        },

    },

    watch: {

        success: {
            handler: function (newVal) {
                if (newVal) {
                    this.triggerSuccess();
                }
            },
            immediate: true,
        },

        error: {
            handler: function (newVal) {
                if (newVal) {
                    this.triggerError();
                }
            },
            immediate: true,
        },

    },

    unmounted() {
        if (this.resetTimer) {
            clearTimeout(this.resetTimer);
        }
    },

    methods: {

        onClick(event) {
            if (this.loading || this.showSuccess || this.showError) {
                return;
            }
            this.$emit('click', event);
        },

        triggerSuccess() {
            this.clearResetTimer();
            this.showError = false;
            this.showSuccess = true;
            this.scheduleReset();
        },

        triggerError() {
            this.clearResetTimer();
            this.showSuccess = false;
            this.showError = true;
            this.scheduleReset();
        },

        scheduleReset() {
            if (this.autoResetDelay > 0) {
                this.resetTimer = setTimeout(function () {
                    this.showSuccess = false;
                    this.showError = false;
                }.bind(this), this.autoResetDelay);
            }
        },

        clearResetTimer() {
            if (this.resetTimer) {
                clearTimeout(this.resetTimer);
                this.resetTimer = null;
            }
        },

        reset() {
            this.clearResetTimer();
            this.showSuccess = false;
            this.showError = false;
        },

    }

};
</script>

<style scoped>
.StateBtn {
    position: relative;
}

.StateBtn-spinner {
    --Spinner-size: 18px;
}

.StateBtn :deep(.Btn-small) .StateBtn-spinner {
    --Spinner-size: 14px;
}

.StateBtn :deep(.Btn-large) .StateBtn-spinner {
    --Spinner-size: 22px;
}

.StateBtn-icon {
    width: 16px;
    height: 16px;
}

.StateBtn-icon-success {
    animation: stateBtn-checkmark 0.3s var(--ease-spring, cubic-bezier(0.34, 1.56, 0.64, 1));
}

.StateBtn-icon-error {
    animation: stateBtn-shake 0.4s var(--ease-out, ease);
}

@keyframes stateBtn-checkmark {
    0% {
        transform: scale(0);
        opacity: 0;
    }
    50% {
        transform: scale(1.2);
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes stateBtn-shake {
    0%, 100% {
        transform: translateX(0);
    }
    20% {
        transform: translateX(-2px);
    }
    40% {
        transform: translateX(2px);
    }
    60% {
        transform: translateX(-2px);
    }
    80% {
        transform: translateX(2px);
    }
}

/* Loading state styling */
.StateBtn-loading {
    cursor: wait;
}

/* Success state - enhance the success kind */
.StateBtn-success :deep(.Btn) {
    --Btn-bg-color: var(--color-success-2);
    --Btn-border-color: var(--color-success-3);
}

/* Error state - enhance the danger kind */
.StateBtn-error :deep(.Btn) {
    --Btn-bg-color: var(--color-danger-2);
    --Btn-border-color: var(--color-danger-3);
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
    .StateBtn-icon-success,
    .StateBtn-icon-error {
        animation: none;
    }
}
</style>
