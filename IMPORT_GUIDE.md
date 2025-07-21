# Manjui Import Guide

This guide explains how to properly import and use the Manjui library in your Vue 3 project.

## Installation

First, install the library:

```bash
npm install manjui
# or
yarn add manjui
# or
pnpm add manjui
```

## Import Methods

### Method 1: Import Individual Components (Recommended)

```javascript
// Import specific components
import { Btn, Title, Text, Icon } from 'manjui';

// Import theme utilities
import { ThemeManager, createThemePlugin } from 'manjui/utils';

// Import CSS (required)
import 'manjui/components.css';
```

### Method 2: Import All Components

```javascript
// Import all components at once
import { components } from 'manjui';

// Import CSS (required)
import 'manjui/components.css';

// Use in Vue app
app.use(components);
```

### Method 3: Import from Specific Exports

```javascript
// Import from components export
import { Btn, Title } from 'manjui/components';

// Import from utils export
import { ThemeManager, createThemePlugin } from 'manjui/utils';

// Import CSS
import 'manjui/stylesheets/components.css';
```

## Vue 3 Setup

### In your main.js/main.ts:

```javascript
import { createApp } from 'vue';
import App from './App.vue';

// Import Manjui theme plugin
import { createThemePlugin } from 'manjui';

// Import Manjui CSS (REQUIRED!)
import 'manjui/components.css';

const app = createApp(App);

// Use theme plugin for theme management
app.use(createThemePlugin());

app.mount('#app');
```

### Using Components in Vue:

```vue
<template>
  <div>
    <Title>Welcome to My App</Title>
    <Text>This is a text component from Manjui</Text>
    <Btn @click="handleClick">Click Me</Btn>
  </div>
</template>

<script setup>
import { Btn, Title, Text } from 'manjui';

const handleClick = () => {
  console.log('Button clicked!');
};
</script>
```

## Common Issues & Solutions

### Issue 1: Components not styled
**Solution**: Make sure you import the CSS file:
```javascript
import 'manjui/components.css';
```

### Issue 2: Vue peer dependency warning
**Solution**: Manjui requires Vue 3.5.13 or higher. Update your Vue version:
```bash
npm install vue@^3.5.13
```

### Issue 3: ESM Module errors
**Solution**: Manjui is an ESM-only package. Make sure your project supports ES modules:
- Add `"type": "module"` to your package.json, OR
- Use a bundler like Vite that handles ESM modules

### Issue 4: TypeScript errors
**Solution**: The library includes TypeScript definitions. If you're having issues:
1. Make sure you have Vue types installed: `npm install -D @types/node`
2. Add to your `tsconfig.json`:
```json
{
  "compilerOptions": {
    "types": ["vue"]
  }
}
```

### Issue 5: Build/Import errors in older build tools
**Solution**: If using webpack or older build tools, you may need to configure them to handle `.vue` files and ES modules properly. Consider migrating to Vite for better ESM support.

## Theme Management

To use the theme switching functionality:

```javascript
import { ThemeManager } from 'manjui';

// Set theme
ThemeManager.setTheme('dark'); // 'light', 'dark', or 'auto'

// Get current theme
const currentTheme = ThemeManager.getTheme();

// Listen to theme changes
ThemeManager.on('theme-changed', (theme) => {
  console.log('Theme changed to:', theme);
});
```

## Local Development / Linking

If you're developing locally and want to link the library:

1. In the manjui directory:
```bash
npm run build
npm link
```

2. In your project:
```bash
npm link manjui
```

## Build Output Structure

When built, Manjui creates:
- `dist/bundle.js` - Main bundle with all exports
- `dist/components.js` - Components only
- `dist/utils.js` - Utilities only
- `dist/components.css` - All component styles

The package.json exports are configured to map these correctly when importing.