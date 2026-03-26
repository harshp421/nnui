<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';

	let selectedFramework = $state<'svelte' | 'react'>('svelte');
</script>

<Seo title="Installation" description="How to install and set up nnuikit in your Svelte 5 project. CLI setup, Tailwind CSS v4 configuration, and adding your first component." />

<DocsPage>
	<PageHeader
		title="Installation"
		description="How to install and set up nnuikit in your project."
	/>

	<div class="mt-12 flex flex-col gap-12">
		<!-- Framework Selector -->
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Choose your framework</h2>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:max-w-md">
				<!-- Svelte Card -->
				<button
					onclick={() => (selectedFramework = 'svelte')}
					class="group relative flex flex-col items-center gap-3 rounded-xl border-2 px-6 py-5 transition-all
					{selectedFramework === 'svelte'
						? 'border-border-brand-l3 bg-surface-brand-l1 shadow-sm'
						: 'border-border-neutral-l4 hover:border-border-neutral-l2 hover:shadow-sm'}"
				>
					<svg class="size-10" viewBox="0 0 98.1 118" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M91.8 15.6C80.9-.1 59.2-4.7 43.6 5.2L16.1 22.8C8.6 27.5 3.4 35.2 1.9 43.9c-1.3 7.3-.2 14.8 3.3 21.3-2.4 3.6-4 7.6-4.7 11.8-1.6 8.9.5 18.1 5.7 25.4 11 15.7 32.6 20.3 48.2 10.4l27.5-17.6c7.5-4.7 12.7-12.4 14.2-21.1 1.3-7.3.2-14.8-3.3-21.3 2.4-3.6 4-7.6 4.7-11.8 1.7-9-.4-18.2-5.7-25.4"
							fill="#FF3E00"
						/>
						<path
							d="M40.9 103.9c-8.9 2.3-18.2-1.2-23.4-8.7-3.2-4.4-4.4-9.9-3.5-15.3l.6-2.9 2-3.7 1.4 2.1c3.3 5.1 7.8 9.3 13.2 12.1l1.3.7-.1 1.3c-.1 2.7.8 5.4 2.7 7.4 3.1 3.3 7.9 4.2 12 2.2l27.5-17.6c2.1-1.3 3.6-3.5 4.1-5.9.5-2.6 0-5.3-1.7-7.3-3.1-3.3-7.9-4.2-12-2.2l-10.5 6.7c-6.7 4.2-15.4 3-20.9-2.7-4.1-4.2-5.7-10.4-4.2-16.2.8-3.6 2.8-6.8 5.7-9l27.5-17.5c1.8-1.2 3.9-2 6-2.5 8.9-2.3 18.2 1.2 23.4 8.7 3.2 4.4 4.4 9.9 3.5 15.3l-.6 2.9-2 3.7-1.4-2.1c-3.3-5.1-7.8-9.3-13.2-12.1l-1.3-.7.1-1.3c.1-2.7-.8-5.4-2.7-7.4-3.1-3.3-7.9-4.2-12-2.2L25.5 67.3c-2.1 1.4-3.6 3.5-4.1 6-.6 2.5 0 5.2 1.7 7.2 3.1 3.3 7.9 4.2 12 2.2l10.5-6.7c6.7-4.2 15.4-3 20.9 2.7 4.1 4.2 5.7 10.4 4.2 16.2-.8 3.6-2.8 6.8-5.7 9L37.5 121.4c-1.8 1.2-3.9 2-6 2.5"
							fill="#fff"
						/>
					</svg>
					<span class="text-sm font-semibold {selectedFramework === 'svelte' ? 'text-text-brand-primary' : 'text-text-neutral-primary'}">
						Svelte
					</span>
				</button>

				<!-- React Card (Coming Soon) -->
				<div
					class="group relative flex cursor-not-allowed flex-col items-center gap-3 rounded-xl border-2 border-dashed border-border-neutral-l4 px-6 py-5 opacity-50"
				>
					<svg class="size-10" viewBox="-11.5 -10.232 23 20.463" xmlns="http://www.w3.org/2000/svg">
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
			<section class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Prerequisites</h2>
				<ul class="list-inside list-disc space-y-2 text-text-neutral-secondary">
					<li>Svelte 5+ (with runes support)</li>
					<li>SvelteKit (recommended)</li>
					<li>Tailwind CSS v4</li>
					<li>TypeScript (recommended)</li>
				</ul>
			</section>

			<section class="space-y-6">
				<h2 class="text-2xl font-bold tracking-tight">Setup</h2>

				<div>
					<h3 class="mb-2 text-lg font-semibold">1. Create a new SvelteKit project</h3>
					<p class="mb-3 text-sm text-text-neutral-secondary">
						Start by creating a fresh SvelteKit project using the official Svelte CLI.
					</p>
					<CodeBlock
						code="npx sv create my-app"
						language="bash"
					/>
					<p class="mt-3 text-sm text-text-neutral-secondary">
						When prompted, select the following options:
					</p>
					<ul class="mt-2 list-inside list-disc space-y-1.5 text-sm text-text-neutral-secondary">
						<li>Template &mdash; <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">SvelteKit minimal</code></li>
						<li>Typescript &mdash; <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">Yes, using TypeScript syntax</code></li>
						<li>Add-ons &mdash; select <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">tailwindcss</code></li>
						<li>Package manager &mdash; your choice (npm, pnpm, yarn, bun)</li>
					</ul>
				</div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">2. Navigate into your project</h3>
					<CodeBlock code="cd my-app" language="bash" />
				</div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">3. Initialize nnuikit</h3>
					<p class="mb-2 text-sm text-text-neutral-secondary">
						Run the init command to set up nnuikit in your project. This creates a <code
							class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">nnuikit.json</code
						> config file and installs base dependencies.
					</p>
					<CodeBlock code="npx nnuikit init" language="bash" />
				</div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">4. Add design tokens</h3>
					<p class="mb-2 text-sm text-text-neutral-secondary">
						Copy the nnuikit design tokens into your global CSS file. See the
						<a href="/docs/getting-started/theming" class="text-text-brand-primary underline"
							>Theming guide</a
						> for the full token list.
					</p>
					<CodeBlock
						code={`/* In your global CSS file (e.g., src/routes/layout.css) */
@import "tailwindcss";

:root {
  /* Paste nnuikit design tokens here */
  /* See: https://github.com/user/nnuikit/blob/main/src/routes/layout.css */
}`}
						language="css"
					/>
				</div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">5. Add components</h3>
					<CodeBlock code="npx nnuikit add button" language="bash" />
					<p class="mt-2 text-sm text-text-neutral-secondary">
						This copies the component source code into your project at <code
							class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs"
							>src/lib/components/ui/button/</code
						>.
					</p>
				</div>

				<div>
					<h3 class="mb-2 text-lg font-semibold">6. Use the component</h3>
					<CodeBlock
						code={`<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary" size="default">Click me</Button>`}
						language="svelte"
					/>
				</div>
			</section>
		{/if}

		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">CLI Commands</h2>
			<div class="overflow-x-auto rounded-lg border border-border-neutral-l4">
				<table class="w-full text-sm">
					<thead>
						<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
							<th class="px-4 py-3 text-left font-medium">Command</th>
							<th class="px-4 py-3 text-left font-medium">Description</th>
						</tr>
					</thead>
					<tbody>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-mono text-xs">npx nnuikit init</td>
							<td class="px-4 py-3 text-text-neutral-secondary"
								>Initialize nnuikit config and install base deps</td
							>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-mono text-xs">npx nnuikit add [component]</td>
							<td class="px-4 py-3 text-text-neutral-secondary"
								>Add a specific component to your project</td
							>
						</tr>
						<tr class="border-b border-border-neutral-l4">
							<td class="px-4 py-3 font-mono text-xs">npx nnuikit add --all</td>
							<td class="px-4 py-3 text-text-neutral-secondary">Add all available components</td>
						</tr>
						<tr>
							<td class="px-4 py-3 font-mono text-xs">npx nnuikit list</td>
							<td class="px-4 py-3 text-text-neutral-secondary"
								>List all available components</td
							>
						</tr>
					</tbody>
				</table>
			</div>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Project Structure</h2>
			<p class="text-text-neutral-secondary">
				After initialization, your project will have this structure:
			</p>
			<CodeBlock
				code={`src/lib/
├── components/
│   └── ui/
│       ├── button/
│       │   ├── button.svelte    # Component source
│       │   └── index.ts         # Exports
│       └── checkbox/
│           ├── checkbox.svelte
│           └── index.ts
└── utils/
    └── tailwindUtil.ts          # Utility functions (cn, types)`}
				language="text"
			/>
		</section>
	</div>
</DocsPage>
