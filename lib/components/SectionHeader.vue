<template>
    <component
        :is="headingTag"
        class="SectionHeader">
        <div class="SectionHeaderContent">
            <span class="SectionTitle">{{ title }}</span>
            <span
                v-if="subtitle || $slots.default"
                class="SectionSubtitle">
                <slot>{{ subtitle }}</slot>
            </span>
        </div>
        <div
            v-if="$slots.actions"
            class="SectionActions">
            <slot name="actions" />
        </div>
    </component>
</template>

<script>
export default {

    props: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        level: {
            type: Number,
            default: 2,
            validator: function (value) {
                return value >= 1 && value <= 6;
            }
        },
    },

    computed: {

        headingTag() {
            return `h${this.level}`;
        },

    },

};
</script>

<style scoped>
.SectionHeader {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: var(--sp2);
    margin: 0;
    font-weight: normal;
}

.SectionHeaderContent {
    display: flex;
    flex-direction: column;
    gap: var(--sp0-5);
    flex: 1;
    min-width: 0;
}

.SectionTitle {
    font-size: var(--font-size-xlarge);
    font-weight: var(--font-weight-bold);
    color: var(--color-text-0);
    line-height: 1.2;
}

.SectionSubtitle {
    font-size: var(--font-size);
    font-weight: normal;
    color: var(--color-text-1);
    line-height: 1.4;
}

.SectionActions {
    display: flex;
    align-items: center;
    gap: var(--sp);
    flex-shrink: 0;
}

/* Adjust size based on heading level */
h1.SectionHeader .SectionTitle {
    font-size: var(--font-size-xxlarge);
}

h2.SectionHeader .SectionTitle {
    font-size: var(--font-size-xlarge);
}

h3.SectionHeader .SectionTitle {
    font-size: var(--font-size-large);
}

h4.SectionHeader .SectionTitle {
    font-size: var(--font-size);
}

h5.SectionHeader .SectionTitle {
    font-size: var(--font-size-small);
}

h6.SectionHeader .SectionTitle {
    font-size: var(--font-size-small);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
</style>
