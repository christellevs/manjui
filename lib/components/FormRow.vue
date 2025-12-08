<template>
    <div
        class="FormRow"
        :class="[
            {
                'FormRow-horizontal': horizontal,
                'FormRow-required': required,
                'FormRow-error': error,
            }
        ]">
        <div
            v-if="label"
            class="FormRow-label">
            <span class="FormRow-label-text">
                {{ label }}
                <span
                    v-if="required"
                    class="FormRow-required-indicator">*</span>
            </span>
        </div>
        <div class="FormRow-control">
            <slot />
            <p
                v-if="hint && !error"
                class="FormRow-hint">
                {{ hint }}
            </p>
            <p
                v-if="error"
                class="FormRow-error-message">
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script>
export default {

    props: {
        label: { type: String },
        required: { type: Boolean, default: false },
        hint: { type: String },
        error: { type: String },
        horizontal: { type: Boolean, default: false },
    },

};
</script>

<style scoped>
.FormRow {
    --FormRow-label-color: var(--color-text-1);
    --FormRow-hint-color: var(--color-text-2);
    --FormRow-error-color: var(--color-danger-3);
    --FormRow-required-color: var(--color-danger-2);
    --FormRow-gap: var(--sp);

    display: flex;
    flex-direction: column;
    gap: var(--FormRow-gap);
}

.FormRow-horizontal {
    flex-direction: row;
    align-items: flex-start;
}

.FormRow-horizontal .FormRow-label {
    flex: 0 0 auto;
    min-width: 120px;
    padding-top: var(--sp1-5);
}

.FormRow-horizontal .FormRow-control {
    flex: 1;
    min-width: 0;
}

.FormRow-label {
    font-weight: var(--font-weight-bold);
    color: var(--FormRow-label-color);
    line-height: 1.4;
}

.FormRow-label-text {
    display: inline-flex;
    align-items: baseline;
    gap: var(--sp0-5);
}

.FormRow-required-indicator {
    color: var(--FormRow-required-color);
    font-weight: var(--font-weight-bold);
}

.FormRow-control {
    display: flex;
    flex-direction: column;
    gap: var(--sp0-5);
}

.FormRow-hint {
    margin: 0;
    font-size: var(--font-size-small);
    color: var(--FormRow-hint-color);
    line-height: 1.4;
}

.FormRow-error-message {
    margin: 0;
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-bold);
    color: var(--FormRow-error-color);
    line-height: 1.4;

    display: flex;
    align-items: center;
    gap: var(--sp0-5);
}

.FormRow-error-message::before {
    content: '';
    display: inline-block;
    width: 6px;
    height: 6px;
    background: var(--FormRow-error-color);
    border-radius: 50%;
}

/* When in error state, add visual indicator */
.FormRow-error .FormRow-label {
    color: var(--FormRow-error-color);
}
</style>
