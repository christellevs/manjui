<template>
    <article>
        <h2>Checkboxes</h2>
        <VGroup gap="3">
            <!-- Standard Checkboxes -->
            <VGroup gap="1">
                <h3>Standard</h3>
                <HGroup wrap>
                    <Checkbox
                        v-model="values.default"
                        label="Default"
                        kind="default" />
                    <Checkbox
                        v-model="values.primary"
                        label="Primary"
                        kind="primary" />
                    <Checkbox
                        v-model="values.secondary"
                        label="Secondary"
                        kind="secondary" />
                    <Checkbox
                        v-model="values.tertiary"
                        label="Tertiary"
                        kind="tertiary" />
                    <Checkbox
                        v-model="values.success"
                        label="Success"
                        kind="success" />
                    <Checkbox
                        v-model="values.warning"
                        label="Warning"
                        kind="warning" />
                    <Checkbox
                        v-model="values.danger"
                        label="Danger"
                        kind="danger" />
                </HGroup>
            </VGroup>

            <!-- Sizes -->
            <VGroup gap="1">
                <h3>Sizes</h3>
                <HGroup wrap align="center">
                    <Checkbox
                        v-model="values.small"
                        label="Small"
                        size="small"
                        kind="primary" />
                    <Checkbox
                        v-model="values.normal"
                        label="Normal"
                        size="normal"
                        kind="primary" />
                    <Checkbox
                        v-model="values.large"
                        label="Large"
                        size="large"
                        kind="primary" />
                </HGroup>
            </VGroup>

            <!-- Toggle/Switch -->
            <VGroup gap="1">
                <h3>Toggle / Switch</h3>
                <HGroup wrap>
                    <Checkbox
                        v-model="values.toggleDefault"
                        label="Default"
                        kind="default"
                        toggle />
                    <Checkbox
                        v-model="values.togglePrimary"
                        label="Primary"
                        kind="primary"
                        toggle />
                    <Checkbox
                        v-model="values.toggleSecondary"
                        label="Secondary"
                        kind="secondary"
                        toggle />
                    <Checkbox
                        v-model="values.toggleTertiary"
                        label="Tertiary"
                        kind="tertiary"
                        toggle />
                    <Checkbox
                        v-model="values.toggleSuccess"
                        label="Success"
                        kind="success"
                        toggle />
                    <Checkbox
                        v-model="values.toggleWarning"
                        label="Warning"
                        kind="warning"
                        toggle />
                    <Checkbox
                        v-model="values.toggleDanger"
                        label="Danger"
                        kind="danger"
                        toggle />
                </HGroup>
            </VGroup>

            <!-- Toggle Sizes -->
            <VGroup gap="1">
                <h3>Toggle Sizes</h3>
                <HGroup wrap align="center">
                    <Checkbox
                        v-model="values.toggleSmall"
                        label="Small"
                        size="small"
                        kind="primary"
                        toggle />
                    <Checkbox
                        v-model="values.toggleNormal"
                        label="Normal"
                        size="normal"
                        kind="primary"
                        toggle />
                    <Checkbox
                        v-model="values.toggleLarge"
                        label="Large"
                        size="large"
                        kind="primary"
                        toggle />
                </HGroup>
            </VGroup>

            <!-- Disabled State -->
            <VGroup gap="1">
                <h3>Disabled</h3>
                <HGroup wrap>
                    <Checkbox
                        :modelValue="false"
                        label="Unchecked"
                        kind="primary"
                        disabled />
                    <Checkbox
                        :modelValue="true"
                        label="Checked"
                        kind="primary"
                        disabled />
                    <Checkbox
                        :modelValue="false"
                        label="Toggle Off"
                        kind="primary"
                        toggle
                        disabled />
                    <Checkbox
                        :modelValue="true"
                        label="Toggle On"
                        kind="primary"
                        toggle
                        disabled />
                </HGroup>
            </VGroup>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            values: {
                default: false,
                primary: true,
                secondary: false,
                tertiary: false,
                success: true,
                warning: false,
                danger: false,
                small: true,
                normal: true,
                large: true,
                toggleDefault: false,
                togglePrimary: true,
                toggleSecondary: false,
                toggleTertiary: false,
                toggleSuccess: true,
                toggleWarning: false,
                toggleDanger: false,
                toggleSmall: true,
                toggleNormal: true,
                toggleLarge: true,
            }
        };
    }

};
</script>

<style scoped>
h3 {
    margin: 0;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-text-1);
    text-transform: uppercase;
    letter-spacing: var(--tracking-wide);
}
</style>
