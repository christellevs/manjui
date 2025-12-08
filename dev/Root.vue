<template>
    <div class="Root">
        <div class="Header">
            <HGroup gap="2">
                <LanguageToggle
                    :languages="['en', 'pt']"
                    :current="currentLanguage"
                    @change="handleLanguageChange" />
                <ThemeToggle />
            </HGroup>
        </div>
        <div class="Container">
            <Usage />
            <DesignSystem />
            <GalleryBtn />
            <GalleryCheckbox />
            <GalleryInput />
            <GalleryForm />
            <GalleryTab />
            <GalleryLayout />
            <GalleryData />
            <GalleryFeedback />
            <GalleryUtility />
        </div>
    </div>
</template>

<script>
import DesignSystem from './DesignSystem.vue';
import GalleryBtn from './GalleryBtn.vue';
import GalleryCheckbox from './GalleryCheckbox.vue';
import GalleryData from './GalleryData.vue';
import GalleryFeedback from './GalleryFeedback.vue';
import GalleryForm from './GalleryForm.vue';
import GalleryInput from './GalleryInput.vue';
import GalleryLayout from './GalleryLayout.vue';
import GalleryTab from './GalleryTab.vue';
import GalleryUtility from './GalleryUtility.vue';
import Usage from './Usage.vue';

export default {

    components: {
        DesignSystem,
        GalleryBtn,
        GalleryCheckbox,
        GalleryData,
        GalleryFeedback,
        GalleryForm,
        GalleryInput,
        GalleryLayout,
        GalleryTab,
        GalleryUtility,
        Usage,
    },

    data() {
        return {
            currentLanguage: 'en',
        };
    },

    methods: {

        handleLanguageChange(lang) {
            this.currentLanguage = lang;
            console.log('Language changed to:', lang);
        },

    }

};
</script>

<style scoped>

.Header {
    position: fixed;
    top: var(--sp2);
    right: var(--sp2);
    z-index: 1000;
}

.Container {
    max-width: var(--container-width);
    margin: var(--sp4) auto;
}

@media screen and (max-width: 420px) {
    .Container {
        padding: var(--sp2);
    }
}

</style>
