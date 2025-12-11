<template>
    <Transition
        :name="'fade-' + dir"
        appear>
        <div
            class="PopupBubble"
            :class="[
                `PopupBubble-${dir}`,
                `PopupBubble-${align}`,
            ]">
            <div
                v-if="arrowShown"
                class="Arrow" />
            <div class="Body">
                <slot />
            </div>
        </div>
    </Transition>
</template>

<script>
export default {

    props: {
        dir: {
            type: String,
            default: 'bottom',
            validator: function (value) {
                return ['top', 'bottom', 'left', 'right'].includes(value);
            },
        },
        align: {
            type: String,
            default: 'start',
            validator: function (value) {
                return ['start', 'center', 'end'].includes(value);
            },
        },
        arrowShown: {
            type: Boolean,
            default: true,
        },
    },

};
</script>

<style>
:root {
    --PopupBubble-color: var(--color-base-0);
    --PopupBubble-border: var(--color-base-4);
    --PopupBubble-arrow-size: 10px;
    --PopupBubble-arrow-offset: 16px;
    --PopupBubble-shadow: var(--shadow-brutal-sm);
}
</style>

<style scoped>
.PopupBubble {
    position: absolute;
    z-index: 10;
    filter: drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2));
}

.Body {
    position: absolute;
    min-width: 48px;
    min-height: 16px;
    border-radius: var(--border-radius);
    background: var(--PopupBubble-color);
    border: 2px solid var(--PopupBubble-border);
    box-shadow: var(--PopupBubble-shadow);
}

.Arrow {
    position: absolute;
    z-index: 5;
    width: 0;
    height: 0;
    border: var(--PopupBubble-arrow-size) solid transparent;
    transform: translate(-50%, -50%);
}

/* Directions */

.PopupBubble-top > .Body {
    margin-bottom: var(--PopupBubble-arrow-size);
    bottom: 0;
}

.PopupBubble-bottom > .Body {
    margin-top: var(--PopupBubble-arrow-size);
    top: 0;
}

.PopupBubble-left > .Body {
    margin-right: var(--PopupBubble-arrow-size);
    right: 0;
}

.PopupBubble-right > .Body {
    margin-left: var(--PopupBubble-arrow-size);
    left: 0;
}

/* Alignments */

.PopupBubble-start.PopupBubble-top > .Body,
.PopupBubble-start.PopupBubble-bottom > .Body {
    left: 0;
    transform: translateX(calc(-1 * var(--PopupBubble-arrow-offset)));
}

.PopupBubble-center.PopupBubble-top > .Body,
.PopupBubble-center.PopupBubble-bottom > .Body {
    transform: translateX(-50%);
}

.PopupBubble-end.PopupBubble-top > .Body,
.PopupBubble-end.PopupBubble-bottom > .Body {
    right: 0;
    transform: translateX(var(--PopupBubble-arrow-offset));
}

.PopupBubble-start.PopupBubble-left > .Body,
.PopupBubble-start.PopupBubble-right > .Body {
    top: 0;
    transform: translateY(calc(-1 * var(--PopupBubble-arrow-offset)));
}

.PopupBubble-center.PopupBubble-left > .Body,
.PopupBubble-center.PopupBubble-right > .Body {
    transform: translateY(-50%);
}

.PopupBubble-end.PopupBubble-left > .Body,
.PopupBubble-end.PopupBubble-right > .Body {
    bottom: 0;
    transform: translateY(var(--PopupBubble-arrow-offset));
}

/* Arrows */

.PopupBubble-top > .Arrow {
    border-top-color: var(--PopupBubble-color);
}

.PopupBubble-bottom > .Arrow {
    border-bottom-color: var(--PopupBubble-color);
}

.PopupBubble-left > .Arrow {
    border-left-color: var(--PopupBubble-color);
}

.PopupBubble-right > .Arrow {
    border-right-color: var(--PopupBubble-color);
}

/* Transitions */

.fade-top-enter-active,
.fade-top-leave-active,
.fade-bottom-enter-active,
.fade-bottom-leave-active,
.fade-left-enter-active,
.fade-left-leave-active,
.fade-right-enter-active,
.fade-right-leave-active {
    transition: opacity 0.15s ease, transform 0.15s ease;
}

.fade-top-enter-from,
.fade-top-leave-to {
    opacity: 0;
    transform: translateY(8px);
}

.fade-bottom-enter-from,
.fade-bottom-leave-to {
    opacity: 0;
    transform: translateY(-8px);
}

.fade-left-enter-from,
.fade-left-leave-to {
    opacity: 0;
    transform: translateX(8px);
}

.fade-right-enter-from,
.fade-right-leave-to {
    opacity: 0;
    transform: translateX(-8px);
}

@media (prefers-reduced-motion: reduce) {
    .fade-top-enter-active,
    .fade-top-leave-active,
    .fade-bottom-enter-active,
    .fade-bottom-leave-active,
    .fade-left-enter-active,
    .fade-left-leave-active,
    .fade-right-enter-active,
    .fade-right-leave-active {
        transition: none;
    }
}
</style>
