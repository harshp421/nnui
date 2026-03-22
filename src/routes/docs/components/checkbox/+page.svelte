<script lang="ts">
	import {
		DocsPage,
		PageHeader,
		ComponentPreview,
		CodeBlock,
		PropsTable,
		ComponentSource
	} from '$lib/components/docs';
	import { Checkbox } from '$lib/components/ui/checkbox';

	let checkedDefault = $state(false);
	let checkedSm = $state(false);
	let checkedMd = $state(true);
	let checkedLg = $state(false);
	let checkedIndeterminate = $state(true);
	let checkedDisabled = $state(false);

	const installationCode = `import { Checkbox } from "$lib/components/ui/checkbox";`;

	const checkboxProps = [
		{
			name: 'checked',
			type: 'boolean',
			default: 'false',
			description: 'The checked state of the checkbox. Supports two-way binding.'
		},
		{
			name: 'indeterminate',
			type: 'boolean',
			default: 'false',
			description: 'If true, displays an indeterminate state (minus icon) when checked.'
		},
		{
			name: 'size',
			type: '"sm" | "md" | "lg"',
			default: '"md"',
			description: 'The size of the checkbox.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description: 'Disables the checkbox.'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			description: 'Binding to the underlying HTML element.'
		}
	];
</script>

<DocsPage>
	<PageHeader
		title="Checkbox"
		description="A checkbox component with multiple sizes, indeterminate state support, and fully accessible keyboard navigation."
	/>

	<div class="mt-28 flex flex-col gap-32">
		<div>
			<ComponentSource name="checkbox" path="$lib/components/ui/checkbox/checkbox.svelte" />
		</div>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Installation</h2>
			<CodeBlock code={installationCode} language="typescript" title="Installation" />
		</section>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
			<ComponentPreview code={`<Checkbox bind:checked={value} />`}>
				{#snippet preview()}
					<div class="flex items-center justify-center gap-4 p-10">
						<Checkbox bind:checked={checkedDefault} />
						<span class="text-sm text-text-neutral-secondary">
							{checkedDefault ? 'Checked' : 'Unchecked'}
						</span>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
				<p class="text-text-neutral-secondary">Three sizes available: sm, md, lg.</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				<div class="flex flex-col items-center gap-4 rounded-xl p-6 shadow-sm">
					<p class="font-semibold">Small</p>
					<Checkbox bind:checked={checkedSm} size="sm" />
					<CodeBlock code={`<Checkbox size="sm" />`} language="svelte" class="w-full text-xs" />
				</div>
				<div class="flex flex-col items-center gap-4 rounded-xl p-6 shadow-sm">
					<p class="font-semibold">Medium (default)</p>
					<Checkbox bind:checked={checkedMd} size="md" />
					<CodeBlock code={`<Checkbox size="md" />`} language="svelte" class="w-full text-xs" />
				</div>
				<div class="flex flex-col items-center gap-4 rounded-xl p-6 shadow-sm">
					<p class="font-semibold">Large</p>
					<Checkbox bind:checked={checkedLg} size="lg" />
					<CodeBlock code={`<Checkbox size="lg" />`} language="svelte" class="w-full text-xs" />
				</div>
			</div>
		</section>

		<section class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Indeterminate</h2>
				<p class="text-text-neutral-secondary">
					Used when a parent checkbox represents a partially selected group.
				</p>
			</div>
			<ComponentPreview code={`<Checkbox indeterminate bind:checked={value} />`}>
				{#snippet preview()}
					<div class="flex items-center justify-center gap-4 p-10">
						<Checkbox indeterminate bind:checked={checkedIndeterminate} />
						<span class="text-sm text-text-neutral-secondary">Indeterminate</span>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-8">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Disabled</h2>
				<p class="text-text-neutral-secondary">Disabled state prevents interaction.</p>
			</div>
			<ComponentPreview code={`<Checkbox disabled />`}>
				{#snippet preview()}
					<div class="flex items-center justify-center gap-8 p-10">
						<div class="flex items-center gap-2">
							<Checkbox disabled />
							<span class="text-sm text-text-neutral-secondary">Unchecked</span>
						</div>
						<div class="flex items-center gap-2">
							<Checkbox disabled checked={true} />
							<span class="text-sm text-text-neutral-secondary">Checked</span>
						</div>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-8">
			<h2 class="border-b py-6 text-2xl font-bold tracking-tight">Props</h2>
			<PropsTable props={checkboxProps} />
		</section>
	</div>
</DocsPage>
