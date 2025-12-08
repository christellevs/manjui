import { init } from '../utils/init.js';
import { provide } from '../utils/provide.js';

@provide('date')
export class DateManager {

    private tick = 1;

    useLocalTime = false;

    defaultOptions: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
        hour: 'numeric',
        minute: 'numeric',
        year: 'numeric',
        hour12: false,
    };

    @init()
    init() {
        setInterval(() => {
            this.tick = this.tick % 10 + 1;
        }, 5000);
        this.useLocalTime = localStorage.getItem('useLocalTime') === 'true';
    }

    get utcOffset() {
        const date = new Date();
        const timezoneOffset = date.getTimezoneOffset();
        const hour = Math.floor((timezoneOffset) / 60);
        return hour > 0 ? `+${hour}` : `${hour}`;
    }

    utc(millis: number) {
        return new Date(millis).toUTCString();
    }

    format(millis: number, dateFormatOptions?: Intl.DateTimeFormatOptions) {
        let options = this.defaultOptions;
        if (dateFormatOptions) {
            options = dateFormatOptions;
        }
        options.timeZone = this.useLocalTime ? Intl.DateTimeFormat().resolvedOptions().timeZone : 'UTC';
        return new Date(millis).toLocaleDateString(undefined, options).replace(' at', ',');
    }

    relative(millis: number) {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        this.tick;
        if (Math.abs(millis - Date.now()) < 60000) {
            return 'Just now';
        }
        return this.formatRelative(millis);
    }

    setUseLocalTime(value: boolean) {
        this.useLocalTime = value;
        localStorage.setItem('useLocalTime', `${value}`);
    }

    private formatRelative(millis: number): string {
        const now = Date.now();
        const diff = millis - now;
        const absDiff = Math.abs(diff);
        const seconds = Math.floor(absDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        const isFuture = diff > 0;
        const suffix = isFuture ? 'from now' : 'ago';

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ${suffix}`;
        }
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${suffix}`;
        }
        if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ${suffix}`;
        }
        return `${seconds} second${seconds > 1 ? 's' : ''} ${suffix}`;
    }

}
