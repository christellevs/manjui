<template>
    <div class="LanguageToggle">
        <span
            v-for="(lang, index) in languages"
            :key="lang"
            class="LanguageToggle-item"
            :class="{ 'LanguageToggle-item-active': currentLanguage === lang }"
            :title="`Switch to ${lang.toUpperCase()}`"
            @click="selectLanguage(lang)">
            {{ lang.toUpperCase() }}
            <span
                v-if="index < languages.length - 1"
                class="LanguageToggle-separator">|</span>
        </span>
    </div>
</template>

<script>
export default {

    props: {
        languages: {
            type: Array,
            default() {
                return ['en', 'pt'];
            }
        },
        current: {
            type: String,
            default: 'en'
        }
    },

    data() {
        return {
            currentLanguage: this.current,
        };
    },

    watch: {
        current(newVal) {
            this.currentLanguage = newVal;
        }
    },

    methods: {

        selectLanguage(lang) {
            this.currentLanguage = lang;
            this.$emit('change', lang);
        },

    }

};
</script>

<style scoped>
.LanguageToggle {
    display: inline-flex;
    align-items: center;
    gap: var(--sp0-5);
    font-size: var(--font-size-small);
    font-weight: var(--font-weight-medium);
    user-select: none;
}

.LanguageToggle-item {
    color: var(--color-text-2);
    cursor: pointer;
    transition: color 0.2s ease;
    display: inline-flex;
    align-items: center;
    gap: var(--sp0-5);
}

.LanguageToggle-item:hover {
    color: var(--color-text-0);
}

.LanguageToggle-item-active {
    color: var(--color-primary-2);
    font-weight: var(--font-weight-bold);
}

.LanguageToggle-separator {
    color: var(--color-text-3);
    pointer-events: none;
    user-select: none;
}
</style>
