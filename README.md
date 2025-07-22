# Manjui

Vue UI library & design system based on Nightshade UI ([nightshade](https://www.npmjs.com/package/nightshade)).

Manjui is a complete Vue 3 framework that includes:
- **UI Components**: Reusable Vue components with consistent styling
- **Application Framework**: BaseApp class with dependency injection using mesh-ioc
- **Router Management**: BaseRouter abstraction for Vue Router
- **Theme Management**: Light/dark mode switching with CSS custom properties
- **Utility Classes**: Loader, DomEventProxy, and other helpful abstractions

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

### 1. Simple Component Usage

```javascript
// Import manjui styles
import 'manjui/stylesheets/variables.css';
import 'manjui/stylesheets/baseline.css';

// Import and use components
import { createApp } from 'vue';
import { components } from 'manjui';

const app = createApp(App);

// Register components globally
for (const [name, component] of Object.entries(components)) {
    app.component(name, component);
}
```

### 1. Complete Application Framework

For a full application with routing, dependency injection, and theme management:

```javascript
import { BaseApp, BaseRouter } from 'manjui';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';

// Create your router class
class AppRouter extends BaseRouter {
    createRouter() {
        return createRouter({
            history: createWebHistory(),
            routes: [
                { path: '/', component: HomePage },
                { path: '/about', component: AboutPage },
            ],
        });
    }
}

// Create your app class
class App extends BaseApp {
    constructor() {
        const vue = createApp(RootComponent);
        super(vue);
        
        // Register your router
        this.mesh.service(AppRouter);
        this.mesh.alias(BaseRouter, AppRouter);
    }
}

// Start the app
const app = new App();
app.start();
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
- **UI Elements**: `Btn`, `Tab`, `TabCap`, `Icon`, `Image`, `Circle`, `Divider`

### 4. Styling

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
