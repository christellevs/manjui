<template>
    <div
        ref="trigger"
        class="ContextHelp"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
        @click="onClick">
        <slot>
            <i class="fa-regular fa-circle-question ContextHelpIcon" />
        </slot>
        <Teleport to="body">
            <div
                v-if="isVisible"
                ref="tooltip"
                class="ContextHelpTooltip"
                :class="[
                    `ContextHelpTooltip-${actualPosition}`,
                ]"
                :style="tooltipStyle">
                <div class="ContextHelpArrow" />
                <div class="ContextHelpContent">
                    <slot name="content">
                        {{ text }}
                    </slot>
                </div>
            </div>
        </Teleport>
    </div>
</template>

<script>
export default {

    props: {
        text: {
            type: String,
            default: '',
        },
        position: {
            type: String,
            default: 'top',
            validator: function (value) {
                return ['top', 'bottom', 'left', 'right'].includes(value);
            },
        },
        trigger: {
            type: String,
            default: 'hover',
            validator: function (value) {
                return ['hover', 'click'].includes(value);
            },
        },
        maxWidth: {
            type: [String, Number],
            default: 280,
        },
    },

    data() {
        return {
            isVisible: false,
            tooltipX: 0,
            tooltipY: 0,
            actualPosition: this.position,
            hoverTimeout: null,
        };
    },

    computed: {

        tooltipStyle() {
            const styles = {
                left: this.tooltipX + 'px',
                top: this.tooltipY + 'px',
            };

            if (typeof this.maxWidth === 'number') {
                styles.maxWidth = this.maxWidth + 'px';
            } else {
                styles.maxWidth = this.maxWidth;
            }

            return styles;
        },

    },

    mounted() {
        this.handleClickOutside = this.onClickOutside.bind(this);
        document.addEventListener('click', this.handleClickOutside);
    },

    unmounted() {
        document.removeEventListener('click', this.handleClickOutside);
        if (this.hoverTimeout) {
            clearTimeout(this.hoverTimeout);
        }
    },

    methods: {

        onMouseEnter() {
            if (this.trigger !== 'hover') {
                return;
            }

            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
            }

            this.hoverTimeout = setTimeout(this.show.bind(this), 200);
        },

        onMouseLeave() {
            if (this.trigger !== 'hover') {
                return;
            }

            if (this.hoverTimeout) {
                clearTimeout(this.hoverTimeout);
                this.hoverTimeout = null;
            }

            this.hide();
        },

        onClick(event) {
            if (this.trigger !== 'click') {
                return;
            }

            event.stopPropagation();

            if (this.isVisible) {
                this.hide();
            } else {
                this.show();
            }
        },

        onClickOutside(event) {
            if (!this.isVisible || this.trigger !== 'click') {
                return;
            }

            const tooltip = this.$refs.tooltip;
            const trigger = this.$refs.trigger;

            if (tooltip && tooltip.contains(event.target)) {
                return;
            }

            if (trigger && trigger.contains(event.target)) {
                return;
            }

            this.hide();
        },

        show() {
            this.isVisible = true;
            this.$nextTick(function () {
                this.calculatePosition();
            });
        },

        hide() {
            this.isVisible = false;
        },

        calculatePosition() {
            const trigger = this.$refs.trigger;
            const tooltip = this.$refs.tooltip;

            if (!trigger || !tooltip) {
                return;
            }

            const triggerRect = trigger.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const spacing = 8;

            let x = 0;
            let y = 0;
            let position = this.position;

            switch (position) {
                case 'top':
                    x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    y = triggerRect.top - tooltipRect.height - spacing;
                    if (y < spacing) {
                        position = 'bottom';
                        y = triggerRect.bottom + spacing;
                    }
                    break;

                case 'bottom':
                    x = triggerRect.left + (triggerRect.width / 2) - (tooltipRect.width / 2);
                    y = triggerRect.bottom + spacing;
                    if (y + tooltipRect.height > viewportHeight - spacing) {
                        position = 'top';
                        y = triggerRect.top - tooltipRect.height - spacing;
                    }
                    break;

                case 'left':
                    x = triggerRect.left - tooltipRect.width - spacing;
                    y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    if (x < spacing) {
                        position = 'right';
                        x = triggerRect.right + spacing;
                    }
                    break;

                case 'right':
                    x = triggerRect.right + spacing;
                    y = triggerRect.top + (triggerRect.height / 2) - (tooltipRect.height / 2);
                    if (x + tooltipRect.width > viewportWidth - spacing) {
                        position = 'left';
                        x = triggerRect.left - tooltipRect.width - spacing;
                    }
                    break;
            }

            x = Math.max(spacing, Math.min(x, viewportWidth - tooltipRect.width - spacing));
            y = Math.max(spacing, Math.min(y, viewportHeight - tooltipRect.height - spacing));

            this.tooltipX = x;
            this.tooltipY = y;
            this.actualPosition = position;
        },

    },

};
</script>

<style scoped>
.ContextHelp {
    display: inline-flex;
    align-items: center;
    cursor: help;
}

.ContextHelpIcon {
    font-size: var(--font-size);
    color: var(--color-text-2);
    transition: color 0.15s ease;
}

.ContextHelp:hover .ContextHelpIcon {
    color: var(--color-primary-2);
}

.ContextHelpTooltip {
    --ContextHelp-bg: var(--color-base-0);
    --ContextHelp-border: var(--color-base-4);
    --ContextHelp-shadow: var(--shadow-brutal-sm);
    --ContextHelp-arrow-size: 6px;

    position: fixed;
    z-index: 10000;

    background: var(--ContextHelp-bg);
    border: 2px solid var(--ContextHelp-border);
    border-radius: var(--border-radius);
    box-shadow: var(--ContextHelp-shadow);

    animation: contextHelpFadeIn 0.15s ease-out;
}

@keyframes contextHelpFadeIn {
    from {
        opacity: 0;
        transform: translateY(4px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.ContextHelpContent {
    padding: var(--sp1-5) var(--sp2);
    font-size: var(--font-size-small);
    color: var(--color-text-0);
    line-height: 1.5;
}

.ContextHelpArrow {
    position: absolute;
    width: 0;
    height: 0;
}

.ContextHelpTooltip-top .ContextHelpArrow {
    bottom: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    left: 50%;
    transform: translateX(-50%);
    border-left: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid transparent;
    border-top: var(--ContextHelp-arrow-size) solid var(--ContextHelp-border);
}

.ContextHelpTooltip-top .ContextHelpArrow::after {
    content: '';
    position: absolute;
    left: calc(var(--ContextHelp-arrow-size) * -1);
    top: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    border-left: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid transparent;
    border-top: var(--ContextHelp-arrow-size) solid var(--ContextHelp-bg);
}

.ContextHelpTooltip-bottom .ContextHelpArrow {
    top: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    left: 50%;
    transform: translateX(-50%);
    border-left: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid var(--ContextHelp-border);
}

.ContextHelpTooltip-bottom .ContextHelpArrow::after {
    position: absolute;
    left: calc(var(--ContextHelp-arrow-size) * -1);
    top: 2px;
    border-left: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid var(--ContextHelp-bg);
    content: '';
}

.ContextHelpTooltip-left .ContextHelpArrow {
    right: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    top: 50%;
    transform: translateY(-50%);
    border-top: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid transparent;
    border-left: var(--ContextHelp-arrow-size) solid var(--ContextHelp-border);
}

.ContextHelpTooltip-left .ContextHelpArrow::after {
    content: '';
    position: absolute;
    top: calc(var(--ContextHelp-arrow-size) * -1);
    left: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    border-top: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid transparent;
    border-left: var(--ContextHelp-arrow-size) solid var(--ContextHelp-bg);
}

.ContextHelpTooltip-right .ContextHelpArrow {
    left: calc(var(--ContextHelp-arrow-size) * -1 - 2px);
    top: 50%;
    transform: translateY(-50%);
    border-top: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid var(--ContextHelp-border);
}

.ContextHelpTooltip-right .ContextHelpArrow::after {
    content: '';
    position: absolute;
    top: calc(var(--ContextHelp-arrow-size) * -1);
    left: 2px;
    border-top: var(--ContextHelp-arrow-size) solid transparent;
    border-bottom: var(--ContextHelp-arrow-size) solid transparent;
    border-right: var(--ContextHelp-arrow-size) solid var(--ContextHelp-bg);
}

@media (prefers-reduced-motion: reduce) {
    .ContextHelpTooltip {
        animation: none;
    }
    .ContextHelpIcon {
        transition: none;
    }
}
</style>
