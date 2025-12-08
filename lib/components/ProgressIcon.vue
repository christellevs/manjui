<template>
    <div
        class="ProgressIcon"
        :class="[
            `ProgressIcon-${size}`,
            `ProgressIcon-${kind}`,
        ]">
        <svg
            class="ProgressIconRing"
            :width="svgSize"
            :height="svgSize"
            :viewBox="`0 0 ${svgSize} ${svgSize}`">
            <circle
                class="ProgressIconTrack"
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="strokeWidth"
                fill="none" />
            <circle
                class="ProgressIconProgress"
                :cx="center"
                :cy="center"
                :r="radius"
                :stroke-width="strokeWidth"
                :stroke-dasharray="circumference"
                :stroke-dashoffset="dashOffset"
                fill="none" />
        </svg>
        <div class="ProgressIconContent">
            <slot>
                <i
                    v-if="icon"
                    :class="icon"
                    class="ProgressIconIcon" />
            </slot>
        </div>
        <div
            v-if="showValue"
            class="ProgressIconValue">
            {{ Math.round(normalizedProgress) }}%
        </div>
    </div>
</template>

<script>
export default {

    props: {
        icon: {
            type: String,
            default: '',
        },
        progress: {
            type: Number,
            default: 0,
        },
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large'].includes(value);
            },
        },
        kind: {
            type: String,
            default: 'primary',
            validator: function (value) {
                return ['default', 'primary', 'secondary', 'tertiary', 'success', 'warning', 'danger'].includes(value);
            },
        },
        showValue: {
            type: Boolean,
            default: false,
        },
    },

    computed: {

        normalizedProgress() {
            return Math.max(0, Math.min(100, this.progress));
        },

        sizeConfig() {
            const configs = {
                small: { svg: 32, stroke: 3, iconSize: 12 },
                normal: { svg: 48, stroke: 4, iconSize: 18 },
                large: { svg: 64, stroke: 5, iconSize: 24 },
            };
            return configs[this.size] || configs.normal;
        },

        svgSize() {
            return this.sizeConfig.svg;
        },

        strokeWidth() {
            return this.sizeConfig.stroke;
        },

        center() {
            return this.svgSize / 2;
        },

        radius() {
            return (this.svgSize / 2) - this.strokeWidth;
        },

        circumference() {
            return 2 * Math.PI * this.radius;
        },

        dashOffset() {
            const progressRatio = this.normalizedProgress / 100;
            return this.circumference * (1 - progressRatio);
        },

    },

};
</script>

<style scoped>
.ProgressIcon {
    --ProgressIcon-track-color: var(--color-base-3);
    --ProgressIcon-progress-color: var(--color-primary-2);
    --ProgressIcon-icon-color: var(--color-text-1);
    --ProgressIcon-value-color: var(--color-text-2);

    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.ProgressIconRing {
    display: block;
}

.ProgressIconTrack {
    stroke: var(--ProgressIcon-track-color);
}

.ProgressIconProgress {
    stroke: var(--ProgressIcon-progress-color);
    stroke-linecap: round;
    transform: rotate(-90deg);
    transform-origin: center;
    transition: stroke-dashoffset 0.3s ease;
}

.ProgressIconContent {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
}

.ProgressIconIcon {
    color: var(--ProgressIcon-icon-color);
}

.ProgressIconValue {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    margin-top: var(--sp0-5);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    color: var(--ProgressIcon-value-color);
    white-space: nowrap;
}

/* Sizes */
.ProgressIcon-small .ProgressIconIcon {
    font-size: 12px;
}

.ProgressIcon-normal .ProgressIconIcon {
    font-size: 18px;
}

.ProgressIcon-large .ProgressIconIcon {
    font-size: 24px;
}

/* Kind variants */
.ProgressIcon-default {
    --ProgressIcon-progress-color: var(--color-base-4);
    --ProgressIcon-icon-color: var(--color-text-1);
}

.ProgressIcon-primary {
    --ProgressIcon-progress-color: var(--color-primary-2);
    --ProgressIcon-icon-color: var(--color-primary-2);
}

.ProgressIcon-secondary {
    --ProgressIcon-progress-color: var(--color-secondary-2);
    --ProgressIcon-icon-color: var(--color-secondary-2);
}

.ProgressIcon-tertiary {
    --ProgressIcon-progress-color: var(--color-tertiary-2);
    --ProgressIcon-icon-color: var(--color-tertiary-2);
}

.ProgressIcon-success {
    --ProgressIcon-progress-color: var(--color-success-2);
    --ProgressIcon-icon-color: var(--color-success-2);
}

.ProgressIcon-warning {
    --ProgressIcon-progress-color: var(--color-warning-3);
    --ProgressIcon-icon-color: var(--color-warning-3);
}

.ProgressIcon-danger {
    --ProgressIcon-progress-color: var(--color-danger-2);
    --ProgressIcon-icon-color: var(--color-danger-2);
}

@media (prefers-reduced-motion: reduce) {
    .ProgressIconProgress {
        transition: none;
    }
}
</style>
