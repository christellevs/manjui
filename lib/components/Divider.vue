<template>
    <div
        class="Divider"
        :style="{ height: computedHeight }" />
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: '1px', // Default height
        },
    },

    computed: {
        computedHeight() {
            return this.height;
        },
    },
};
</script>

<style scoped>
.Divider {
    background-color: var(--color-text-0);
    width: 100%;
}
</style>