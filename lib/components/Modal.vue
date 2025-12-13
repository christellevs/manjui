<template>
    <teleport to="body">
        <div
            v-if="modelValue"
            class="ModalOverlay"
            @click="onOverlayClick">
            <div
                class="ModalBody"
                :class="[
                    `ModalBody-${size}`
                ]"
                @click.stop="">
                <div
                    v-if="hasHeader"
                    class="ModalHeader">
                    <slot name="header">
                        <div class="ModalTitle">
                            {{ title }}
                        </div>
                    </slot>
                    <Btn
                        v-if="closable"
                        class="ModalCloseBtn"
                        icon="fas fa-times"
                        square
                        round
                        @uiactivate="close" />
                </div>
                <div class="ModalContent">
                    <slot />
                </div>
                <div
                    v-if="$slots.footer"
                    class="ModalFooter">
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </teleport>
</template>

<script>
export default {

    inject: ['ui'],

    props: {
        modelValue: { type: Boolean, default: false },
        title: { type: String, default: '' },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        closable: { type: Boolean, default: true },
        closeOnOverlay: { type: Boolean, default: true },
        closeOnEscape: { type: Boolean, default: true },
    },

    emits: ['update:modelValue', 'close'],

    computed: {

        hasHeader() {
            return this.title || this.$slots.header || this.closable;
        },

    },

    watch: {

        modelValue(val) {
            if (val) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },

    },

    mounted() {
        this.ui.escapePressed.on(this.onEscape, this);
    },

    unmounted() {
        this.ui.escapePressed.removeAll(this);
        document.body.style.overflow = '';
    },

    methods: {

        close() {
            this.$emit('update:modelValue', false);
            this.$emit('close');
        },

        onOverlayClick() {
            if (this.closeOnOverlay) {
                this.close();
            }
        },

        onEscape() {
            if (this.modelValue && this.closeOnEscape) {
                this.close();
            }
        },

    },

};
</script>

<style scoped>
.ModalOverlay {
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    padding: 10vh var(--sp2);

    overscroll-behavior: none;
    background: rgba(0, 0, 0, 0.4);

    display: flex;
    align-items: flex-start;
    justify-content: center;

    animation: modalFadeIn var(--duration-fast) var(--ease-out);
}

@keyframes modalFadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.ModalBody {
    position: relative;
    max-height: 80vh;
    box-sizing: border-box;
    overflow-y: auto;

    background: var(--color-base-0);
    border: 2px solid var(--color-base-4);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-brutal-md);

    animation: modalSlideIn var(--duration-normal) var(--ease-out);
}

@keyframes modalSlideIn {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.ModalBody-small {
    width: 100%;
    max-width: 400px;
}

.ModalBody-normal {
    width: 100%;
    max-width: 560px;
}

.ModalBody-large {
    width: 100%;
    max-width: 800px;
}

.ModalHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp2);
    padding: var(--sp1-5) var(--sp2);
    border-bottom: 2px solid var(--color-base-2);
}

.ModalTitle {
    font-size: var(--font-size);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-0);
}

.ModalCloseBtn {
    flex-shrink: 0;
}

.ModalContent {
    padding: var(--sp2);
}

.ModalFooter {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sp);
    padding: var(--sp1-5) var(--sp2);
    border-top: 2px solid var(--color-base-2);
    background: var(--color-base-1);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .ModalOverlay,
    .ModalBody {
        animation: none;
    }
}
</style>
