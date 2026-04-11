# nnuikit — AI Assistant Context

## CRITICAL: Custom Tailwind Spacing Scale

This project uses a **custom Tailwind CSS v4 spacing scale** where numeric values are overridden to 1px per unit.

**Numbers in this set = 1px per unit (NOT default Tailwind 4px/unit):**
`{0, 1, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 44, 48, 56, 64, 72, 80, 96, 128, 256, 320, 520}`

Examples:
- `p-4` = **4px** (NOT 16px)
- `p-16` = **16px**
- `gap-8` = **8px** (NOT 32px)
- `h-56` = **56px** (NOT 224px)
- `mt-28` = **28px** (NOT 112px)

**Numbers NOT in the set use default Tailwind scale (4px/unit):**
- `p-3` = 12px, `p-5` = 20px, `gap-1.5` = 6px, `py-2.5` = 10px

## Quick Reference

| Want this | Use this class | NOT this |
|-----------|---------------|----------|
| 8px padding | `p-8` | `p-2` |
| 12px padding | `p-3` (default) | `p-12` (=12px works too) |
| 16px padding | `p-16` | `p-4` (=4px!) |
| 20px padding | `p-5` (default) | `p-20` (=20px works too) |
| 24px gap | `gap-24` | `gap-6` (=6px!) |
| 32px gap | `gap-32` | `gap-8` (=8px!) |
| 48px margin | `mt-48` | `mt-12` (=12px!) |
| 56px height | `h-56` | `h-14` (=14px!) |

## Custom Breakpoints

- `sm`: 375px (NOT 640px)
- `md`: 1024px (NOT 768px)
- `lg`: 1440px (NOT 1024px)

## Design Token System

Components use a 3-layer token system:
1. **Layer 1** — Base palette: `--color-brand-700: #30a46c`
2. **Layer 2** — Semantic: `--color-surface-brand-primary: var(--color-brand-700)`
3. **Layer 3** — Component: `--color-button-brand-default-surface: var(--color-surface-brand-primary)`

Use semantic token classes in components: `bg-surface-brand-primary`, `text-text-neutral-secondary`, `border-border-neutral-l4`

## Component Pattern

Components use Svelte 5 runes:
```svelte
<script lang="ts">
  let { prop = $bindable(default), ...restProps } = $props();
</script>
```

## File Structure

- `src/routes/layout.css` — Global design tokens
- `src/lib/components/ui/[component]/tokens.css` — Component-level tokens
- `src/lib/components/ui/[component]/index.ts` — Barrel exports
- `src/lib/styles/typography.css` — Typography system
