# Adding a New Component to nnuikit

Step-by-step checklist for creating, registering, testing, and publishing a new component.

---

## Step 1: Create the component files

Create a folder at `src/lib/components/ui/<name>/` with 3 files:

```
src/lib/components/ui/<name>/
  ├── <name>.svelte     ← the component
  ├── index.ts          ← barrel export
  └── tokens.css        ← design tokens + @theme
```

### 1a. Create `<name>.svelte`

Rules:
- Use native HTML elements whenever possible (no headless libraries for basic elements)
- Use `$props()` and `$bindable()` (Svelte 5 runes)
- Import `cn` from `$lib/utils/tailwindUtil`
- Use design token classes (not hardcoded colors)
- Support `ref`, `class`, `disabled`, and spread `...restProps`

```svelte
<script lang="ts" module>
  import { cn, type WithElementRef } from '$lib/utils/tailwindUtil';
  import type { HTMLInputAttributes } from 'svelte/elements';

  export type MyComponentProps = WithElementRef<HTMLInputAttributes> & {
    size?: 'sm' | 'md' | 'lg';
    // add your props
  };
</script>

<script lang="ts">
  let {
    ref = $bindable(null),
    class: className,
    size = 'md',
    disabled = false,
    children,
    ...restProps
  }: MyComponentProps = $props();
</script>

<!-- Use native HTML elements, style with token classes -->
<div
  bind:this={ref}
  data-slot="my-component"
  class={cn(
    'base-classes-here',
    size === 'sm' && 'size-classes',
    size === 'md' && 'size-classes',
    size === 'lg' && 'size-classes',
    disabled && 'disabled-classes',
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
```

### 1b. Create `index.ts`

```ts
import Root from "./<name>.svelte";
export {
  Root,
  Root as <Name>,
};
```

### 1c. Create `tokens.css`

Structure: `:root` values first, then `@theme` registration.

```css
/* ═══════════════════════════════════════════════════════════════════════
   <NAME> — Design Tokens
   ═══════════════════════════════════════════════════════════════════════
   These tokens power the <Name> component.
   This file is automatically added when you run: npx nnuikit add <name>

   Dependencies: Requires global base palette + semantic tokens from layout.css
   ═══════════════════════════════════════════════════════════════════════ */


/* ─────────────────────────────────────────────────
   1. COLOR TOKENS
   ───────────────────────────────────────────────── */

:root {
  /* Default state */
  --color-<name>-default-surface: var(--color-surface-brand-primary);
  --color-<name>-default-text: var(--color-text-statics-pure-white);
  --color-<name>-default-border: var(--color-border-neutral-l2);

  /* Hover state */
  --color-<name>-hover-surface: var(--color-surface-brand-secondary);

  /* Disabled state */
  --color-<name>-disabled-surface: var(--color-surface-brand-quaternary);


  /* ─────────────────────────────────────────────────
     2. SIZE TOKENS
     ───────────────────────────────────────────────── */

  /* Small */
  --size-<name>-small-height: var(--spacing-28);
  --size-<name>-small-radius: var(--radius-4);

  /* Medium */
  --size-<name>-medium-height: var(--spacing-32);
  --size-<name>-medium-radius: var(--radius-6);

  /* Large */
  --size-<name>-large-height: var(--spacing-40);
  --size-<name>-large-radius: var(--radius-8);
}


/* ─────────────────────────────────────────────────
   3. TAILWIND v4 @theme REGISTRATION
   ───────────────────────────────────────────────── */

@theme {
  /* Colors */
  --color-<name>-default-surface: var(--color-<name>-default-surface);
  --color-<name>-default-text: var(--color-<name>-default-text);
  --color-<name>-default-border: var(--color-<name>-default-border);
  --color-<name>-hover-surface: var(--color-<name>-hover-surface);
  --color-<name>-disabled-surface: var(--color-<name>-disabled-surface);

  /* Sizes (as spacing) */
  --spacing-<name>-small-height: var(--size-<name>-small-height);
  --spacing-<name>-small-radius: var(--size-<name>-small-radius);
  --spacing-<name>-medium-height: var(--size-<name>-medium-height);
  --spacing-<name>-medium-radius: var(--size-<name>-medium-radius);
  --spacing-<name>-large-height: var(--size-<name>-large-height);
  --spacing-<name>-large-radius: var(--size-<name>-large-radius);
}
```

Token naming convention:
```
--color-<component>-<variant?>-<state>-<property>
--size-<component>-<size>-<property>

Examples:
--color-button-brand-default-surface
--color-checkbox---radio-checked
--size-button-medium-normal-height
```

Reference ONLY semantic tokens (Layer 2), not raw palette values:
```css
/* GOOD */
--color-badge-default-surface: var(--color-surface-brand-primary);

/* BAD — breaks dark mode and theme switching */
--color-badge-default-surface: var(--color-brand-800);
```

---

## Step 2: Add @import to layout.css

Add the import in `src/routes/layout.css` under the component imports section:

```css
/* ── Component Token Imports ── */
@import '$lib/components/ui/button/tokens.css';
@import '$lib/components/ui/checkbox/tokens.css';
@import '$lib/components/ui/<name>/tokens.css';     ← ADD THIS
```

---

## Step 3: Register the component

### 3a. Update `src/lib/registry/registry.json`

Add your component to the `components` object:

```json
"<name>": {
  "name": "<name>",
  "description": "Short description of the component",
  "files": [
    {
      "path": "ui/<name>/<name>.svelte",
      "source": "src/lib/components/ui/<name>/<name>.svelte"
    },
    {
      "path": "ui/<name>/index.ts",
      "source": "src/lib/components/ui/<name>/index.ts"
    },
    {
      "path": "ui/<name>/tokens.css",
      "source": "src/lib/components/ui/<name>/tokens.css",
      "type": "tokens"
    }
  ],
  "dependencies": [],
  "registryDependencies": ["utils"],
  "cssImport": "$lib/components/ui/<name>/tokens.css",
  "docs": "/docs/components/<name>"
}
```

`dependencies` — only add npm packages your component actually imports:
- `@lucide/svelte` — if using icons
- `tailwind-variants` — if using `tv()` for complex variants
- Leave empty `[]` if the component only uses native HTML + Tailwind

### 3b. Update `packages/cli/src/utils/registry.js`

Add the same entry to the `getBundledRegistry()` function. This is the fallback when remote fetch isn't configured. Keep it in sync with `registry.json`.

---

## Step 4: Create the docs page

Create `src/routes/docs/components/<name>/+page.svelte`:

```svelte
<script>
  import { <Name> } from '$lib/components/ui/<name>';
</script>

<!-- Add installation, preview, props table, variants showcase -->
```

See `src/routes/docs/components/button/+page.svelte` for a full example with interactive playground.

---

## Step 5: Sync, test, publish

Run these commands from the project root:

```bash
# 1. Sync component files to CLI registry folder
cd packages/cli
npm run sync-registry

# 2. Run tests (all 15+ should pass)
npm test

# 3. Bump version in packages/cli/package.json
#    e.g. 0.0.3 → 0.0.4

# 4. Publish to npm
npm publish --access public
```

The `sync-registry` script automatically:
- Scans `src/lib/components/ui/` for all component folders
- Copies every file to `packages/cli/registry/`
- Runs automatically before publish (prepublishOnly hook)

---

## Quick checklist

Copy this for each new component:

```
[ ] src/lib/components/ui/<name>/<name>.svelte
[ ] src/lib/components/ui/<name>/index.ts
[ ] src/lib/components/ui/<name>/tokens.css
[ ] @import added to src/routes/layout.css
[ ] Added to src/lib/registry/registry.json
[ ] Added to packages/cli/src/utils/registry.js (getBundledRegistry)
[ ] Docs page at src/routes/docs/components/<name>/+page.svelte
[ ] npm run sync-registry
[ ] npm test (all passing)
[ ] Version bumped in packages/cli/package.json
[ ] npm publish --access public
```

---

## File flow diagram

```
YOU CREATE:                           CLI DELIVERS TO USER:
─────────────────────────────────     ─────────────────────────────
src/lib/components/ui/badge/          user-project/src/lib/components/ui/badge/
  badge.svelte          ──sync──→       badge.svelte
  index.ts              ──sync──→       index.ts
  tokens.css            ──sync──→       tokens.css

                                      + @import added to their layout.css
                                      + npm dependencies installed
```

---

## Common mistakes

1. **Using raw palette in tokens** — Always use semantic tokens (`--color-surface-brand-primary`), never raw (`--color-brand-800`). Raw breaks dark mode.

2. **Forgetting @theme** — If you define `:root` variables but don't register them in `@theme`, Tailwind won't generate utility classes for them.

3. **Not syncing before publish** — `registry/` folder will have stale files. Always run `npm run sync-registry`.

4. **Spelling errors in token names** — Double-check. Once published, fixing a typo is a breaking change for users.

5. **Forgetting to update `registry.js`** — The bundled registry in the CLI must match `registry.json`. Both need the new component.

6. **Adding unnecessary dependencies** — Don't add `bits-ui` for basic HTML elements. Native `<input>`, `<button>`, `<select>` with `sr-only` + `peer` classes handle accessibility without libraries.
