<template>
    <Btn
        :icon="justCopied ? 'fas fa-check' : icon"
        :kind="justCopied ? 'success' : kind"
        :label="showLabel ? (justCopied ? successLabel : label) : ''"
        :title="title"
        :square="!showLabel"
        :size="size"
        @uiactivate.stop="copyToClipboard" />
</template>

<script>
export default {

    props: {
        value: { type: String, required: true },
        label: { type: String, default: 'Copy' },
        successLabel: { type: String, default: 'Copied!' },
        title: { type: String, default: 'Copy to clipboard' },
        icon: { type: String, default: 'far fa-clipboard' },
        kind: { type: String, default: 'default' },
        size: { type: String, default: 'normal' },
        showLabel: { type: Boolean, default: false },
        feedbackDuration: { type: Number, default: 1500 },
    },

    emits: ['copy', 'error'],

    data() {
        return {
            justCopied: false,
            timeoutId: null,
        };
    },

    beforeUnmount() {
        if (this.timeoutId) {
            clearTimeout(this.timeoutId);
        }
    },

    methods: {

        copyToClipboard() {
            navigator.clipboard.writeText(this.value)
                .then(() => {
                    this.justCopied = true;
                    this.$emit('copy', this.value);
                    if (this.timeoutId) {
                        clearTimeout(this.timeoutId);
                    }
                    this.timeoutId = setTimeout(() => {
                        this.justCopied = false;
                        this.timeoutId = null;
                    }, this.feedbackDuration);
                })
                .catch(err => {
                    this.$emit('error', err);
                });
        },

    },

};
</script>
