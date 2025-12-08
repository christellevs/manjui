<template>
    <div
        class="ProgressBar"
        :class="[
            `ProgressBar-${kind}`,
            `ProgressBar-${size}`,
            { 'ProgressBar-indeterminate': indeterminate }
        ]"
        role="progressbar"
        :aria-valuenow="indeterminate ? undefined : clampedValue"
        :aria-valuemin="0"
        :aria-valuemax="100">
        <div
            class="ProgressBarTrack">
            <div
                class="ProgressBarFill"
                :style="fillStyle" />
        </div>
        <div
            v-if="showLabel && !indeterminate"
            class="ProgressBarLabel">
            {{ labelText }}
        </div>
    </div>
</template>

<script>
export default {

    props: {
        value: {
            type: Number,
            default: 0
        },
        kind: {
            type: String,
            default: 'primary',
            validator: function(value) {
                return ['default', 'primary', 'secondary', 'tertiary'].includes(value);
            }
        },
        size: {
            type: String,
            default: 'normal',
            validator: function(value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        showLabel: {
            type: Boolean,
            default: false
        },
        indeterminate: {
            type: Boolean,
            default: false
        }
    },

    computed: {
        clampedValue() {
            return Math.min(100, Math.max(0, this.value));
        },

        fillStyle() {
            if (this.indeterminate) {
                return {};
            }
            return {
                width: this.clampedValue + '%'
            };
        },

        labelText() {
            return Math.round(this.clampedValue) + '%';
        }
    }

};
</script>

<style scoped>
.ProgressBar {
    --ProgressBar-height: 12px;
    --ProgressBar-bg: var(--color-base-2);
    --ProgressBar-fill: var(--color-text-1);
    --ProgressBar-border: var(--color-base-4);
    --ProgressBar-shadow: var(--shadow-brutal-xs);
    --ProgressBar-radius: var(--radius-full);

    display: flex;
    align-items: center;
    gap: var(--sp1-5);
}

.ProgressBarTrack {
    flex: 1;
    height: var(--ProgressBar-height);
    background: var(--ProgressBar-bg);
    border: 2px solid var(--ProgressBar-border);
    border-radius: var(--ProgressBar-radius);
    box-shadow: var(--ProgressBar-shadow);
    overflow: hidden;
}

.ProgressBarFill {
    height: 100%;
    background: var(--ProgressBar-fill);
    border-radius: inherit;
    transition: width var(--duration-normal) var(--ease-standard);
}

.ProgressBarLabel {
    flex-shrink: 0;
    min-width: 40px;
    font-size: var(--font-size-small, 14px);
    font-weight: var(--font-weight-bold, 600);
    color: var(--color-text-1);
    text-align: right;
}

/* ===========================================
   SIZE VARIANTS
   =========================================== */

.ProgressBar-small {
    --ProgressBar-height: 8px;
}

.ProgressBar-small .ProgressBarLabel {
    font-size: 12px;
    min-width: 32px;
}

.ProgressBar-large {
    --ProgressBar-height: 20px;
}

.ProgressBar-large .ProgressBarLabel {
    font-size: var(--font-size);
    min-width: 48px;
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.ProgressBar-default {
    --ProgressBar-fill: var(--color-text-1);
    --ProgressBar-border: var(--color-base-4);
    --ProgressBar-shadow: var(--shadow-brutal-xs);
}

.ProgressBar-primary {
    --ProgressBar-fill: var(--color-primary-2);
    --ProgressBar-border: var(--color-primary-1);
    --ProgressBar-shadow: 1px 1px 0 var(--color-primary-3);
}

.ProgressBar-secondary {
    --ProgressBar-fill: var(--color-secondary-2);
    --ProgressBar-border: var(--color-secondary-1);
    --ProgressBar-shadow: 1px 1px 0 var(--color-secondary-3);
}

.ProgressBar-tertiary {
    --ProgressBar-fill: var(--color-tertiary-2);
    --ProgressBar-border: var(--color-tertiary-1);
    --ProgressBar-shadow: 1px 1px 0 var(--color-tertiary-3);
}

/* ===========================================
   INDETERMINATE ANIMATION
   =========================================== */

.ProgressBar-indeterminate .ProgressBarFill {
    width: 40%;
    animation: ProgressBar-indeterminate 1.5s var(--ease-in-out) infinite;
}

@keyframes ProgressBar-indeterminate {
    0% {
        transform: translateX(-100%);
    }
    100% {
        transform: translateX(350%);
    }
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .ProgressBarFill {
        transition: none;
    }
    .ProgressBar-indeterminate .ProgressBarFill {
        animation: none;
        width: 100%;
        opacity: 0.5;
    }
}
</style>
