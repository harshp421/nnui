<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';

	const sample = 'The quick brown fox jumps over the lazy dog.';

	const displayPresets = [
		{ name: 'type-display-2xl', size: '56px → 80px', label: 'Display 2XL' },
		{ name: 'type-display-xl', size: '48px → 64px', label: 'Display XL' },
		{ name: 'type-display-lg', size: '40px → 52px', label: 'Display LG' },
		{ name: 'type-display-md', size: '36px → 44px', label: 'Display MD' },
		{ name: 'type-display-sm', size: '32px → 40px', label: 'Display SM' }
	];

	const headingPresets = [
		{ name: 'type-heading-xl', size: '30px → 40px', label: 'Heading XL' },
		{ name: 'type-heading-lg', size: '24px → 32px', label: 'Heading LG' },
		{ name: 'type-heading-md', size: '20px → 24px', label: 'Heading MD' },
		{ name: 'type-heading-sm', size: '18px', label: 'Heading SM' },
		{ name: 'type-heading-xs', size: '16px', label: 'Heading XS' }
	];

	const bodyPresets = [
		{ name: 'type-body-lg', size: '18px', label: 'Body LG' },
		{ name: 'type-body-md', size: '16px', label: 'Body MD' },
		{ name: 'type-body-sm', size: '14px', label: 'Body SM' },
		{ name: 'type-body-xs', size: '12px', label: 'Body XS' }
	];

	const labelPresets = [
		{ name: 'type-label-lg', size: '14px', label: 'Label LG' },
		{ name: 'type-label-md', size: '13px', label: 'Label MD' },
		{ name: 'type-label-sm', size: '12px', label: 'Label SM' },
		{ name: 'type-label-xs', size: '11px', label: 'Label XS' }
	];

	const fontFamilies = [
		{ token: '--font-sans', value: 'Host Grotesk, system-ui, sans-serif', usage: 'Body text, headings, UI labels' },
		{ token: '--font-mono', value: 'JetBrains Mono, monospace', usage: 'Code blocks, tokens, CLI commands' },
		{ token: '--font-display', value: 'Host Grotesk, system-ui, sans-serif', usage: 'Hero text, display headings' }
	];

	const trackingTokens = [
		{ name: 'tracking-tighter', value: '-0.05em', usage: 'Display text' },
		{ name: 'tracking-tight', value: '-0.025em', usage: 'Headings' },
		{ name: 'tracking-normal', value: '0em', usage: 'Body text' },
		{ name: 'tracking-wide', value: '0.025em', usage: 'Small labels' },
		{ name: 'tracking-wider', value: '0.05em', usage: 'Buttons' },
		{ name: 'tracking-widest', value: '0.1em', usage: 'Overlines, uppercase' }
	];

	const leadingTokens = [
		{ name: 'leading-none', value: '1', usage: 'Labels, badges' },
		{ name: 'leading-tight', value: '1.15', usage: 'Display headings' },
		{ name: 'leading-snug', value: '1.3', usage: 'Section headings' },
		{ name: 'leading-normal', value: '1.5', usage: 'Small body text' },
		{ name: 'leading-relaxed', value: '1.625', usage: 'Body paragraphs' },
		{ name: 'leading-loose', value: '1.8', usage: 'Long-form content' }
	];

	const weightTokens = [
		{ token: '--weight-light', value: '300', class: 'font-light' },
		{ token: '--weight-regular', value: '400', class: 'font-normal' },
		{ token: '--weight-medium', value: '500', class: 'font-medium' },
		{ token: '--weight-semibold', value: '600', class: 'font-semibold' },
		{ token: '--weight-bold', value: '700', class: 'font-bold' },
		{ token: '--weight-extrabold', value: '800', class: 'font-extrabold' }
	];
</script>

<Seo
	title="Typography"
	description="The nnuikit typography system — font families, type scale, presets, responsive sizing, prose styling, and how tokens power it all."
/>

<DocsPage>
	<PageHeader
		title="Typography"
		description="A complete type system built on design tokens. Font families, type scale, preset classes, responsive sizing, and prose styling — all customizable with one variable change."
	/>

	<div class="mt-10 flex flex-col gap-12">

		<!-- Why section -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Why a typography system?</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Most libraries give you font sizes and leave the rest to you. nnuikit's typography is <strong class="text-text-neutral-primary">token-driven</strong> — every size, weight, line-height, and letter-spacing is a CSS variable. Change <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">--font-sans</code> once, the entire UI updates. Sizes auto-scale across breakpoints. Preset classes bundle everything so you never mismatched a line-height with a font-size.
			</p>
			<div class="grid gap-3 sm:grid-cols-3">
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<p class="text-xs font-semibold text-text-neutral-primary">Token-driven</p>
					<p class="mt-1.5 text-[11px] leading-relaxed text-text-neutral-tertiary">Every value is a CSS variable. Swap fonts, adjust scale — components auto-adapt.</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<p class="text-xs font-semibold text-text-neutral-primary">Responsive</p>
					<p class="mt-1.5 text-[11px] leading-relaxed text-text-neutral-tertiary">Display and heading sizes scale at 1024px and 1440px breakpoints automatically.</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-5">
					<p class="text-xs font-semibold text-text-neutral-primary">Preset classes</p>
					<p class="mt-1.5 text-[11px] leading-relaxed text-text-neutral-tertiary">One class = size + weight + line-height + tracking. No mismatches.</p>
				</div>
			</div>
		</section>

		<!-- How to use -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">How to use</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Three ways to use the typography system, depending on your needs:
			</p>
			<div class="flex flex-col gap-3">
				<CodeBlock
					code={`<!-- 1. Preset classes — recommended for most cases -->
<h1 class="type-display-lg">Hero heading</h1>
<p class="type-body-md">Paragraph text with proper line-height built in.</p>
<span class="type-label-sm">Form label</span>
<span class="type-overline">Section label</span>

<!-- 2. Tailwind utilities — use the registered text-* classes -->
<h2 class="text-heading-lg font-semibold tracking-tight">Section title</h2>
<p class="text-body-md leading-relaxed">Body copy</p>

<!-- 3. CSS tokens directly — for custom components -->
<style>
  .custom-title {
    font-size: var(--text-heading-md);
    font-weight: var(--weight-semibold);
    line-height: var(--leading-snug);
    letter-spacing: var(--tracking-normal);
  }
</style>`}
					language="svelte"
					title="Three approaches"
				/>
			</div>
		</section>

		<!-- Font Families -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Font Families</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
			</div>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Change <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">--font-sans</code> to swap the entire UI's typeface. Works with your brand font — just update the Google Fonts import and the token.
			</p>
			<div class="overflow-x-auto rounded-xl border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Token</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Value</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Usage</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-neutral-l4">
						{#each fontFamilies as f}
							<tr>
								<td class="px-5 py-3 font-mono text-xs text-text-brand-primary">{f.token}</td>
								<td class="px-5 py-3 text-xs text-text-neutral-secondary">{f.value}</td>
								<td class="px-5 py-3 text-xs text-text-neutral-tertiary">{f.usage}</td>
							</tr>
						{/each}
					</tbody>
				</table>
			</div>
			<CodeBlock
				code={`/* Override in your CSS to change the global font */
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-display: 'Cal Sans', 'Inter', sans-serif;
  --font-mono: 'Fira Code', monospace;
}`}
				language="css"
				title="Custom font override"
			/>
		</section>

		<!-- Display Scale -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Display Scale</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
				<span class="text-[10px] font-medium text-text-neutral-tertiary">Responsive</span>
			</div>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Hero headings and landing page text. Sizes auto-scale at 1024px and 1440px breakpoints.
			</p>
			<div class="flex flex-col gap-1 rounded-xl border border-border-neutral-l4 overflow-hidden">
				{#each displayPresets as preset}
					<div class="flex items-baseline justify-between gap-3 border-b border-border-neutral-l4 px-5 py-4 last:border-0">
						<div class="min-w-0 flex-1">
							<p class={preset.name + ' text-text-neutral-primary truncate'}>{sample}</p>
						</div>
						<div class="flex shrink-0 items-center gap-3">
							<code class="text-[10px] font-mono text-text-brand-primary">.{preset.name}</code>
							<span class="text-[10px] text-text-neutral-tertiary">{preset.size}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Heading Scale -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Heading Scale</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
				<span class="text-[10px] font-medium text-text-neutral-tertiary">Partially responsive</span>
			</div>
			<div class="flex flex-col gap-1 rounded-xl border border-border-neutral-l4 overflow-hidden">
				{#each headingPresets as preset}
					<div class="flex items-baseline justify-between gap-3 border-b border-border-neutral-l4 px-5 py-3.5 last:border-0">
						<p class={preset.name + ' text-text-neutral-primary'}>{preset.label}</p>
						<div class="flex shrink-0 items-center gap-3">
							<code class="text-[10px] font-mono text-text-brand-primary">.{preset.name}</code>
							<span class="text-[10px] text-text-neutral-tertiary">{preset.size}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Body + Label side by side -->
		<div class="grid gap-5 md:grid-cols-2">
			<!-- Body Scale -->
			<section class="flex flex-col gap-5">
				<div class="flex items-center gap-3">
					<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Body</h2>
					<div class="h-px flex-1 bg-border-neutral-l4"></div>
				</div>
				<div class="flex flex-col gap-1 rounded-xl border border-border-neutral-l4 overflow-hidden">
					{#each bodyPresets as preset}
						<div class="flex flex-col gap-1 border-b border-border-neutral-l4 px-5 py-3.5 last:border-0">
							<div class="flex items-center justify-between">
								<code class="text-[10px] font-mono text-text-brand-primary">.{preset.name}</code>
								<span class="text-[10px] text-text-neutral-tertiary">{preset.size}</span>
							</div>
							<p class={preset.name + ' text-text-neutral-secondary'}>{sample}</p>
						</div>
					{/each}
				</div>
			</section>

			<!-- Label Scale -->
			<section class="flex flex-col gap-5">
				<div class="flex items-center gap-3">
					<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Label</h2>
					<div class="h-px flex-1 bg-border-neutral-l4"></div>
				</div>
				<div class="flex flex-col gap-1 rounded-xl border border-border-neutral-l4 overflow-hidden">
					{#each labelPresets as preset}
						<div class="flex flex-col gap-1 border-b border-border-neutral-l4 px-5 py-3.5 last:border-0">
							<div class="flex items-center justify-between">
								<code class="text-[10px] font-mono text-text-brand-primary">.{preset.name}</code>
								<span class="text-[10px] text-text-neutral-tertiary">{preset.size}</span>
							</div>
							<p class={preset.name + ' text-text-neutral-primary'}>{preset.label}</p>
						</div>
					{/each}
					<!-- Overline + Caption -->
					<div class="flex flex-col gap-1 border-b border-border-neutral-l4 px-5 py-3.5">
						<div class="flex items-center justify-between">
							<code class="text-[10px] font-mono text-text-brand-primary">.type-overline</code>
							<span class="text-[10px] text-text-neutral-tertiary">10px</span>
						</div>
						<p class="type-overline text-text-neutral-tertiary">Overline text</p>
					</div>
					<div class="flex flex-col gap-1 px-5 py-3.5">
						<div class="flex items-center justify-between">
							<code class="text-[10px] font-mono text-text-brand-primary">.type-caption</code>
							<span class="text-[10px] text-text-neutral-tertiary">11px</span>
						</div>
						<p class="type-caption text-text-neutral-tertiary">Caption text for supplementary info</p>
					</div>
				</div>
			</section>
		</div>

		<!-- Special presets -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Code Presets</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
			</div>
			<div class="flex flex-col gap-3 rounded-xl border border-border-neutral-l4 p-5">
				<div class="flex items-center justify-between">
					<p class="type-code text-text-neutral-primary">const theme = 'nnuikit';</p>
					<code class="text-[10px] font-mono text-text-brand-primary">.type-code</code>
				</div>
				<div class="flex items-center justify-between">
					<p class="type-code-sm text-text-neutral-secondary">npm install nnuikit</p>
					<code class="text-[10px] font-mono text-text-brand-primary">.type-code-sm</code>
				</div>
			</div>
		</section>

		<!-- Responsive behavior -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Responsive type scale</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Display and heading sizes automatically grow at larger viewports. No media queries in your components — the tokens handle it.
			</p>
			<div class="overflow-x-auto rounded-xl border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Token</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Mobile</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Tablet (1024px)</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Desktop (1440px)</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-neutral-l4">
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">display-2xl</td><td class="px-5 py-3 text-xs">56px</td><td class="px-5 py-3 text-xs">72px</td><td class="px-5 py-3 text-xs">80px</td></tr>
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">display-xl</td><td class="px-5 py-3 text-xs">48px</td><td class="px-5 py-3 text-xs">60px</td><td class="px-5 py-3 text-xs">64px</td></tr>
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">display-lg</td><td class="px-5 py-3 text-xs">40px</td><td class="px-5 py-3 text-xs">48px</td><td class="px-5 py-3 text-xs">52px</td></tr>
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">heading-xl</td><td class="px-5 py-3 text-xs">30px</td><td class="px-5 py-3 text-xs">36px</td><td class="px-5 py-3 text-xs">40px</td></tr>
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">heading-lg</td><td class="px-5 py-3 text-xs">24px</td><td class="px-5 py-3 text-xs">28px</td><td class="px-5 py-3 text-xs">32px</td></tr>
						<tr><td class="px-5 py-3 font-mono text-xs text-text-brand-primary">heading-md</td><td class="px-5 py-3 text-xs">20px</td><td class="px-5 py-3 text-xs">22px</td><td class="px-5 py-3 text-xs">24px</td></tr>
					</tbody>
				</table>
			</div>
			<p class="text-xs text-text-neutral-tertiary">
				Body and label sizes stay fixed — they don't need responsive scaling.
			</p>
		</section>

		<!-- Tracking & Leading -->
		<div class="grid gap-5 md:grid-cols-2">
			<section class="flex flex-col gap-5">
				<div class="flex items-center gap-3">
					<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Letter Spacing</h2>
					<div class="h-px flex-1 bg-border-neutral-l4"></div>
				</div>
				<div class="flex flex-col rounded-xl border border-border-neutral-l4 overflow-hidden">
					{#each trackingTokens as t}
						<div class="flex items-center justify-between border-b border-border-neutral-l4 px-5 py-3 last:border-0">
							<span class="text-xs text-text-neutral-secondary {t.name}" style="letter-spacing: {t.value}">{sample.slice(0, 30)}</span>
							<div class="flex items-center gap-2.5 shrink-0">
								<code class="text-[10px] font-mono text-text-brand-primary">{t.name}</code>
								<span class="text-[10px] text-text-neutral-tertiary">{t.value}</span>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section class="flex flex-col gap-5">
				<div class="flex items-center gap-3">
					<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Line Height</h2>
					<div class="h-px flex-1 bg-border-neutral-l4"></div>
				</div>
				<div class="flex flex-col rounded-xl border border-border-neutral-l4 overflow-hidden">
					{#each leadingTokens as l}
						<div class="flex items-center justify-between border-b border-border-neutral-l4 px-5 py-3 last:border-0">
							<span class="text-xs text-text-neutral-secondary">{l.usage}</span>
							<div class="flex items-center gap-2.5 shrink-0">
								<code class="text-[10px] font-mono text-text-brand-primary">{l.name}</code>
								<span class="text-[10px] text-text-neutral-tertiary">{l.value}</span>
							</div>
						</div>
					{/each}
				</div>
			</section>
		</div>

		<!-- Font Weights -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Font Weights</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
			</div>
			<div class="flex flex-col rounded-xl border border-border-neutral-l4 overflow-hidden">
				{#each weightTokens as w}
					<div class="flex items-center justify-between border-b border-border-neutral-l4 px-5 py-3 last:border-0">
						<span class="text-sm text-text-neutral-primary" style="font-weight: {w.value}">{sample.slice(0, 35)}</span>
						<div class="flex items-center gap-3 shrink-0">
							<code class="text-[10px] font-mono text-text-neutral-secondary">{w.class}</code>
							<span class="text-[10px] text-text-neutral-tertiary">{w.value}</span>
						</div>
					</div>
				{/each}
			</div>
		</section>

		<!-- Truncation -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Text Truncation</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
			</div>
			<div class="grid gap-3 sm:grid-cols-2">
				<div class="rounded-xl border border-border-neutral-l4 p-5">
					<code class="text-[10px] font-mono text-text-brand-primary">.text-truncate</code>
					<p class="text-truncate mt-2 text-sm text-text-neutral-secondary">{sample} {sample} {sample}</p>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 p-5">
					<code class="text-[10px] font-mono text-text-brand-primary">.text-clamp-2</code>
					<p class="text-clamp-2 mt-2 text-sm text-text-neutral-secondary">{sample} {sample} {sample} {sample} {sample}</p>
				</div>
			</div>
		</section>

		<!-- Prose -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Prose styling</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Apply <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">.nn-prose</code> to containers with raw HTML or markdown content. Headings, paragraphs, lists, code, blockquotes, and tables are all styled automatically.
			</p>
			<CodeBlock
				code={`<div class="nn-prose">
  {@html markdownContent}
</div>`}
				language="svelte"
				title="Usage"
			/>
			<div class="rounded-xl border border-border-neutral-l4 p-5">
				<p class="mb-3 text-[10px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">Live preview</p>
				<div class="nn-prose">
					<h2>Getting started</h2>
					<p>This is a paragraph inside <code>.nn-prose</code>. Links like <a href="https://nnuikit.com">this one</a> are styled automatically. <strong>Bold text</strong> gets the primary color.</p>
					<blockquote>Design tokens make theming composable. Change one variable, the cascade handles the rest.</blockquote>
					<ul>
						<li>Headings scale from h1 to h4</li>
						<li>Code blocks get mono font + background</li>
						<li>Tables, lists, and blockquotes — all covered</li>
					</ul>
					<pre><code>npx nnuikit add button</code></pre>
				</div>
			</div>
		</section>

		<!-- All tokens reference -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Token reference</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				All typography tokens live in <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/styles/typography.css</code>. Override any token in your project's CSS to customize.
			</p>
			<CodeBlock
				code={`/* Change the font globally */
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
}

/* Adjust the display scale */
:root {
  --text-display-lg: 2.75rem;
}
@media (min-width: 1024px) {
  :root { --text-display-lg: 3.5rem; }
}

/* Tighten body line-height */
:root {
  --leading-relaxed: 1.5;
}`}
				language="css"
				title="Override examples"
			/>
		</section>

	</div>
</DocsPage>
