<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import { badgeVariants, type BadgeVariant } from '$lib/components/ui/badge';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import {
		DocsPage,
		PageHeader,
		ComponentPreview,
		CodeBlock,
		PropsTable,
		ComponentSource
	} from '$lib/components/docs';

	// Playground state
	let playgroundVariant = $state<BadgeVariant>('primary');
	let playgroundSize = $state<'sm' | 'md' | 'lg'>('md');
	let playgroundRounded = $state(false);

	const variantGroups: { category: string; variants: { value: string; label: string; description: string }[] }[] = [
		{
			category: 'Brand',
			variants: [
				{ value: 'primary' as const, label: 'Primary', description: 'Default brand badge' },
				{ value: 'primary-bordered' as const, label: 'Primary Bordered', description: 'Brand with border' },
				{ value: 'primary-solid' as const, label: 'Primary Solid', description: 'Solid brand fill' }
			]
		},
		{
			category: 'Neutral',
			variants: [
				{ value: 'neutral' as const, label: 'Neutral', description: 'Default neutral badge' },
				{ value: 'neutral-bordered' as const, label: 'Neutral Bordered', description: 'Neutral with border' },
				{ value: 'neutral-solid' as const, label: 'Neutral Solid', description: 'Solid neutral fill' }
			]
		},
		{
			category: 'Destructive',
			variants: [
				{ value: 'destructive' as const, label: 'Destructive', description: 'Error or danger state' },
				{ value: 'destructive-bordered' as const, label: 'Destructive Bordered', description: 'Destructive with border' },
				{ value: 'destructive-solid' as const, label: 'Destructive Solid', description: 'Solid destructive fill' }
			]
		},
		{
			category: 'Warning',
			variants: [
				{ value: 'warning' as const, label: 'Warning', description: 'Caution or alert state' },
				{ value: 'warning-bordered' as const, label: 'Warning Bordered', description: 'Warning with border' },
				{ value: 'warning-solid' as const, label: 'Warning Solid', description: 'Solid warning fill' }
			]
		},
		{
			category: 'Success',
			variants: [
				{ value: 'success' as const, label: 'Success', description: 'Positive or completed state' },
				{ value: 'success-bordered' as const, label: 'Success Bordered', description: 'Success with border' },
				{ value: 'success-solid' as const, label: 'Success Solid', description: 'Solid success fill' }
			]
		},
		{
			category: 'Info',
			variants: [
				{ value: 'info' as const, label: 'Info', description: 'Informational badge' },
				{ value: 'info-bordered' as const, label: 'Info Bordered', description: 'Info with border' },
				{ value: 'info-solid' as const, label: 'Info Solid', description: 'Solid info fill' }
			]
		}
	];

	const allVariants = variantGroups.flatMap((g) => g.variants);

	const sizes = [
		{ value: 'sm' as const, label: 'Small' },
		{ value: 'md' as const, label: 'Medium' },
		{ value: 'lg' as const, label: 'Large' }
	];

	function getPlaygroundCode() {
		let code = `<Badge`;
		if (playgroundVariant !== 'primary') code += ` variant="${playgroundVariant}"`;
		if (playgroundSize !== 'md') code += ` size="${playgroundSize}"`;
		if (playgroundRounded) code += ` rounded`;
		code += `>Badge</Badge>`;
		return code;
	}

	const installationCode = `npx nnuikit add badge

import { Badge } from "$lib/components/ui/badge";`;

	const badgeProps = [
		{
			name: 'variant',
			type: '"primary" | "primary-bordered" | "primary-solid" | "neutral" | "neutral-bordered" | "neutral-solid" | "destructive" | "destructive-bordered" | "destructive-solid" | "warning" | "warning-bordered" | "warning-solid" | "success" | "success-bordered" | "success-solid" | "info" | "info-bordered" | "info-solid"',
			default: '"primary"',
			description: 'The visual style of the badge. Each color has default, bordered, and solid sub-variants.'
		},
		{
			name: 'size',
			type: '"sm" | "md" | "lg"',
			default: '"md"',
			description: 'The size of the badge. Affects height, padding, font size, and icon size.'
		},
		{
			name: 'rounded',
			type: 'boolean',
			default: 'false',
			description: 'If true, applies fully rounded (pill) shape instead of the default semi-rounded corners.'
		},
		{
			name: 'href',
			type: 'string',
			default: 'undefined',
			description: 'If provided, renders the badge as an anchor (<a>) tag with the specified URL.'
		},
		{
			name: 'class',
			type: 'string',
			default: '""',
			description: 'Additional CSS classes to merge with the badge styles.'
		},
		{
			name: 'ref',
			type: 'HTMLElement | null',
			default: 'null',
			description: 'Binding to the underlying HTML element.'
		},
		{
			name: 'children',
			type: 'Snippet',
			default: '-',
			description: 'The content rendered inside the badge (text, icons, etc.).'
		}
	];
</script>

<Seo
	title="Badge"
	description="A compact label component for status indicators, counts, and categories. 18 variants across 6 color families with 3 sizes and optional pill shape."
/>

<DocsPage>
	<PageHeader
		title="Badge"
		description="A compact label component for displaying status indicators, counts, and categories. Supports 6 color families each with default, bordered, and solid sub-variants."
	/>

	<div class="mt-28 flex flex-col gap-32">
		<div>
			<ComponentSource name="badge" path="$lib/components/ui/badge/badge.svelte" />
		</div>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Installation</h2>
			<CodeBlock code={installationCode} language="typescript" title="Installation" />
		</section>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
			<ComponentPreview
				code={`<script lang="ts">
  import { Badge } from "$lib/components/ui/badge";
</script>

<Badge>Default</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="success">Active</Badge>`}
			>
				{#snippet preview()}
					<div class="flex flex-wrap items-center justify-center gap-12 p-10">
						<Badge>Default</Badge>
						<Badge variant="neutral">Neutral</Badge>
						<Badge variant="destructive">Error</Badge>
						<Badge variant="success">Active</Badge>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-20">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
				<p class="text-text-neutral-secondary">
					Customize the badge's appearance using the controls below.
				</p>
			</div>

			<div class="text-card-foreground rounded-xl shadow-xs">
				<div class="mt-12 p-6 pt-0">
					<ComponentPreview code={getPlaygroundCode()}>
						{#snippet preview()}
							<div class="flex flex-col items-center justify-center gap-8 py-10">
								<div class="relative z-10 flex min-h-[60px] items-center justify-center">
									<Badge
										variant={playgroundVariant}
										size={playgroundSize}
										rounded={playgroundRounded}
									>
										Badge
									</Badge>
								</div>
							</div>
						{/snippet}
					</ComponentPreview>

					<div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
						<div class="space-y-4">
							<h3 class="text-sm leading-none font-medium">Variant</h3>
							<div class="grid grid-cols-3 gap-2">
								{#each allVariants as variant (variant.value)}
									<Button
										variant={playgroundVariant === variant.value ? 'primary' : 'tertiary'}
										size="sm"
										onclick={() => (playgroundVariant = variant.value as BadgeVariant)}
									>
										{variant.label}
									</Button>
								{/each}
							</div>
						</div>

						<div class="space-y-6">
							<div class="space-y-4">
								<h3 class="text-sm leading-none font-medium">Size</h3>
								<div class="flex flex-wrap gap-4">
									{#each sizes as s (s.value)}
										<Button
											variant={playgroundSize === s.value ? 'primary' : 'tertiary'}
											size="sm"
											onclick={() => (playgroundSize = s.value)}
										>
											{s.label}
										</Button>
									{/each}
								</div>
							</div>

							<div class="space-y-4">
								<h3 class="text-sm leading-none font-medium">Options</h3>
								<div class="flex gap-4">
									<label class="flex items-center space-x-2 text-sm leading-none font-medium">
										<Checkbox bind:checked={playgroundRounded} />
										<span>Fully Rounded</span>
									</label>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Variants</h2>
				<p class="text-text-neutral-secondary">
					Six color families, each with default, bordered, and solid sub-variants.
				</p>
			</div>

			{#each variantGroups as group (group.category)}
				<div class="space-y-6">
					<h3 class="text-lg font-semibold text-text-neutral-primary">{group.category}</h3>
					<div class="grid gap-8 md:grid-cols-3">
						{#each group.variants as variant (variant.value)}
							<div class="group relative flex flex-col space-y-16 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
								<div class="flex items-center gap-4 p-4">
									<p class="text-foreground font-semibold capitalize">
										{variant.label}
									</p>
								</div>
								<div class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8">
									<Badge variant={variant.value}>{variant.label}</Badge>
								</div>
								<CodeBlock
									code={`<Badge variant="${variant.value}">${variant.label}</Badge>`}
									language="svelte"
									class="text-xs"
								/>
								<p class="text-center text-sm text-text-neutral-secondary">
									{variant.description}
								</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
				<p class="text-text-neutral-secondary">
					Three sizes to fit different contexts, from compact inline labels to prominent callouts.
				</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				{#each sizes as s (s.value)}
					<div class="group flex flex-col space-y-16 rounded-xl p-6 shadow-sm transition-all hover:shadow-md">
						<div class="p-4">
							<p class="text-foreground font-semibold">{s.label}</p>
							<p class="text-sm text-text-neutral-secondary">size="{s.value}"</p>
						</div>
						<div class="flex min-h-[100px] items-center justify-center rounded-lg border border-dashed bg-surface-neutral-l2 p-8">
							<Badge size={s.value}>Badge</Badge>
						</div>
						<CodeBlock
							code={`<Badge size="${s.value}">Badge</Badge>`}
							language="svelte"
							class="text-xs"
						/>
					</div>
				{/each}
			</div>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Rounded</h2>
				<p class="text-text-neutral-secondary">
					Use the <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">rounded</code> prop to apply a fully rounded pill shape.
				</p>
			</div>

			<ComponentPreview
				code={`<Badge>Semi-rounded</Badge>
<Badge rounded>Fully rounded</Badge>`}
			>
				{#snippet preview()}
					<div class="flex flex-wrap items-center justify-center gap-12 p-10">
						<Badge>Semi-rounded</Badge>
						<Badge rounded>Fully rounded</Badge>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">With Icons</h2>
				<p class="text-text-neutral-secondary">
					Badges automatically size nested SVG icons and avatar slots via the <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">[&>svg]</code> selector.
				</p>
			</div>

			<ComponentPreview
				code={`<Badge variant="success">
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round"
      stroke-width="2" d="M5 13l4 4L19 7" />
  </svg>
  Verified
</Badge>

<Badge variant="destructive-bordered">
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round"
      stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
  Rejected
</Badge>`}
			>
				{#snippet preview()}
					<div class="flex flex-wrap items-center justify-center gap-12 p-10">
						<Badge variant="success">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
							</svg>
							Verified
						</Badge>
						<Badge variant="destructive-bordered">
							<svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
							</svg>
							Rejected
						</Badge>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">As Link</h2>
				<p class="text-text-neutral-secondary">
					Pass an <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">href</code> prop to render the badge as an anchor element.
				</p>
			</div>

			<ComponentPreview
				code={`<Badge href="/docs/components/badge">Linked Badge</Badge>`}
			>
				{#snippet preview()}
					<div class="flex items-center justify-center p-10">
						<Badge href="/docs/components/badge">Linked Badge</Badge>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-8">
			<h2 class="border-b py-6 text-2xl font-bold tracking-tight">Props</h2>
			<PropsTable props={badgeProps} />
		</section>
	</div>
</DocsPage>
