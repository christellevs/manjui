import { reactive, ReactiveFlags } from '@vue/reactivity';
import { Mesh } from 'mesh-ioc';
import { App as VueApp } from 'vue';

import * as components from './components/index.js';
import { ThemeManager } from './managers/ThemeManager.js';
import { invokeInitHandlers } from './utils/init.js';
import { globalProvideMap } from './utils/provide.js';

export interface ManjuiConfig {
    themeStorageKey?: string;
}

export class BaseApp {

    provides: Record<string, any> = {};

    constructor(
        readonly vue: VueApp,
        readonly mesh: Mesh = new Mesh(),
        readonly config: ManjuiConfig = {},
    ) {
        // There's a weird issue with Vue proxies not properly
        // storing the reactive instances in Mesh if the mesh is also reactive
        // (which can cause a tremendous amount of frustration,
        // especially for the faint of heart).
        // This flag calms Vue down.
        // Note: it's not documented, so it may change in non-major Vue releases. Watch out!
        (this.mesh as any)[ReactiveFlags.RAW] = true;
        this.mesh.use((instance: any) => reactive(instance));
        this.mesh.constant('App', this);
        this.mesh.constant('Vue', this.vue);
        this.mesh.constant('ManjuiConfig', this.config);
        vue.provide('app', this);
        const themeManager = new ThemeManager(this.config);
        this.mesh.constant('ThemeManager', themeManager);
        for (const [name, comp] of Object.entries(components)) {
            vue.component(name, comp);
        }
    }

    async start() {
        await this.init();
        this.provideServices();
        this.vue.mount('#root');
    }

    protected provideServices() {
        this.provides = {};
        for (const [alias, ctor] of globalProvideMap) {
            const instance = this.mesh.resolve(ctor);
            this.vue.provide(alias, instance);
            this.provides[alias] = instance;
        }
    }

    async init() {
        await invokeInitHandlers(this.mesh);
    }

}

