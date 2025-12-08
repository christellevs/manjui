<template>
    <div
        class="DataTable"
        :class="{
            'DataTable-striped': striped,
            'DataTable-hoverable': hoverable,
            'DataTable-compact': compact,
            'DataTable-loading': loading,
            'DataTable-borderless': borderless,
        }">
        <div
            v-if="loading"
            class="DataTableLoadingOverlay">
            <Spinner kind="primary" />
        </div>

        <table class="DataTableTable">
            <thead class="DataTableHead">
                <tr class="DataTableRow DataTableRow-header">
                    <th
                        v-if="selectable"
                        class="DataTableCell DataTableCell-select">
                        <span
                            class="DataTableCheckbox"
                            :class="{
                                'DataTableCheckbox-checked': isAllSelected,
                                'DataTableCheckbox-indeterminate': isPartiallySelected,
                            }"
                            @click="toggleSelectAll">
                            <svg
                                v-if="isAllSelected"
                                class="DataTableCheckIcon"
                                viewBox="0 0 16 16"
                                fill="none">
                                <path
                                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                            <svg
                                v-else-if="isPartiallySelected"
                                class="DataTableCheckIcon"
                                viewBox="0 0 16 16"
                                fill="none">
                                <path
                                    d="M4 8H12"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round" />
                            </svg>
                        </span>
                    </th>
                    <th
                        v-for="column of columns"
                        :key="column.key"
                        class="DataTableCell DataTableCell-header"
                        :class="[
                            `DataTableCell-align-${column.align || 'left'}`,
                            { 'DataTableCell-sortable': column.sortable },
                        ]"
                        :style="getColumnStyle(column)"
                        @click="column.sortable ? onSortColumn(column) : null">
                        <div class="DataTableCellContent">
                            <span class="DataTableColumnLabel">
                                {{ column.label }}
                            </span>
                            <span
                                v-if="column.sortable"
                                class="DataTableSortIcon"
                                :class="{
                                    'DataTableSortIcon-active': sortBy === column.key,
                                    'DataTableSortIcon-desc': sortBy === column.key && sortDir === 'desc',
                                }">
                                <svg
                                    viewBox="0 0 16 16"
                                    fill="none">
                                    <path
                                        d="M8 4L12 9H4L8 4Z"
                                        fill="currentColor" />
                                </svg>
                            </span>
                        </div>
                    </th>
                </tr>
            </thead>

            <tbody class="DataTableBody">
                <tr
                    v-for="(row, rowIndex) of data"
                    :key="getRowKey(row, rowIndex)"
                    class="DataTableRow DataTableRow-body"
                    :class="{
                        'DataTableRow-selected': isRowSelected(row, rowIndex),
                    }"
                    @click="onRowClick(row, rowIndex)">
                    <td
                        v-if="selectable"
                        class="DataTableCell DataTableCell-select">
                        <span
                            class="DataTableCheckbox"
                            :class="{
                                'DataTableCheckbox-checked': isRowSelected(row, rowIndex),
                            }"
                            @click.stop="toggleRowSelection(row, rowIndex)">
                            <svg
                                v-if="isRowSelected(row, rowIndex)"
                                class="DataTableCheckIcon"
                                viewBox="0 0 16 16"
                                fill="none">
                                <path
                                    d="M3.5 8.5L6.5 11.5L12.5 4.5"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round" />
                            </svg>
                        </span>
                    </td>
                    <td
                        v-for="column of columns"
                        :key="column.key"
                        class="DataTableCell DataTableCell-body"
                        :class="[`DataTableCell-align-${column.align || 'left'}`]"
                        :style="getColumnStyle(column)">
                        <slot
                            :name="column.key"
                            :row="row"
                            :column="column"
                            :index="rowIndex"
                            :value="row[column.key]">
                            {{ row[column.key] }}
                        </slot>
                    </td>
                </tr>

                <tr
                    v-if="data.length === 0 && !loading"
                    class="DataTableRow DataTableRow-empty">
                    <td
                        class="DataTableCell DataTableCell-empty"
                        :colspan="totalColumns">
                        <slot name="empty">
                            {{ emptyMessage }}
                        </slot>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import Spinner from './Spinner.vue';

export default {

    components: {
        Spinner,
    },

    props: {
        columns: { type: Array, required: true },
        data: { type: Array, default: function () { return []; } },
        sortBy: { type: String, default: null },
        sortDir: {
            type: String,
            default: 'asc',
            validator: function (value) {
                return ['asc', 'desc'].includes(value);
            },
        },
        selectable: { type: Boolean, default: false },
        selectedRows: { type: Array, default: function () { return []; } },
        striped: { type: Boolean, default: false },
        hoverable: { type: Boolean, default: true },
        compact: { type: Boolean, default: false },
        loading: { type: Boolean, default: false },
        emptyMessage: { type: String, default: 'No data available' },
        rowKey: { type: [String, Function], default: 'id' },
        borderless: { type: Boolean, default: false },
    },

    emits: [
        'update:sortBy',
        'update:sortDir',
        'update:selectedRows',
        'sort',
        'rowClick',
    ],

    computed: {

        totalColumns() {
            return this.columns.length + (this.selectable ? 1 : 0);
        },

        selectedSet() {
            return new Set(this.selectedRows);
        },

        isAllSelected() {
            return this.data.length > 0 && this.selectedRows.length === this.data.length;
        },

        isPartiallySelected() {
            return this.selectedRows.length > 0 && this.selectedRows.length < this.data.length;
        },

    },

    methods: {

        getRowKey(row, index) {
            if (typeof this.rowKey === 'function') {
                return this.rowKey(row, index);
            }
            return row[this.rowKey] !== undefined ? row[this.rowKey] : index;
        },

        getColumnStyle(column) {
            const style = {};
            if (column.width) {
                style.width = column.width;
                style.minWidth = column.width;
            }
            return style;
        },

        isRowSelected(row, index) {
            const key = this.getRowKey(row, index);
            return this.selectedSet.has(key);
        },

        toggleRowSelection(row, index) {
            const key = this.getRowKey(row, index);
            const newSelection = [...this.selectedRows];

            const existingIndex = newSelection.indexOf(key);
            if (existingIndex >= 0) {
                newSelection.splice(existingIndex, 1);
            } else {
                newSelection.push(key);
            }

            this.$emit('update:selectedRows', newSelection);
        },

        toggleSelectAll() {
            if (this.isAllSelected) {
                this.$emit('update:selectedRows', []);
            } else {
                const allKeys = [];
                for (let i = 0; i < this.data.length; i++) {
                    allKeys.push(this.getRowKey(this.data[i], i));
                }
                this.$emit('update:selectedRows', allKeys);
            }
        },

        onSortColumn(column) {
            if (!column.sortable) {
                return;
            }

            let newDir = 'asc';
            if (this.sortBy === column.key) {
                newDir = this.sortDir === 'asc' ? 'desc' : 'asc';
            }

            this.$emit('update:sortBy', column.key);
            this.$emit('update:sortDir', newDir);
            this.$emit('sort', { column: column.key, direction: newDir });
        },

        onRowClick(row, index) {
            this.$emit('rowClick', { row, index });
        },

    },

};
</script>

<style scoped>
.DataTable {
    --DataTable-border-color: var(--color-base-4);
    --DataTable-header-bg: var(--color-base-1);
    --DataTable-row-bg: var(--color-base-0);
    --DataTable-row-bg-alt: var(--color-base-1);
    --DataTable-row-bg-hover: var(--color-base-1);
    --DataTable-row-bg-selected: var(--color-primary-0);
    --DataTable-cell-padding: var(--sp1-5) var(--sp2);
    --DataTable-shadow: var(--shadow-brutal-sm);

    position: relative;
    background: var(--DataTable-row-bg);
    border: 2px solid var(--DataTable-border-color);
    border-radius: var(--border-radius);
    box-shadow: var(--DataTable-shadow);
    overflow: hidden;
}

.DataTableTable {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

/* Header */
.DataTableHead {
    background: var(--DataTable-header-bg);
}

.DataTableRow-header {
    border-bottom: 2px solid var(--DataTable-border-color);
}

.DataTableCell-header {
    padding: var(--DataTable-cell-padding);
    font-weight: var(--font-weight-bold);
    text-align: left;
    white-space: nowrap;
}

.DataTableCell-sortable {
    cursor: pointer;
    user-select: none;
}

.DataTableCell-sortable:hover {
    background: var(--color-base-2);
}

.DataTableCellContent {
    display: flex;
    align-items: center;
    gap: var(--sp);
}

.DataTableColumnLabel {
    flex: 1;
}

/* Sort icon */
.DataTableSortIcon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 16px;
    height: 16px;
    color: var(--color-text-2);
    opacity: 0.4;
    transition:
        opacity var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);
}

.DataTableSortIcon svg {
    width: 12px;
    height: 12px;
}

.DataTableCell-sortable:hover .DataTableSortIcon {
    opacity: 0.7;
}

.DataTableSortIcon-active {
    opacity: 1;
    color: var(--color-primary-2);
}

.DataTableSortIcon-desc svg {
    transform: rotate(180deg);
}

/* Body rows */
.DataTableRow-body {
    border-top: 1px solid var(--color-base-3);
    transition:
        background-color var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out);
}

.DataTableRow-body:first-child {
    border-top: none;
}

.DataTableCell-body {
    padding: var(--DataTable-cell-padding);
    vertical-align: middle;
}

/* Hoverable rows */
.DataTable-hoverable .DataTableRow-body:hover {
    background: var(--DataTable-row-bg-hover);
}

/* Selected row - Neo-brutal style */
.DataTableRow-selected {
    background: var(--DataTable-row-bg-selected);
}

.DataTableRow-selected:hover {
    background: color-mix(in srgb, var(--DataTable-row-bg-selected) 80%, var(--color-primary-1));
}

/* Striped rows */
.DataTable-striped .DataTableRow-body:nth-child(even) {
    background: var(--DataTable-row-bg-alt);
}

.DataTable-striped .DataTableRow-body:nth-child(even):hover {
    background: var(--DataTable-row-bg-hover);
}

/* Compact mode */
.DataTable-compact {
    --DataTable-cell-padding: var(--sp) var(--sp1-5);
}

/* Borderless mode - for use inside Panel or other containers */
.DataTable-borderless {
    border: none;
    border-radius: var(--border-radius);
    box-shadow: none;
    overflow: hidden;
}

.DataTable-borderless .DataTableHead {
    border-radius: 0;
}

/* Alignment */
.DataTableCell-align-left {
    text-align: left;
}

.DataTableCell-align-center {
    text-align: center;
}

.DataTableCell-align-right {
    text-align: right;
}

/* Select column */
.DataTableCell-select {
    width: var(--sp5);
    padding: var(--sp) var(--sp1-5);
    text-align: center;
}

/* Checkbox - Neo-brutal style */
.DataTableCheckbox {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    border: 2px solid var(--color-base-4);
    border-radius: var(--radius-sm, 4px);
    background: var(--color-base-0);
    cursor: pointer;
    box-shadow: 1px 1px 0 var(--color-base-3);

    transition:
        background-color var(--duration-fast) var(--ease-out),
        border-color var(--duration-fast) var(--ease-out),
        box-shadow var(--duration-fast) var(--ease-out),
        transform var(--duration-fast) var(--ease-out);
}

.DataTableCheckbox:hover {
    border-color: var(--color-primary-2);
    transform: translate(-1px, -1px);
    box-shadow: 2px 2px 0 var(--color-base-4);
}

.DataTableCheckbox-checked,
.DataTableCheckbox-indeterminate {
    background: var(--color-primary-2);
    border-color: var(--color-primary-3);
    box-shadow: 1px 1px 0 var(--color-primary-3);
}

.DataTableCheckbox-checked:hover,
.DataTableCheckbox-indeterminate:hover {
    background: color-mix(in srgb, var(--color-primary-2) 85%, black);
    box-shadow: 2px 2px 0 var(--color-primary-3);
}

.DataTableCheckIcon {
    width: 12px;
    height: 12px;
    color: white;
}

/* Empty state */
.DataTableRow-empty {
    border-top: 1px solid var(--color-base-3);
}

.DataTableCell-empty {
    padding: var(--sp4);
    text-align: center;
    color: var(--color-text-2);
    font-size: var(--font-size-small);
}

/* Loading overlay */
.DataTable-loading {
    pointer-events: none;
}

.DataTableLoadingOverlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: color-mix(in srgb, var(--color-base-0) 80%, transparent);
    z-index: 10;
}

/* ===========================================
   REDUCED MOTION
   =========================================== */

@media (prefers-reduced-motion: reduce) {
    .DataTableRow-body,
    .DataTableCheckbox,
    .DataTableSortIcon {
        transition: none;
    }
}
</style>
