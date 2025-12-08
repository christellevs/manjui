<template>
    <span
        class="FormattedDate"
        :title="fullDateTitle">
        {{ formattedDate }}
    </span>
</template>

<script>
export default {

    props: {
        value: {
            type: [Date, String, Number],
            required: true,
        },
        format: {
            type: String,
            default: 'medium',
            validator: function (value) {
                return ['short', 'medium', 'long', 'full'].includes(value) || typeof value === 'string';
            },
        },
        locale: {
            type: String,
            default: '',
        },
    },

    computed: {

        dateValue() {
            if (this.value instanceof Date) {
                return this.value;
            }

            if (typeof this.value === 'number') {
                return new Date(this.value);
            }

            if (typeof this.value === 'string') {
                return new Date(this.value);
            }

            return new Date();
        },

        effectiveLocale() {
            return this.locale || undefined;
        },

        formatOptions() {
            const presets = {
                short: {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                },
                medium: {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                },
                long: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                },
                full: {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                },
            };

            return presets[this.format] || presets.medium;
        },

        formattedDate() {
            if (!this.dateValue || isNaN(this.dateValue.getTime())) {
                return '';
            }

            try {
                const formatter = new Intl.DateTimeFormat(this.effectiveLocale, this.formatOptions);
                return formatter.format(this.dateValue);
            } catch (_err) {
                return this.dateValue.toLocaleDateString();
            }
        },

        fullDateTitle() {
            if (!this.dateValue || isNaN(this.dateValue.getTime())) {
                return '';
            }

            try {
                const formatter = new Intl.DateTimeFormat(this.effectiveLocale, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    weekday: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short',
                });
                return formatter.format(this.dateValue);
            } catch (_err) {
                return this.dateValue.toString();
            }
        },

    },

};
</script>

<style scoped>
.FormattedDate {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}
</style>
