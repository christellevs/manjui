import { Plugin, reactive } from 'vue';

import { ThemeManager } from '../managers/ThemeManager.js';
import type { ManjuiConfig } from '../app.js';

export const themePlugin: Plugin<[ManjuiConfig?]> = {
    install(app, options: ManjuiConfig = {}) {
        const themeManager = reactive(new ThemeManager(options));
        app.provide('themeManager', themeManager);
        themeManager.init();
    }
};
