<template>
    <article>
        <h2>Inputs</h2>

        <VGroup gap="2">

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
                    v-model="round"
                    label="Round"
                    kind="default" />
                <Checkbox
                    v-model="invalid"
                    label="Invalid"
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

            <InputText
                v-model="text"
                label="Optional very very very very very very very very very very long label"
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                :size="size">
                <template #after>
                    <i
                        v-if="icon"
                        :class="icon"
                        class="color-success" />
                </template>
            </InputText>
        </VGroup>

        <p>
            <code>InputBase</code> is a handy component used to create input-like fields.
            You can place arbitrary content into its default slot.
        </p>

        <VGroup gap="2">

            <HGroup align="end">
                <InputBase
                    class="flex-1"
                    label="Optional label"
                    :pseudoFocus="focus"
                    :pseudoHover="hover"
                    :round="round"
                    :disabled="disabled"
                    :invalid="invalid"
                    :size="size">
                    <div tabindex="0">
                        The text above is <strong>{{ text }}</strong>
                    </div>
                </InputBase>
                <Btn
                    label="Side button"
                    kind="default"
                    :round="round"
                    :size="size" />
            </HGroup>

            <InputBase
                :pseudoFocus="focus"
                :pseudoHover="hover"
                :round="round"
                :disabled="disabled"
                :invalid="invalid"
                :size="size"
                :fixedHeight="false">
                <VGroup>
                    <p>Can also be multiline and contain other elements.</p>
                    <HGroup>
                        <Btn
                            label="Some button"
                            kind="default"
                            :round="round"
                            :size="size" />
                    </HGroup>
                </VGroup>
            </InputBase>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            text: 'Hello world!',
            disabled: false,
            focus: false,
            hover: false,
            round: false,
            invalid: false,
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

    },

};
</script>

<style scoped>
</style>
