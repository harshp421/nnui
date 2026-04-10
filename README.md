<p align="center">
  <img src="src/lib/assets/logo.svg" width="60" height="60" alt="nnuikit logo" />
</p>

<h1 align="center">nnuikit</h1>

<p align="center">
  A design-token-driven Svelte 5 component library with a 3-layer token architecture.<br/>
  Copy components into your project via CLI. Own the code. Customize everything.
</p>

<p align="center">
  <a href="https://nnuikit.com">Documentation</a> &bull;
  <a href="https://nnuikit.com/docs/components">Components</a> &bull;
  <a href="https://nnuikit.com/docs/getting-started/theming">Theme Builder</a> &bull;
  <a href="https://www.npmjs.com/package/nnuikit">npm</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/nnuikit"><img src="https://img.shields.io/npm/v/nnuikit?color=30a46c&label=npm" alt="npm version" /></a>
  <a href="https://github.com/harshp421/nnui/blob/main/LICENSE"><img src="https://img.shields.io/github/license/harshp421/nnui?color=30a46c" alt="license" /></a>
  <img src="https://img.shields.io/badge/svelte-5-ff3e00" alt="Svelte 5" />
  <img src="https://img.shields.io/badge/tailwind-v4-06b6d4" alt="Tailwind v4" />
</p>

---

## Why nnuikit?

Most component libraries give you pre-built packages. nnuikit gives you **source code** — copied directly into your project via CLI, powered by a 3-layer design token system.

- **Copy & Own** — Components live in your codebase. Modify anything without constraints.
- **3-Layer Design Tokens** — Base palette → Semantic tokens → Component tokens. Change one variable, the entire system updates.
- **5 Color Themes** — Blue, violet, pink, cyan, orange. Add `class="violet"` and every component changes.
- **Dark Mode** — Add `class="dark"` — semantic tokens remap automatically.
- **23 Components** — From buttons to dialogs, file uploaders to toasts. Each ships with its own design tokens.
- **Interactive Theme Builder** — Pick a hex, upload your logo, or use AI — generates a full 12-step palette live.

## Quick Start

```bash
# 1. Initialize in your Svelte 5 + Tailwind v4 project
npx nnuikit init

# 2. Add components
npx nnuikit add button
npx nnuikit add dialog toast tabs

# 3. Use
```

```svelte
<script>
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary">Click me</Button>
```

## Components

| Category | Components |
|----------|-----------|
| **Form** | Button, Checkbox, Input, Input Group, Textarea, Radio Group, Switch, Range Selector, File Uploader, Label |
| **Data Display** | Avatar, Badge, Breadcrumb, Item, Tabs, Typography |
| **Overlay** | Dialog, Dropdown Menu, Sheet, Toast, Tooltip |
| **Feedback** | Progress, Skeleton |
| **Utility** | Mode Switch (dark/light toggle) |

## 3-Layer Token Architecture

```
Layer 1: Base Palette         →  --color-brand-700: #30a46c
                                    ↓
Layer 2: Semantic Tokens      →  --color-surface-brand-primary: var(--color-brand-700)
                                    ↓
Layer 3: Component Tokens     →  --color-button-brand-default-surface: var(--color-surface-brand-primary)
```

Change 12 variables at Layer 1 → entire UI rebrands. Override Layer 2 → dark mode works. Override Layer 3 → customize one component.

[Learn more about the architecture →](https://nnuikit.com/docs/getting-started/theming/architecture)

## Theming

```html
<!-- Default (green) -->
<html>

<!-- Color themes -->
<html class="violet">
<html class="blue">

<!-- Dark mode -->
<html class="dark">

<!-- Compose everything -->
<html class="violet dark">
```

Or use the [Interactive Theme Builder](https://nnuikit.com/docs/getting-started/theming) to generate a custom palette from any hex color.

## CLI Reference

| Command | Description |
|---------|-------------|
| `npx nnuikit init` | Initialize config, inject base tokens into your CSS |
| `npx nnuikit add [component]` | Add a specific component |
| `npx nnuikit add --all` | Add all components |
| `npx nnuikit list` | List available components |

## Project Structure

After `init` + adding components:

```
src/
├── routes/
│   └── layout.css                    # Base tokens injected here by init
└── lib/
    ├── components/
    │   └── ui/
    │       ├── button/
    │       │   ├── button.svelte     # Component source — yours to edit
    │       │   ├── tokens.css        # Component-level design tokens
    │       │   └── index.ts
    │       └── dialog/
    │           ├── dialog-content.svelte
    │           ├── icon-cross.svelte  # Icons bundled with component
    │           ├── tokens.css
    │           └── index.ts
    ├── styles/
    │   └── typography.css            # Type scale, font tokens, presets
    └── utils/
        └── tailwindUtil.ts           # cn() utility
```

## Requirements

- Svelte 5+ (runes)
- SvelteKit
- Tailwind CSS v4
- TypeScript (recommended)

## Built With

- [Svelte 5](https://svelte.dev) — Runes, `$props()`, `$bindable()`
- [Tailwind CSS v4](https://tailwindcss.com) — `@theme`, custom utilities
- [Bits UI](https://bits-ui.com) — Accessible primitives for Dialog, Dropdown, Sheet, Tabs, Tooltip
- [Tailwind Variants](https://www.tailwind-variants.org) — Type-safe variant management

## Contributing

Contributions are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## License

[MIT](LICENSE) — Harsh Parmar

## Links

- [Documentation](https://nnuikit.com)
- [npm Package](https://www.npmjs.com/package/nnuikit)
- [GitHub](https://github.com/harshp421/nnui)
- [LinkedIn](https://www.linkedin.com/in/harsh-parmar-717834232/)
