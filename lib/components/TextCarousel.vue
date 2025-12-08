<template>
    <div
        class="TextCarousel"
        :class="{
            'TextCarousel-paused': isPaused,
        }"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave">
        <div
            class="TextCarouselContainer"
            :class="[`TextCarouselContainer-${direction}`]">
            <Transition
                :name="transitionName"
                mode="out-in">
                <span
                    :key="currentIndex"
                    class="TextCarouselItem">
                    {{ currentText }}
                </span>
            </Transition>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        items: {
            type: Array,
            required: true,
            validator: function (value) {
                return value.length > 0;
            },
        },
        interval: {
            type: Number,
            default: 3000,
        },
        direction: {
            type: String,
            default: 'up',
            validator: function (value) {
                return ['up', 'down'].includes(value);
            },
        },
        pause: {
            type: Boolean,
            default: false,
        },
        pauseOnHover: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            currentIndex: 0,
            intervalId: null,
            isHovering: false,
        };
    },

    computed: {

        currentText() {
            return this.items[this.currentIndex] || '';
        },

        isPaused() {
            return this.pause || (this.pauseOnHover && this.isHovering);
        },

        transitionName() {
            return 'textCarousel-' + this.direction;
        },

    },

    watch: {

        pause: function () {
            this.handlePauseChange();
        },

        interval: function () {
            this.restartInterval();
        },

        items: function () {
            if (this.currentIndex >= this.items.length) {
                this.currentIndex = 0;
            }
        },

    },

    mounted() {
        this.startInterval();
    },

    unmounted() {
        this.stopInterval();
    },

    methods: {

        startInterval() {
            if (this.items.length <= 1) {
                return;
            }

            if (this.intervalId) {
                return;
            }

            this.intervalId = setInterval(this.next.bind(this), this.interval);
        },

        stopInterval() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        restartInterval() {
            this.stopInterval();
            if (!this.isPaused) {
                this.startInterval();
            }
        },

        handlePauseChange() {
            if (this.isPaused) {
                this.stopInterval();
            } else {
                this.startInterval();
            }
        },

        next() {
            if (this.isPaused) {
                return;
            }

            if (this.direction === 'up') {
                this.currentIndex = (this.currentIndex + 1) % this.items.length;
            } else {
                this.currentIndex = this.currentIndex === 0 ? this.items.length - 1 : this.currentIndex - 1;
            }
        },

        onMouseEnter() {
            this.isHovering = true;
            if (this.pauseOnHover) {
                this.stopInterval();
            }
        },

        onMouseLeave() {
            this.isHovering = false;
            if (this.pauseOnHover && !this.pause) {
                this.startInterval();
            }
        },

    },

};
</script>

<style scoped>
.TextCarousel {
    --TextCarousel-duration: 0.4s;

    display: inline-block;
    position: relative;
    overflow: hidden;
}

.TextCarouselContainer {
    display: flex;
    align-items: center;
    justify-content: center;
}

.TextCarouselItem {
    display: block;
}

/* Up direction transitions */
.textCarousel-up-enter-active,
.textCarousel-up-leave-active {
    transition: all var(--TextCarousel-duration) ease;
}

.textCarousel-up-enter-from {
    opacity: 0;
    transform: translateY(100%);
}

.textCarousel-up-leave-to {
    opacity: 0;
    transform: translateY(-100%);
}

/* Down direction transitions */
.textCarousel-down-enter-active,
.textCarousel-down-leave-active {
    transition: all var(--TextCarousel-duration) ease;
}

.textCarousel-down-enter-from {
    opacity: 0;
    transform: translateY(-100%);
}

.textCarousel-down-leave-to {
    opacity: 0;
    transform: translateY(100%);
}

.TextCarousel-paused .TextCarouselItem {
    animation-play-state: paused;
}

@media (prefers-reduced-motion: reduce) {
    .textCarousel-up-enter-active,
    .textCarousel-up-leave-active,
    .textCarousel-down-enter-active,
    .textCarousel-down-leave-active {
        transition: opacity 0.2s ease;
    }

    .textCarousel-up-enter-from,
    .textCarousel-up-leave-to,
    .textCarousel-down-enter-from,
    .textCarousel-down-leave-to {
        transform: none;
    }
}
</style>
