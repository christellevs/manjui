<template>
    <teleport to="#overlays">
        <div
            class="Overlay"
            :class="{
                'Overlay-enabled': overlayEnabled,
                'Overlay-shown': overlayShown,
            }"
            @click.stop="hide()">
            <PopupBubble
                v-if="ready"
                :dir="actualDir"
                :align="actualAlign"
                :style="bubbleStyle"
                :arrowShown="arrowShown"
                @mouseenter="$emit('mouseenter')"
                @mouseleave="$emit('mouseleave')"
                @click.stop="">
                <slot />
            </PopupBubble>
        </div>
    </teleport>
</template>

<script>
import { getAnchorPoint } from '../utils/dom.js';
import { ShortcutHandler } from '../utils/shortcuts.js';
import PopupBubble from './PopupBubble.vue';

export default {

    components: {
        PopupBubble,
    },

    inject: [
        'ui',
    ],

    props: {
        dir: { type: String, default: 'v' },
        align: { type: String, default: 'auto' },
        atCursor: { type: Boolean, default: false },
        anchorRef: { type: String },
        anchorDir: { type: String, default: 'middle' },
        overlayEnabled: { type: Boolean, default: true },
        overlayShown: { type: Boolean, default: true },
        arrowShown: { type: Boolean, default: true }
    },

    emits: ['hide', 'mouseenter', 'mouseleave', 'ready'],

    data() {
        return {
            shortcuts: new ShortcutHandler(),
            pos: {
                x: 0,
                y: 0,
            },
            actualDir: 'bottom',
            actualAlign: 'start',
            ready: false,
        };
    },

    computed: {

        bubbleStyle() {
            const { x, y } = this.pos;
            return {
                'left': `${x}px`,
                'top': `${y}px`,
                'pointer-events': 'auto',
            };
        },

    },

    mounted() {
        this.$nextTick(() => this.calcPos());
        this.shortcuts.bind({ key: 'Escape' }, () => this.hide());
        this.shortcuts.attach(window);
        window.addEventListener('resize', this.onResize);
    },

    unmounted() {
        this.shortcuts.detach();
        window.removeEventListener('resize', this.onResize);
    },

    methods: {

        hide() {
            this.$emit('hide');
        },

        calcPos() {
            if (this.atCursor) {
                this.pos = this.ui.lastMousePos;
            } else {
                const anchorEl = this.getAnchorEl();
                this.pos = anchorEl ? getAnchorPoint(anchorEl, this.anchorDir) : this.ui.lastMouseDownPos;
            }
            this.calcDirAlign();
            this.ready = true;
            this.$nextTick(() => this.$emit('ready'));
        },

        calcDirAlign() {
            const atTop = this.pos.y < window.innerHeight * .5;
            const atLeft = this.pos.x < window.innerWidth * .5;
            if (this.align === 'auto') {
                const verticalDir = ['top', 'bottom', 'v'].includes(this.dir);
                if (verticalDir) {
                    this.actualAlign = atLeft ? 'start' : 'end';
                } else {
                    this.actualAlign = atTop ? 'start' : 'end';
                }
            } else {
                this.actualAlign = this.align;
            }
            if (this.dir === 'v') {
                this.actualDir = atTop ? 'bottom' : 'top';
            } else if (this.dir === 'h') {
                this.actualDir = atLeft ? 'right' : 'left';
            } else {
                this.actualDir = this.dir;
            }
        },

        getAnchorEl() {
            if (this.anchorRef) {
                const ref = this.findRef(this.$parent, this.anchorRef);
                if (ref) {
                    return ref;
                }
            }
            return this.$el.parentElement;
        },

        findRef(component, refKey) {
            const ref = component.$refs[refKey];
            if (ref) {
                const el = ref.$el ?? ref;
                if (el instanceof HTMLElement) {
                    return el;
                }
            }
            if (component.$parent) {
                return this.findRef(component.$parent, refKey);
            }
            return null;
        },

        onResize() {
            this.calcPos();
        },

    },

};
</script>

<style scoped>
.Overlay {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
}

.Overlay-enabled {
    pointer-events: auto;
    overscroll-behavior: none;
    overflow: auto;
}

.Overlay-shown {
    background: rgba(0,0,0,.1);
}
</style>
