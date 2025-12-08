<template>
    <label
        class="SwitchField"
        :class="{
            'SwitchField-Disabled': disabled,
        }">
        <Switch
            :modelValue="modelValue"
            :disabled="disabled"
            :size="size"
            @update:modelValue="$emit('update:modelValue', $event)" />
        <div class="Label">
            {{ label }}
            <slot />
        </div>
    </label>
</template>

<script>
export default {

    props: {
        label: { type: String },
        modelValue: { type: Boolean },
        disabled: { type: Boolean },
        size: { type: String },
    },

    emits: [
        'update:modelValue',
    ],

};
</script>

<style scoped>
.SwitchField {
    display: flex;
    align-items: center;
    gap: var(--sp);
}

.Label {
    cursor: pointer;
    flex: 0 1 auto;
}

.SwitchField-Disabled .Label {
    cursor: not-allowed;
    color: var(--color-text-2);
}
</style>
