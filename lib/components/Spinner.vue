<template>
    <div
        class="Spinner"
        :class="[
            `Spinner-${size}`,
            `Spinner-${kind}`
        ]">
        <svg
            class="SpinnerRing"
            viewBox="0 0 50 50">
            <circle
                class="SpinnerTrack"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="4" />
            <circle
                class="SpinnerArc"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke-width="4"
                stroke-linecap="round" />
        </svg>
    </div>
</template>

<script>
export default {

    props: {
        size: {
            type: String,
            default: 'normal',
            validator: function(value) {
                return ['small', 'normal', 'large'].includes(value);
            }
        },
        kind: {
            type: String,
            default: 'default',
            validator: function(value) {
                return ['default', 'primary', 'secondary', 'tertiary'].includes(value);
            }
        }
    }

};
</script>

<style scoped>
.Spinner {
    --Spinner-size: 40px;
    --Spinner-color: var(--color-text-1);
    --Spinner-track-color: var(--color-base-3);
    --Spinner-border-width: 4px;

    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: var(--Spinner-size);
    height: var(--Spinner-size);
}

.SpinnerRing {
    width: 100%;
    height: 100%;
    animation: spinner-rotate 1.4s linear infinite;
}

.SpinnerTrack {
    stroke: var(--Spinner-track-color);
}

.SpinnerArc {
    stroke: var(--Spinner-color);
    stroke-dasharray: 80, 200;
    stroke-dashoffset: 0;
    animation: spinner-dash 1.4s ease-in-out infinite;
}

@keyframes spinner-rotate {
    100% {
        transform: rotate(360deg);
    }
}

@keyframes spinner-dash {
    0% {
        stroke-dasharray: 1, 200;
        stroke-dashoffset: 0;
    }
    50% {
        stroke-dasharray: 80, 200;
        stroke-dashoffset: -35;
    }
    100% {
        stroke-dasharray: 80, 200;
        stroke-dashoffset: -124;
    }
}

/* ===========================================
   SIZE VARIANTS
   =========================================== */

.Spinner-small {
    --Spinner-size: 24px;
    --Spinner-border-width: 3px;
}

.Spinner-small .SpinnerTrack,
.Spinner-small .SpinnerArc {
    stroke-width: 5;
}

.Spinner-large {
    --Spinner-size: 56px;
    --Spinner-border-width: 5px;
}

.Spinner-large .SpinnerTrack,
.Spinner-large .SpinnerArc {
    stroke-width: 3;
}

/* ===========================================
   KIND VARIANTS
   =========================================== */

.Spinner-default {
    --Spinner-color: var(--color-text-1);
    --Spinner-track-color: var(--color-base-3);
}

.Spinner-primary {
    --Spinner-color: var(--color-primary-2);
    --Spinner-track-color: var(--color-primary-0);
}

.Spinner-secondary {
    --Spinner-color: var(--color-secondary-2);
    --Spinner-track-color: var(--color-secondary-0);
}

.Spinner-tertiary {
    --Spinner-color: var(--color-tertiary-2);
    --Spinner-track-color: var(--color-tertiary-0);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .SpinnerRing {
        animation: spinner-rotate 2s linear infinite;
    }
    .SpinnerArc {
        animation: none;
        stroke-dasharray: 80, 200;
        stroke-dashoffset: -35;
    }
}
</style>
