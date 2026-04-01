<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';

	let selectedFramework = $state<'svelte' | 'react'>('svelte');
</script>

<Seo
	title="Installation"
	description="How to install and set up nnuikit in your Svelte 5 project. CLI setup, Tailwind CSS v4 configuration, and adding your first component."
/>

<DocsPage>
	<PageHeader
		title="Installation"
		description="Get nnuikit running in a new or existing Svelte project in under five minutes."
	/>

	<div class="mt-8 flex flex-col gap-10">

		<!-- Framework Selector -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-bold tracking-tight">Choose your framework</h2>
			<div class="flex gap-3">
				<!-- Svelte Card -->
				<button
					onclick={() => (selectedFramework = 'svelte')}
					class="group relative flex flex-col items-center gap-3 rounded-xl border-2 px-8 py-5 transition-all
					{selectedFramework === 'svelte'
						? 'border-border-brand-l3 bg-surface-brand-l1 shadow-sm'
						: 'border-border-neutral-l4 hover:border-border-neutral-l2 hover:bg-surface-neutral-l1'}"
				>
					<svg class="size-9" viewBox="0 0 98.1 118" xmlns="http://www.w3.org/2000/svg">
						<path d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.6c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.4" fill="#FF3E00" />
						<path d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3l.6-2.9 2-3.7 1.4 2.1c3.3 5.1 7.8 9.3 13.2 12.1l1.3.7-.1 1.3c-.1 2.7.8 5.4 2.7 7.4 3.1 3.3 7.9 4.2 12 2.2l27.5-17.6c2.1-1.3 3.6-3.5 4.1-5.9.5-2.6 0-5.3-1.7-7.3-3.1-3.3-7.9-4.2-12-2.2l-10.5 6.7c-6.7 4.2-15.4 3-20.9-2.7-4.1-4.2-5.7-10.4-4.2-16.2.8-3.6 2.8-6.8 5.7-9l27.5-17.5c1.8-1.2 3.9-2 6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3l-.6 2.9-2 3.7-1.4-2.1c-3.3-5.1-7.8-9.3-13.2-12.1l-1.3-.7.1-1.3c.1-2.7-.8-5.4-2.7-7.4-3.1-3.3-7.9-4.2-12-2.2L25.5 67.3c-2.1 1.4-3.6 3.5-4.1 6-.6 2.5 0 5.2 1.7 7.2 3.1 3.3 7.9 4.2 12 2.2l10.5-6.7c6.7-4.2 15.4-3 20.9 2.7 4.1 4.2 5.7 10.4 4.2 16.2-.8 3.6-2.8 6.8-5.7 9L37.5 121.4c-1.8 1.2-3.9 2-6 2.5" fill="#fff" />
					</svg>
					<span class="text-sm font-semibold {selectedFramework === 'svelte' ? 'text-text-brand-primary' : 'text-text-neutral-primary'}">
						Svelte
					</span>
				</button>

				<!-- React Card (Coming Soon) -->
				<div class="relative flex cursor-not-allowed flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border-neutral-l4 px-8 py-5 opacity-40">
					<svg class="size-9" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
						<circle r="2.05" fill="#61DAFB" />
						<g stroke="#61DAFB" fill="none" stroke-width="1">
							<ellipse rx="11" ry="4.2" />
							<ellipse rx="11" ry="4.2" transform="rotate(60)" />
							<ellipse rx="11" ry="4.2" transform="rotate(120)" />
						</g>
					</svg>
					<span class="text-sm font-semibold text-text-neutral-tertiary">React</span>
					<span class="absolute -top-2 -right-2 rounded-full bg-surface-neutral-l2 px-2 py-0.5 text-[10px] font-medium text-text-neutral-tertiary">
						Soon
					</span>
				</div>
			</div>
		</section>

		<!-- Svelte Instructions -->
		{#if selectedFramework === 'svelte'}

			<section class="flex flex-col gap-4">
				<h2 class="text-2xl font-bold tracking-tight">Prerequisites</h2>
				<div class="flex flex-col gap-2">
					{#each ['Svelte 5+ (runes support)', 'SvelteKit — recommended for routing and SSR', 'Tailwind CSS v4', 'TypeScript — recommended'] as item}
						<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
							<svg class="size-4 shrink-0 text-text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							{item}
						</div>
					{/each}
				</div>
			</section>

			<section class="flex flex-col gap-8">
				<h2 class="text-2xl font-bold tracking-tight">Setup</h2>

				<!-- Step 1 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">1</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Create a new SvelteKit project</h3>
					</div>
					<p class="pl-9 text-sm leading-relaxed text-text-neutral-secondary">
						Use the official Svelte CLI to scaffold a new project.
					</p>
					<div class="pl-9">
						<CodeBlock code="npx sv create my-app" language="bash" />
					</div>
					<div class="pl-9 flex flex-col gap-1.5">
						<p class="text-xs font-medium text-text-neutral-tertiary uppercase tracking-wide">When prompted, select:</p>
						<div class="flex flex-col gap-1.5">
							<div class="flex items-center gap-2 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Template <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">SvelteKit minimal</code>
							</div>
							<div class="flex items-center gap-2 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								TypeScript <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Yes, using TypeScript syntax</code>
							</div>
							<div class="flex items-center gap-2 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Add-ons — select <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">tailwindcss</code>
							</div>
							<div class="flex items-center gap-2 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Package manager — your choice (npm, pnpm, yarn, bun)
							</div>
						</div>
					</div>
				</div>

				<!-- Step 2 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">2</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Navigate into your project</h3>
					</div>
					<div class="pl-9">
						<CodeBlock code="cd my-app" language="bash" />
					</div>
				</div>

				<!-- Step 3 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">3</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Initialize nnuikit</h3>
					</div>
					<p class="pl-9 text-sm leading-relaxed text-text-neutral-secondary">
						This creates your config file, installs dependencies, and writes the full base design token file directly to your project.
					</p>
					<div class="pl-9">
						<CodeBlock code="npx nnuikit init" language="bash" />
					</div>
					<div class="pl-9 rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-4 py-3">
						<p class="mb-2 text-xs font-medium text-text-neutral-tertiary uppercase tracking-wide">Creates</p>
						<div class="flex flex-col gap-1.5 text-sm text-text-neutral-secondary">
							<div class="flex items-center gap-2">
								<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">nnuikit.json</code>
								<span class="text-text-neutral-tertiary">—</span>
								<span>project config</span>
							</div>
							<div class="flex items-center gap-2">
								<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/nnuikit-tokens.css</code>
								<span class="text-text-neutral-tertiary">—</span>
								<span>full base design tokens</span>
							</div>
							<div class="flex items-center gap-2 text-xs text-text-neutral-tertiary">
								Also adds <code class="mx-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono">@import '$lib/nnuikit-tokens.css'</code> to your CSS file
							</div>
						</div>
					</div>
				</div>

				<!-- Step 4 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-neutral-primary text-xs font-bold text-text-statics-pure-white">4</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">
							Customize your brand color
							<span class="ml-2 text-xs font-normal text-text-neutral-tertiary">optional</span>
						</h3>
					</div>
					<p class="pl-9 text-sm leading-relaxed text-text-neutral-secondary">
						Open the <a href="/docs/getting-started/theming" class="text-text-brand-primary underline underline-offset-2">Theme Builder</a>, pick your brand color or upload your logo, then copy the generated tokens and paste them at the bottom of <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/nnuikit-tokens.css</code>.
					</p>
					<div class="pl-9">
						<CodeBlock
							code={`/* Paste at the bottom of src/lib/nnuikit-tokens.css */
:root {
  --color-brand-25:  #fdfcfe;
  --color-brand-700: #6e56cf;
  --color-brand-800: #644fc1;
  /* ... all 12 steps from the Theme Builder */
}`}
							language="css"
						/>
					</div>
				</div>

				<!-- Step 5 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">5</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Add a component</h3>
					</div>
					<p class="pl-9 text-sm leading-relaxed text-text-neutral-secondary">
						Copies component source into <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/components/ui/button/</code> and adds its token import to your CSS.
					</p>
					<div class="pl-9">
						<CodeBlock code="npx nnuikit add button" language="bash" />
					</div>
				</div>

				<!-- Step 6 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">6</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Use the component</h3>
					</div>
					<div class="pl-9">
						<CodeBlock
							code={`<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary" size="default">Click me</Button>`}
							language="svelte"
						/>
					</div>
				</div>

			</section>
		{/if}

		<!-- CLI Reference -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-bold tracking-tight">CLI Reference</h2>
			<div class="overflow-x-auto rounded-xl border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Command</th>
							<th class="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Description</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-neutral-l4">
						<tr>
							<td class="px-4 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit init</td>
							<td class="px-4 py-3 text-text-neutral-secondary">Initialize config, write base tokens, install deps</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit add [component]</td>
							<td class="px-4 py-3 text-text-neutral-secondary">Add a specific component to your project</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit add --all</td>
							<td class="px-4 py-3 text-text-neutral-secondary">Add all available components at once</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit list</td>
							<td class="px-4 py-3 text-text-neutral-secondary">List all available components</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Project Structure -->
		<section class="flex flex-col gap-4">
			<h2 class="text-2xl font-bold tracking-tight">Project Structure</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				After running <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">init</code> and adding a few components, your <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/</code> directory will look like this:
			</p>
			<CodeBlock
				code={`src/lib/
├── nnuikit-tokens.css       # Base design tokens (written by init)
├── components/
│   └── ui/
│       ├── button/
│       │   ├── button.svelte    # Component source — yours to edit
│       │   ├── tokens.css       # Component-level design tokens
│       │   └── index.ts         # Re-exports
│       └── checkbox/
│           ├── checkbox.svelte
│           ├── tokens.css
│           └── index.ts
└── utils/
    └── tailwindUtil.ts          # cn() utility and shared types`}
				language="text"
			/>
		</section>

	</div>
</DocsPage>
