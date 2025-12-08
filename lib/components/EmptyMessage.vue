<template>
    <div class="EmptyMessage">
        <div
            v-if="icon"
            class="EmptyMessageIcon">
            <i :class="icon" />
        </div>
        <div
            v-if="title"
            class="EmptyMessageTitle">
            {{ title }}
        </div>
        <div
            v-if="message"
            class="EmptyMessageText">
            {{ message }}
        </div>
        <div
            v-if="$slots.default"
            class="EmptyMessageActions">
            <slot />
        </div>
    </div>
</template>

<script>
export default {

    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        message: {
            type: String,
            default: ''
        }
    }

};
</script>

<style scoped>
.EmptyMessage {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--sp1-5);
    padding: var(--sp4);
    text-align: center;
}

.EmptyMessageIcon {
    font-size: 48px;
    color: var(--color-text-3);
    margin-bottom: var(--sp);
}

.EmptyMessageTitle {
    font-size: var(--font-size-large, 18px);
    font-weight: var(--font-weight-bold, 600);
    color: var(--color-text-1);
    line-height: 1.3;
}

.EmptyMessageText {
    font-size: var(--font-size);
    color: var(--color-text-2);
    line-height: 1.5;
    max-width: 320px;
}

.EmptyMessageActions {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--sp);
    margin-top: var(--sp2);
}
</style>
