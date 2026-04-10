<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock, Icon } from '$lib/components/docs';
	

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

	<div class="mt-10 flex flex-col gap-12">

		<!-- Framework Selector -->
		<!-- <section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Choose your framework</h2>
			<div class="flex gap-3">
				<button
					onclick={() => (selectedFramework = 'svelte')}
					class="group relative flex flex-col items-center gap-3 rounded-xl border-2 px-24 py-5 transition-all
					{selectedFramework === 'svelte'
						? 'border-border-brand-l3 bg-surface-brand-l1 shadow-sm'
						: 'border-border-neutral-l4 hover:border-border-neutral-l2 hover:bg-surface-neutral-l1'}"
				>
					<img src={favicon} alt="nnuikit" class="size-7" />
					<span class="text-sm font-semibold {selectedFramework === 'svelte' ? 'text-text-brand-primary' : 'text-text-neutral-primary'}">
						Svelte
					</span>
				</button>
			</div>
		</section> -->

		<!-- Svelte Instructions -->
		{#if selectedFramework === 'svelte'}

			<section class="flex flex-col gap-5 py-16">
				<h2 class="text-2xl font-bold tracking-tight">Prerequisites</h2>
				<div class="flex flex-col gap-3">
					{#each ['Svelte 5+ (runes support)', 'SvelteKit — recommended for routing and SSR', 'Tailwind CSS v4', 'TypeScript — recommended'] as item}
						<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
							<Icon name="check" class="size-16 shrink-0 text-text-brand-primary" />
							{item}
						</div>
					{/each}
				</div>
			</section>

			<section class="flex flex-col gap-10">
				<h2 class="text-2xl font-bold tracking-tight">Setup</h2>

				<!-- Step 1 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">1</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Create a new SvelteKit project</h3>
					</div>
					<p class="pl-10 text-sm leading-relaxed text-text-neutral-secondary">
						Use the official Svelte CLI to scaffold a new project.
					</p>
					<div class="pl-10">
						<CodeBlock code="npx sv create my-app" language="bash" />
					</div>
					<div class="pl-10 flex flex-col gap-2">
						<p class="text-xs font-medium text-text-neutral-tertiary uppercase tracking-wide">When prompted, select:</p>
						<div class="flex flex-col gap-2">
							<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Template <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">SvelteKit minimal</code>
							</div>
							<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								TypeScript <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Yes, using TypeScript syntax</code>
							</div>
							<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Add-ons — select <code class="ml-1 rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">tailwindcss</code>
							</div>
							<div class="flex items-center gap-2.5 text-sm text-text-neutral-secondary">
								<span class="shrink-0 text-text-neutral-tertiary">—</span>
								Package manager — your choice (npm, pnpm, yarn, bun)
							</div>
						</div>
					</div>
				</div>

				<!-- Step 2 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">2</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Navigate into your project</h3>
					</div>
					<div class="pl-10">
						<CodeBlock code="cd my-app" language="bash" />
					</div>
				</div>

				<!-- Step 3 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">3</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Initialize nnuikit</h3>
					</div>
					<p class="pl-10 text-sm leading-relaxed text-text-neutral-secondary">
						This creates your config file, installs dependencies, and writes the full base design token file directly to your project.
					</p>
					<div class="pl-10">
						<CodeBlock code="npx nnuikit init" language="bash" />
					</div>
					<div class="pl-10 rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 px-5 py-4">
						<p class="mb-3 text-xs font-medium text-text-neutral-tertiary uppercase tracking-wide">Creates</p>
						<div class="flex flex-col gap-2.5 text-sm text-text-neutral-secondary">
							<div class="flex items-center gap-2.5">
								<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">nnuikit.json</code>
								<span class="text-text-neutral-tertiary">—</span>
								<span>project config</span>
							</div>
							<div class="flex items-center gap-2.5 text-xs text-text-neutral-tertiary">
								Injects design tokens (base palette, semantic layer, dark mode, themes) directly into your CSS file
							</div>
						</div>
					</div>
				</div>

				<!-- Step 4 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-neutral-primary text-xs font-bold text-text-statics-pure-white">4</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">
							Customize your brand color
							<span class="ml-2 text-xs font-normal text-text-neutral-tertiary">optional</span>
						</h3>
					</div>
					<p class="pl-10 text-sm leading-relaxed text-text-neutral-secondary">
						Open the <a href="/docs/getting-started/theming" class="text-text-brand-primary underline underline-offset-2">Theme Builder</a>, pick your brand color or upload your logo, then copy the generated tokens and paste them at the bottom of <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/routes/layout.css</code>.
					</p>
					<div class="pl-10">
						<CodeBlock
							code={`/* Paste at the bottom of src/routes/layout.css */
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
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">5</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Add a component</h3>
					</div>
					<p class="pl-10 text-sm leading-relaxed text-text-neutral-secondary">
						Copies component source into <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/components/ui/button/</code> and adds its token import to your CSS.
					</p>
					<div class="pl-10">
						<CodeBlock code="npx nnuikit add button" language="bash" />
					</div>
				</div>

				<!-- Step 6 -->
				<div class="flex flex-col gap-3">
					<div class="flex items-center gap-3">
						<span class="inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-xs font-bold text-text-statics-pure-white">6</span>
						<h3 class="text-base font-semibold text-text-neutral-primary">Use the component</h3>
					</div>
					<div class="pl-10">
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
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">CLI Reference</h2>
			<div class="overflow-x-auto rounded-xl border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Command</th>
							<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Description</th>
						</tr>
					</thead>
					<tbody class="divide-y divide-border-neutral-l4">
						<tr>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit init</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Initialize config, write base tokens, install deps</td>
						</tr>
						<tr>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit add [component]</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Add a specific component to your project</td>
						</tr>
						<tr>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit add --all</td>
							<td class="px-5 py-3 text-text-neutral-secondary">Add all available components at once</td>
						</tr>
						<tr>
							<td class="px-5 py-3 font-mono text-xs text-text-neutral-primary">npx nnuikit list</td>
							<td class="px-5 py-3 text-text-neutral-secondary">List all available components</td>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<!-- Project Structure -->
		<section class="flex flex-col gap-5">
			<h2 class="text-2xl font-bold tracking-tight">Project Structure</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				After running <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">init</code> and adding a few components, your <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">src/lib/</code> directory will look like this:
			</p>
			<CodeBlock
				code={`src/
├── routes/
│   └── layout.css               # Base design tokens injected here by init
├── lib/
│   ├── components/
│   └── ui/
│       ├── button/
│       │   ├── button.svelte    # Component source — yours to edit
│       │   ├── tokens.css       # Component-level design tokens
│       │   └── index.ts         # Re-exports
│       └── checkbox/
│           ├── checkbox.svelte
│           ├── tokens.css
│           └── index.ts
│
└── utils/
    └── tailwindUtil.ts          # cn() utility and shared types`}
				language="text"
			/>
		</section>

	</div>
</DocsPage>
