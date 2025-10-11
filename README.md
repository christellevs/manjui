# Manjui

Vue UI library & design system based on Nightshade UI ([nightshade](https://www.npmjs.com/package/nightshade)).

Adds blocks and sections to the library to experiment with quicker landing page and website building.

These add ons are very experimental and still under development. So please use at your own risk.

## Installation

### NPM Package (when published)
```bash
npm install manjui
```

### Local Development / Monorepo Usage
For monorepo setups or local development, you can use a file reference in your `package.json`:

```json
{
  "dependencies": {
    "manjui": "file:../../libs/manjui"
  }
}
```

Then run:
```bash
npm install
```

## Usage

### 1. Import Components and Styles

```javascript
// In your main app file (e.g., app.ts or main.ts)
import * as manjuiComponents from 'manjui';

// Import manjui styles
import 'manjui/stylesheets/variables.css';
import 'manjui/stylesheets/baseline.css';

// Register components globally (Vue 3 example)
const app = createApp(App);

for (const [name, component] of Object.entries(manjuiComponents.components || {})) {
    app.component(name, component);
}
```

### 2. Use Components in Templates

```vue
<template>
  <VGroup gap="2">
    <Title>Welcome to Manjui</Title>
    <Text>A Vue UI library for rapid development</Text>
    <Divider />
    <HGroup gap="1">
      <Btn>Primary</Btn>
      <Btn variant="secondary">Secondary</Btn>
    </HGroup>
  </VGroup>
</template>
```

### 3. Available Components

- **Layout**: `VGroup`, `HGroup`, `HStack`, `Sizer`
- **Typography**: `Title`, `Subtitle`, `Text`, `Link`
- **Form**: `InputText`, `InputBase`
- **UI Elements**: `Btn`, `Tab`, `TabCap`, `Icon`, `Image`, `Circle`, `Divider`, `ThemeToggle`

### 4. Theme Management

Manjui includes a built-in theme manager that supports light, dark, and auto modes.

#### Configuration

You can customize the localStorage key used by the theme manager:

```javascript
// Using the theme plugin
import { themePlugin } from 'manjui';

app.use(themePlugin, {
  themeStorageKey: 'my-app-theme' // Default: 'theme'
});

// Or using BaseApp
import { BaseApp } from 'manjui';

const app = new BaseApp(vueApp, mesh, {
  themeStorageKey: 'my-app-theme'
});
```

#### Usage

```vue
<template>
  <!-- Use the ThemeToggle component -->
  <ThemeToggle />

  <!-- Or use the ThemeManager directly -->
  <Btn @click="toggleTheme">Toggle Theme</Btn>
</template>

<script>
export default {
  inject: ['themeManager'],

  methods: {
    toggleTheme() {
      this.themeManager.toggleTheme();
    }
  }
}
</script>
```

### 5. Styling

Manjui uses CSS custom properties for theming. The main style files to import are:

- `manjui/stylesheets/variables.css` - Core design tokens
- `manjui/stylesheets/baseline.css` - Base styles and resets
- `manjui/stylesheets/full.css` - Complete stylesheet (alternative to importing separately)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build

# Lint code
npm run lint
```

## Acknowledgments

This project is based on the [Nightshade library](https://github.com/inca/nightshade) by [Boris Okunskiy](https://github.com/inca).

Name is inspired by Manjū, my [German Shepherd dog](https://youtube.com/shorts/tMCEoOB6cY0?si=rrYvELgXdk4O1uuI).
