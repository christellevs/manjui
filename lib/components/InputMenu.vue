<template>
    <InputBase
        ref="container"
        class="InputMenu"
        :class="[
            {
                'InputMenu-open': isOpen,
            }
        ]"
        v-bind="{
            ...$attrs,
            ...$props
        }"
        tabindex="0"
        @click="toggleDropdown"
        @keydown="onKeydown">
        <div class="InputMenu-display">
            <span
                v-if="selectedLabel"
                class="InputMenu-value">
                {{ selectedLabel }}
            </span>
            <span
                v-else
                class="InputMenu-placeholder">
                {{ placeholder }}
            </span>
            <svg
                class="InputMenu-arrow"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none">
                <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
        </div>
        <div
            v-if="isOpen"
            class="InputMenu-dropdown">
            <input
                v-if="searchable"
                ref="searchInput"
                v-model="searchQuery"
                type="text"
                class="InputMenu-search"
                placeholder="Search..."
                @click.stop
                @keydown.stop="onSearchKeydown" />
            <div class="InputMenu-options">
                <div
                    v-for="(option, index) of filteredOptions"
                    :key="getOptionValue(option)"
                    class="InputMenu-option"
                    :class="{
                        'InputMenu-option-selected': isSelected(option),
                        'InputMenu-option-focused': index === focusedIndex,
                    }"
                    @click.stop="selectOption(option)"
                    @mouseenter="focusedIndex = index">
                    {{ getOptionLabel(option) }}
                </div>
                <div
                    v-if="filteredOptions.length === 0"
                    class="InputMenu-empty">
                    No options found
                </div>
            </div>
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
        modelValue: { type: [String, Number, Boolean, Object] },
        options: { type: Array, default: function () { return []; } },
        placeholder: { type: String, default: 'Select...' },
        searchable: { type: Boolean, default: false },
    },

    emits: [
        'update:modelValue',
    ],

    data() {
        return {
            isOpen: false,
            searchQuery: '',
            focusedIndex: -1,
        };
    },

    computed: {

        selectedOption() {
            return this.options.find(function (opt) {
                return this.getOptionValue(opt) === this.modelValue;
            }.bind(this));
        },

        selectedLabel() {
            if (this.selectedOption) {
                return this.getOptionLabel(this.selectedOption);
            }
            return '';
        },

        filteredOptions() {
            if (!this.searchQuery) {
                return this.options;
            }
            const query = this.searchQuery.toLowerCase();
            return this.options.filter(function (opt) {
                const label = this.getOptionLabel(opt).toLowerCase();
                return label.includes(query);
            }.bind(this));
        },

    },

    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },

    unmounted() {
        document.removeEventListener('click', this.handleClickOutside);
    },

    methods: {

        getOptionValue(option) {
            if (typeof option === 'object' && option != null) {
                return option.value;
            }
            return option;
        },

        getOptionLabel(option) {
            if (typeof option === 'object' && option != null) {
                return option.label || option.value;
            }
            return String(option);
        },

        isSelected(option) {
            return this.getOptionValue(option) === this.modelValue;
        },

        toggleDropdown() {
            if (this.disabled) {
                return;
            }
            this.isOpen = !this.isOpen;
            if (this.isOpen) {
                this.searchQuery = '';
                this.focusedIndex = -1;
                if (this.searchable) {
                    this.$nextTick(function () {
                        if (this.$refs.searchInput) {
                            this.$refs.searchInput.focus();
                        }
                    }.bind(this));
                }
            }
        },

        selectOption(option) {
            this.$emit('update:modelValue', this.getOptionValue(option));
            this.isOpen = false;
            this.searchQuery = '';
        },

        handleClickOutside(event) {
            const container = this.$refs.container?.$el || this.$refs.container;
            if (container && !container.contains(event.target)) {
                this.isOpen = false;
                this.searchQuery = '';
            }
        },

        onKeydown(event) {
            if (this.disabled) {
                return;
            }

            switch (event.key) {
                case 'Enter':
                case ' ':
                    if (!this.isOpen) {
                        this.toggleDropdown();
                        event.preventDefault();
                    } else if (this.focusedIndex >= 0) {
                        this.selectOption(this.filteredOptions[this.focusedIndex]);
                        event.preventDefault();
                    }
                    break;
                case 'Escape':
                    this.isOpen = false;
                    this.searchQuery = '';
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    if (!this.isOpen) {
                        this.toggleDropdown();
                    } else {
                        this.focusedIndex = Math.min(
                            this.focusedIndex + 1,
                            this.filteredOptions.length - 1
                        );
                    }
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    if (this.isOpen) {
                        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
                    }
                    event.preventDefault();
                    break;
            }
        },

        onSearchKeydown(event) {
            switch (event.key) {
                case 'Enter':
                    if (this.focusedIndex >= 0 && this.filteredOptions[this.focusedIndex]) {
                        this.selectOption(this.filteredOptions[this.focusedIndex]);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                    this.isOpen = false;
                    this.searchQuery = '';
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    this.focusedIndex = Math.min(
                        this.focusedIndex + 1,
                        this.filteredOptions.length - 1
                    );
                    event.preventDefault();
                    break;
                case 'ArrowUp':
                    this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
                    event.preventDefault();
                    break;
            }
        },

    }

};
</script>

<style scoped>
.InputMenu {
    --InputMenu-dropdown-shadow: var(--shadow-brutal);
    --InputMenu-option-hover-bg: var(--color-base-1);
    --InputMenu-option-selected-bg: var(--color-tertiary-0);

    position: relative;
    cursor: pointer;
}

.InputMenu .Container {
    cursor: pointer;
}

.InputMenu-display {
    flex: 1;
    display: flex;
    align-items: center;
    gap: var(--sp);
    min-width: 0;
}

.InputMenu-value {
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.InputMenu-placeholder {
    flex: 1;
    color: var(--color-text-2);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.InputMenu-arrow {
    flex-shrink: 0;
    color: var(--color-text-2);
    transition: transform var(--duration-fast, 120ms) var(--ease-out, ease);
}

.InputMenu-open .InputMenu-arrow {
    transform: rotate(180deg);
}

.InputMenu-dropdown {
    position: absolute;
    top: calc(100% + var(--sp));
    left: 0;
    right: 0;
    z-index: 100;

    background: var(--color-base-0);
    border: 2px solid var(--color-base-4);
    border-radius: var(--border-radius);
    box-shadow: var(--InputMenu-dropdown-shadow);

    max-height: 240px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.InputMenu-search {
    -webkit-appearance: none;
    appearance: none;
    box-sizing: border-box;
    width: 100%;
    padding: var(--sp1-5);
    border: 0;
    border-bottom: 2px solid var(--color-base-3);
    background: var(--color-base-1);
    color: inherit;
    font: inherit;
    outline: none;
}

.InputMenu-search:focus {
    background: var(--color-base-0);
    border-bottom-color: var(--color-tertiary-2);
}

.InputMenu-options {
    flex: 1;
    overflow-y: auto;
    overscroll-behavior: contain;
}

.InputMenu-option {
    padding: var(--sp1-5) var(--sp2);
    cursor: pointer;
    transition:
        background-color var(--duration-fast, 120ms) var(--ease-out, ease);
}

.InputMenu-option:hover,
.InputMenu-option-focused {
    background: var(--InputMenu-option-hover-bg);
}

.InputMenu-option-selected {
    background: var(--InputMenu-option-selected-bg);
    font-weight: var(--font-weight-bold);
}

.InputMenu-option-selected:hover,
.InputMenu-option-selected.InputMenu-option-focused {
    background: color-mix(in srgb, var(--InputMenu-option-selected-bg) 80%, var(--color-base-2));
}

.InputMenu-empty {
    padding: var(--sp2);
    text-align: center;
    color: var(--color-text-2);
}

/* Size variants */
.InputMenu :deep(.InputBase-small) .InputMenu-dropdown {
    max-height: 200px;
}

.InputMenu :deep(.InputBase-small) .InputMenu-option {
    padding: var(--sp) var(--sp1-5);
}

.InputMenu :deep(.InputBase-large) .InputMenu-dropdown {
    max-height: 300px;
}

.InputMenu :deep(.InputBase-large) .InputMenu-option {
    padding: var(--sp2) var(--sp3);
}
</style>
