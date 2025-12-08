<template>
    <svg
        ref="svg"
        :width="width"
        :height="height"
        :viewBox="`0 0 ${width} ${height}`"
        class="LoadingAnimation">
        <path
            v-for="path, i of linkPaths"
            :key="i"
            class="FigLink"
            :d="path" />
        <rect
            v-for="pos, i of nodePositions"
            :key="i"
            class="FigNode"
            :x="pos.x - nodeSize * .5"
            :y="pos.y - nodeSize * .5"
            :width="nodeSize"
            :height="nodeSize"
            stroke-width="2" />
    </svg>
</template>

<script>
function curveBetween(a, b) {
    const dx = b.x - a.x;
    const cx1 = a.x + dx * 0.5;
    const cy1 = a.y;
    const cx2 = a.x + dx * 0.5;
    const cy2 = b.y;
    return `M ${a.x} ${a.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${b.x} ${b.y}`;
}

export default {

    data() {
        return {
            playing: true,
            width: 240,
            height: 240,
            nodeSize: 8,
            nodesCount: 6,
            nodePositions: [],
            links: [],
            linkPaths: [],
        };
    },

    mounted() {
        this.init();
        this.play();
    },

    unmounted() {
        this.playing = false;
    },

    methods: {

        async play() {
            this.playing = true;
            while (this.playing) {
                const i = Math.floor(Math.random() * this.nodesCount);
                this.nodePositions[i] = this.getRandomPoint();
                this.updateLinks();
                const wait = this.getRandomValue(400, 1000);
                await new Promise(r => setTimeout(r, wait));
            }
        },

        init() {
            for (let i = 0; i < this.nodesCount; i++) {
                this.nodePositions.push(this.getRandomPoint());
                for (let j = i + 1; j < this.nodesCount; j++) {
                    if (Math.random() > .5) {
                        this.links.push([i, j]);
                    }
                }
            }
            this.updateLinks();
        },

        updateLinks() {
            for (const [index, link] of Object.entries(this.links)) {
                const a = this.nodePositions[link[0]];
                const b = this.nodePositions[link[1]];
                this.linkPaths[index] = curveBetween(a, b);
            }
        },

        getRandomPoint() {
            return {
                x: this.getRandomValue(this.nodeSize, this.width - this.nodeSize),
                y: this.getRandomValue(this.nodeSize, this.height - this.nodeSize),
            };
        },

        getRandomValue(min, max) {
            return Math.random() * (max - min) + min;
        },

    }

};

</script>

<style scoped>
.FigNode {
    stroke: var(--color-primary);
    transition: all .3s;
    fill: var(--color-focus-1);
    stroke-linejoin: round;
}

.FigLink {
    fill: none;
    stroke: var(--color-focus-1);
    transition: all .3s;
}
</style>
