<script lang="ts">
	import DocsPage from '$lib/components/docs/docs-page.svelte';

	import PageHeader from '$lib/components/docs/page-header.svelte';

	import CodeBlock from '$lib/components/docs/code-block.svelte';
</script>

<DocsPage>
	<PageHeader
		title="Introduction"
		description="nnuikit is a collection of beautifully designed, accessible Svelte components with a fully customizable design token system. Copy and paste components into your project — you own the code."
	/>

	<div class="mt-12 flex flex-col gap-12">
		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">What is nnuikit?</h2>
			<p class="text-text-neutral-secondary leading-relaxed">
				nnuikit is <strong>not a traditional component library</strong>. Instead of installing a
				package and importing pre-built components, you use our CLI to add component source code
				directly to your project. This means:
			</p>
			<ul class="list-inside list-disc space-y-2 text-text-neutral-secondary">
				<li>You own and control 100% of the component code</li>
				<li>Full customization — modify any component to fit your needs</li>
				<li>No version lock-in or breaking changes from updates</li>
				<li>Built-in design token system for consistent theming</li>
				<li>Built for Svelte 5 with runes, Tailwind CSS v4, and full accessibility</li>
			</ul>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
			<div class="space-y-6">
				<div>
					<p class="mb-2 text-sm font-medium text-text-neutral-secondary">
						1. Initialize nnuikit in your project
					</p>
					<CodeBlock code="npx nnuikit init" language="bash" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-text-neutral-secondary">
						2. Add components
					</p>
					<CodeBlock code="npx nnuikit add button checkbox" language="bash" />
				</div>
				<div>
					<p class="mb-2 text-sm font-medium text-text-neutral-secondary">
						3. Use in your code
					</p>
					<CodeBlock
						code={`<script lang="ts">
  import { Button } from '$lib/components/ui/button';
</script>

<Button variant="primary">Click me</Button>`}
						language="svelte"
					/>
				</div>
			</div>
		</section>

		<section class="space-y-4">
			<h2 class="text-2xl font-bold tracking-tight">Available Components</h2>
			<div class="grid gap-4 md:grid-cols-2">
				<a
					href="/docs/components/button"
					class="group rounded-xl border border-border-neutral-l4 p-6 transition-all hover:border-border-brand-l3 hover:shadow-md"
				>
					<h3 class="font-semibold text-text-neutral-primary group-hover:text-text-brand-primary">
						Button
					</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Multiple variants, sizes, icon support, and accessible design.
					</p>
				</a>
				<a
					href="/docs/components/checkbox"
					class="group rounded-xl border border-border-neutral-l4 p-6 transition-all hover:border-border-brand-l3 hover:shadow-md"
				>
					<h3 class="font-semibold text-text-neutral-primary group-hover:text-text-brand-primary">
						Checkbox
					</h3>
					<p class="mt-1 text-sm text-text-neutral-secondary">
						Multiple sizes, indeterminate state, and keyboard accessible.
					</p>
				</a>
			</div>
		</section>
	</div>
</DocsPage>
