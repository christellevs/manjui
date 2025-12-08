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
    background-color: var(--color-base-3);
    width: 100%;
}
</style>
