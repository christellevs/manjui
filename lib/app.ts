import { reactive, ReactiveFlags } from '@vue/reactivity';
import { Mesh } from 'mesh-ioc';
import { App as VueApp } from 'vue';

import * as components from './components/index.js';
import { ThemeManager } from './utils/ThemeManager.js';
import { invokeInitHandlers } from './utils/init.js';
import { globalProvideMap } from './utils/provide.js';

export class BaseApp {

    provides: Record<string, any> = {};

    constructor(
        readonly vue: VueApp,
        readonly mesh: Mesh = new Mesh(),
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
        vue.provide('app', this);
        this.mesh.service(ThemeManager);
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

