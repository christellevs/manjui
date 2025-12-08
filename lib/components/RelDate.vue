<template>
    <span
        class="RelDate"
        :title="fullDateTitle">
        {{ relativeTime }}
    </span>
</template>

<script>
export default {

    props: {
        value: {
            type: [Date, String, Number],
            required: true,
        },
        updateInterval: {
            type: Number,
            default: 60000,
        },
        locale: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            intervalId: null,
            currentTime: Date.now(),
        };
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

        relativeTime() {
            if (!this.dateValue || isNaN(this.dateValue.getTime())) {
                return '';
            }

            const now = this.currentTime;
            const timestamp = this.dateValue.getTime();
            const diffMs = now - timestamp;
            const diffSeconds = Math.floor(diffMs / 1000);
            const diffMinutes = Math.floor(diffSeconds / 60);
            const diffHours = Math.floor(diffMinutes / 60);
            const diffDays = Math.floor(diffHours / 24);
            const diffWeeks = Math.floor(diffDays / 7);
            const diffMonths = Math.floor(diffDays / 30);
            const diffYears = Math.floor(diffDays / 365);

            try {
                const rtf = new Intl.RelativeTimeFormat(this.effectiveLocale, {
                    numeric: 'auto',
                });

                if (Math.abs(diffSeconds) < 60) {
                    return rtf.format(-diffSeconds, 'second');
                }

                if (Math.abs(diffMinutes) < 60) {
                    return rtf.format(-diffMinutes, 'minute');
                }

                if (Math.abs(diffHours) < 24) {
                    return rtf.format(-diffHours, 'hour');
                }

                if (Math.abs(diffDays) < 7) {
                    return rtf.format(-diffDays, 'day');
                }

                if (Math.abs(diffWeeks) < 4) {
                    return rtf.format(-diffWeeks, 'week');
                }

                if (Math.abs(diffMonths) < 12) {
                    return rtf.format(-diffMonths, 'month');
                }

                return rtf.format(-diffYears, 'year');
            } catch (_err) {
                return this.fallbackRelativeTime(diffMs);
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

    watch: {

        updateInterval: function () {
            this.stopUpdateInterval();
            this.startUpdateInterval();
        },

    },

    mounted() {
        this.startUpdateInterval();
    },

    unmounted() {
        this.stopUpdateInterval();
    },

    methods: {

        startUpdateInterval() {
            if (this.updateInterval > 0) {
                this.intervalId = setInterval(this.updateCurrentTime.bind(this), this.updateInterval);
            }
        },

        stopUpdateInterval() {
            if (this.intervalId) {
                clearInterval(this.intervalId);
                this.intervalId = null;
            }
        },

        updateCurrentTime() {
            this.currentTime = Date.now();
        },

        fallbackRelativeTime(diffMs) {
            const absDiff = Math.abs(diffMs);
            const isPast = diffMs > 0;
            const suffix = isPast ? ' ago' : ' from now';

            const seconds = Math.floor(absDiff / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            if (seconds < 60) {
                return 'just now';
            }

            if (minutes < 60) {
                return minutes + ' minute' + (minutes === 1 ? '' : 's') + suffix;
            }

            if (hours < 24) {
                return hours + ' hour' + (hours === 1 ? '' : 's') + suffix;
            }

            return days + ' day' + (days === 1 ? '' : 's') + suffix;
        },

    },

};
</script>

<style scoped>
.RelDate {
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
}
</style>
