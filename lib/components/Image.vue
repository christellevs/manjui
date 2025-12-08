<template>
    <img
        v-if="src"
        class="Image"
        :class="[
            `Image-size-${size}`,
            `Image-align--${align}`,
            {
                'Image--hover': hover,
                'Image--flip': flip,
                'Image--hoverPop': hoverPop
            }
        ]"
        :src="src"
        :alt="alt" />

</template>

<script>
export default {
    props: {
        src: { type: String, required: true },
        alt: { type: String, required: true },
        size: {
            type: String,
            default: 'medium',
            validator: value => ['icon', 'smallest', 'smaller', 'small', 'medium', 'large', 'larger', 'largest'].includes(value)
        },
        align: {
            type: String,
            default: 'start',
            validator: value => ['start', 'center', 'end'].includes(value)
        },
        hover: { type: Boolean, default: false },
        flip: { type: Boolean, default: false },
        hoverPop: { type: Boolean, default: false }
    },
};
</script>

<style scoped>
.Image {
    transition: transform var(--duration-normal, 200ms) var(--ease-standard, ease);
}

/* Size variants */
.Image-size-medium { width: var(--image-size); }
.Image-size-icon { width: var(--image-size-icon); }
.Image-size-smallest { width: var(--image-size-smallest); }
.Image-size-smaller { width: var(--image-size-smaller); }
.Image-size-small { width: var(--image-size-small); }
.Image-size-large { width: var(--image-size-large); }
.Image-size-larger { width: var(--image-size-larger); }
.Image-size-largest { width: var(--image-size-largest); }

/* Alignment */
.Image-align--start {
    margin-right: auto;
    margin-left: 0;
    display: block;
}

.Image-align--center {
    margin-left: auto;
    margin-right: auto;
    display: block;
}

.Image-align--end {
    margin-left: auto;
    margin-right: 0;
    display: block;
}

/* Hover effects */
.Image--hover:hover {
    transform: scale(var(--image-hover-scale, 1.03));
}

.Image--hoverPop:hover {
    transform: scale(var(--image-hover-scale, 1.03));
    box-shadow: var(--shadow-soft-lg, 0 8px 32px -8px hsla(280, 10%, 20%, 0.2));
}

/* Flip transform */
.Image--flip {
    transform: scaleX(-1);
}

.Image--flip.Image--hover:hover,
.Image--flip.Image--hoverPop:hover {
    transform: scaleX(-1) scale(var(--image-hover-scale, 1.03));
}
</style>
