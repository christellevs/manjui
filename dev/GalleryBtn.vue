<template>
    <article>
        <h2>Buttons</h2>
        <VGroup>
            <HGroup wrap>
                <Checkbox
                    v-model="disabled"
                    label="Disabled"
                    kind="default" />
                <Checkbox
                    v-model="focus"
                    label="Focus"
                    kind="default" />
                <Checkbox
                    v-model="hover"
                    label="Hover"
                    kind="default" />
                <Checkbox
                    v-model="active"
                    label="Active"
                    kind="default" />
                <Checkbox
                    v-model="round"
                    label="Round"
                    kind="default" />
                <Checkbox
                    v-model="outline"
                    label="Outline"
                    kind="default" />
                <Checkbox
                    v-model="small"
                    label="Small"
                    kind="default" />
                <Checkbox
                    v-model="showIcon"
                    label="Icon"
                    kind="default" />
            </HGroup>
            <HGroup wrap>
                <Btn
                    v-for="token, index of tokens"
                    :key="index"
                    :label="token.label"
                    :kind="token.id"
                    :disabled="disabled"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :pseudoActive="active"
                    :round="round"
                    :outline="outline"
                    :size="size"
                    :icon="icon" />
            </HGroup>
            <HGroup wrap>
                <Btn
                    v-for="token, index of tokens"
                    :key="index"
                    :label="token.label"
                    :kind="'link-' + token.id"
                    :disabled="disabled"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :pseudoActive="active"
                    :round="round"
                    :outline="outline"
                    :size="size"
                    :icon="icon" />
            </HGroup>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            disabled: false,
            focus: false,
            hover: false,
            active: false,
            round: false,
            outline: false,
            small: false,
            showIcon: false,
        };
    },

    computed: {

        size() {
            return this.small ? 'small' : '';
        },

        icon() {
            return this.showIcon ? 'far fa-check-circle' : '';
        },

        tokens() {
            return [
                {
                    id: 'default',
                    label: 'Default',
                },
                {
                    id: 'primary',
                    label: 'Primary',
                },
                {
                    id: 'secondary',
                    label: 'Secondary',
                },
                {
                    id: 'tertiary',
                    label: 'Tertiary',
                },
                {
                    id: 'success',
                    label: 'Success',
                },
                {
                    id: 'warning',
                    label: 'Warning',
                },
                {
                    id: 'danger',
                    label: 'Danger',
                },
            ];
        }

    }

};
</script>

<style scoped>
</style>
