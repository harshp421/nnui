<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';
</script>

<Seo
	title="Token Architecture"
	description="How nnuikit's 3-layer design token system makes theming, dark mode, and customization scalable — without hundreds of overrides."
/>

<DocsPage>
	<PageHeader
		title="Token Architecture"
		description="How nnuikit's 3-layer design token system makes theming, dark mode, and customization scalable — without hundreds of overrides."
	/>

	<div class="mt-10 flex flex-col gap-12">

		<!-- Section 1: The 3 Layers -->
		<section class="flex flex-col gap-7">
			<h2 class="text-2xl font-bold tracking-tight">The 3 Layers</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				nnuikit's component system is built on three layers of CSS custom properties. Each layer has a single responsibility — and together they let you switch themes, enable dark mode, or override one component, all with minimal CSS.
			</p>

			<!-- Layer 1: Base Palette -->
			<div class="rounded-xl border border-border-brand-l3 bg-surface-brand-l1 p-5">
				<div class="mb-5 flex items-start gap-3.5">
					<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">1</span>
					<div>
						<p class="text-xs font-medium tracking-wide text-text-brand-primary uppercase">What colors exist?</p>
						<h3 class="text-base font-semibold text-text-neutral-primary">Base Palette</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
							Raw named color values — just shades of each hue, no semantic meaning attached. Changing these 12 values rebrands your entire UI.
						</p>
					</div>
				</div>
				<CodeBlock
					language="css"
					code={`/* All brand shades live here */
--color-brand-25:  #f5f3ff;
--color-brand-100: #ede9fe;
--color-brand-400: #a78bfa;
--color-brand-700: #6d28d9;
--color-brand-800: #5b21b6;
--color-brand-950: #1e0a4a;`}
				/>
			</div>

			<div class="flex justify-center">
				<svg class="size-5 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>

			<!-- Layer 2: Semantic Tokens -->
			<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
				<div class="mb-5 flex items-start gap-3.5">
					<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">2</span>
					<div>
						<p class="text-xs font-medium tracking-wide text-text-neutral-tertiary uppercase">What do they mean?</p>
						<h3 class="text-base font-semibold text-text-neutral-primary">Semantic Tokens</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
							Maps raw shades to roles. This is where intent lives — "primary button surface", "subtle badge background", "disabled state". Changing this layer enables dark mode, because dark mode remaps which shade fills each role.
						</p>
					</div>
				</div>
				<CodeBlock
					language="css"
					code={`/* Roles — point at base palette shades */
--color-surface-brand-primary:    var(--color-brand-800);
--color-surface-brand-secondary:  var(--color-brand-700);
--color-surface-brand-quaternary: var(--color-brand-400);  /* disabled */
--color-surface-brand-l1:         var(--color-brand-25);   /* subtle tint */`}
				/>
			</div>

			<div class="flex justify-center">
				<svg class="size-5 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</div>

			<!-- Layer 3: Component Tokens -->
			<div class="rounded-xl border border-border-neutral-l4 p-5">
				<div class="mb-5 flex items-start gap-3.5">
					<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">3</span>
					<div>
						<p class="text-xs font-medium tracking-wide text-text-neutral-tertiary uppercase">Where exactly?</p>
						<h3 class="text-base font-semibold text-text-neutral-primary">Component Tokens</h3>
						<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
							Maps semantic roles to specific component states. Each component reads only its own tokens, which point at semantic tokens. This isolates components — you can override one button variant without affecting anything else.
						</p>
					</div>
				</div>
				<CodeBlock
					language="css"
					code={`/* Component reads these — they point up the chain */
--color-button-brand-default-surface:  var(--color-surface-brand-primary);
--color-button-brand-hover-surface:    var(--color-surface-brand-secondary);
--color-button-brand-disabled-surface: var(--color-surface-brand-quaternary);`}
				/>
			</div>
		</section>

		<!-- Section 2: The Dark Mode Problem -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Why Not Just Use <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xl">--color-brand-800</code> Directly?</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				If you hardcode <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">var(--color-brand-800)</code> in a component, inverting all shades for dark mode breaks some use cases while fixing others — because different parts of the UI remap in opposite directions.
			</p>

			<div class="overflow-x-auto rounded-lg border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Use Case</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Light Mode</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Dark Mode</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Direction</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Button bg (prominent)</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-800</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-200</td>
							<td class="px-5 py-3 text-text-neutral-secondary">dark → light</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Button hover</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-700</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-300</td>
							<td class="px-5 py-3 text-text-neutral-secondary">dark → light</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Badge bg (subtle)</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-100</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-900</td>
							<td class="px-5 py-3 text-text-neutral-secondary">light → dark</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Border</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-200</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-800</td>
							<td class="px-5 py-3 text-text-neutral-secondary">light → dark</td>
						</tr>
						<tr>
							<td class="px-5 py-3 text-text-neutral-primary">Disabled state</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-400</td>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-secondary">brand-600</td>
							<td class="px-5 py-3 text-text-neutral-secondary">middle shift</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Button surfaces flip from dark to light. Badge backgrounds flip from light to dark. Disabled states shift toward the middle. There's no single inversion formula — each role has its own mapping. That's exactly what Layer 2 encodes.
			</p>
		</section>

		<!-- Section 3: What Each Layer Solves -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Choosing the Right Layer to Override</h2>

			<div class="overflow-x-auto rounded-lg border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Scenario</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Override Layer</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Lines of CSS</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Rebrand to a new color</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Layer 1 — base palette</td>
							<td class="px-5 py-3 text-text-neutral-secondary">~12</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Enable dark mode</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Layer 2 — semantic tokens</td>
							<td class="px-5 py-3 text-text-neutral-secondary">~30</td>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-5 py-3 text-text-neutral-primary">Switch to a preset theme (blue → violet)</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Layer 1 — swap brand palette</td>
							<td class="px-5 py-3 text-text-neutral-secondary">~12</td>
						</tr>
						<tr>
							<td class="px-5 py-3 text-text-neutral-primary">One component exception</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Layer 3 — component token</td>
							<td class="px-5 py-3 text-text-neutral-secondary">1</td>
						</tr>
					</tbody>
				</table>
			</div>

			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Without this system: 5 themes × 2 modes × 50 components × ~8 properties = thousands of overrides. With 3 layers: roughly 100 total.
			</p>
		</section>

		<!-- Section 4: The Cascade in Action -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">One Change, Everything Updates</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				Here's what happens when you switch to the violet theme. A single Layer 1 override cascades through all three layers automatically:
			</p>

			<CodeBlock
				language="css"
				code={`/* 1. Layer 1: swap the base palette (12 lines) */
.violet {
  --color-brand-700: var(--color-violet-700);
  --color-brand-800: var(--color-violet-800);
  /* ... all 12 shades remapped */
}

/* 2. Layer 2: auto-updates — no changes needed */
--color-surface-brand-primary: var(--color-brand-800);
/*                              ^ now resolves to violet-800 */

/* 3. Layer 3: auto-updates — no changes needed */
--color-button-brand-default-surface: var(--color-surface-brand-primary);
/*                                     ^ now resolves to violet-800 */`}
			/>

			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				12 lines of CSS. Every component, every state, every mode — updated instantly.
			</p>
		</section>

		<!-- Section 5: Token Categories -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Token Categories</h2>

			<div class="grid gap-3 md:grid-cols-2">
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<h3 class="text-base font-semibold text-text-neutral-primary">Color Tokens</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
						Surface, text, icon, and border colors for all component states.
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<h3 class="text-base font-semibold text-text-neutral-primary">Spacing Tokens</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
						Padding, gap, and margin values for each component size (sm/md/lg).
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<h3 class="text-base font-semibold text-text-neutral-primary">Size Tokens</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
						Heights, widths, icon sizes, and border radius by size variant.
					</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<h3 class="text-base font-semibold text-text-neutral-primary">Theme Variants</h3>
					<p class="mt-1.5 text-sm leading-relaxed text-text-neutral-secondary">
						CSS classes (<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.blue</code>, <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.violet</code>, <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.pink</code>, <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.cyan</code>, <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.orange</code>) that swap Layer 1.
					</p>
				</div>
			</div>
		</section>

		<!-- Section 6: Adding Tokens to Your Project -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Adding Tokens to Your Project</h2>
			<p class="text-base leading-relaxed text-text-neutral-secondary">
				When you run <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">npx nnuikit init</code>, the base design tokens are written to <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/routes/layout.css</code> and imported automatically. Component tokens are added when you run <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">npx nnuikit add &lt;component&gt;</code>.
			</p>

			<CodeBlock
				language="css"
				code={`/* layout.css — after running init and adding button */
@import 'tailwindcss';
/* base tokens are injected directly into layout.css by: npx nnuikit init */
@import '$lib/components/ui/button/tokens.css';           /* button component tokens */`}
			/>
		</section>

		<!-- Section 7: Customizing -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Customizing at the Right Layer</h2>

			<CodeBlock
				language="css"
				code={`/* Change brand color globally — override Layer 1 */
:root {
  --color-brand-700: #7c3aed;
  --color-brand-800: #6d28d9;
}

/* Enable dark mode — override Layer 2 */
.dark {
  --color-surface-brand-primary:   var(--color-brand-200);
  --color-surface-brand-secondary: var(--color-brand-300);
}

/* Override one component in one section — override Layer 3 */
.marketing-hero {
  --color-button-brand-default-surface: var(--color-surface-brand-tertiary);
}`}
			/>
		</section>

		<!-- Section 8: TL;DR -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">TL;DR</h2>

			<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
				<div class="flex flex-col gap-5">
					<div class="flex items-start gap-3.5">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">1</span>
						<div>
							<p class="text-sm font-semibold text-text-neutral-primary">Layer 1 — Base Palette</p>
							<p class="mt-1 text-sm leading-relaxed text-text-neutral-secondary">Raw color values. Override here to rebrand or switch themes.</p>
						</div>
					</div>

					<div class="flex items-start gap-3.5">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">2</span>
						<div>
							<p class="text-sm font-semibold text-text-neutral-primary">Layer 2 — Semantic Tokens</p>
							<p class="mt-1 text-sm leading-relaxed text-text-neutral-secondary">Role mappings. Override here for dark mode — because modes remap which shade fills each role.</p>
						</div>
					</div>

					<div class="flex items-start gap-3.5">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-sm font-bold text-text-statics-pure-white">3</span>
						<div>
							<p class="text-sm font-semibold text-text-neutral-primary">Layer 3 — Component Tokens</p>
							<p class="mt-1 text-sm leading-relaxed text-text-neutral-secondary">Component state mappings. Override here to break the pattern for one specific component.</p>
						</div>
					</div>
				</div>

				<hr class="my-5 border-border-neutral-l4" />

				<p class="text-sm leading-relaxed text-text-neutral-secondary">
					The cost is a bit more setup once. The benefit is dramatically less work as the system grows.
				</p>
			</div>
		</section>

	</div>
</DocsPage>
