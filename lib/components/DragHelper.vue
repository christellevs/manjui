<template>
    <div
        ref="element"
        class="DragHelper"
        :class="{
            'DragHelper-dragging': isDragging,
            'DragHelper-dragover': isDragOver,
            'DragHelper-disabled': !draggable,
        }"
        :draggable="draggable"
        @dragstart="onDragStart"
        @dragend="onDragEnd"
        @dragenter="onDragEnter"
        @dragover="onDragOver"
        @dragleave="onDragLeave"
        @drop="onDrop">
        <slot
            :isDragging="isDragging"
            :isDragOver="isDragOver" />
    </div>
</template>

<script>
export default {

    props: {
        draggable: {
            type: Boolean,
            default: true,
        },
        data: {
            type: [Object, String, Number, Array],
            default: null,
        },
        group: {
            type: String,
            default: 'default',
        },
        dragImage: {
            type: Object,
            default: null,
        },
        dropEffect: {
            type: String,
            default: 'move',
            validator: function (value) {
                return ['none', 'copy', 'link', 'move'].includes(value);
            },
        },
    },

    emits: ['dragstart', 'dragend', 'drop', 'dragenter', 'dragleave'],

    data() {
        return {
            isDragging: false,
            isDragOver: false,
            dragEnterCount: 0,
        };
    },

    methods: {

        onDragStart(event) {
            if (!this.draggable) {
                event.preventDefault();
                return;
            }

            this.isDragging = true;

            const transferData = {
                group: this.group,
                data: this.data,
            };

            event.dataTransfer.setData('application/json', JSON.stringify(transferData));
            event.dataTransfer.setData('text/plain', this.group);
            event.dataTransfer.effectAllowed = this.dropEffect;

            if (this.dragImage && this.dragImage.element) {
                const x = this.dragImage.offsetX || 0;
                const y = this.dragImage.offsetY || 0;
                event.dataTransfer.setDragImage(this.dragImage.element, x, y);
            }

            this.$emit('dragstart', {
                event: event,
                data: this.data,
                group: this.group,
            });
        },

        onDragEnd(event) {
            this.isDragging = false;
            this.isDragOver = false;
            this.dragEnterCount = 0;

            this.$emit('dragend', {
                event: event,
                data: this.data,
                group: this.group,
            });
        },

        onDragEnter(event) {
            this.dragEnterCount++;

            if (this.dragEnterCount === 1) {
                if (this.canAcceptDrop(event)) {
                    event.preventDefault();
                    this.isDragOver = true;

                    this.$emit('dragenter', {
                        event: event,
                        group: this.group,
                    });
                }
            }
        },

        onDragOver(event) {
            if (this.canAcceptDrop(event)) {
                event.preventDefault();
                event.dataTransfer.dropEffect = this.dropEffect;
            }
        },

        onDragLeave(event) {
            this.dragEnterCount--;

            if (this.dragEnterCount === 0) {
                this.isDragOver = false;

                this.$emit('dragleave', {
                    event: event,
                    group: this.group,
                });
            }
        },

        onDrop(event) {
            event.preventDefault();
            this.isDragOver = false;
            this.dragEnterCount = 0;

            let transferData = null;

            try {
                const jsonData = event.dataTransfer.getData('application/json');
                if (jsonData) {
                    transferData = JSON.parse(jsonData);
                }
            } catch (_err) {
                // Fallback to plain text
                transferData = {
                    group: event.dataTransfer.getData('text/plain'),
                    data: null,
                };
            }

            if (transferData && this.canAcceptGroup(transferData.group)) {
                this.$emit('drop', {
                    event: event,
                    sourceData: transferData.data,
                    sourceGroup: transferData.group,
                    targetData: this.data,
                    targetGroup: this.group,
                });
            }
        },

        canAcceptDrop(event) {
            const types = event.dataTransfer.types;
            if (!types) {
                return false;
            }

            for (const type of types) {
                if (type === 'application/json' || type === 'text/plain') {
                    return true;
                }
            }

            return false;
        },

        canAcceptGroup(sourceGroup) {
            return sourceGroup === this.group;
        },

    },

};
</script>

<style scoped>
.DragHelper {
    --DragHelper-dragging-opacity: 0.5;
    --DragHelper-dragover-bg: var(--color-primary-a10);
    --DragHelper-dragover-border: var(--color-primary-2);

    position: relative;
    transition:
        opacity 0.15s ease,
        background-color 0.15s ease,
        border-color 0.15s ease,
        box-shadow 0.15s ease;
}

.DragHelper:not(.DragHelper-disabled) {
    cursor: grab;
}

.DragHelper:not(.DragHelper-disabled):active {
    cursor: grabbing;
}

.DragHelper-disabled {
    cursor: default;
}

.DragHelper-dragging {
    opacity: var(--DragHelper-dragging-opacity);
    cursor: grabbing;
}

.DragHelper-dragover {
    background-color: var(--DragHelper-dragover-bg);
    outline: 2px dashed var(--DragHelper-dragover-border);
    outline-offset: -2px;
    border-radius: var(--border-radius);
}

@media (prefers-reduced-motion: reduce) {
    .DragHelper {
        transition: none;
    }
}
</style>
