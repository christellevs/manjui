import { init } from '../utils/init.js';
import { provide } from '../utils/provide.js';
import type { ManjuiConfig } from '../app.js';

export type ThemeToken = 'light' | 'dark' | 'auto';

@provide('themeManager')
export class ThemeManager {

    currentTheme: ThemeToken = 'auto';
    storageKey = 'theme';

    constructor(config: ManjuiConfig = {}) {
        this.storageKey = config.themeStorageKey ?? 'theme';
    }

    @init()
    init() {
        this.loadTheme();
        this.applyTheme();
        this.listenForSystemThemeChanges();
    }

    setTheme(theme: ThemeToken) {
        this.currentTheme = theme;
        this.saveTheme();
        this.applyTheme();
    }

    toggleTheme() {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
    }

    protected applyTheme() {
        const doc = document.documentElement;
        const themeToken = this.currentTheme === 'auto' ? this.getSystemTheme() : this.currentTheme;
        doc.classList.remove('theme-light');
        doc.classList.remove('theme-dark');
        doc.classList.add(`theme-${themeToken}`);
        window.dispatchEvent(new CustomEvent('themeChanged'));
    }

    protected loadTheme() {
        this.currentTheme = this.getLocalStorageTheme();
    }

    protected saveTheme() {
        if (this.currentTheme === 'auto') {
            localStorage.removeItem(this.storageKey);
        } else {
            localStorage.setItem(this.storageKey, this.currentTheme);
        }
    }

    protected listenForSystemThemeChanges() {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        query.addEventListener('change', () => {
            if (this.currentTheme === 'auto') {
                this.applyTheme();
            }
        });
    }

    protected getLocalStorageTheme(): ThemeToken {
        const tok = localStorage.getItem(this.storageKey) ?? '';
        if (['dark', 'light'].includes(tok)) {
            return tok as ThemeToken;
        }
        return 'auto';
    }

    protected getSystemTheme(): ThemeToken {
        const m = window.matchMedia('(prefers-color-scheme: dark)').matches;
        return m ? 'dark' : 'light';
    }

}
