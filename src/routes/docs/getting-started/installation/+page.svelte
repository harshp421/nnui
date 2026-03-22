<script lang="ts">
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';
</script>

<DocsPage>
	<PageHeader
		title="Installation"
		description="How to install and set up nnuikit in your Svelte project."
	/>

	<div class="mt-12 flex flex-col gap-12">
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
				<h3 class="mb-2 text-lg font-semibold">1. Create a Svelte project (if you don't have one)</h3>
				<CodeBlock
					code={`npx sv create my-app
cd my-app`}
					language="bash"
				/>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold">2. Initialize nnuikit</h3>
				<p class="mb-2 text-sm text-text-neutral-secondary">
					Run the init command to set up nnuikit in your project. This creates a <code
						class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">nnuikit.json</code
					> config file and installs base dependencies.
				</p>
				<CodeBlock code="npx nnuikit init" language="bash" />
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold">3. Add design tokens</h3>
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
				<h3 class="mb-2 text-lg font-semibold">4. Add components</h3>
				<CodeBlock code="npx nnuikit add button" language="bash" />
				<p class="mt-2 text-sm text-text-neutral-secondary">
					This copies the component source code into your project at <code
						class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs"
						>src/lib/components/ui/button/</code
					>.
				</p>
			</div>

			<div>
				<h3 class="mb-2 text-lg font-semibold">5. Use the component</h3>
				<CodeBlock
					code={`<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary" size="default">Click me</Button>`}
					language="svelte"
				/>
			</div>
		</section>

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
