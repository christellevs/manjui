<template>
    <a
        class="Link"
        :class="[
            `Link-hoverKind--${hoverKind}`,
            {
                'Link-hasLabel': label
            }
        ]"
        :href="href"
        :target="newTab ? '_blank' : '_self'"
        :rel="newTab ? 'noopener noreferrer' : undefined">

        <Icon
            v-if="icon"
            class="LinkIcon"
            :icon="icon"
            :size="iconSize"
            :kind="iconKind" />

        <span
            v-if="label"
            class="LinkLabel">
            {{ label }}
        </span>

    </a>
</template>

<script>
export default {
    props: {
        href: { type: String, required: true },
        label: { type: String, required: false },
        icon: { type: String, required: false },
        iconSize: { type: String, required: false },
        iconKind: { type: String, required: false },
        hoverKind: {
            type: String,
            default: 'default',
            validator: value => ['default', 'primary', 'secondary', 'tertiary'].includes(value)
        },
        newTab: { type: Boolean, default: false }
    }
};
</script>

<style scoped>
.Link {
    display: inline-flex;
    align-items: center;
    gap: var(--sp0-5);
    text-decoration: none;
    transition: color var(--duration-fast, 120ms) var(--ease-standard, ease);
}

.Link:hover {
    text-decoration: underline;
    text-underline-offset: 2px;
}

.LinkIcon {
    flex-shrink: 0;
}

.LinkLabel {
    text-decoration: inherit;
}

/* Hover kind variants */
.Link-hoverKind--default:hover { color: var(--color-text-1); }
.Link-hoverKind--primary:hover { color: var(--color-primary); }
.Link-hoverKind--secondary:hover { color: var(--color-secondary); }
.Link-hoverKind--tertiary:hover { color: var(--color-tertiary); }
</style>
