# Contributing to nnuikit

Thanks for your interest in contributing! Here's how to get started.

## Development Setup

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/nnuikit.git
cd nnuikit

# Install dependencies
npm install

# Start the docs site
npm run dev

# The CLI lives in packages/cli/
cd packages/cli
npm install
```

## Project Structure

```
nnuikit/
  src/
    lib/
      components/ui/     # Component source files (the actual library)
        button/
          button.svelte   # Component code
          index.ts        # Exports
          tokens.css      # Design tokens for this component
        checkbox/
        ...
      registry/
        registry.json     # Component registry (maps names → files + deps)
      utils/
        tailwindUtil.ts   # Shared utilities (cn, types)
    routes/
      +page.svelte        # Landing page
      layout.css          # Global design tokens
      docs/               # Documentation pages
  packages/
    cli/                  # The `npx nnuikit` CLI tool
      registry/           # Synced copy of components (shipped with npm)
      src/commands/       # CLI commands (init, add, list)
      scripts/            # Build scripts
      tests/              # CLI tests
```

## Adding a New Component

### 1. Create the component

```bash
mkdir src/lib/components/ui/your-component
```

Create these files:
- `your-component.svelte` — the component code
- `index.ts` — exports
- `tokens.css` — design tokens (if the component has custom tokens)

### 2. Rules for components

- Use **native HTML elements** when possible (`<input>`, `<label>`, `<button>`)
- Use the **hidden input + styled sibling** pattern for form elements
- Import utilities from `$lib/utils/tailwindUtil`
- Use design tokens from your `tokens.css`, not hardcoded colors
- No external UI dependencies unless absolutely necessary (no bits-ui for simple elements)

### 3. Add to registry

Edit `src/lib/registry/registry.json`:

```json
{
  "your-component": {
    "name": "your-component",
    "description": "Short description",
    "files": [
      { "path": "ui/your-component/your-component.svelte", "source": "src/lib/components/ui/your-component/your-component.svelte" },
      { "path": "ui/your-component/index.ts", "source": "src/lib/components/ui/your-component/index.ts" },
      { "path": "ui/your-component/tokens.css", "source": "src/lib/components/ui/your-component/tokens.css", "type": "tokens" }
    ],
    "dependencies": [],
    "registryDependencies": ["utils"],
    "cssImport": "$lib/components/ui/your-component/tokens.css",
    "docs": "/docs/components/your-component"
  }
}
```

### 4. Create a docs page

Create `src/routes/docs/components/your-component/+page.svelte` with examples.

### 5. Sync and test

```bash
cd packages/cli
npm run sync-registry   # copies files to CLI registry/
npm test                # runs all tests
```

### 6. Add tests

Add test cases for your component in `packages/cli/tests/cli.test.js`.

## Design Token Rules

Components use a 3-layer token system:

1. **Layer 1 (Base palette)** — in global `layout.css`: `--color-brand-800`
2. **Layer 2 (Semantic)** — in global `layout.css`: `--color-surface-brand-primary: var(--color-brand-800)`
3. **Layer 3 (Component)** — in component `tokens.css`: `--color-button-brand-default-surface: var(--color-surface-brand-primary)`

Your component tokens should reference Layer 2 semantic tokens, NOT Layer 1 raw colors.

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npm run sync-registry && npm test` in `packages/cli/`
4. Submit a PR with a clear description

## Code Style

- Use Prettier for formatting (`npm run format`)
- Use ESLint for linting (`npm run lint`)
- Follow existing naming conventions for tokens and components
