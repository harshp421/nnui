<script lang="ts">
	import { page } from '$app/state';

	let { children } = $props();

	const navSections = [
		{
			title: 'Getting Started',
			items: [
				{ label: 'Introduction', href: '/docs' },
				{ label: 'Installation', href: '/docs/getting-started/installation' },
				{ label: 'Theming', href: '/docs/getting-started/theming' }
			]
		},
		{
			title: 'Form',
			items: [
				{ label: 'Button', href: '/docs/components/button' },
				{ label: 'Checkbox', href: '/docs/components/checkbox' },
				{ label: 'Input', href: '/docs/components/input-inputgroup' },
				{ label: 'Textarea', href: '/docs/components/textarea' },
				{ label: 'Radio Group', href: '/docs/components/radio-group' },
				{ label: 'Switch', href: '/docs/components/switch' }
			]
		},
		{
			title: 'Feedback',
			items: [
				{ label: 'Progress', href: '/docs/components/progress' },
				{ label: 'Skeleton', href: '/docs/components/skeleton' }
			]
		}
	];

	let sidebarOpen = $state(false);
</script>

<div class="mx-auto flex max-w-[1400px] gap-0">
	<!-- Mobile sidebar toggle -->
	<button
		class="fixed top-4 left-4 z-50 rounded-lg border border-border-neutral-l2 bg-surface-statics-vv-white/80 p-2 shadow-sm backdrop-blur-sm md:hidden"
		onclick={() => (sidebarOpen = !sidebarOpen)}
	>
		<svg class="size-5 text-text-neutral-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			{#if sidebarOpen}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
			{:else}
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
			{/if}
		</svg>
	</button>

	<!-- Sidebar -->
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<aside
		class="fixed top-0 left-0 z-40 h-screen w-60 shrink-0 border-r border-border-neutral-l2 bg-surface-statics-vv-white transition-transform md:sticky md:translate-x-0 {sidebarOpen
			? 'translate-x-0'
			: '-translate-x-full'}"
		onclick={() => (sidebarOpen = false)}
	>
		<!-- Logo -->
		<div class="relative z-10 px-5 pt-6 pb-2">
			<a href="/" class="flex items-center gap-2 text-lg font-semibold tracking-tight text-text-neutral-primary">
				nnuikit
			</a>
		</div>

		<!-- Top fade -->
		<div class="pointer-events-none sticky top-0 z-10 h-6 bg-linear-to-b from-surface-statics-vv-white to-transparent"></div>

		<!-- Scrollable nav -->
		<nav class="h-[calc(100vh-5rem)] overflow-y-auto px-3 pb-8 scrollbar-none">
			<div class="flex flex-col gap-6">
				{#each navSections as section}
					<div>
						<h3 class="mb-1.5 px-2 text-[11px] font-medium tracking-widest text-text-neutral-tertiary uppercase">
							{section.title}
						</h3>
						<ul class="flex flex-col gap-0.5">
							{#each section.items as item}
								{@const isActive = page.url.pathname === item.href}
								<li>
									<a
										href={item.href}
										class="group relative flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-[13px] transition-all duration-150
										{isActive
											? 'bg-surface-brand-l1 text-text-brand-primary font-medium'
											: 'text-text-neutral-tertiary hover:text-text-neutral-primary hover:bg-surface-neutral-l2'}"
									>
										{#if isActive}
											<span class="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-surface-brand-primary"></span>
										{/if}
										{item.label}
									</a>
								</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
		</nav>

		<!-- Bottom fade -->
		<div class="pointer-events-none sticky bottom-0 z-10 h-8 bg-linear-to-t from-surface-statics-vv-white to-transparent"></div>
	</aside>

	<!-- Mobile overlay -->
	{#if sidebarOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-30 bg-black/20 backdrop-blur-[2px] md:hidden"
			onclick={() => (sidebarOpen = false)}
		></div>
	{/if}

	<!-- Main content -->
	<main class="min-w-0 flex-1 px-6 py-8 md:px-12 md:py-10">
		{@render children?.()}
	</main>
</div>

<style>
	.scrollbar-none {
		scrollbar-width: none;
		-ms-overflow-style: none;
	}
	.scrollbar-none::-webkit-scrollbar {
		display: none;
	}
</style>
