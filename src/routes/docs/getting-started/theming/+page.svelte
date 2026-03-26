<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';
</script>

<Seo title="Theming" description="Learn the 3-layer design token architecture in nnuikit. Base palette, semantic tokens, and component tokens — how they work together for dark mode, themes, and customization." />

<DocsPage>
	<PageHeader
		title="Theming"
		description="nnuikit uses a 3-layer design token architecture built on CSS custom properties and Tailwind CSS v4. Here's why — and how to use it."
	/>

	<div class="mt-12 flex flex-col gap-12">
		<!-- SECTION: Why 3 Layers? -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Why 3 Layers of Design Tokens?</h2>
			<p class="text-text-neutral-secondary leading-relaxed">
				You might think: "Why not just use <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">--color-brand-800</code> directly everywhere?"
				That works — until you need dark mode, theme switching, or component-specific overrides.
				Here's why nnuikit uses a 3-layer architecture.
			</p>
		</section>

		<!-- SECTION: The 3 Layers Explained -->
		<section class="space-y-6">
			<h2 class="text-2xl font-bold tracking-tight">The 3-Layer Token Architecture</h2>

			<div class="space-y-4">
				<div class="rounded-xl border border-border-brand-l3 bg-surface-brand-l1 p-6">
					<div class="mb-2 flex items-center gap-3">
						<span class="inline-flex size-8 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">1</span>
						<h3 class="text-lg font-semibold">Base Palette — "What colors exist?"</h3>
					</div>
					<p class="text-sm text-text-neutral-secondary">
						Raw color values with no meaning attached. Just shades of each color.
					</p>
					<div class="mt-3">
						<CodeBlock
							code={`--color-brand-100: #dbeafe;   /* lightest */
--color-brand-400: #60a5fa;
--color-brand-700: #1d4ed8;
--color-brand-800: #1e3a8a;   /* darkest */`}
							language="css"
						/>
					</div>
				</div>

				<div class="flex justify-center">
					<svg class="size-6 text-text-neutral-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>

				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-6">
					<div class="mb-2 flex items-center gap-3">
						<span class="inline-flex size-8 items-center justify-center rounded-full bg-surface-neutral-primary text-sm font-bold text-text-statics-pure-white">2</span>
						<h3 class="text-lg font-semibold">Semantic Tokens — "What do they mean?"</h3>
					</div>
					<p class="text-sm text-text-neutral-secondary">
						Maps shades to roles. This layer defines WHICH shade means "primary surface" or "disabled state."
					</p>
					<div class="mt-3">
						<CodeBlock
							code={`--color-surface-brand-primary:    var(--color-brand-800);  /* strong, prominent */
--color-surface-brand-secondary:  var(--color-brand-700);  /* slightly less */
--color-surface-brand-quaternary: var(--color-brand-400);  /* muted, disabled */
--color-surface-brand-l1:         var(--color-brand-50);   /* subtle tint */`}
							language="css"
						/>
					</div>
				</div>

				<div class="flex justify-center">
					<svg class="size-6 text-text-neutral-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
					</svg>
				</div>

				<div class="rounded-xl border border-border-neutral-l4 p-6">
					<div class="mb-2 flex items-center gap-3">
						<span class="inline-flex size-8 items-center justify-center rounded-full bg-surface-neutral-tertiary text-sm font-bold text-text-statics-pure-white">3</span>
						<h3 class="text-lg font-semibold">Component Tokens — "Where exactly is it used?"</h3>
					</div>
					<p class="text-sm text-text-neutral-secondary">
						Maps semantic roles to specific component states. This is what the component actually reads.
					</p>
					<div class="mt-3">
						<CodeBlock
							code={`--color-button-brand-default-surface:  var(--color-surface-brand-primary);
--color-button-brand-hover-surface:    var(--color-surface-brand-secondary);
--color-button-brand-disabled-surface: var(--color-surface-brand-quaternary);`}
							language="css"
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- SECTION: Why Not Just Use brand-800 Directly? -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Why Not Just Use brand-800 Directly?</h2>
			<p class="text-text-neutral-secondary leading-relaxed">
				The short answer: <strong>dark mode doesn't just make colors lighter — it remaps WHICH shade
				goes WHERE</strong>, and different use cases remap differently.
			</p>

			<p class="text-text-neutral-secondary leading-relaxed">
				Look at how different parts of the UI use different shades, and how they
				flip in opposite directions:
			</p>

			<div class="overflow-x-auto rounded-lg border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-4 py-3 text-left font-medium">Use Case</th>
							<th class="px-4 py-3 text-left font-medium">Light Mode</th>
							<th class="px-4 py-3 text-left font-medium">Dark Mode</th>
							<th class="px-4 py-3 text-left font-medium">Direction</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Button bg (prominent)</td>
							<td class="px-4 py-3 font-mono text-xs">brand-800</td>
							<td class="px-4 py-3 font-mono text-xs">brand-200</td>
							<td class="px-4 py-3">dark → light</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Button hover</td>
							<td class="px-4 py-3 font-mono text-xs">brand-700</td>
							<td class="px-4 py-3 font-mono text-xs">brand-300</td>
							<td class="px-4 py-3">dark → light</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Badge bg (subtle)</td>
							<td class="px-4 py-3 font-mono text-xs">brand-100</td>
							<td class="px-4 py-3 font-mono text-xs">brand-900</td>
							<td class="px-4 py-3">light → dark</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Border</td>
							<td class="px-4 py-3 font-mono text-xs">brand-200</td>
							<td class="px-4 py-3 font-mono text-xs">brand-800</td>
							<td class="px-4 py-3">light → dark</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium">Disabled state</td>
							<td class="px-4 py-3 font-mono text-xs">brand-400</td>
							<td class="px-4 py-3 font-mono text-xs">brand-600</td>
							<td class="px-4 py-3">middle shift</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-text-neutral-secondary leading-relaxed">
				Button surfaces flip from <strong>dark shades to light</strong>. Badge backgrounds flip
				from <strong>light shades to dark</strong>. Disabled states shift
				toward the <strong>middle</strong>. There's no single transformation that handles all
				three — each use case has its own light↔dark mapping.
			</p>

			<p class="text-text-neutral-secondary leading-relaxed">
				If you just reverse all shades globally (brand-800 becomes light, brand-100 becomes dark),
				the button looks correct but borders become invisible and badges become too prominent.
				<strong>That's why Layer 2 exists</strong> — it defines the mapping per role, not per shade.
			</p>
		</section>

		<!-- SECTION: What Each Layer Solves -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">What Each Layer Solves</h2>

			<div class="overflow-x-auto rounded-lg border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-4 py-3 text-left font-medium">Scenario</th>
							<th class="px-4 py-3 text-left font-medium">Which Layer to Change</th>
							<th class="px-4 py-3 text-left font-medium">How Many Overrides</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Rebrand (new blue)</td>
							<td class="px-4 py-3">Layer 1 — base palette</td>
							<td class="px-4 py-3 font-mono text-xs">~12 values</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Dark mode</td>
							<td class="px-4 py-3">Layer 2 — semantic tokens</td>
							<td class="px-4 py-3 font-mono text-xs">~30 values</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-medium">Theme switch (blue → violet)</td>
							<td class="px-4 py-3">Layer 1 — swap brand palette</td>
							<td class="px-4 py-3 font-mono text-xs">~12 values</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-medium">One component exception</td>
							<td class="px-4 py-3">Layer 3 — component token</td>
							<td class="px-4 py-3 font-mono text-xs">1 value</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-text-neutral-secondary">
				Without layers, dark mode alone would require overriding every component x every state
				x every property. With 10 components, 4 states, 3 properties, and 5 themes — that's
				<strong>2000+ overrides</strong>. With layers, it's roughly <strong>~100 total</strong>.
			</p>
		</section>

		<!-- SECTION: The Cascade in Action -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">The Cascade in Action</h2>
			<p class="text-text-neutral-secondary leading-relaxed">
				Here's what happens when you switch to the violet theme. One change at Layer 1
				cascades through all three layers:
			</p>
			<CodeBlock
				code={`/* Layer 1: .violet swaps base palette (12 lines) */
.violet {
  --color-brand-800: var(--color-violet-800);
}

        ↓ cascades to

/* Layer 2: semantic token auto-updates (no change needed) */
--color-surface-brand-primary: var(--color-brand-800);
/*                              now resolves to violet-800 */

        ↓ cascades to

/* Layer 3: component token auto-updates (no change needed) */
--color-button-brand-default-surface: var(--color-surface-brand-primary);
/*                                     now resolves to violet-800 */`}
				language="css"
			/>
			<p class="text-text-neutral-secondary">
				12 lines of CSS. Every component, every state, every mode updates instantly.
			</p>
		</section>

		<!-- SECTION: How Tokens Work -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">How Tokens Reach Your Components</h2>
			<p class="text-text-neutral-secondary leading-relaxed">
				Each component's tokens are defined in a <code
					class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">tokens.css</code>
				file that ships with the component. When you run <code
					class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">npx nnuikit add button</code>,
				the CLI copies the component files AND its tokens, then adds an
				<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">@import</code>
				to your CSS.
			</p>
			<CodeBlock
				code={`/* Your layout.css after adding button */
@import 'tailwindcss';
@import '$lib/components/ui/button/tokens.css';   /* ← added by CLI */

/* tokens.css defines :root variables + @theme registrations */
/* The component uses them via Tailwind classes like: */
/* bg-button-brand-default-surface → var(--color-button-brand-default-surface) */`}
				language="css"
			/>
		</section>

		<!-- SECTION: Token Categories -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Token Categories</h2>
			<div class="grid gap-4 md:grid-cols-2">
				<div class="rounded-xl border border-border-neutral-l4 p-6">
					<h3 class="font-semibold">Color Tokens</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Surface, text, icon, and border colors for all component states (default, hover,
						focused, disabled).
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 p-6">
					<h3 class="font-semibold">Spacing Tokens</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Padding, gap, margin, and min-width values for different component sizes.
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 p-6">
					<h3 class="font-semibold">Size Tokens</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Heights, widths, icon sizes, and border radius for small, medium, and large variants.
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 p-6">
					<h3 class="font-semibold">Theme Variants</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Support for dark mode and custom color themes (blue, violet, pink, cyan, orange).
					</p>
				</div>
			</div>
		</section>

		<!-- SECTION: Setting Up Tokens -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Setting Up Tokens</h2>
			<p class="text-text-neutral-secondary">
				Your global CSS file should contain the base palette and semantic tokens.
				Component tokens come automatically when you add components via the CLI.
			</p>
			<CodeBlock
				code={`/* layout.css */
@import "tailwindcss";
@import "$lib/components/ui/button/tokens.css";   /* auto-added by CLI */

@custom-variant dark (&:is(.dark *));

:root {
  /* Layer 1: Base palette */
  --color-brand-800: #1e3a8a;
  --color-brand-700: #1d4ed8;
  /* ... */

  /* Layer 2: Semantic tokens */
  --color-surface-brand-primary: var(--color-brand-800);
  --color-surface-brand-secondary: var(--color-brand-700);
  /* ... */
}

/* Layer 2 overrides for dark mode */
.dark {
  --color-surface-brand-primary: var(--color-brand-200);
  --color-surface-brand-secondary: var(--color-brand-300);
}

/* Layer 1 swap for theme switching */
.violet {
  --color-brand-800: var(--color-violet-800);
  --color-brand-700: var(--color-violet-700);
  /* ... all shades remap, entire UI updates */
}`}
				language="css"
			/>
		</section>

		<!-- SECTION: Customizing -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Customizing Themes</h2>
			<p class="text-text-neutral-secondary">
				Override at the layer that matches your need:
			</p>
			<CodeBlock
				code={`/* Rebrand — change Layer 1 (affects everything) */
:root {
  --color-brand-800: #7c3aed;   /* new brand purple */
  --color-brand-700: #8b5cf6;
}

/* Dark mode — change Layer 2 (affects shade mapping) */
.dark {
  --color-surface-brand-primary: var(--color-brand-200);
}

/* One component exception — change Layer 3 */
.special-section {
  --color-button-brand-default-surface: var(--color-surface-brand-tertiary);
  /* Only buttons in .special-section are affected */
}`}
				language="css"
			/>
		</section>

		<!-- SECTION: Summary -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">TL;DR</h2>
			<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-6">
				<div class="space-y-3 text-sm text-text-neutral-secondary">
					<p>
						<strong class="text-text-neutral-primary">Layer 1 (Base Palette):</strong>
						"What colors exist?" — Raw hex values. Change here to rebrand or switch themes.
					</p>
					<p>
						<strong class="text-text-neutral-primary">Layer 2 (Semantic Tokens):</strong>
						"What do they mean?" — Maps shades to roles. Change here for dark mode,
						because dark mode remaps which shade goes where (not just lighter/darker).
					</p>
					<p>
						<strong class="text-text-neutral-primary">Layer 3 (Component Tokens):</strong>
						"Where exactly?" — Maps roles to specific component states.
						Change here when one component needs to break the pattern.
					</p>
					<p class="mt-4 border-t border-border-neutral-l4 pt-4 font-medium text-text-neutral-primary">
						More setup once. Dramatically less work as the system grows.
						5 themes x 2 modes x 50 components = 2000+ overrides without layers, ~100 with.
					</p>
				</div>
			</div>
		</section>
	</div>
</DocsPage>
