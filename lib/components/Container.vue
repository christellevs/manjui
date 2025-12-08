<template>
    <div
        class="Container"
        :class="[
            `Container-${size}`,
            { 'Container-padded': padding }
        ]">
        <slot />
    </div>
</template>

<script>
export default {

    props: {
        size: {
            type: String,
            default: 'normal',
            validator: function (value) {
                return ['small', 'normal', 'large', 'full'].includes(value);
            }
        },
        padding: { type: Boolean, default: true },
    },

};
</script>

<style scoped>
.Container {
    --Container-width: 960px;

    width: 100%;
    max-width: var(--Container-width);
    margin-left: auto;
    margin-right: auto;
    box-sizing: border-box;
}

/* Size variants */
.Container-small {
    --Container-width: 640px;
}

.Container-normal {
    --Container-width: 960px;
}

.Container-large {
    --Container-width: 1280px;
}

.Container-full {
    --Container-width: 100%;
}

/* Padding */
.Container-padded {
    padding-left: var(--sp2);
    padding-right: var(--sp2);
}

@media (min-width: 768px) {
    .Container-padded {
        padding-left: var(--sp3);
        padding-right: var(--sp3);
    }
}

@media (min-width: 1024px) {
    .Container-padded {
        padding-left: var(--sp4);
        padding-right: var(--sp4);
    }
}
</style>
