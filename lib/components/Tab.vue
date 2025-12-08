<template>
    <div
        class="Tab"
        :class="[
            `Tab-${dir}`,
            `Tab-${orientation}`,
        ]">
        <TabCap
            class="TabCap"
            :dir="dir"
            type="start" />
        <div class="Content">
            <slot>
                <div
                    v-if="label"
                    class="TabLabel"
                    :title="label">
                    {{ label }}
                </div>
            </slot>
        </div>
        <TabCap
            class="TabCap"
            :dir="dir"
            type="end" />
    </div>
</template>

<script>
export default {

    props: {
        dir: { type: String, default: 'top' },
        label: { type: String },
    },

    computed: {

        orientation() {
            return this.dir === 'top' || this.dir === 'bottom' ? 'h' : 'v';
        },

    },

};
</script>

<style scoped>
.Tab {
    --Tab-size: var(--sp3);
    --Tab-cap-size: var(--sp4);
    --Tab-surface: var(--color-base-1);
    --Tab-color: var(--color-text-0);
    --Tab-shadow-size: 0;
    --Tab-shadow-color: var(--color-base-4);
    --Tab-shadow-offset-x: 2px;
    --Tab-shadow-offset-y: 2px;
    --Tab-border-color: var(--color-base-4);
    --Tab-border-width: 2px;

    display: flex;
    cursor: pointer;
    position: relative;
    filter: drop-shadow(var(--Tab-shadow-offset-x) var(--Tab-shadow-offset-y) var(--Tab-shadow-size) var(--Tab-shadow-color));
    transition:
        filter var(--duration-fast, 120ms) var(--ease-out, ease),
        transform var(--duration-fast, 120ms) var(--ease-out, ease);
}

/* Neo-brutal hover lift */
.Tab:hover {
    --Tab-shadow-offset-x: 3px;
    --Tab-shadow-offset-y: 3px;
    transform: translate(-1px, -1px);
}

/* Neo-brutal active press */
.Tab:active {
    --Tab-shadow-offset-x: 0;
    --Tab-shadow-offset-y: 0;
    transform: translate(1px, 1px);
}

.TabCap, .Content {
    position: relative;
    z-index: 2;
}

.Content {
    min-width: 0;
    display: flex;
    align-items: center;
    background: var(--Tab-surface);
    color: var(--Tab-color);
    font-weight: var(--font-weight-medium, 500);
    padding: 0 var(--sp1, 8px);
    transition:
        background-color var(--duration-fast, 120ms) var(--ease-out, ease),
        color var(--duration-fast, 120ms) var(--ease-out, ease);
}

.TabLabel {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.Tab-h {
    flex-flow: row;
    height: var(--Tab-size);
}

.Tab-v {
    flex-flow: column;
    width: var(--Tab-size);
}

.Tab-v .Content {
    writing-mode: vertical-lr;
    text-orientation: sideways-right;
    transform: rotate(180deg);
    transform-origin: 50% 50%;
    padding: var(--sp1, 8px) 0;
}

.TabCap {
    flex: 0 0 var(--Tab-cap-size);
    fill: var(--Tab-surface);
    transition: fill var(--duration-fast, 120ms) var(--ease-out, ease);
}

.Tab-h .TabCap {
    width: var(--Tab-cap-size);
}

.Tab-v .TabCap {
    height: var(--Tab-cap-size);
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .Tab,
    .Content,
    .TabCap {
        transition: none;
    }
}
</style>
