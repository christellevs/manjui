import { Mesh, MESH_REF } from 'mesh-ioc';

import { BaseRouter } from '../managers/BaseRouter.js';
import { NotificationLevel, NotificationsManager } from '../managers/NotificationsManager.js';

export interface HandleErrorOptions {
    genericMessage?: string;
    errorMessages?: Record<string, string>;
    level?: NotificationLevel;
    timeout?: number;
    route?: string;
}

export function handleError(options: HandleErrorOptions) {
    return function (_target: object, _key: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = async function (...args: unknown[]) {
            try {
                return await originalMethod.apply(this, args);
            } catch (error: unknown) {
                console.warn(error);
                const mesh = (this as Record<string | symbol, unknown>)[MESH_REF] as Mesh;
                const err = error as { name?: string };
                const isAuthError = err.name === 'AuthenticationRequiredError';

                if (isAuthError) {
                    sessionStorage.setItem('redirectUrl', location.href);
                    location.href = `${location.origin}/login`;
                    return;
                }

                const message = options.errorMessages?.[err.name ?? ''] ?? options.genericMessage;
                if (message) {
                    const notifications = mesh.resolve(NotificationsManager);

                    notifications.add({
                        level: options.level ?? 'error',
                        message,
                        timeout: options.timeout ?? 5000,
                    });
                }

                if (options.route) {
                    if (err.name === 'AccessDeniedError') {
                        sessionStorage.setItem('redirectUrl', location.href);
                    }
                    const router = mesh.resolve(BaseRouter);
                    router.goto({ name: options.route });
                }
            }
        };
    };
}
