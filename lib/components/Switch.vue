<template>
    <label
        class="Switch"
        :class="[
            `Switch-size-${size}`,
            {
                'Active': !!modelValue,
                'Disabled': disabled,
            }
        ]">
        <input
            type="checkbox"
            :checked="modelValue"
            :disabled="disabled"
            @change="onChange" />
    </label>
</template>

<script>
export default {

    props: {
        modelValue: { type: Boolean },
        disabled: { type: Boolean },
        size: { type: String, default: 'normal' },
    },

    emits: [
        'update:modelValue',
    ],

    methods: {

        onChange(ev) {
            this.$emit('update:modelValue', ev.target.checked);
        }

    }

};
</script>

<style scoped>
.Switch {
    --Switch-slide-width: 32px;
    --Switch-slide-height: 20px;
    --Switch-knob-size: 16px;
    --Switch-knob-offset: 2px;
    --Switch-active-color: var(--color-primary);

    display: block;
    position: relative;
    width: var(--Switch-slide-width);
    height: var(--Switch-slide-height);
    border-radius: 10000px;

    cursor: pointer;
    background: var(--color-base-3);
    transition: background-color .3s;
    box-shadow: 0 .5px 1px var(--shadow-color) inset;
}

.Switch-size-small {
    --Switch-slide-width: 24px;
    --Switch-slide-height: 16px;
    --Switch-knob-size: 12px;
}

.Switch-size-large {
    --Switch-slide-width: 40px;
    --Switch-slide-height: 24px;
    --Switch-knob-size: 20px;
}

.Switch input {
    display: none;
}

.Switch::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    width: var(--Switch-knob-size);
    height: var(--Switch-knob-size);
    border-radius: 1000px;
    background: var(--color-base-0);
    box-shadow: 0 1px 1px var(--shadow-color);

    transform: translate(var(--Switch-knob-offset), -50%);
    transition: transform .3s;
}

.Switch.Active {
    background: var(--Switch-active-color);
}

.Switch.Active::after {
    transform: translate(
        calc(
            var(--Switch-slide-width) -
            var(--Switch-knob-size) -
            var(--Switch-knob-offset)
        ),
        -50%
    );
}

.Switch.Disabled {
    cursor: not-allowed;
    opacity: .5;
}
</style>
