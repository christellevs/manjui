<template>
    <section class="Section">
        <div
            v-if="hasHeader"
            class="SectionHeaderWrapper">
            <slot name="header">
                <SectionHeader
                    :title="title"
                    :subtitle="subtitle">
                    <template
                        v-if="$slots.actions"
                        #actions>
                        <slot name="actions" />
                    </template>
                </SectionHeader>
            </slot>
        </div>
        <div
            v-if="divider && hasHeader"
            class="SectionDivider" />
        <div class="SectionContent">
            <slot />
        </div>
    </section>
</template>

<script>
import SectionHeader from './SectionHeader.vue';

export default {

    components: {
        SectionHeader,
    },

    props: {
        title: { type: String, default: '' },
        subtitle: { type: String, default: '' },
        divider: { type: Boolean, default: false },
    },

    computed: {

        hasHeader() {
            return this.title || this.subtitle || this.$slots.header || this.$slots.actions;
        },

    },

};
</script>

<style scoped>
.Section {
    display: flex;
    flex-direction: column;
}

.SectionHeaderWrapper {
    margin-bottom: var(--sp2);
}

.SectionDivider {
    height: 2px;
    background: var(--color-base-3);
    margin-bottom: var(--sp2);
}

.SectionContent {
    flex: 1;
}
</style>
