<template>
    <div
        class="Panel"
        :class="[
            `Panel-${kind}`,
            `Panel-padding-${padding}`,
            {
                'Panel-collapsible': collapsible,
                'Panel-collapsed': isCollapsed,
            }
        ]">
        <div
            v-if="hasHeader"
            class="PanelHeader"
            @click="onHeaderClick">
            <slot name="header">
                <div class="PanelHeaderContent">
                    <div class="PanelTitles">
                        <div
                            v-if="title"
                            class="PanelTitle">
                            {{ title }}
                        </div>
                        <div
                            v-if="subtitle"
                            class="PanelSubtitle">
                            {{ subtitle }}
                        </div>
                    </div>
                </div>
            </slot>
            <div
                v-if="$slots.actions || collapsible"
                class="PanelActions">
                <slot name="actions" />
                <button
                    v-if="collapsible"
                    type="button"
                    class="PanelCollapseBtn"
                    :aria-expanded="!isCollapsed"
                    :aria-label="isCollapsed ? 'Expand' : 'Collapse'">
                    <i
                        class="fa-solid fa-chevron-down"
                        :class="{ 'PanelCollapseIcon-rotated': isCollapsed }" />
                </button>
            </div>
        </div>
        <div
            v-show="!isCollapsed"
            class="PanelBody">
            <slot />
        </div>
        <div
            v-if="$slots.footer"
            v-show="!isCollapsed"
            class="PanelFooter">
            <slot name="footer" />
        </div>
    </div>
</template>

<script>
export default {

    props: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        collapsible: { type: Boolean, default: false },
        collapsed: { type: Boolean, default: false },
        kind: {
            type: String,
            default: 'default',
            validator: function (value) {
                return ['default', 'primary', 'secondary'].includes(value);
            }
        },
        padding: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['none', 'small', 'normal', 'large'].includes(value);
            }
        },
    },

    emits: ['update:collapsed'],

    data() {
        return {
            internalCollapsed: this.collapsed,
        };
    },

    computed: {

        isCollapsed() {
            return this.collapsible ? this.internalCollapsed : false;
        },

        hasHeader() {
            return this.title || this.subtitle || this.$slots.header || this.$slots.actions || this.collapsible;
        },

    },

    watch: {

        collapsed(newVal) {
            this.internalCollapsed = newVal;
        },

    },

    methods: {

        onHeaderClick() {
            if (this.collapsible) {
                this.internalCollapsed = !this.internalCollapsed;
                this.$emit('update:collapsed', this.internalCollapsed);
            }
        },

    },

};
</script>

<style scoped>
.Panel {
    --Panel-bg: var(--color-base-0);
    --Panel-border: var(--color-base-4);
    --Panel-shadow: var(--shadow-brutal-sm);
    --Panel-radius: var(--border-radius);
    --Panel-header-bg: transparent;
    --Panel-footer-bg: var(--color-base-1);

    background: var(--Panel-bg);
    border: 2px solid var(--Panel-border);
    border-radius: var(--Panel-radius);
    box-shadow: var(--Panel-shadow);
}

/* Padding variants */
.Panel-padding-none .PanelBody { padding: 0; }
.Panel-padding-small .PanelBody { padding: var(--sp); }
.Panel-padding-normal .PanelBody { padding: var(--sp2); }
.Panel-padding-large .PanelBody { padding: var(--sp3); }

/* Kind variants */
.Panel-default {
    --Panel-border: var(--color-base-4);
    --Panel-shadow: var(--shadow-brutal-sm);
}

.Panel-primary {
    --Panel-border: var(--color-primary-2);
    --Panel-shadow: var(--shadow-brutal-primary);
    --Panel-header-bg: var(--color-primary-a10);
}

.Panel-secondary {
    --Panel-border: var(--color-secondary-2);
    --Panel-shadow: var(--shadow-brutal-secondary);
    --Panel-header-bg: var(--color-secondary-a10);
}

/* Header */
.PanelHeader {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--sp2);
    padding: var(--sp1-5) var(--sp2);
    background: var(--Panel-header-bg);
    border-bottom: 2px solid var(--Panel-border);
    border-radius: calc(var(--Panel-radius) - 2px) calc(var(--Panel-radius) - 2px) 0 0;
}

.Panel-collapsible .PanelHeader {
    cursor: pointer;
    user-select: none;
}

.Panel-collapsible .PanelHeader:hover {
    background: var(--color-base-1);
}

.Panel-collapsed .PanelHeader {
    border-bottom: none;
    border-radius: calc(var(--Panel-radius) - 2px);
}

.PanelHeaderContent {
    flex: 1;
    min-width: 0;
}

.PanelTitles {
    display: flex;
    flex-direction: column;
    gap: var(--sp0-5);
}

.PanelTitle {
    font-size: var(--font-size);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-0);
    line-height: 1.3;
}

.PanelSubtitle {
    font-size: var(--font-size-small);
    color: var(--color-text-1);
    line-height: 1.3;
}

/* Actions area */
.PanelActions {
    display: flex;
    align-items: center;
    gap: var(--sp);
    flex-shrink: 0;
}

/* Collapse button */
.PanelCollapseBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: var(--sp3);
    height: var(--sp3);
    padding: 0;
    border: none;
    background: transparent;
    color: var(--color-text-1);
    cursor: pointer;
    border-radius: var(--radius-sm);
    transition: background-color var(--duration-fast) var(--ease-out);
}

.PanelCollapseBtn:hover {
    background: var(--color-base-2);
}

.PanelCollapseBtn i {
    transition: transform var(--duration-normal) var(--ease-out);
}

.PanelCollapseIcon-rotated {
    transform: rotate(-90deg);
}

/* Body */
.PanelBody {
    padding: var(--sp2);
}

/* Footer */
.PanelFooter {
    padding: var(--sp1-5) var(--sp2);
    background: var(--Panel-footer-bg);
    border-top: 2px solid var(--Panel-border);
    border-radius: 0 0 calc(var(--Panel-radius) - 2px) calc(var(--Panel-radius) - 2px);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .PanelCollapseBtn i {
        transition: none;
    }
}
</style>
