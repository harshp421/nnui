<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {
		DocsPage,
		PageHeader,
		ComponentPreview,
		CodeBlock,
		PropsTable,
		ComponentSource
	} from '$lib/components/docs';
	import { Checkbox } from '$lib/components/ui/checkbox';

	// Playground state
	let playgroundVariant = $state<
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'destructive'
		| 'warning'
		| 'info'
		| 'orphan'
		| 'link'
		| 'glass'
	>('primary');
	let playgroundSize = $state<'sm' | 'default' | 'lg' | 'icon-sm' | 'icon-md' | 'icon-lg'>(
		'default'
	);
	let playgroundRounded = $state(false);
	let playgroundIcon = $state<'none' | 'left' | 'right' | 'only'>('none');
	let playgroundDisabled = $state(false);

	const variants = [
		{
			value: 'primary',
			label: 'Primary',
			description: 'Main call-to-action (Default)'
		},
		{
			value: 'secondary',
			label: 'Secondary',
			description: 'Secondary actions'
		},
		{
			value: 'tertiary',
			label: 'Tertiary',
			description: 'Tertiary actions with border'
		},
		{
			value: 'destructive',
			label: 'Destructive',
			description: 'Delete or dangerous actions'
		},
		{
			value: 'warning',
			label: 'Warning',
			description: 'Warning state actions'
		},
		{
			value: 'info',
			label: 'Info',
			description: 'Informational actions'
		},
		{
			value: 'orphan',
			label: 'Orphan',
			description: 'Minimal button without border'
		},

		{
			value: 'link',
			label: 'Link',
			description: 'Link-styled button'
		},
		{
			value: 'glass',
			label: 'Glass',
			description: 'Glassmorphism effect'
		}
	];

	const sizes = [
		{ value: 'sm', label: 'Small', height: '28px' },
		{ value: 'default', label: 'Default', height: '32px' },
		{ value: 'lg', label: 'Large', height: '40px' },
		{ value: 'icon-sm', label: 'Icon SM', size: '28px' },
		{ value: 'icon-md', label: 'Icon MD', size: '32px' },
		{ value: 'icon-lg', label: 'Icon LG', size: '40px' }
	];

	function getButtonCode(variant: string, size?: string) {
		let code = `<Button`;
		if (variant !== 'primary') code += ` variant="${variant}"`;
		if (size && size !== 'default') code += ` size="${size}"`;
		code += `>Button</Button>`;
		return code;
	}

	function getPlaygroundCode() {
		let code = `<Button`;
		if (playgroundVariant !== 'primary') code += ` variant="${playgroundVariant}"`;
		if (playgroundSize !== 'default') code += ` size="${playgroundSize}"`;
		if (playgroundRounded) code += ` fullyRounded`;
		if (playgroundDisabled) code += ` disabled`;
		code += `>`;

		if (playgroundIcon === 'left' || playgroundIcon === 'only') {
			code += `\n  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`;
		}
		if (playgroundIcon !== 'only') {
			code += playgroundIcon === 'left' || playgroundIcon === 'right' ? `\n  Button` : `Button`;
		}
		if (playgroundIcon === 'right') {
			code += `\n  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/></svg>`;
		}

		if (playgroundIcon !== 'none' && playgroundIcon !== 'only') {
			code += `\n`;
		}

		code += `</Button>`;
		return code;
	}

	const installationCode = `import Button from "$lib/components/ui/button/button.svelte";`;

	const buttonProps = [
		{
			name: 'variant',
			type: '"primary" | "secondary" | "tertiary" | "destructive" | "warning" | "info" | "orphan" | "link" | "glass"',
			default: '"primary"',
			description:
				'The visual style of the button. Supports solid, outline, ghost, link, and specialized semantic styles.'
		},
		{
			name: 'size',
			type: '"default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-md" | "icon-lg"',
			default: '"default"',
			description: 'The size of the button. Affects padding, height, and font size.'
		},
		{
			name: 'fullyRounded',
			type: 'boolean',
			default: 'false',
			description: 'If true, applies full border-radius (rounded-full) to the button.'
		},
		{
			name: 'disabled',
			type: 'boolean',
			default: 'false',
			description:
				'Disables user interaction and applies disabled styling including opacity reduction.'
		},
		{
			name: 'href',
			type: 'string',
			default: 'undefined',
			description: 'If provided, renders the button as an anchor (<a>) tag with the specified URL.'
		},
		{
			name: 'type',
			type: '"button" | "submit" | "reset"',
			default: '"button"',
			description: 'The HTML type attribute for the button element. Ignored if href is provided.'
		},
		{
			name: 'ref',
			type: 'HTMLButtonElement | HTMLAnchorElement | null',
			default: 'null',
			description: 'Binding to the underlying HTML element.'
		}
	];
</script>

<DocsPage>
	<PageHeader
		title="Button"
		description="A versatile button component with support for multiple variants, sizes, and icon integrations. Supports both button and anchor functionalities."
	/>
	<div class="mt-28 flex flex-col gap-32">
		<div>
			<ComponentSource name="button" path="$lib/components/ui/button/button.svelte" />
		</div>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Installation</h2>
			<CodeBlock code={installationCode} language="typescript" title="Installation" />
		</section>

		<section class="space-y-8">
			<h2 class="text-2xl font-bold tracking-tight">Quick Start</h2>
			<ComponentPreview code={`<Button>Button</Button>`}>
				{#snippet preview()}
					<div class="flex items-center justify-center p-10">
						<Button>Button</Button>
					</div>
				{/snippet}
			</ComponentPreview>
		</section>

		<section class="space-y-20">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Interactive Playground</h2>
				<p class="text-text-neutral-secondary">
					Customize the button's appearance using the controls below.
				</p>
			</div>

			<div class="text-card-foreground rounded-xl shadow-xs">
				<div class="mt-12 p-6 pt-0">
					<!-- Preview and Code -->
					<ComponentPreview code={getPlaygroundCode()}>
						{#snippet preview()}
							<div class="flex flex-col items-center justify-center gap-8 py-10">
								<!-- Button Display -->
								<div class="relative z-10 flex min-h-[60px] items-center justify-center">
									{#if playgroundIcon === 'only'}
										<Button
											variant={playgroundVariant}
											size={playgroundSize.startsWith('icon') ? (playgroundSize as any) : 'icon-md'}
											fullyRounded={playgroundRounded}
											disabled={playgroundDisabled}
										>
											<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path
													stroke-linecap="round"
													stroke-linejoin="round"
													stroke-width="2"
													d="M12 4v16m8-8H4"
												/>
											</svg>
										</Button>
									{:else}
										<Button
											variant={playgroundVariant}
											size={playgroundSize as any}
											fullyRounded={playgroundRounded}
											disabled={playgroundDisabled}
										>
											{#if playgroundIcon === 'left'}
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 4v16m8-8H4"
													/>
												</svg>
											{/if}
											Button
											{#if playgroundIcon === 'right'}
												<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														stroke-width="2"
														d="M12 4v16m8-8H4"
													/>
												</svg>
											{/if}
										</Button>
									{/if}
								</div>
							</div>
						{/snippet}
					</ComponentPreview>

					<div class="mt-8 grid gap-8 border-t pt-8 md:grid-cols-2">
						<div class="space-y-4">
							<h3 class="text-sm leading-none font-medium">Variant</h3>
							<div class="grid grid-cols-3 gap-2">
								{#each variants as variant (variant.value)}
									<Button
										variant={playgroundVariant === variant.value ? 'primary' : 'tertiary'}
										onclick={() => (playgroundVariant = variant.value as any)}
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
									{#each sizes as size (size.value)}
										<Button
											variant={playgroundSize === size.value ? 'primary' : 'tertiary'}
											onclick={() => (playgroundSize = size.value as any)}
										>
											{size.label}
										</Button>
									{/each}
								</div>
							</div>

							<div class="space-y-4">
								<h3 class="text-sm leading-none font-medium">Icon</h3>
								<div class="flex flex-wrap gap-2">
									{#each [{ value: 'none', label: 'None' }, { value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }, { value: 'only', label: 'Icon Only' }] as icon (icon.value)}
										<Button
											variant={playgroundIcon === icon.value ? 'primary' : 'tertiary'}
											size="sm"
											onclick={() => (playgroundIcon = icon.value as any)}
										>
											{icon.label}
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
									<label class="flex items-center space-x-2 text-sm leading-none font-medium">
										<Checkbox bind:checked={playgroundDisabled} />
										<span>Disabled</span>
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
				<p class="text-text-neutral-secondary">Different visual styles of the button component.</p>
			</div>

			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each variants as variant (variant.value)}
					<div
						class="group relative flex flex-col space-y-16 rounded-xl p-6 shadow-sm transition-all hover:shadow-md"
					>
						<div class="flex items-center gap-4 p-4">
							<p class="text-foreground font-semibold capitalize">
								{variant.label}
							</p>
						</div>
						<div class="flex min-h-[100px] flex-wrap items-center justify-center gap-4 p-8">
							<Button variant={variant.value as any}>{variant.label}</Button>
						</div>
						<CodeBlock code={getButtonCode(variant.value)} language="svelte" class="text-xs" />
						<p class="text-center text-sm text-text-neutral-secondary">
							{variant.description}
						</p>
					</div>
				{/each}
			</div>
		</section>

		<section class="space-y-12">
			<div class="space-y-4">
				<h2 class="text-2xl font-bold tracking-tight">Sizes</h2>
				<p class="text-text-neutral-secondary">Different button sizes for various use cases.</p>
			</div>

			<div class="grid gap-8 md:grid-cols-3">
				{#each sizes as size (size.value)}
					<div
						class="group flex flex-col space-y-16 rounded-xl p-6 shadow-sm transition-all hover:shadow-md"
					>
						<div>
							<p class="text-foreground font-semibold">
								{size.label}
							</p>
							<p class="text-sm text-text-neutral-secondary">
								Height: {size.height || size.size}
							</p>
						</div>

						<div class="flex min-h-[100px] items-center justify-center p-8">
							{#if size.value.startsWith('icon')}
								<Button size={size.value as any} variant="primary">
									<svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
										><path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M12 4v16m8-8H4"
										/></svg
									>
								</Button>
							{:else}
								<Button size={size.value as any} variant="tertiary">{size.label}</Button>
							{/if}
						</div>

						<CodeBlock
							code={getButtonCode('default', size.value)}
							language="svelte"
							class="text-xs"
						/>
					</div>
				{/each}
			</div>
		</section>

		<section class="space-y-8">
			<h2 class="border-b py-6 text-2xl font-bold tracking-tight">Props</h2>
			<PropsTable props={buttonProps} />
		</section>
	</div>
</DocsPage>
