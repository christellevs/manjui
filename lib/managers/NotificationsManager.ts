import { init } from '../utils/init.js';
import { provide } from '../utils/provide.js';
import { ShortcutHandler } from '../utils/shortcuts.js';

export type NotificationLevel = 'info' | 'warn' | 'error';

export interface Notification {
    id: string;
    message: string;
    icon: string;
    level: NotificationLevel;
    canClose: boolean;
    timeout: number;
    primaryAction?: NotificationAction;
    secondaryAction?: NotificationAction;
}

export interface NotificationAction {
    title: string;
    action: () => void | Promise<void>;
}

const DEFAULT_ICONS = {
    'info': 'fas fa-circle-info',
    'warn': 'fas fa-triangle-exclamation',
    'error': 'fas fa-circle-exclamation',
};

@provide('notifications')
export class NotificationsManager {

    all: Notification[] = [];

    shortcuts = new ShortcutHandler();

    @init()
    init() {
        this.shortcuts.bind({ key: 'Esc' }, () => this.removeClosable());
        this.shortcuts.attach(window);
    }

    add(spec: Partial<Notification>): Notification {
        const nn = this.create(spec);
        this.removeById(nn.id);
        this.all.push(nn);
        if (nn.timeout > 0) {
            setTimeout(() => this.removeById(nn.id), nn.timeout);
        }
        return nn;
    }

    addInfo(message: string, id: string = message) {
        this.removeById(message);
        return this.add({
            id,
            level: 'info',
            timeout: 5000,
            message,
        });
    }

    addError(message: string) {
        this.removeById(message);
        return this.add({
            id: message,
            level: 'error',
            timeout: 10000,
            message,
        });
    }

    removeById(id: string) {
        this.all = this.all.filter(_ => !this.matchById(_, id));
    }

    removeClosable() {
        this.all = this.all.filter(_ => !_.canClose);
    }

    protected create(spec: Partial<Notification>): Notification {
        const level = spec.level ?? 'info';
        return {
            id: Math.random().toString(36).substring(2, 8),
            message: '',
            icon: DEFAULT_ICONS[level],
            level,
            canClose: true,
            timeout: 0,
            ...spec,
        };
    }

    protected matchById(notification: Notification, id: string) {
        const pattern = new RegExp('^' + id.replace(/\*/g, '.*') + '$');
        return pattern.test(notification.id);
    }

}
