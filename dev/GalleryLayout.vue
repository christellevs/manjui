<template>
    <div class="GalleryLayout">
        <TitleBlock>Layout Components</TitleBlock>
        <TextBlock>
            Layout components for structuring page content with soft neo-brutalism styling.
        </TextBlock>

        <!-- Container -->
        <Subtitle>Container</Subtitle>
        <TextBlock>Centered container with configurable max-width.</TextBlock>

        <div class="DemoSection">
            <div class="DemoLabel">Small (640px)</div>
            <Container
                size="small"
                class="DemoContainer">
                <Box
                    border
                    padding="small">
                    Small container content
                </Box>
            </Container>

            <div class="DemoLabel">Normal (960px)</div>
            <Container
                size="normal"
                class="DemoContainer">
                <Box
                    border
                    padding="small">
                    Normal container content
                </Box>
            </Container>

            <div class="DemoLabel">Large (1280px)</div>
            <Container
                size="large"
                class="DemoContainer">
                <Box
                    border
                    padding="small">
                    Large container content
                </Box>
            </Container>
        </div>

        <!-- Box -->
        <Subtitle>Box</Subtitle>
        <TextBlock>Generic styled box wrapper with various styling options.</TextBlock>

        <HGroup
            wrap
            gap="2">
            <Box padding="normal">
                Default Box
            </Box>
            <Box
                kind="primary"
                padding="normal">
                Primary Box
            </Box>
            <Box
                kind="secondary"
                padding="normal">
                Secondary Box
            </Box>
            <Box
                kind="tertiary"
                padding="normal">
                Tertiary Box
            </Box>
        </HGroup>

        <HGroup
            wrap
            gap="2"
            class="DemoMarginTop">
            <Box
                border
                padding="normal">
                With Border
            </Box>
            <Box
                shadow
                padding="normal">
                With Shadow
            </Box>
            <Box
                border
                shadow
                padding="normal">
                Border + Shadow
            </Box>
            <Box
                border
                shadow
                :rounded="false"
                padding="normal">
                No Rounded
            </Box>
        </HGroup>

        <!-- Panel -->
        <Subtitle>Panel</Subtitle>
        <TextBlock>Card/panel container with header, footer, and collapse support.</TextBlock>

        <VGroup gap="2">
            <Panel
                title="Basic Panel"
                subtitle="With subtitle text">
                <TextBlock>This is the panel content area.</TextBlock>
            </Panel>

            <Panel
                title="Primary Panel"
                kind="primary">
                <TextBlock>Panel with primary styling.</TextBlock>
            </Panel>

            <Panel
                title="Secondary Panel"
                kind="secondary">
                <TextBlock>Panel with secondary styling.</TextBlock>
            </Panel>

            <Panel
                title="Collapsible Panel"
                subtitle="Click the header to collapse"
                collapsible
                :collapsed="panelCollapsed"
                @update:collapsed="panelCollapsed = $event">
                <TextBlock>This content can be hidden by collapsing the panel.</TextBlock>
            </Panel>

            <Panel
                title="Panel with Footer"
                subtitle="Has footer slot">
                <TextBlock>Main content area.</TextBlock>
                <template #footer>
                    <HGroup justify="end">
                        <Btn
                            label="Cancel"
                            kind="default" />
                        <Btn
                            label="Save"
                            kind="primary" />
                    </HGroup>
                </template>
            </Panel>

            <Panel
                title="Panel with Actions"
                padding="large">
                <template #actions>
                    <Btn
                        icon="fa-solid fa-ellipsis-vertical"
                        kind="default"
                        size="small"
                        square />
                </template>
                <TextBlock>Panel with action buttons in the header.</TextBlock>
            </Panel>
        </VGroup>

        <!-- Section & SectionHeader -->
        <Subtitle>Section & SectionHeader</Subtitle>
        <TextBlock>Page section wrappers with title and actions.</TextBlock>

        <VGroup gap="3">
            <PageSection
                title="Basic Section"
                subtitle="Optional subtitle text">
                <Box
                    border
                    padding="normal">
                    Section content goes here.
                </Box>
            </PageSection>

            <PageSection
                title="Section with Divider"
                subtitle="Has a divider line below header"
                divider>
                <Box
                    border
                    padding="normal">
                    Content below the divider.
                </Box>
            </PageSection>

            <PageSection title="Section with Actions">
                <template #actions>
                    <Btn
                        label="Add Item"
                        icon="fa-solid fa-plus"
                        kind="primary"
                        size="small" />
                </template>
                <Box
                    border
                    padding="normal">
                    Content with action button.
                </Box>
            </PageSection>

            <SectionHeader
                title="Standalone Header"
                subtitle="Can be used independently"
                :level="3">
                <template #actions>
                    <Btn
                        label="Edit"
                        kind="default"
                        size="small" />
                </template>
            </SectionHeader>
        </VGroup>

        <!-- ListItem -->
        <Subtitle>ListItem</Subtitle>
        <TextBlock>Styled list items with prefix/suffix slots.</TextBlock>

        <Panel padding="none">
            <ListItem divider>
                Simple list item
            </ListItem>
            <ListItem
                divider
                clickable
                @click="onListItemClick('Clickable item')">
                <template #prefix>
                    <i class="fa-solid fa-file" />
                </template>
                Clickable item with icon
            </ListItem>
            <ListItem
                divider
                clickable
                selected
                @click="onListItemClick('Selected item')">
                <template #prefix>
                    <i class="fa-solid fa-star" />
                </template>
                Selected item
                <template #suffix>
                    <i class="fa-solid fa-check" />
                </template>
            </ListItem>
            <ListItem
                divider
                clickable
                disabled>
                <template #prefix>
                    <i class="fa-solid fa-ban" />
                </template>
                Disabled item
            </ListItem>
            <ListItem clickable>
                <template #prefix>
                    <i class="fa-solid fa-gear" />
                </template>
                Item with suffix action
                <template #suffix>
                    <Btn
                        icon="fa-solid fa-chevron-right"
                        kind="default"
                        size="small"
                        square />
                </template>
            </ListItem>
        </Panel>

        <!-- Tabs -->
        <Subtitle>Tabs</Subtitle>
        <TextBlock>Tab container with TabItem children.</TextBlock>

        <Tabs v-model="activeTab">
            <TabItem
                id="overview"
                label="Overview"
                icon="fa-solid fa-home">
                <TextBlock>Overview tab content. This is the first tab panel.</TextBlock>
            </TabItem>
            <TabItem
                id="details"
                label="Details"
                icon="fa-solid fa-info-circle">
                <TextBlock>Details tab content. Information and specifications go here.</TextBlock>
            </TabItem>
            <TabItem
                id="settings"
                label="Settings"
                icon="fa-solid fa-cog">
                <TextBlock>Settings tab content. Configuration options appear here.</TextBlock>
            </TabItem>
            <TabItem
                id="disabled"
                label="Disabled"
                disabled>
                <TextBlock>This tab is disabled and cannot be selected.</TextBlock>
            </TabItem>
        </Tabs>

        <!-- Padding variations -->
        <Subtitle>Padding Variations</Subtitle>
        <TextBlock>Panel and Box padding options.</TextBlock>

        <HGroup
            wrap
            gap="2">
            <Panel
                title="None"
                padding="none">
                <Box
                    kind="primary"
                    :rounded="false">
                    No padding
                </Box>
            </Panel>
            <Panel
                title="Small"
                padding="small">
                <Box
                    kind="secondary"
                    :rounded="false">
                    Small padding
                </Box>
            </Panel>
            <Panel
                title="Normal"
                padding="normal">
                <Box
                    kind="tertiary"
                    :rounded="false">
                    Normal padding
                </Box>
            </Panel>
            <Panel
                title="Large"
                padding="large">
                <Box :rounded="false">
                    Large padding
                </Box>
            </Panel>
        </HGroup>
    </div>
</template>

<script>
import Box from '../lib/components/Box.vue';
import Btn from '../lib/components/Btn.vue';
import Container from '../lib/components/Container.vue';
import HGroup from '../lib/components/HGroup.vue';
import ListItem from '../lib/components/ListItem.vue';
import Panel from '../lib/components/Panel.vue';
import PageSection from '../lib/components/Section.vue';
import SectionHeader from '../lib/components/SectionHeader.vue';
import Subtitle from '../lib/components/Subtitle.vue';
import TabItem from '../lib/components/TabItem.vue';
import Tabs from '../lib/components/Tabs.vue';
import TextBlock from '../lib/components/Text.vue';
import TitleBlock from '../lib/components/Title.vue';
import VGroup from '../lib/components/VGroup.vue';

export default {

    components: {
        Box,
        Btn,
        Container,
        HGroup,
        ListItem,
        PageSection,
        Panel,
        SectionHeader,
        Subtitle,
        TabItem,
        Tabs,
        TextBlock,
        TitleBlock,
        VGroup,
    },

    data() {
        return {
            panelCollapsed: false,
            activeTab: 'overview',
        };
    },

    methods: {

        onListItemClick() {
            // List item clicked
        },

    },

};
</script>

<style scoped>
.GalleryLayout {
    padding: var(--sp3) 0;
}

.DemoSection {
    display: flex;
    flex-direction: column;
    gap: var(--sp2);
    padding: var(--sp2);
    background: var(--color-base-1);
    border-radius: var(--border-radius);
}

.DemoLabel {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-1);
}

.DemoContainer {
    background: var(--color-base-2);
    border: 1px dashed var(--color-base-4);
}

.DemoMarginTop {
    margin-top: var(--sp2);
}
</style>
