<template>
    <div class="GalleryData">
        <TitleBlock>Data Components</TitleBlock>
        <TextBlock>
            Components for displaying and interacting with structured data, featuring soft neo-brutalism styling.
        </TextBlock>

        <!-- TreeView -->
        <Subtitle>TreeView</Subtitle>
        <TextBlock>Hierarchical tree structure for displaying nested data with expand/collapse functionality.</TextBlock>

        <VGroup gap="3">
            <!-- Basic TreeView -->
            <Panel title="Basic TreeView (Single Select)">
                <HGroup
                    gap="2"
                    wrap>
                    <Checkbox
                        v-model="treeExpandAll"
                        label="Expand All" />
                </HGroup>
                <Divider />
                <TreeView
                    v-model="selectedTreeItem"
                    :items="treeItems"
                    :expandAll="treeExpandAll"
                    @select="onTreeSelect"
                    @expand="onTreeExpand"
                    @collapse="onTreeCollapse" />
                <Divider />
                <TextBlock>
                    Selected: <strong>{{ selectedTreeItem || 'None' }}</strong>
                </TextBlock>
            </Panel>

            <!-- Multi-select TreeView -->
            <Panel title="Multi-Select TreeView">
                <TreeView
                    v-model="selectedTreeItems"
                    :items="treeItems"
                    multiSelect
                    expandAll />
                <Divider />
                <TextBlock>
                    Selected: <strong>{{ selectedTreeItems.length > 0 ? selectedTreeItems.join(', ') : 'None' }}</strong>
                </TextBlock>
            </Panel>

            <!-- TreeView with custom item slot -->
            <Panel title="TreeView with Custom Item Slot">
                <TreeView
                    v-model="selectedFileItem"
                    :items="fileTreeItems"
                    expandAll>
                    <template #item="{ item }">
                        <HGroup
                            gap="1"
                            align="center">
                            <span class="FileSize">{{ item.size || '' }}</span>
                            <span class="FileLabel">{{ item.label }}</span>
                        </HGroup>
                    </template>
                </TreeView>
            </Panel>
        </VGroup>

        <!-- DataTable -->
        <Subtitle>DataTable</Subtitle>
        <TextBlock>Sortable data table with selection, pagination-ready, and various display options.</TextBlock>

        <VGroup gap="3">
            <!-- Basic DataTable -->
            <Panel
                title="Basic DataTable"
                padding="none">
                <DataTable
                    :columns="basicColumns"
                    :data="basicData"
                    :sortBy="basicSortBy"
                    :sortDir="basicSortDir"
                    borderless
                    @update:sortBy="basicSortBy = $event"
                    @update:sortDir="basicSortDir = $event"
                    @sort="onSort"
                    @rowClick="onRowClick" />
            </Panel>

            <!-- Selectable DataTable -->
            <Panel
                title="Selectable DataTable"
                padding="none">
                <DataTable
                    :columns="userColumns"
                    :data="userData"
                    :selectedRows="selectedUsers"
                    selectable
                    striped
                    borderless
                    @update:selectedRows="selectedUsers = $event"
                    @rowClick="onUserRowClick">
                    <template #status="{ value }">
                        <span
                            class="StatusBadge"
                            :class="`StatusBadge-${value}`">
                            {{ value }}
                        </span>
                    </template>
                    <template #actions="{ row }">
                        <HGroup gap="1">
                            <Btn
                                icon="fa-solid fa-pen"
                                size="small"
                                square
                                kind="default"
                                title="Edit"
                                @click.stop="onEditUser(row)" />
                            <Btn
                                icon="fa-solid fa-trash"
                                size="small"
                                square
                                kind="danger"
                                title="Delete"
                                @click.stop="onDeleteUser(row)" />
                        </HGroup>
                    </template>
                </DataTable>
            </Panel>
            <TextBlock>
                Selected users: <strong>{{ selectedUsers.length > 0 ? selectedUsers.join(', ') : 'None' }}</strong>
            </TextBlock>

            <!-- Compact DataTable -->
            <Panel
                title="Compact DataTable"
                padding="none">
                <DataTable
                    :columns="productColumns"
                    :data="productData"
                    compact
                    hoverable
                    borderless>
                    <template #price="{ value }">
                        <span class="PriceCell">${{ value.toFixed(2) }}</span>
                    </template>
                    <template #stock="{ value }">
                        <span
                            class="StockCell"
                            :class="{ 'StockCell-low': value < 10 }">
                            {{ value }}
                        </span>
                    </template>
                </DataTable>
            </Panel>

            <!-- Loading State -->
            <Panel
                title="Loading State"
                padding="none">
                <HGroup padding="small">
                    <Btn
                        :label="tableLoading ? 'Stop Loading' : 'Simulate Loading'"
                        kind="primary"
                        size="small"
                        @click="toggleLoading" />
                </HGroup>
                <DataTable
                    :columns="basicColumns"
                    :data="basicData"
                    :loading="tableLoading"
                    borderless />
            </Panel>

            <!-- Empty State -->
            <Panel
                title="Empty State"
                padding="none">
                <DataTable
                    :columns="basicColumns"
                    :data="[]"
                    borderless
                    emptyMessage="No records found. Try adjusting your filters.">
                    <template #empty>
                        <VGroup
                            gap="1"
                            align="center">
                            <i class="fa-solid fa-inbox EmptyIcon" />
                            <span>No data to display</span>
                            <Btn
                                label="Add Item"
                                kind="primary"
                                size="small"
                                icon="fa-solid fa-plus" />
                        </VGroup>
                    </template>
                </DataTable>
            </Panel>
        </VGroup>
    </div>
</template>

<script>
import Box from '../lib/components/Box.vue';
import Btn from '../lib/components/Btn.vue';
import Checkbox from '../lib/components/Checkbox.vue';
import DataTable from '../lib/components/DataTable.vue';
import Divider from '../lib/components/Divider.vue';
import HGroup from '../lib/components/HGroup.vue';
import Panel from '../lib/components/Panel.vue';
import Subtitle from '../lib/components/Subtitle.vue';
import TextBlock from '../lib/components/Text.vue';
import TitleBlock from '../lib/components/Title.vue';
import TreeView from '../lib/components/TreeView.vue';
import VGroup from '../lib/components/VGroup.vue';

export default {

    components: {
        Box,
        Btn,
        Checkbox,
        DataTable,
        Divider,
        HGroup,
        Panel,
        Subtitle,
        TextBlock,
        TitleBlock,
        TreeView,
        VGroup,
    },

    data() {
        return {
            // TreeView state
            selectedTreeItem: null,
            selectedTreeItems: [],
            selectedFileItem: null,
            treeExpandAll: false,

            treeItems: [
                {
                    id: 'documents',
                    label: 'Documents',
                    icon: 'fa-solid fa-folder',
                    children: [
                        {
                            id: 'work',
                            label: 'Work',
                            icon: 'fa-solid fa-folder',
                            children: [
                                { id: 'report-q1', label: 'Q1 Report.pdf', icon: 'fa-solid fa-file-pdf' },
                                { id: 'report-q2', label: 'Q2 Report.pdf', icon: 'fa-solid fa-file-pdf' },
                                { id: 'presentation', label: 'Presentation.pptx', icon: 'fa-solid fa-file-powerpoint' },
                            ],
                        },
                        {
                            id: 'personal',
                            label: 'Personal',
                            icon: 'fa-solid fa-folder',
                            children: [
                                { id: 'resume', label: 'Resume.docx', icon: 'fa-solid fa-file-word' },
                                { id: 'budget', label: 'Budget.xlsx', icon: 'fa-solid fa-file-excel' },
                            ],
                        },
                    ],
                },
                {
                    id: 'photos',
                    label: 'Photos',
                    icon: 'fa-solid fa-folder',
                    children: [
                        { id: 'vacation', label: 'Vacation 2024', icon: 'fa-solid fa-image' },
                        { id: 'family', label: 'Family', icon: 'fa-solid fa-image' },
                    ],
                },
                {
                    id: 'downloads',
                    label: 'Downloads',
                    icon: 'fa-solid fa-folder',
                    disabled: true,
                    children: [
                        { id: 'file1', label: 'setup.exe', icon: 'fa-solid fa-file' },
                    ],
                },
                {
                    id: 'readme',
                    label: 'README.md',
                    icon: 'fa-solid fa-file-lines',
                },
            ],

            fileTreeItems: [
                {
                    id: 'src',
                    label: 'src',
                    icon: 'fa-solid fa-folder',
                    children: [
                        {
                            id: 'components',
                            label: 'components',
                            icon: 'fa-solid fa-folder',
                            children: [
                                { id: 'App.vue', label: 'App.vue', icon: 'fa-brands fa-vuejs', size: '2.4 KB' },
                                { id: 'Header.vue', label: 'Header.vue', icon: 'fa-brands fa-vuejs', size: '1.8 KB' },
                            ],
                        },
                        { id: 'main.ts', label: 'main.ts', icon: 'fa-solid fa-file-code', size: '0.5 KB' },
                        { id: 'index.css', label: 'index.css', icon: 'fa-solid fa-file-code', size: '3.2 KB' },
                    ],
                },
                { id: 'package.json', label: 'package.json', icon: 'fa-solid fa-file-code', size: '1.1 KB' },
                { id: 'tsconfig.json', label: 'tsconfig.json', icon: 'fa-solid fa-file-code', size: '0.4 KB' },
            ],

            // DataTable state
            basicSortBy: 'name',
            basicSortDir: 'asc',

            basicColumns: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'category', label: 'Category', sortable: true },
                { key: 'date', label: 'Date', sortable: true, width: '120px' },
            ],

            basicData: [
                { id: 1, name: 'Project Alpha', category: 'Development', date: '2024-01-15' },
                { id: 2, name: 'Marketing Campaign', category: 'Marketing', date: '2024-02-20' },
                { id: 3, name: 'Budget Review', category: 'Finance', date: '2024-03-10' },
                { id: 4, name: 'Team Building', category: 'HR', date: '2024-04-05' },
                { id: 5, name: 'Product Launch', category: 'Development', date: '2024-05-12' },
            ],

            userColumns: [
                { key: 'name', label: 'Name', sortable: true },
                { key: 'email', label: 'Email', sortable: true },
                { key: 'role', label: 'Role', width: '100px' },
                { key: 'status', label: 'Status', width: '100px', align: 'center' },
                { key: 'actions', label: 'Actions', width: '100px', align: 'center' },
            ],

            userData: [
                { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
                { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Editor', status: 'active' },
                { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Viewer', status: 'inactive' },
                { id: 4, name: 'David Brown', email: 'david@example.com', role: 'Editor', status: 'active' },
                { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'pending' },
            ],

            selectedUsers: [],

            productColumns: [
                { key: 'sku', label: 'SKU', width: '80px' },
                { key: 'name', label: 'Product Name', sortable: true },
                { key: 'price', label: 'Price', width: '100px', align: 'right', sortable: true },
                { key: 'stock', label: 'Stock', width: '80px', align: 'center' },
            ],

            productData: [
                { id: 1, sku: 'PRD-001', name: 'Wireless Mouse', price: 29.99, stock: 150 },
                { id: 2, sku: 'PRD-002', name: 'Mechanical Keyboard', price: 89.99, stock: 45 },
                { id: 3, sku: 'PRD-003', name: 'USB-C Hub', price: 49.99, stock: 8 },
                { id: 4, sku: 'PRD-004', name: 'Monitor Stand', price: 39.99, stock: 72 },
                { id: 5, sku: 'PRD-005', name: 'Webcam HD', price: 59.99, stock: 3 },
            ],

            tableLoading: false,
        };
    },

    methods: {

        onTreeSelect(item) {
            console.info('Tree item selected:', item);
        },

        onTreeExpand(item) {
            console.info('Tree item expanded:', item);
        },

        onTreeCollapse(item) {
            console.info('Tree item collapsed:', item);
        },

        onSort(sortInfo) {
            console.info('Sort changed:', sortInfo);
        },

        onRowClick(info) {
            console.info('Row clicked:', info);
        },

        onUserRowClick(info) {
            console.info('User row clicked:', info);
        },

        onEditUser(user) {
            console.info('Edit user:', user);
        },

        onDeleteUser(user) {
            console.info('Delete user:', user);
        },

        toggleLoading() {
            this.tableLoading = !this.tableLoading;
        },

    },

};
</script>

<style scoped>
.GalleryData {
    padding: var(--sp3) 0;
}

.FileSize {
    font-size: var(--font-size-small);
    color: var(--color-text-2);
    min-width: 60px;
}

.FileLabel {
    flex: 1;
}

.StatusBadge {
    display: inline-block;
    padding: var(--sp0-5) var(--sp);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    border-radius: var(--radius-sm);
    text-transform: capitalize;
}

.StatusBadge-active {
    background: var(--color-success-0);
    color: var(--color-success-3);
    border: 1px solid var(--color-success-2);
}

.StatusBadge-inactive {
    background: var(--color-base-2);
    color: var(--color-text-2);
    border: 1px solid var(--color-base-4);
}

.StatusBadge-pending {
    background: var(--color-warning-0);
    color: var(--color-warning-4);
    border: 1px solid var(--color-warning-2);
}

.PriceCell {
    font-weight: var(--font-weight-medium);
    font-family: var(--font-monospace);
}

.StockCell {
    font-family: var(--font-monospace);
}

.StockCell-low {
    color: var(--color-danger-2);
    font-weight: var(--font-weight-bold);
}

.EmptyIcon {
    font-size: var(--font-size-xl);
    color: var(--color-text-2);
    margin-bottom: var(--sp);
}
</style>
