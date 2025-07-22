import { Event } from 'nanoevent';

export abstract class Loader<Arg = void> {

    loaded = false;
    onLoad = new Event<void>();
    onUnload = new Event<void>();

    protected _loadPromise: Promise<void> | undefined = undefined;
    protected _lastArg: Arg | undefined = undefined;

    protected abstract doLoad(arg: Arg): Promise<void>;
    protected abstract doUnload(): void;

    async load(arg: Arg) {
        if (this._lastArg !== arg) {
            this.unload();
        }
        if (!this._loadPromise) {
            this.loaded = false;
            this._lastArg = arg;
            this._loadPromise = (async () => {
                await this.doLoad(arg);
                this.loaded = true;
                this.onLoad.emit();
            })();
        }
        await this._loadPromise;
    }

    unload() {
        this.loaded = false;
        this._lastArg = undefined;
        this._loadPromise = undefined;
        this.doUnload();
        this.onUnload.emit();
    }

    async reload(arg: Arg) {
        this.unload();
        await this.load(arg);
    }

}