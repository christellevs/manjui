<template>
    <article>
        <h2>Form Components</h2>

        <VGroup gap="3">
            <!-- Controls -->
            <HGroup wrap>
                <Checkbox
                    v-model="disabled"
                    label="Disabled"
                    kind="default" />
                <Checkbox
                    v-model="small"
                    label="Small"
                    kind="default" />
                <Checkbox
                    v-model="large"
                    label="Large"
                    kind="default" />
            </HGroup>

            <!-- InputMenu Section -->
            <VGroup gap="2">
                <h3>InputMenu</h3>
                <p>
                    Dropdown select component with optional search functionality
                    and keyboard navigation.
                </p>

                <HGroup
                    gap="2"
                    wrap>
                    <InputMenu
                        v-model="selectedFruit"
                        label="Select a fruit"
                        :options="fruitOptions"
                        placeholder="Choose..."
                        :disabled="disabled"
                        :size="size"
                        class="flex-1" />

                    <InputMenu
                        v-model="selectedCountry"
                        label="Searchable"
                        :options="countryOptions"
                        placeholder="Search countries..."
                        :searchable="true"
                        :disabled="disabled"
                        :size="size"
                        class="flex-1" />
                </HGroup>

                <p class="color-text-2">
                    Selected fruit: <strong>{{ selectedFruit || 'none' }}</strong>,
                    Selected country: <strong>{{ selectedCountry || 'none' }}</strong>
                </p>
            </VGroup>

            <!-- InputStringList Section -->
            <VGroup gap="2">
                <h3>InputStringList</h3>
                <p>
                    Tag input component for managing lists of strings.
                    Press Enter or blur to add items.
                </p>

                <HGroup
                    gap="2"
                    wrap>
                    <InputStringList
                        v-model="tags"
                        label="Tags"
                        placeholder="Add a tag..."
                        :disabled="disabled"
                        :size="size"
                        class="flex-1" />

                    <InputStringList
                        v-model="limitedTags"
                        label="Max 3 items"
                        placeholder="Add item..."
                        :maxItems="3"
                        :disabled="disabled"
                        :size="size"
                        class="flex-1" />
                </HGroup>

                <p class="color-text-2">
                    Tags: <strong>{{ tags.join(', ') || 'none' }}</strong>
                </p>
            </VGroup>

            <!-- FormRow Section -->
            <VGroup gap="2">
                <h3>FormRow</h3>
                <p>
                    Form field wrapper with label, hint text, and error message support.
                </p>

                <VGroup gap="2">
                    <FormRow
                        label="Username"
                        hint="Choose a unique username">
                        <InputText
                            v-model="username"
                            placeholder="Enter username"
                            :disabled="disabled"
                            :size="size" />
                    </FormRow>

                    <FormRow
                        label="Email"
                        required
                        :error="emailError">
                        <InputText
                            v-model="email"
                            type="email"
                            placeholder="Enter email"
                            :disabled="disabled"
                            :size="size"
                            :invalid="!!emailError" />
                    </FormRow>

                    <FormRow
                        label="Category"
                        horizontal>
                        <InputMenu
                            v-model="category"
                            :options="categoryOptions"
                            placeholder="Select category"
                            :disabled="disabled"
                            :size="size" />
                    </FormRow>
                </VGroup>
            </VGroup>

            <!-- StateBtn Section -->
            <VGroup gap="2">
                <h3>StateBtn</h3>
                <p>
                    Button with loading, success, and error states.
                    Click to simulate async operations.
                </p>

                <HGroup
                    gap="2"
                    wrap>
                    <StateBtn
                        label="Save"
                        kind="primary"
                        :loading="saving"
                        :success="saveSuccess"
                        loadingText="Saving..."
                        successText="Saved!"
                        :disabled="disabled"
                        :size="size"
                        @click="simulateSave" />

                    <StateBtn
                        label="Delete"
                        kind="danger"
                        :loading="deleting"
                        :error="deleteError"
                        loadingText="Deleting..."
                        errorText="Failed!"
                        :disabled="disabled"
                        :size="size"
                        @click="simulateDelete" />

                    <StateBtn
                        label="Submit"
                        kind="success"
                        :loading="submitting"
                        :success="submitSuccess"
                        :error="submitError"
                        loadingText="Submitting..."
                        successText="Done!"
                        errorText="Error!"
                        :disabled="disabled"
                        :size="size"
                        outline
                        @click="simulateSubmit" />
                </HGroup>

                <HGroup
                    gap="2"
                    wrap>
                    <StateBtn
                        label="Square"
                        kind="secondary"
                        :loading="squareLoading"
                        :disabled="disabled"
                        :size="size"
                        square
                        @click="simulateSquare" />

                    <StateBtn
                        label="Round"
                        kind="tertiary"
                        :loading="roundLoading"
                        :disabled="disabled"
                        :size="size"
                        round
                        @click="simulateRound" />
                </HGroup>
            </VGroup>

            <!-- Combined Example -->
            <VGroup gap="2">
                <h3>Combined Example</h3>
                <p>
                    A complete form using all components together.
                </p>

                <VGroup
                    gap="2"
                    class="ExampleForm">
                    <FormRow
                        label="Project Name"
                        required>
                        <InputText
                            v-model="projectName"
                            placeholder="Enter project name"
                            :disabled="disabled"
                            :size="size" />
                    </FormRow>

                    <FormRow
                        label="Type"
                        required>
                        <InputMenu
                            v-model="projectType"
                            :options="projectTypeOptions"
                            placeholder="Select type"
                            :disabled="disabled"
                            :size="size" />
                    </FormRow>

                    <FormRow
                        label="Tags">
                        <InputStringList
                            v-model="projectTags"
                            placeholder="Add tags..."
                            :maxItems="5"
                            :disabled="disabled"
                            :size="size" />
                    </FormRow>

                    <HGroup justify="end">
                        <Btn
                            label="Cancel"
                            kind="default"
                            :disabled="disabled"
                            :size="size" />
                        <StateBtn
                            label="Create Project"
                            kind="primary"
                            :loading="creating"
                            :success="createSuccess"
                            loadingText="Creating..."
                            successText="Created!"
                            :disabled="disabled || !projectName || !projectType"
                            :size="size"
                            @click="simulateCreate" />
                    </HGroup>
                </VGroup>
            </VGroup>
        </VGroup>
    </article>
</template>

<script>
export default {

    data() {
        return {
            // Controls
            disabled: false,
            small: false,
            large: false,

            // InputMenu
            selectedFruit: '',
            selectedCountry: '',
            fruitOptions: [
                { value: 'apple', label: 'Apple' },
                { value: 'banana', label: 'Banana' },
                { value: 'cherry', label: 'Cherry' },
                { value: 'date', label: 'Date' },
                { value: 'elderberry', label: 'Elderberry' },
            ],
            countryOptions: [
                { value: 'us', label: 'United States' },
                { value: 'uk', label: 'United Kingdom' },
                { value: 'ca', label: 'Canada' },
                { value: 'au', label: 'Australia' },
                { value: 'de', label: 'Germany' },
                { value: 'fr', label: 'France' },
                { value: 'jp', label: 'Japan' },
                { value: 'br', label: 'Brazil' },
                { value: 'mx', label: 'Mexico' },
                { value: 'in', label: 'India' },
            ],

            // InputStringList
            tags: ['vue', 'design-system'],
            limitedTags: ['one'],

            // FormRow
            username: '',
            email: '',
            emailError: '',
            category: '',
            categoryOptions: [
                'Technology',
                'Design',
                'Marketing',
                'Sales',
                'Support',
            ],

            // StateBtn
            saving: false,
            saveSuccess: false,
            deleting: false,
            deleteError: false,
            submitting: false,
            submitSuccess: false,
            submitError: false,
            squareLoading: false,
            roundLoading: false,

            // Combined Example
            projectName: '',
            projectType: '',
            projectTags: [],
            projectTypeOptions: [
                { value: 'web', label: 'Web Application' },
                { value: 'mobile', label: 'Mobile App' },
                { value: 'api', label: 'API Service' },
                { value: 'library', label: 'Library' },
            ],
            creating: false,
            createSuccess: false,
        };
    },

    computed: {

        size() {
            if (this.small) {
                return 'small';
            }
            if (this.large) {
                return 'large';
            }
            return 'normal';
        },

    },

    watch: {

        email: function (val) {
            if (val && !val.includes('@')) {
                this.emailError = 'Please enter a valid email address';
            } else {
                this.emailError = '';
            }
        },

    },

    methods: {

        simulateSave() {
            this.saving = true;
            this.saveSuccess = false;
            setTimeout(function () {
                this.saving = false;
                this.saveSuccess = true;
            }.bind(this), 1500);
        },

        simulateDelete() {
            this.deleting = true;
            this.deleteError = false;
            setTimeout(function () {
                this.deleting = false;
                this.deleteError = true;
            }.bind(this), 1500);
        },

        simulateSubmit() {
            this.submitting = true;
            this.submitSuccess = false;
            this.submitError = false;
            setTimeout(function () {
                this.submitting = false;
                if (Math.random() > 0.5) {
                    this.submitSuccess = true;
                } else {
                    this.submitError = true;
                }
            }.bind(this), 1500);
        },

        simulateSquare() {
            this.squareLoading = true;
            setTimeout(function () {
                this.squareLoading = false;
            }.bind(this), 1500);
        },

        simulateRound() {
            this.roundLoading = true;
            setTimeout(function () {
                this.roundLoading = false;
            }.bind(this), 1500);
        },

        simulateCreate() {
            this.creating = true;
            this.createSuccess = false;
            setTimeout(function () {
                this.creating = false;
                this.createSuccess = true;
            }.bind(this), 2000);
        },

    }

};
</script>

<style scoped>
.ExampleForm {
    padding: var(--sp3);
    background: var(--color-base-1);
    border: 2px solid var(--color-base-3);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-brutal-sm);
}

.flex-1 {
    flex: 1;
    min-width: 200px;
}

.color-text-2 {
    color: var(--color-text-2);
}
</style>
