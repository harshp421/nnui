# nnuikit — Complete Publishing & Usage Guide

This guide covers everything about the nnuikit component library: how to add components, publish to npm, and how users install/use it in their projects.

---

## Table of Contents

1. [Project Architecture](#1-project-architecture)
2. [How to Add a New Component](#2-how-to-add-a-new-component)
3. [Publishing the CLI to npm](#3-publishing-the-cli-to-npm)
4. [How Users Install nnuikit](#4-how-users-install-nnuikit)
5. [How Users Add Components](#5-how-users-add-components)
6. [Design Tokens](#6-design-tokens)
7. [Deploying the Docs Site](#7-deploying-the-docs-site)
8. [Adding a New Docs Page](#8-adding-a-new-docs-page)
9. [Updating the Registry](#9-updating-the-registry)
10. [Troubleshooting](#10-troubleshooting)

---

## 1. Project Architecture

```
nnuikit/
├── packages/
│   └── cli/                          # CLI tool (published to npm as "nnuikit")
│       ├── package.json
│       ├── src/
│       │   ├── index.js              # CLI entry point
│       │   ├── commands/
│       │   │   ├── init.js           # `npx nnuikit init`
│       │   │   └── add.js            # `npx nnuikit add <component>`
│       │   └── utils/
│       │       ├── registry.js       # Fetches component registry
│       │       ├── config.js         # Reads/writes nnuikit.json
│       │       └── logger.js         # Console output helpers
│       └── README.md
│
├── src/
│   ├── lib/
│   │   ├── components/
│   │   │   ├── ui/                   # ← YOUR COMPONENTS LIVE HERE
│   │   │   │   ├── button/
│   │   │   │   │   ├── button.svelte # Component source code
│   │   │   │   │   └── index.ts      # Component exports
│   │   │   │   └── checkbox/
│   │   │   │       ├── checkbox.svelte
│   │   │   │       └── index.ts
│   │   │   └── docs/                 # Doc helper components (not published)
│   │   ├── registry/
│   │   │   ├── registry.json         # Component registry (source of truth)
│   │   │   └── index.ts
│   │   ├── utils/
│   │   │   └── tailwindUtil.ts       # cn() utility and types
│   │   └── index.ts                  # Library exports (for docs site)
│   │
│   └── routes/                       # Documentation website
│       ├── +page.svelte              # Landing page
│       ├── +layout.svelte            # Root layout
│       ├── layout.css                # Design tokens + global CSS
│       └── docs/
│           ├── +layout.svelte        # Docs sidebar layout
│           ├── +page.svelte          # Introduction page
│           ├── getting-started/
│           │   ├── installation/
│           │   │   └── +page.svelte
│           │   └── theming/
│           │       └── +page.svelte
│           └── components/
│               ├── button/
│               │   └── +page.svelte
│               └── checkbox/
│                   └── +page.svelte
│
├── GUIDE.md                          # ← This file
└── package.json                      # Root project config
```

**Key concept:** nnuikit works like **shadcn/ui** — instead of importing pre-built components from an npm package, users run a CLI that **copies component source code** directly into their project. They own the code and can customize anything.

---

## 2. How to Add a New Component

Follow these steps every time you create a new component:

### Step 1: Create the Component Files

Create a new folder under `src/lib/components/ui/`:

```
src/lib/components/ui/your-component/
├── your-component.svelte    # The component
└── index.ts                 # Exports
```

**Component file** (`your-component.svelte`):
```svelte
<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils/tailwindUtil';
  import { type VariantProps, tv } from 'tailwind-variants';

  // Define variants using tailwind-variants
  export const yourComponentVariants = tv({
    base: '...base classes...',
    variants: {
      variant: {
        default: '...',
        // add more variants
      },
      size: {
        sm: '...',
        md: '...',
        lg: '...',
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    }
  });

  export type YourComponentProps = {
    variant?: VariantProps<typeof yourComponentVariants>['variant'];
    size?: VariantProps<typeof yourComponentVariants>['size'];
    class?: string;
  };
</script>

<script lang="ts">
  let {
    class: className,
    variant = 'default',
    size = 'md',
    children,
    ...restProps
  }: YourComponentProps = $props();
</script>

<div
  class={cn(yourComponentVariants({ variant, size }), className)}
  {...restProps}
>
  {@render children?.()}
</div>
```

**Index file** (`index.ts`):
```typescript
import Root from './your-component.svelte';
export type { YourComponentProps } from './your-component.svelte';
export { Root, Root as YourComponent };
```

### Step 2: Add to Registry

Edit `src/lib/registry/registry.json` and add your component:

```json
{
  "components": {
    "your-component": {
      "name": "your-component",
      "description": "Short description of what it does",
      "files": [
        {
          "path": "ui/your-component/your-component.svelte",
          "source": "src/lib/components/ui/your-component/your-component.svelte"
        },
        {
          "path": "ui/your-component/index.ts",
          "source": "src/lib/components/ui/your-component/index.ts"
        }
      ],
      "dependencies": ["tailwind-variants"],
      "registryDependencies": ["utils"],
      "docs": "/docs/components/your-component"
    }
  }
}
```

**Fields explained:**
- `files.path` — Where the file will be placed in the user's project (relative to their components dir)
- `files.source` — Where the file lives in the nnuikit repo (for remote fetching)
- `dependencies` — npm packages the component needs (installed automatically)
- `registryDependencies` — Internal dependencies like "utils" (cn function, types)
- `docs` — URL path to the documentation page

### Step 3: Add the Bundled Content to CLI

Edit `packages/cli/src/commands/add.js` and add your component's source code to the `getBundledContent()` function. This is the fallback when remote fetching fails:

```javascript
bundled["src/lib/components/ui/your-component/your-component.svelte"] = `...component source...`;
bundled["src/lib/components/ui/your-component/index.ts"] = `...index source...`;
```

### Step 4: Update the Docs Sidebar

Edit `src/routes/docs/+layout.svelte` and add the component to the navigation:

```javascript
{
  title: 'Components',
  items: [
    { label: 'Button', href: '/docs/components/button' },
    { label: 'Checkbox', href: '/docs/components/checkbox' },
    { label: 'Your Component', href: '/docs/components/your-component' }, // ← Add this
  ]
}
```

### Step 5: Create the Documentation Page

Create `src/routes/docs/components/your-component/+page.svelte`:

```svelte
<script lang="ts">
  import {
    DocsPage, PageHeader, ComponentPreview,
    CodeBlock, PropsTable, ComponentSource
  } from '$lib/components/docs';
  import { YourComponent } from '$lib/components/ui/your-component';

  const props = [
    {
      name: 'variant',
      type: '"default" | "..."',
      default: '"default"',
      description: 'The visual style.'
    },
    // ... more props
  ];
</script>

<DocsPage>
  <PageHeader
    title="Your Component"
    description="Description of your component."
  />

  <div class="mt-28 flex flex-col gap-32">
    <ComponentSource name="your-component" path="$lib/components/ui/your-component/your-component.svelte" />

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock code={`npx nnuikit add your-component`} language="bash" />
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
      <ComponentPreview code={`<YourComponent>Hello</YourComponent>`}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-10">
            <YourComponent>Hello</YourComponent>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- Add variant examples, size examples, etc. -->

    <section class="space-y-8">
      <h2 class="border-b py-6 text-2xl font-bold tracking-tight">Props</h2>
      <PropsTable {props} />
    </section>
  </div>
</DocsPage>
```

### Step 6: Update Landing Page

If desired, add a card to the landing page's "Available Components" grid in `src/routes/docs/+page.svelte`.

---

## 3. Publishing the CLI to npm

### First-Time Setup

1. **Create an npm account** at https://www.npmjs.com/signup

2. **Login from terminal:**
   ```bash
   npm login
   ```

3. **Check that the package name is available:**
   ```bash
   npm view nnuikit
   # If it shows 404 / not found, the name is available
   # If taken, change the name in packages/cli/package.json
   # You can use a scoped name: @yourname/nnuikit
   ```

4. **Update the registry URL** in `packages/cli/src/utils/registry.js`:
   ```javascript
   const DEFAULT_REGISTRY_URL = "https://raw.githubusercontent.com/YOUR_USERNAME/nnuikit/main";
   ```

5. **Also update** the `registryUrl` default in `packages/cli/src/commands/init.js`.

### Publishing

```bash
# Navigate to the CLI package
cd packages/cli

# Make sure the version is correct in package.json
# Bump version: npm version patch/minor/major
npm version patch

# Publish to npm
npm publish

# If using a scoped package (@yourname/nnuikit):
npm publish --access public
```

### After Publishing

Users can now run:
```bash
npx nnuikit init
npx nnuikit add button
```

### Updating

When you add new components or fix bugs:

```bash
cd packages/cli

# Update the bundled component content in add.js
# Update registry.json
# Bump version
npm version patch

# Publish
npm publish
```

---

## 4. How Users Install nnuikit

Users follow these steps to add nnuikit to their Svelte project:

### Step 1: Initialize

```bash
npx nnuikit init
```

This does:
- Creates `nnuikit.json` config file in their project root
- Creates `src/lib/utils/tailwindUtil.ts` (cn utility)
- Installs base dependencies: `clsx`, `tailwind-merge`, `tailwind-variants`

### Step 2: Add Design Tokens

Users must copy the design tokens from the nnuikit repo's `src/routes/layout.css` into their own global CSS file. This is the CSS custom properties that power the theming.

### Step 3: Add Components

```bash
# Add a single component
npx nnuikit add button

# Add multiple components
npx nnuikit add button checkbox

# Add all components
npx nnuikit add --all

# Interactive picker
npx nnuikit add
```

---

## 5. How Users Add Components

When a user runs `npx nnuikit add button`, the CLI:

1. Reads `nnuikit.json` from their project root
2. Fetches the component registry
3. Finds the "button" component definition
4. Copies `button.svelte` and `index.ts` to `src/lib/components/ui/button/`
5. Ensures utils (`tailwindUtil.ts`) are present
6. Installs required npm dependencies (`tailwind-variants`)
7. Prints import instructions

### User's Import

After adding, users import like this:

```svelte
<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary" size="lg">Click me</Button>
```

---

## 6. Design Tokens

nnuikit components use CSS custom properties (design tokens) for all visual styling. The tokens live in `src/routes/layout.css`.

### Token Naming Convention

```
--color-{component}-{variant}-{state}-{property}
```

Examples:
```css
--color-button-brand-default-surface       /* Button primary background */
--color-button-brand-hover-surface         /* Button primary hover background */
--color-button-destructive-default-text    /* Destructive button text */
--color-checkbox---radio-default-border    /* Checkbox border */
--spacing-button-medium-normal-radius      /* Button medium border radius */
--size-button-medium-normal-height         /* Button medium height */
```

### Providing Tokens to Users

Users need these tokens for components to render correctly. Options:

1. **Copy from repo** — Direct users to copy from `src/routes/layout.css`
2. **Hosted CSS file** — Host a CSS file they can import: `@import url('https://nnuikit.dev/tokens.css');`
3. **CLI copies it** — Enhance the `init` command to copy tokens automatically

---

## 7. Deploying the Docs Site

The docs site is a standard SvelteKit app. Deploy to any platform:

### Vercel (recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Netlify

```bash
npm i -g netlify-cli
netlify deploy --prod
```

### GitHub Pages

Install the static adapter:
```bash
npm i -D @sveltejs/adapter-static
```

Update `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-static';

const config = {
  kit: {
    adapter: adapter({ fallback: '404.html' })
  }
};
```

---

## 8. Adding a New Docs Page

### Component Documentation Page

1. Create the route: `src/routes/docs/components/{name}/+page.svelte`
2. Use the docs helper components: `DocsPage`, `PageHeader`, `ComponentPreview`, `CodeBlock`, `PropsTable`, `ComponentSource`
3. Add to the sidebar in `src/routes/docs/+layout.svelte`

### General Documentation Page

1. Create the route: `src/routes/docs/{section}/{page}/+page.svelte`
2. Add to the sidebar navigation

### Docs Helper Components

| Component | Purpose |
|-----------|---------|
| `DocsPage` | Container wrapper with max-width and padding |
| `PageHeader` | Title + description at the top |
| `ComponentPreview` | Live preview + code block |
| `CodeBlock` | Syntax-highlighted code with copy button |
| `PropsTable` | Table showing component props, types, defaults |
| `ComponentSource` | Shows the source file path |

---

## 9. Updating the Registry

When you add, remove, or modify components, update these files:

1. **`src/lib/registry/registry.json`** — The source of truth for all component definitions
2. **`packages/cli/src/commands/add.js`** — The bundled component content (fallback)
3. **`packages/cli/src/utils/registry.js`** — If changing the bundled registry structure

After updating, bump the CLI version and republish:
```bash
cd packages/cli
npm version patch
npm publish
```

---

## 10. Troubleshooting

### "No nnuikit.json found"
Run `npx nnuikit init` first to create the config file.

### Components look unstyled
Make sure you've added the design tokens to your global CSS file. Components depend on CSS custom properties for all colors, spacing, and sizing.

### $lib alias not working
nnuikit components use SvelteKit's `$lib` alias. If you're not using SvelteKit, configure the alias in your bundler (Vite):
```javascript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      '$lib': path.resolve('./src/lib')
    }
  }
});
```

### Package name taken on npm
Use a scoped name: change `"name": "nnuikit"` to `"name": "@yourname/nnuikit"` in `packages/cli/package.json`. Users will then run `npx @yourname/nnuikit init`.

### Component files not fetching from remote
The CLI tries to fetch from `registryUrl` in `nnuikit.json`. If it fails, it falls back to bundled content. Make sure:
1. Your GitHub repo is public
2. The `registryUrl` points to the correct raw GitHub URL
3. Component files exist at the paths specified in the registry

---

## Quick Reference: Complete Workflow for Adding a Component

```bash
# 1. Create component files
mkdir src/lib/components/ui/my-component
# Create my-component.svelte and index.ts

# 2. Update registry
# Edit src/lib/registry/registry.json

# 3. Update CLI bundled content
# Edit packages/cli/src/commands/add.js → getBundledContent()

# 4. Create docs page
mkdir src/routes/docs/components/my-component
# Create +page.svelte

# 5. Update sidebar
# Edit src/routes/docs/+layout.svelte

# 6. Update landing page (optional)
# Edit src/routes/docs/+page.svelte

# 7. Publish CLI update
cd packages/cli
npm version patch
npm publish
```
