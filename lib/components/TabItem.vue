<template>
    <div
        v-show="isActive"
        :id="`tabpanel-${id}`"
        class="TabItem"
        role="tabpanel"
        :aria-labelledby="`tab-${id}`">
        <slot />
    </div>
</template>

<script>
export default {

    inject: ['tabsActiveId', 'tabsRegister', 'tabsUnregister'],

    props: {
        id: { type: String, required: true },
        label: { type: String, default: '' },
        icon: { type: String, default: '' },
        disabled: { type: Boolean, default: false },
    },

    computed: {

        isActive() {
            return this.tabsActiveId() === this.id;
        },

    },

    watch: {

        label: {
            handler: function () {
                this.updateTab();
            },
        },

        icon: {
            handler: function () {
                this.updateTab();
            },
        },

        disabled: {
            handler: function () {
                this.updateTab();
            },
        },

    },

    mounted() {
        this.tabsRegister({
            id: this.id,
            label: this.label,
            icon: this.icon,
            disabled: this.disabled,
        });
    },

    unmounted() {
        this.tabsUnregister(this.id);
    },

    methods: {

        updateTab() {
            this.tabsUnregister(this.id);
            this.tabsRegister({
                id: this.id,
                label: this.label,
                icon: this.icon,
                disabled: this.disabled,
            });
        },

    },

};
</script>

<style scoped>
.TabItem {
    /* Tab panel styles - content area */
}
</style>
