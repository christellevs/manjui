<template>
    <InputBase
        class="InputStringList"
        v-bind="{
            ...$attrs,
            ...$props
        }"
        :fixedHeight="false">
        <div class="InputStringList-content">
            <div class="InputStringList-tags">
                <span
                    v-for="(item, index) of modelValue"
                    :key="index"
                    class="InputStringList-tag">
                    <span class="InputStringList-tag-text">{{ item }}</span>
                    <button
                        type="button"
                        class="InputStringList-tag-remove"
                        :disabled="disabled"
                        @click="removeItem(index)">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none">
                            <path
                                d="M4 4L10 10M10 4L4 10"
                                stroke="currentColor"
                                stroke-width="2"
                                stroke-linecap="round" />
                        </svg>
                    </button>
                </span>
            </div>
            <input
                ref="input"
                v-model="newValue"
                type="text"
                class="InputStringList-input"
                :placeholder="inputPlaceholder"
                :disabled="disabled || isAtMax"
                @keydown.enter.prevent="addItem"
                @keydown.backspace="onBackspace"
                @focus="$emit('focus', $event)"
                @blur="onBlur" />
        </div>
    </InputBase>
</template>

<script>
import InputBase from './InputBase.vue';

export default {

    components: {
        InputBase,
    },

    props: {
        ...InputBase.props,
        modelValue: { type: Array, default: function () { return []; } },
        placeholder: { type: String, default: 'Add item...' },
        maxItems: { type: Number, default: 0 },
    },

    emits: [
        'update:modelValue',
        'focus',
        'blur',
    ],

    data() {
        return {
            newValue: '',
        };
    },

    computed: {

        isAtMax() {
            if (this.maxItems <= 0) {
                return false;
            }
            return this.modelValue.length >= this.maxItems;
        },

        inputPlaceholder() {
            if (this.isAtMax) {
                return 'Max items reached';
            }
            return this.placeholder;
        },

    },

    methods: {

        addItem() {
            if (this.disabled || this.isAtMax) {
                return;
            }

            const value = this.newValue.trim();
            if (!value) {
                return;
            }

            if (this.modelValue.includes(value)) {
                this.newValue = '';
                return;
            }

            const newArray = this.modelValue.slice();
            newArray.push(value);
            this.$emit('update:modelValue', newArray);
            this.newValue = '';
        },

        removeItem(index) {
            if (this.disabled) {
                return;
            }

            const newArray = this.modelValue.slice();
            newArray.splice(index, 1);
            this.$emit('update:modelValue', newArray);
        },

        onBackspace() {
            if (this.newValue === '' && this.modelValue.length > 0) {
                this.removeItem(this.modelValue.length - 1);
            }
        },

        onBlur(event) {
            this.addItem();
            this.$emit('blur', event);
        },

        focus() {
            if (this.$refs.input) {
                this.$refs.input.focus();
            }
        },

    }

};
</script>

<style scoped>
.InputStringList {
    --InputStringList-tag-bg: var(--color-base-2);
    --InputStringList-tag-border: var(--color-base-4);
    --InputStringList-tag-shadow: var(--shadow-brutal-xs);
}

.InputStringList-content {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--sp);
    min-width: 0;
}

.InputStringList-tags {
    display: flex;
    flex-wrap: wrap;
    gap: var(--sp);
}

.InputStringList-tag {
    display: inline-flex;
    align-items: center;
    gap: var(--sp0-5);
    padding: var(--sp0-5) var(--sp);
    background: var(--InputStringList-tag-bg);
    border: 2px solid var(--InputStringList-tag-border);
    border-radius: var(--border-radius-small);
    box-shadow: var(--InputStringList-tag-shadow);
    font-size: var(--font-size-small);
    line-height: 1.2;
    transition:
        transform var(--duration-fast, 120ms) var(--ease-out, ease),
        box-shadow var(--duration-fast, 120ms) var(--ease-out, ease);
}

.InputStringList-tag:hover {
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--color-base-4);
}

.InputStringList-tag-text {
    white-space: nowrap;
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
}

.InputStringList-tag-remove {
    -webkit-appearance: none;
    appearance: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    width: 16px;
    height: 16px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--color-text-3);
    cursor: pointer;
    opacity: 0.6;
    transition:
        background-color var(--duration-fast, 120ms) var(--ease-out, ease),
        color var(--duration-fast, 120ms) var(--ease-out, ease),
        opacity var(--duration-fast, 120ms) var(--ease-out, ease),
        transform var(--duration-fast, 120ms) var(--ease-out, ease);
}

.InputStringList-tag-remove svg {
    width: 10px;
    height: 10px;
}

.InputStringList-tag-remove:hover {
    background: var(--color-text-3);
    color: var(--color-base-0);
    opacity: 1;
    transform: scale(1.1);
}

.InputStringList-tag-remove:active {
    transform: scale(0.95);
}

.InputStringList-tag-remove:disabled {
    cursor: not-allowed;
    opacity: 0.3;
}

.InputStringList-input {
    -webkit-appearance: none;
    appearance: none;
    flex: 1;
    min-width: 80px;
    padding: 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    outline: none;
}

.InputStringList-input:disabled {
    cursor: not-allowed;
}

.InputStringList-input::placeholder {
    color: var(--color-text-2);
}

/* Size variants through InputBase */
:deep(.InputBase-small) .InputStringList-tag {
    padding: var(--sp0-5) var(--sp);
    font-size: var(--font-size-small);
}

:deep(.InputBase-small) .InputStringList-tag-remove {
    width: 14px;
    height: 14px;
}

:deep(.InputBase-large) .InputStringList-tag {
    padding: var(--sp) var(--sp1-5);
    font-size: var(--font-size);
}

:deep(.InputBase-large) .InputStringList-tag-remove {
    width: 20px;
    height: 20px;
}
</style>
