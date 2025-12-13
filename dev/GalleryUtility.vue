<template>
    <div class="GalleryUtility">
        <TitleBlock>Utility Components</TitleBlock>
        <TextBlock>
            Utility components for common UI patterns including context menus, tooltips, dates, and drag-and-drop.
        </TextBlock>

        <!-- Avatar -->
        <Subtitle>Avatar</Subtitle>
        <TextBlock>User/entity avatar with image or initials fallback. Neo-brutal style with colored borders and shadows.</TextBlock>

        <HGroup wrap gap="3" align="end">
            <VGroup gap="1" align="center">
                <Avatar
                    src="https://i.pravatar.cc/100?u=1"
                    alt="John Doe"
                    size="small"
                    kind="primary"
                    hoverable />
                <span class="DemoLabel">Small</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    src="https://i.pravatar.cc/100?u=2"
                    alt="Jane Smith"
                    size="normal"
                    kind="secondary"
                    hoverable />
                <span class="DemoLabel">Normal</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    src="https://i.pravatar.cc/100?u=3"
                    alt="Bob Wilson"
                    size="large"
                    kind="tertiary"
                    hoverable />
                <span class="DemoLabel">Large</span>
            </VGroup>
        </HGroup>

        <HGroup wrap gap="3" align="end" class="DemoMarginTop">
            <VGroup gap="1" align="center">
                <Avatar
                    name="Default"
                    kind="default"
                    hoverable />
                <span class="DemoLabel">Default</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Primary"
                    kind="primary"
                    hoverable />
                <span class="DemoLabel">Primary</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Secondary"
                    kind="secondary"
                    hoverable />
                <span class="DemoLabel">Secondary</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Tertiary"
                    kind="tertiary"
                    hoverable />
                <span class="DemoLabel">Tertiary</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Success"
                    kind="success"
                    hoverable />
                <span class="DemoLabel">Success</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Warning"
                    kind="warning"
                    hoverable />
                <span class="DemoLabel">Warning</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    name="Danger"
                    kind="danger"
                    hoverable />
                <span class="DemoLabel">Danger</span>
            </VGroup>
        </HGroup>

        <HGroup wrap gap="3" align="end" class="DemoMarginTop">
            <VGroup gap="1" align="center">
                <Avatar
                    icon="fas fa-building"
                    kind="tertiary"
                    shape="rounded"
                    hoverable />
                <span class="DemoLabel">Rounded</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    icon="fas fa-star"
                    kind="warning"
                    shape="square"
                    hoverable />
                <span class="DemoLabel">Square</span>
            </VGroup>
            <VGroup gap="1" align="center">
                <Avatar
                    icon="fas fa-heart"
                    kind="danger"
                    shape="circle"
                    hoverable />
                <span class="DemoLabel">Circle</span>
            </VGroup>
        </HGroup>

        <!-- Badge -->
        <Subtitle>Badge</Subtitle>
        <TextBlock>Status indicators and count badges with various styles.</TextBlock>

        <HGroup wrap gap="2" align="center">
            <Badge value="New" kind="default" />
            <Badge value="5" kind="primary" />
            <Badge value="Hot" kind="secondary" />
            <Badge value="Done" kind="success" />
            <Badge value="!" kind="warning" />
            <Badge value="Error" kind="danger" />
        </HGroup>

        <HGroup wrap gap="2" align="center" class="DemoMarginTop">
            <Badge value="Small" kind="primary" size="small" />
            <Badge value="Normal" kind="primary" size="normal" />
            <Badge value="Large" kind="primary" size="large" />
        </HGroup>

        <HGroup wrap gap="2" align="center" class="DemoMarginTop">
            <Badge value="Pill" kind="secondary" pill />
            <Badge kind="success" dot />
            <Badge kind="danger" dot size="large" />
            <HGroup gap="1" align="center">
                <span>Status</span>
                <Badge kind="success" dot />
            </HGroup>
            <HGroup gap="1" align="center">
                <span>Notifications</span>
                <Badge value="12" kind="danger" pill />
            </HGroup>
        </HGroup>

        <!-- CopyToClipboard -->
        <Subtitle>CopyToClipboard</Subtitle>
        <TextBlock>Copy-to-clipboard button with visual feedback.</TextBlock>

        <HGroup wrap gap="3" align="center">
            <HGroup gap="1" align="center">
                <InputText
                    v-model="copyValue"
                    label="Copy this text"
                    readonly />
                <CopyToClipboard :value="copyValue" />
            </HGroup>

            <HGroup gap="1" align="center">
                <span>With label:</span>
                <CopyToClipboard
                    value="Hello World!"
                    showLabel />
            </HGroup>

            <HGroup gap="1" align="center">
                <span>API Key:</span>
                <code class="DemoCode">sk-abc123xyz</code>
                <CopyToClipboard
                    value="sk-abc123xyz"
                    kind="primary" />
            </HGroup>
        </HGroup>

        <!-- ContextMenu -->
        <Subtitle>ContextMenu</Subtitle>
        <TextBlock>Right-click or dropdown context menu with keyboard navigation.</TextBlock>

        <HGroup
            wrap
            gap="2">
            <ContextMenu
                :items="menuItems"
                trigger="contextmenu"
                @select="onMenuSelect">
                <Box
                    border
                    shadow
                    padding="normal"
                    class="DemoBox">
                    Right-click here for context menu
                </Box>
            </ContextMenu>

            <ContextMenu
                :items="menuItems"
                trigger="click"
                @select="onMenuSelect">
                <Btn
                    label="Click for menu"
                    kind="primary" />
            </ContextMenu>
        </HGroup>

        <div
            v-if="lastMenuSelection"
            class="DemoResult">
            Last selection: {{ lastMenuSelection }}
        </div>

        <!-- ContextHelp -->
        <Subtitle>ContextHelp</Subtitle>
        <TextBlock>Help tooltip/popover with customizable position and trigger.</TextBlock>

        <HGroup
            wrap
            gap="3"
            align="center">
            <HGroup
                gap="1"
                align="center">
                <span>Hover tooltip</span>
                <ContextHelp
                    text="This is helpful information that appears on hover."
                    position="top"
                    trigger="hover" />
            </HGroup>

            <HGroup
                gap="1"
                align="center">
                <span>Click tooltip</span>
                <ContextHelp
                    text="This tooltip appears when you click the icon."
                    position="bottom"
                    trigger="click" />
            </HGroup>

            <HGroup
                gap="1"
                align="center">
                <span>Position: Left</span>
                <ContextHelp
                    text="Tooltip positioned to the left of the trigger."
                    position="left"
                    trigger="hover" />
            </HGroup>

            <HGroup
                gap="1"
                align="center">
                <span>Position: Right</span>
                <ContextHelp
                    text="Tooltip positioned to the right of the trigger."
                    position="right"
                    trigger="hover" />
            </HGroup>
        </HGroup>

        <HGroup
            wrap
            gap="2"
            class="DemoMarginTop">
            <ContextHelp
                text="Custom trigger element using the slot."
                position="top"
                trigger="hover">
                <Btn
                    icon="fa-solid fa-info-circle"
                    kind="secondary"
                    size="small"
                    square />
            </ContextHelp>

            <ContextHelp
                position="top"
                trigger="hover">
                <template #content>
                    <VGroup gap="1">
                        <strong>Rich Content</strong>
                        <p>You can use slots for custom content in the tooltip.</p>
                    </VGroup>
                </template>
                <span class="DemoHelpLink">Hover for rich content</span>
            </ContextHelp>
        </HGroup>

        <!-- FormattedDate -->
        <Subtitle>FormattedDate</Subtitle>
        <TextBlock>Formatted date display using Intl.DateTimeFormat.</TextBlock>

        <VGroup gap="1">
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Short:</span>
                <FormattedDate
                    :value="sampleDate"
                    format="short" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Medium:</span>
                <FormattedDate
                    :value="sampleDate"
                    format="medium" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Long:</span>
                <FormattedDate
                    :value="sampleDate"
                    format="long" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Full:</span>
                <FormattedDate
                    :value="sampleDate"
                    format="full" />
            </HGroup>
        </VGroup>

        <!-- RelDate -->
        <Subtitle>RelDate</Subtitle>
        <TextBlock>Relative date display ("2 hours ago") with auto-update.</TextBlock>

        <VGroup gap="1">
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Now:</span>
                <RelDate :value="Date.now()" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">5 minutes ago:</span>
                <RelDate :value="fiveMinutesAgo" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">2 hours ago:</span>
                <RelDate :value="twoHoursAgo" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Yesterday:</span>
                <RelDate :value="yesterday" />
            </HGroup>
            <HGroup
                gap="2"
                align="center">
                <span class="DemoLabel">Last week:</span>
                <RelDate :value="lastWeek" />
            </HGroup>
        </VGroup>

        <!-- TextCarousel -->
        <Subtitle>TextCarousel</Subtitle>
        <TextBlock>Rotating text animation with configurable direction and timing.</TextBlock>

        <VGroup gap="3">
            <Box
                border
                shadow
                padding="normal">
                <HGroup
                    gap="2"
                    align="center">
                    <span>We provide:</span>
                    <TextCarousel
                        :items="carouselItems"
                        :interval="2500"
                        direction="up"
                        class="DemoCarousel" />
                </HGroup>
            </Box>

            <HGroup
                wrap
                gap="2">
                <Box
                    border
                    padding="small">
                    <VGroup gap="1">
                        <span class="DemoLabel">Direction: Up</span>
                        <TextCarousel
                            :items="shortCarouselItems"
                            :interval="2000"
                            direction="up"
                            class="DemoCarouselSmall" />
                    </VGroup>
                </Box>

                <Box
                    border
                    padding="small">
                    <VGroup gap="1">
                        <span class="DemoLabel">Direction: Down</span>
                        <TextCarousel
                            :items="shortCarouselItems"
                            :interval="2000"
                            direction="down"
                            class="DemoCarouselSmall" />
                    </VGroup>
                </Box>

                <Box
                    border
                    padding="small">
                    <VGroup gap="1">
                        <span class="DemoLabel">Pause on Hover</span>
                        <TextCarousel
                            :items="shortCarouselItems"
                            :interval="1500"
                            :pauseOnHover="true"
                            class="DemoCarouselSmall" />
                    </VGroup>
                </Box>
            </HGroup>
        </VGroup>

        <!-- Bubble -->
        <Subtitle>Bubble</Subtitle>
        <TextBlock>Chat/speech bubble component with configurable position and styling.</TextBlock>

        <VGroup gap="2">
            <div class="DemoChatContainer">
                <Bubble
                    position="left"
                    kind="default"
                    time="10:30 AM">
                    Hello! How can I help you today?
                </Bubble>
            </div>

            <div class="DemoChatContainerRight">
                <Bubble
                    position="right"
                    kind="primary"
                    time="10:31 AM">
                    I have a question about my order.
                </Bubble>
            </div>

            <div class="DemoChatContainer">
                <Bubble
                    position="left"
                    kind="secondary"
                    time="10:32 AM">
                    Sure! I'd be happy to help with that.
                </Bubble>
            </div>

            <div class="DemoChatContainerRight">
                <Bubble
                    position="right"
                    kind="primary"
                    :tail="false"
                    time="10:33 AM">
                    This bubble has no tail.
                </Bubble>
            </div>
        </VGroup>

        <!-- DragHelper -->
        <Subtitle>DragHelper</Subtitle>
        <TextBlock>Drag and drop wrapper with visual feedback.</TextBlock>

        <HGroup
            wrap
            gap="3">
            <VGroup gap="1">
                <span class="DemoLabel">Draggable Items</span>
                <VGroup gap="1">
                    <DragHelper
                        v-for="item in dragItems"
                        :key="item.id"
                        :data="item"
                        group="items"
                        @dragstart="onDragStart"
                        @dragend="onDragEnd">
                        <Box
                            border
                            padding="small"
                            class="DemoDragItem">
                            <i class="fa-solid fa-grip-vertical DemoDragHandle" />
                            {{ item.label }}
                        </Box>
                    </DragHelper>
                </VGroup>
            </VGroup>

            <VGroup gap="1">
                <span class="DemoLabel">Drop Zone</span>
                <DragHelper
                    :draggable="false"
                    group="items"
                    @drop="onDrop">
                    <Box
                        border
                        padding="normal"
                        class="DemoDropZone">
                        <template v-if="droppedItems.length === 0">
                            Drop items here
                        </template>
                        <VGroup
                            v-else
                            gap="1">
                            <Box
                                v-for="item in droppedItems"
                                :key="item.id"
                                kind="primary"
                                padding="small">
                                {{ item.label }}
                            </Box>
                        </VGroup>
                    </Box>
                </DragHelper>
            </VGroup>
        </HGroup>

        <!-- ProgressIcon -->
        <Subtitle>ProgressIcon</Subtitle>
        <TextBlock>Circular progress indicator with optional icon.</TextBlock>

        <VGroup gap="3">
            <HGroup
                wrap
                gap="3"
                align="end">
                <VGroup
                    gap="1"
                    align="center">
                    <ProgressIcon
                        icon="fa-solid fa-download"
                        :progress="25"
                        size="small"
                        kind="primary" />
                    <span class="DemoLabel">Small</span>
                </VGroup>

                <VGroup
                    gap="1"
                    align="center">
                    <ProgressIcon
                        icon="fa-solid fa-cloud-upload-alt"
                        :progress="50"
                        size="normal"
                        kind="secondary" />
                    <span class="DemoLabel">Normal</span>
                </VGroup>

                <VGroup
                    gap="1"
                    align="center">
                    <ProgressIcon
                        icon="fa-solid fa-sync"
                        :progress="75"
                        size="large"
                        kind="tertiary" />
                    <span class="DemoLabel">Large</span>
                </VGroup>
            </HGroup>

            <HGroup
                wrap
                gap="3"
                align="end">
                <ProgressIcon
                    icon="fa-solid fa-check"
                    :progress="100"
                    kind="success" />
                <ProgressIcon
                    icon="fa-solid fa-exclamation"
                    :progress="60"
                    kind="warning" />
                <ProgressIcon
                    icon="fa-solid fa-times"
                    :progress="30"
                    kind="danger" />
                <ProgressIcon
                    icon="fa-solid fa-cog"
                    :progress="animatedProgress"
                    kind="primary"
                    showValue />
            </HGroup>
        </VGroup>
    </div>
</template>

<script>
import Avatar from '../lib/components/Avatar.vue';
import Badge from '../lib/components/Badge.vue';
import Box from '../lib/components/Box.vue';
import Btn from '../lib/components/Btn.vue';
import Bubble from '../lib/components/Bubble.vue';
import ContextHelp from '../lib/components/ContextHelp.vue';
import ContextMenu from '../lib/components/ContextMenu.vue';
import CopyToClipboard from '../lib/components/CopyToClipboard.vue';
import DragHelper from '../lib/components/DragHelper.vue';
import FormattedDate from '../lib/components/FormattedDate.vue';
import HGroup from '../lib/components/HGroup.vue';
import InputText from '../lib/components/InputText.vue';
import ProgressIcon from '../lib/components/ProgressIcon.vue';
import RelDate from '../lib/components/RelDate.vue';
import Subtitle from '../lib/components/Subtitle.vue';
import TextBlock from '../lib/components/Text.vue';
import TextCarousel from '../lib/components/TextCarousel.vue';
import TitleBlock from '../lib/components/Title.vue';
import VGroup from '../lib/components/VGroup.vue';

export default {

    components: {
        Avatar,
        Badge,
        Box,
        Btn,
        Bubble,
        ContextHelp,
        ContextMenu,
        CopyToClipboard,
        DragHelper,
        FormattedDate,
        HGroup,
        InputText,
        ProgressIcon,
        RelDate,
        Subtitle,
        TextBlock,
        TextCarousel,
        TitleBlock,
        VGroup,
    },

    data() {
        const now = Date.now();
        return {
            copyValue: 'Copy me to clipboard!',
            menuItems: [
                { label: 'Edit', icon: 'fa-solid fa-pen', action: function () { /* noop */ } },
                { label: 'Duplicate', icon: 'fa-solid fa-copy', action: function () { /* noop */ } },
                { divider: true },
                { label: 'Share', icon: 'fa-solid fa-share', action: function () { /* noop */ } },
                { label: 'Export', icon: 'fa-solid fa-download', action: function () { /* noop */ } },
                { divider: true },
                { label: 'Delete', icon: 'fa-solid fa-trash', disabled: true },
            ],
            lastMenuSelection: '',
            sampleDate: new Date(),
            fiveMinutesAgo: now - (5 * 60 * 1000),
            twoHoursAgo: now - (2 * 60 * 60 * 1000),
            yesterday: now - (24 * 60 * 60 * 1000),
            lastWeek: now - (7 * 24 * 60 * 60 * 1000),
            carouselItems: [
                'Quality Design',
                'Fast Performance',
                'Great Support',
                'Easy Integration',
            ],
            shortCarouselItems: ['One', 'Two', 'Three'],
            dragItems: [
                { id: 1, label: 'Item 1' },
                { id: 2, label: 'Item 2' },
                { id: 3, label: 'Item 3' },
            ],
            droppedItems: [],
            animatedProgress: 0,
            progressInterval: null,
        };
    },

    mounted() {
        this.startProgressAnimation();
    },

    unmounted() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    },

    methods: {

        onMenuSelect(item) {
            this.lastMenuSelection = item.label;
        },

        onDragStart() {
            // Drag started
        },

        onDragEnd() {
            // Drag ended
        },

        onDrop(event) {
            const sourceData = event.sourceData;
            const droppedItems = this.droppedItems;
            const exists = droppedItems.some(function (item) {
                return item.id === sourceData.id;
            });
            if (sourceData && !exists) {
                this.droppedItems.push(sourceData);
            }
        },

        startProgressAnimation() {
            this.progressInterval = setInterval(this.incrementProgress.bind(this), 50);
        },

        incrementProgress() {
            this.animatedProgress = (this.animatedProgress + 1) % 101;
        },

    },

};
</script>

<style scoped>
.GalleryUtility {
    padding: var(--sp3) 0;
}

.DemoBox {
    min-width: 200px;
    text-align: center;
    cursor: context-menu;
}

.DemoResult {
    margin-top: var(--sp2);
    padding: var(--sp1-5);
    background: var(--color-base-1);
    border-radius: var(--border-radius);
    font-size: var(--font-size-small);
    color: var(--color-text-1);
}

.DemoMarginTop {
    margin-top: var(--sp2);
}

.DemoLabel {
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-1);
    min-width: 100px;
}

.DemoHelpLink {
    color: var(--color-primary-2);
    cursor: pointer;
    text-decoration: underline;
}

.DemoCarousel {
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-2);
    min-width: 150px;
}

.DemoCarouselSmall {
    font-weight: var(--font-weight-medium);
    color: var(--color-text-0);
    min-width: 60px;
    text-align: center;
}

.DemoChatContainer {
    display: flex;
    justify-content: flex-start;
}

.DemoChatContainerRight {
    display: flex;
    justify-content: flex-end;
}

.DemoDragItem {
    display: flex;
    align-items: center;
    gap: var(--sp1);
    min-width: 150px;
}

.DemoDragHandle {
    color: var(--color-text-2);
}

.DemoDropZone {
    min-width: 200px;
    min-height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-style: dashed;
    color: var(--color-text-2);
}

.DemoCode {
    padding: var(--sp0-5) var(--sp);
    background: var(--color-base-2);
    border-radius: var(--border-radius-small);
    font-family: var(--font-monospace);
    font-size: var(--font-size-small);
}
</style>
