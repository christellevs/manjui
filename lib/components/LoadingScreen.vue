<template>
    <Transition name="LoadingScreen-fade">
        <div
            v-if="visible"
            class="LoadingScreen">
            <div class="LoadingScreenContent">
                <Spinner
                    size="large"
                    kind="primary" />
                <div
                    v-if="message"
                    class="LoadingScreenMessage">
                    {{ message }}
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import Spinner from './Spinner.vue';

export default {

    components: {
        Spinner
    },

    props: {
        visible: {
            type: Boolean,
            default: true
        },
        message: {
            type: String,
            default: ''
        }
    }

};
</script>

<style scoped>
.LoadingScreen {
    position: fixed;
    inset: 0;
    z-index: 9999;

    display: flex;
    align-items: center;
    justify-content: center;

    background: var(--color-black-a40);
    backdrop-filter: blur(4px);
}

.LoadingScreenContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--sp2);
    padding: var(--sp4);

    background: var(--surface-card);
    border: 2px solid var(--color-base-4);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-brutal-md);

    opacity: 0;
    animation: LoadingScreen-fadeIn var(--duration-slow) var(--ease-out) forwards;
    animation-delay: var(--duration-fast);
}

.LoadingScreenMessage {
    font-size: var(--font-size);
    font-weight: var(--font-weight-medium, 500);
    color: var(--color-text-1);
    text-align: center;
    max-width: 280px;
}

@keyframes LoadingScreen-fadeIn {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* ===========================================
   TRANSITION CLASSES
   =========================================== */

.LoadingScreen-fade-enter-active,
.LoadingScreen-fade-leave-active {
    transition: opacity var(--duration-normal) var(--ease-standard);
}

.LoadingScreen-fade-enter-from,
.LoadingScreen-fade-leave-to {
    opacity: 0;
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .LoadingScreenContent {
        animation: none;
        opacity: 1;
    }
}
</style>
