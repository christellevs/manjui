<template>
    <Btn
        :icon="themeIcon"
        :title="themeTitle"
        kind="link-default"
        square
        @click="toggleTheme" />
</template>

<script>
export default {

    inject: ['themeManager'],

    data() {
        return {
            currentTheme: 'auto',
        };
    },

    computed: {

        themeIcon() {
            const theme = this.currentTheme === 'auto'
                ? this.getSystemTheme()
                : this.currentTheme;
            return theme === 'dark' ? 'fa fa-moon' : 'fa fa-sun';
        },

        themeTitle() {
            const theme = this.currentTheme === 'auto'
                ? `Auto (${this.getSystemTheme()})`
                : this.currentTheme;
            return `Theme: ${theme}`;
        },

    },

    mounted() {
        if (this.themeManager) {
            this.currentTheme = this.themeManager.currentTheme;
            window.addEventListener('themeChanged', this.updateTheme);
        }
    },

    beforeUnmount() {
        window.removeEventListener('themeChanged', this.updateTheme);
    },

    methods: {

        toggleTheme() {
            if (this.themeManager) {
                this.themeManager.toggleTheme();
            }
        },

        updateTheme() {
            if (this.themeManager) {
                this.currentTheme = this.themeManager.currentTheme;
            }
        },

        getSystemTheme() {
            const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            return isDark ? 'dark' : 'light';
        },

    }

};
</script>

