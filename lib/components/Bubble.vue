<template>
    <div
        class="Bubble"
        :class="[
            `Bubble-${position}`,
            `Bubble-${kind}`,
            { 'Bubble-tail': tail },
        ]">
        <div class="BubbleContent">
            <slot />
        </div>
        <div
            v-if="time"
            class="BubbleTime">
            {{ time }}
        </div>
        <div
            v-if="tail"
            class="BubbleTail" />
    </div>
</template>

<script>
export default {

    props: {
        position: {
            type: String,
            default: 'left',
            validator: function (value) {
                return ['left', 'right'].includes(value);
            },
        },
        kind: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'secondary'].includes(value);
            },
        },
        tail: {
            type: Boolean,
            default: true,
        },
        time: {
            type: String,
            default: '',
        },
    },

};
</script>

<style scoped>
.Bubble {
    --Bubble-bg: var(--color-base-1);
    --Bubble-border: var(--color-base-4);
    --Bubble-text: var(--color-text-0);
    --Bubble-shadow: var(--shadow-brutal-sm);
    --Bubble-time-color: var(--color-text-2);
    --Bubble-tail-size: 10px;
    --Bubble-max-width: 320px;

    position: relative;
    display: inline-block;
    max-width: var(--Bubble-max-width);
}

.BubbleContent {
    padding: var(--sp1-5) var(--sp2);

    background: var(--Bubble-bg);
    border: 2px solid var(--Bubble-border);
    border-radius: var(--border-radius);
    box-shadow: var(--Bubble-shadow);

    font-size: var(--font-size);
    color: var(--Bubble-text);
    line-height: 1.5;
    word-wrap: break-word;
}

.BubbleTime {
    margin-top: var(--sp0-5);
    font-size: var(--font-size-small);
    color: var(--Bubble-time-color);
}

.BubbleTail {
    position: absolute;
    width: 0;
    height: 0;
}

/* Left position (message from others) */
.Bubble-left {
    margin-left: var(--Bubble-tail-size);
}

.Bubble-left .BubbleTime {
    text-align: left;
}

.Bubble-left .BubbleTail {
    left: calc(var(--Bubble-tail-size) * -1 - 2px);
    top: var(--sp2);
    border-top: var(--Bubble-tail-size) solid transparent;
    border-bottom: var(--Bubble-tail-size) solid transparent;
    border-right: var(--Bubble-tail-size) solid var(--Bubble-border);
}

.Bubble-left .BubbleTail::after {
    content: '';
    position: absolute;
    left: 3px;
    top: calc(var(--Bubble-tail-size) * -1);
    border-top: var(--Bubble-tail-size) solid transparent;
    border-bottom: var(--Bubble-tail-size) solid transparent;
    border-right: var(--Bubble-tail-size) solid var(--Bubble-bg);
}

/* Right position (own messages) */
.Bubble-right {
    margin-right: var(--Bubble-tail-size);
}

.Bubble-right .BubbleTime {
    text-align: right;
}

.Bubble-right .BubbleTail {
    right: calc(var(--Bubble-tail-size) * -1 - 2px);
    top: var(--sp2);
    border-top: var(--Bubble-tail-size) solid transparent;
    border-bottom: var(--Bubble-tail-size) solid transparent;
    border-left: var(--Bubble-tail-size) solid var(--Bubble-border);
}

.Bubble-right .BubbleTail::after {
    content: '';
    position: absolute;
    right: 3px;
    top: calc(var(--Bubble-tail-size) * -1);
    border-top: var(--Bubble-tail-size) solid transparent;
    border-bottom: var(--Bubble-tail-size) solid transparent;
    border-left: var(--Bubble-tail-size) solid var(--Bubble-bg);
}

/* Kind variants */
.Bubble-default {
    --Bubble-bg: var(--color-base-1);
    --Bubble-border: var(--color-base-4);
    --Bubble-text: var(--color-text-0);
    --Bubble-shadow: var(--shadow-brutal-sm);
}

.Bubble-primary {
    --Bubble-bg: var(--color-primary-2);
    --Bubble-border: var(--color-primary-3);
    --Bubble-text: var(--color-primary-text);
    --Bubble-time-color: var(--color-primary-0);
    --Bubble-shadow: var(--shadow-brutal-primary);
}

.Bubble-secondary {
    --Bubble-bg: var(--color-secondary-2);
    --Bubble-border: var(--color-secondary-3);
    --Bubble-text: var(--color-secondary-text);
    --Bubble-time-color: var(--color-secondary-0);
    --Bubble-shadow: var(--shadow-brutal-secondary);
}

/* Without tail */
.Bubble:not(.Bubble-tail) {
    margin-left: 0;
    margin-right: 0;
}
</style>
