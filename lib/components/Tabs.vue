<template>
    <div class="Tabs">
        <div
            class="TabsHeader"
            role="tablist">
            <button
                v-for="tab in tabs"
                :key="tab.id"
                type="button"
                class="TabsHeaderItem"
                :class="{
                    'TabsHeaderItem-active': tab.id === modelValue,
                    'TabsHeaderItem-disabled': tab.disabled,
                }"
                role="tab"
                :aria-selected="tab.id === modelValue"
                :aria-controls="`tabpanel-${tab.id}`"
                :tabindex="tab.disabled ? -1 : 0"
                :disabled="tab.disabled"
                @click="selectTab(tab)">
                <i
                    v-if="tab.icon"
                    :class="tab.icon"
                    class="TabsHeaderIcon" />
                <span class="TabsHeaderLabel">{{ tab.label }}</span>
            </button>
        </div>
        <div class="TabsContent">
            <slot />
        </div>
    </div>
</template>

<script>
export default {

    provide() {
        return {
            tabsActiveId: () => this.modelValue,
            tabsRegister: this.registerTab,
            tabsUnregister: this.unregisterTab,
        };
    },

    props: {
        modelValue: { type: String, default: '' },
    },

    emits: ['update:modelValue'],

    data() {
        return {
            tabs: [],
        };
    },

    methods: {

        registerTab(tab) {
            this.tabs.push(tab);
            if (!this.modelValue && this.tabs.length === 1 && !tab.disabled) {
                this.$emit('update:modelValue', tab.id);
            }
        },

        unregisterTab(tabId) {
            const index = this.tabs.findIndex(function (t) {
                return t.id === tabId;
            });
            if (index !== -1) {
                this.tabs.splice(index, 1);
            }
        },

        selectTab(tab) {
            if (!tab.disabled) {
                this.$emit('update:modelValue', tab.id);
            }
        },

    },

};
</script>

<style scoped>
.Tabs {
    --Tabs-border: var(--color-base-4);
    --Tabs-bg: var(--color-base-0);
    --Tabs-active-color: var(--color-primary-2);
    --Tabs-active-bg: var(--color-base-0);
    --Tabs-header-bg: var(--color-base-1);

    display: flex;
    flex-direction: column;
    border: 2px solid var(--Tabs-border);
    border-radius: var(--border-radius);
    background: var(--Tabs-bg);
    box-shadow: var(--shadow-brutal-sm);
}

/* Tab header bar */
.TabsHeader {
    display: flex;
    flex-wrap: wrap;
    gap: 0;
    padding: var(--sp) var(--sp) 0 var(--sp);
    background: var(--Tabs-header-bg);
    border-radius: calc(var(--border-radius) - 2px) calc(var(--border-radius) - 2px) 0 0;
}

/* Individual tab button */
.TabsHeaderItem {
    display: flex;
    align-items: center;
    gap: var(--sp);
    padding: var(--sp1-5) var(--sp2);

    background: transparent;
    border: none;
    border-radius: var(--border-radius) var(--border-radius) 0 0;

    font-family: var(--font-main);
    font-size: var(--font-size);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-1);
    cursor: pointer;

    transition:
        color var(--duration-fast) var(--ease-out),
        background-color var(--duration-fast) var(--ease-out);
}

.TabsHeaderItem:hover:not(:disabled) {
    color: var(--color-text-0);
    background: var(--color-base-2);
}

.TabsHeaderItem:focus-visible {
    outline: 2px solid var(--color-primary-2);
    outline-offset: -2px;
}

/* Active tab - Neo-brutal style */
.TabsHeaderItem-active {
    color: var(--Tabs-active-color);
    background: var(--Tabs-active-bg);
    font-weight: var(--font-weight-bold);
}

.TabsHeaderItem-active:hover:not(:disabled) {
    color: var(--Tabs-active-color);
    background: var(--Tabs-active-bg);
}

/* Disabled tab */
.TabsHeaderItem-disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

/* Tab icon */
.TabsHeaderIcon {
    font-size: var(--font-size);
}

/* Tab label */
.TabsHeaderLabel {
    white-space: nowrap;
}

/* Tab content area */
.TabsContent {
    padding: var(--sp2);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .TabsHeaderItem {
        transition: none;
    }
}
</style>
