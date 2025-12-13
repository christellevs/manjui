<template>
    <article>
        <h2>Feedback Components</h2>

        <VGroup gap="4">
            <!-- Spinners -->
            <section>
                <h3>Spinner</h3>
                <HGroup wrap align="center">
                    <VGroup align="center">
                        <Spinner size="small" kind="default" />
                        <Text size="small">Small</Text>
                    </VGroup>
                    <VGroup align="center">
                        <Spinner size="normal" kind="primary" />
                        <Text size="small">Normal</Text>
                    </VGroup>
                    <VGroup align="center">
                        <Spinner size="large" kind="secondary" />
                        <Text size="small">Large</Text>
                    </VGroup>
                    <VGroup align="center">
                        <Spinner size="normal" kind="tertiary" />
                        <Text size="small">Tertiary</Text>
                    </VGroup>
                </HGroup>
            </section>

            <!-- Progress Bar -->
            <section>
                <h3>Progress Bar</h3>
                <VGroup gap="2">
                    <HGroup wrap>
                        <Checkbox
                            v-model="progressShowLabel"
                            label="Show Label"
                            kind="default" />
                        <Checkbox
                            v-model="progressIndeterminate"
                            label="Indeterminate"
                            kind="default" />
                    </HGroup>
                    <VGroup gap="1">
                        <Text size="small">Default</Text>
                        <ProgressBar
                            :value="progressValue"
                            kind="default"
                            :showLabel="progressShowLabel"
                            :indeterminate="progressIndeterminate" />
                    </VGroup>
                    <VGroup gap="1">
                        <Text size="small">Primary</Text>
                        <ProgressBar
                            :value="progressValue"
                            kind="primary"
                            :showLabel="progressShowLabel"
                            :indeterminate="progressIndeterminate" />
                    </VGroup>
                    <VGroup gap="1">
                        <Text size="small">Secondary (small)</Text>
                        <ProgressBar
                            :value="progressValue"
                            kind="secondary"
                            size="small"
                            :showLabel="progressShowLabel"
                            :indeterminate="progressIndeterminate" />
                    </VGroup>
                    <VGroup gap="1">
                        <Text size="small">Tertiary (large)</Text>
                        <ProgressBar
                            :value="progressValue"
                            kind="tertiary"
                            size="large"
                            :showLabel="progressShowLabel"
                            :indeterminate="progressIndeterminate" />
                    </VGroup>
                    <HGroup align="center" gap="2">
                        <Btn label="-10" size="small" @click="decrementProgress" />
                        <Text>{{ progressValue }}%</Text>
                        <Btn label="+10" size="small" @click="incrementProgress" />
                    </HGroup>
                </VGroup>
            </section>

            <!-- Callouts -->
            <section>
                <h3>Callout</h3>
                <VGroup gap="2">
                    <Callout kind="info" title="Information">
                        This is an informational callout with some helpful details.
                    </Callout>
                    <Callout kind="success" title="Success!">
                        Your action was completed successfully.
                    </Callout>
                    <Callout kind="warning" title="Warning">
                        Please review this before proceeding.
                    </Callout>
                    <Callout kind="error" title="Error" :dismissible="true">
                        Something went wrong. This one is dismissible.
                    </Callout>
                </VGroup>
            </section>

            <!-- Empty Message -->
            <section>
                <h3>Empty Message</h3>
                <EmptyMessage
                    icon="fa-solid fa-inbox"
                    title="No items yet"
                    message="Create your first item to get started.">
                    <Btn label="Create Item" kind="primary" icon="fa-solid fa-plus" />
                </EmptyMessage>
            </section>

            <!-- Error Message -->
            <section>
                <h3>Error Message</h3>
                <ErrorMessage
                    v-if="showError"
                    title="Something went wrong"
                    message="We couldn't load your data. Please try again later."
                    :dismissible="true"
                    @dismiss="showError = false" />
                <Btn
                    v-else
                    label="Show Error"
                    kind="danger"
                    @click="showError = true" />
            </section>

            <!-- Notifications -->
            <section>
                <h3>Notifications</h3>
                <HGroup wrap>
                    <Btn
                        label="Info"
                        kind="default"
                        @click="showNotification('info')" />
                    <Btn
                        label="Success"
                        kind="success"
                        @click="showNotification('success')" />
                    <Btn
                        label="Warning"
                        kind="warning"
                        @click="showNotification('warning')" />
                    <Btn
                        label="Error"
                        kind="danger"
                        @click="showNotification('error')" />
                    <Btn
                        label="Clear All"
                        kind="default"
                        outline
                        @click="clearNotifications" />
                </HGroup>
                <Notifications ref="notifications" position="bottom-right" />
            </section>

            <!-- Loading Screen -->
            <section>
                <h3>Loading Screen</h3>
                <Btn
                    label="Show Loading Screen (2s)"
                    kind="primary"
                    @click="showLoadingScreen" />
                <LoadingScreen
                    :visible="loadingVisible"
                    message="Loading your content..." />
            </section>

            <!-- Modal -->
            <section>
                <h3>Modal</h3>
                <HGroup wrap gap="2">
                    <Btn
                        label="Open Small Modal"
                        kind="default"
                        @click="showModal('small')" />
                    <Btn
                        label="Open Normal Modal"
                        kind="primary"
                        @click="showModal('normal')" />
                    <Btn
                        label="Open Large Modal"
                        kind="secondary"
                        @click="showModal('large')" />
                </HGroup>
                <Modal
                    v-model="modalVisible"
                    :title="modalTitle"
                    :size="modalSize">
                    <VGroup gap="2">
                        <TextBlock>This is a {{ modalSize }} modal dialog.</TextBlock>
                        <TextBlock>Click the overlay, press Escape, or use the close button to dismiss.</TextBlock>
                    </VGroup>
                    <template #footer>
                        <Btn
                            label="Cancel"
                            kind="default"
                            @click="modalVisible = false" />
                        <Btn
                            label="Confirm"
                            kind="primary"
                            @click="modalVisible = false" />
                    </template>
                </Modal>
            </section>
        </VGroup>
    </article>
</template>

<script>
import Modal from '../lib/components/Modal.vue';
import TextBlock from '../lib/components/Text.vue';
import VGroup from '../lib/components/VGroup.vue';

export default {

    components: {
        Modal,
        TextBlock,
        VGroup,
    },

    data() {
        return {
            progressValue: 45,
            progressShowLabel: true,
            progressIndeterminate: false,
            showError: true,
            loadingVisible: false,
            modalVisible: false,
            modalSize: 'normal',
            modalTitle: 'Modal Title',
        };
    },

    methods: {

        incrementProgress() {
            this.progressValue = Math.min(100, this.progressValue + 10);
        },

        decrementProgress() {
            this.progressValue = Math.max(0, this.progressValue - 10);
        },

        showNotification(kind) {
            const messages = {
                info: { title: 'Information', message: 'Here is some useful information for you.' },
                success: { title: 'Success!', message: 'Your action was completed successfully.' },
                warning: { title: 'Warning', message: 'Please review this before proceeding.' },
                error: { title: 'Error', message: 'Something went wrong. Please try again.' },
            };
            const msg = messages[kind];
            this.$refs.notifications[kind](msg.title, msg.message);
        },

        clearNotifications() {
            this.$refs.notifications.clear();
        },

        showLoadingScreen() {
            this.loadingVisible = true;
            setTimeout(() => {
                this.loadingVisible = false;
            }, 2000);
        },

        showModal(size) {
            this.modalSize = size;
            this.modalTitle = size.charAt(0).toUpperCase() + size.slice(1) + ' Modal';
            this.modalVisible = true;
        },

    }

};
</script>

<style scoped>

section {
    padding: var(--sp3);
    border: 1px solid var(--color-base-3);
    border-radius: var(--border-radius);
}

h3 {
    margin-top: 0;
    margin-bottom: var(--sp2);
    font-size: var(--font-size-lg);
    color: var(--color-text-1);
}

</style>
