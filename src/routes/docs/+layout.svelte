<script lang="ts">
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import ModeSwitch from '$lib/components/ui/theme-switch/modeSwitch.svelte';

	let { children } = $props();
	let isDark = $state(false);

	const navSections = [
		{
			title: 'Getting Started',
			items: [
				{ label: 'Introduction', href: '/docs' },
				{ label: 'Installation', href: '/docs/getting-started/installation' },
				{ label: 'Colors', href: '/docs/getting-started/colors' },
				{ label: 'Theming', href: '/docs/getting-started/theming' },
				{ label: 'Token Architecture', href: '/docs/getting-started/theming/architecture' },
				{ label: 'Design Tracks', href: '/docs/getting-started/design-tracks' }
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
				{ label: 'Switch', href: '/docs/components/switch' },
				{ label: 'Range Selector', href: '/docs/components/range-selector' },
{ label: 'File Uploader', href: '/docs/components/file-uploader' }
			]
		},
		{
			title: 'Data Display',
			items: [
				{ label: 'Avatar', href: '/docs/components/avatar' },
				{ label: 'Badge', href: '/docs/components/badge' },
				{ label: 'Breadcrumb', href: '/docs/components/breadcrumb' },
				{ label: 'Item', href: '/docs/components/item' },
				{ label: 'Tabs', href: '/docs/components/tabs' },
				{ label: 'Typography', href: '/docs/components/typography' }
			]
		},
		{
			title: 'Overlay',
			items: [
				{ label: 'Dialog', href: '/docs/components/dialog' },
				{ label: 'Drawer', href: '/docs/components/drawer' },
				{ label: 'Dropdown Menu', href: '/docs/components/dropdown-menu' },
				{ label: 'Sheet', href: '/docs/components/sheet' },
				{ label: 'Toast', href: '/docs/components/toast' },
				{ label: 'Tooltip', href: '/docs/components/tooltip' }
			]
		},
		{
			title: 'Feedback',
			items: [
				{ label: 'Progress', href: '/docs/components/progress' },
				{ label: 'Skeleton', href: '/docs/components/skeleton' }
			]
		},
		{
			title: 'Style',
			items: [
				{ label: 'Glass UI', href: '/docs/components/glass-ui' },
				{ label: 'Mode Switch', href: '/docs/components/mode-switch' }
			]
		}
	];

	let sidebarOpen = $state(false);

	$effect(() => {
		// Close sidebar on route change
		page.url.pathname;
		sidebarOpen = false;
	});
</script>

<!-- ── Top Header ──────────────────────────────────────────────────── -->
<header class="sticky top-0 z-50 w-full border-b border-border-neutral-l2 bg-surface-statics-vv-white/95 backdrop-blur-sm">
	<div class="mx-auto flex h-56 max-w-[1400px] items-center gap-3 px-16">

		<!-- Mobile hamburger -->
		<button
			class="rounded-lg p-1.5 text-text-neutral-tertiary transition-colors hover:bg-surface-neutral-l2 hover:text-text-neutral-primary md:hidden"
			onclick={() => (sidebarOpen = !sidebarOpen)}
			aria-label="Toggle navigation"
		>
			{#if sidebarOpen}
				<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 18L18 6M6 6l12 12" />
				</svg>
			{:else}
				<svg class="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
				</svg>
			{/if}
		</button>

		<!-- Logo -->
		<a href="/" class="flex items-center gap-8 shrink-0">
			<img src={favicon} alt="nnuikit" class="size-5" />
			<span class="text-sm font-semibold tracking-tight text-text-neutral-primary">nnuikit</span>
		</a>

		<!-- Vertical divider -->
		<div class="hidden h-5 w-px bg-border-neutral-l4 md:block"></div>

		<!-- Header nav -->
		<nav class="hidden items-center md:flex">
			<a
				href="/docs"
				class="rounded-md px-3 py-1.5 text-sm transition-colors
					{page.url.pathname === '/docs' || (page.url.pathname.startsWith('/docs/getting-started') && !page.url.pathname.startsWith('/docs/components'))
						? 'text-text-neutral-primary font-medium'
						: 'text-text-neutral-tertiary hover:text-text-neutral-primary'}"
			>
				Docs
			</a>
			<a
				href="/docs/components"
				class="rounded-md px-3 py-1.5 text-sm transition-colors
					{page.url.pathname.startsWith('/docs/components')
						? 'text-text-neutral-primary font-medium'
						: 'text-text-neutral-tertiary hover:text-text-neutral-primary'}"
			>
				Components
			</a>
		</nav>

		<!-- Right side -->
		<div class="ml-auto flex items-center gap-8">
			<!-- Mode switch -->
			<ModeSwitch bind:isDark size="sm" />

			<!-- GitHub -->
			<a
				href="https://github.com"
				target="_blank"
				rel="noopener noreferrer"
				class="rounded-lg p-1.5 text-text-neutral-tertiary transition-colors hover:bg-surface-neutral-l2 hover:text-text-neutral-primary"
				aria-label="GitHub"
			>
				<svg class="size-5" fill="currentColor" viewBox="0 0 24 24">
					<path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
				</svg>
			</a>

			<!-- CTA -->
			<a
				href="/docs/getting-started/installation"
				class="rounded-lg bg-surface-brand-primary px-3 py-1.5 text-sm font-medium text-text-statics-pure-white transition-opacity hover:opacity-90"
			>
				Get Started
			</a>
		</div>
	</div>
</header>

<!-- ── Docs body (sidebar + content) ──────────────────────────────── -->
<div class="mx-auto flex max-w-[1400px]">

	<!-- ── Sidebar (desktop) ────────────────────────────────────────── -->
	<aside class="sticky top-56 hidden h-[calc(100vh-56px)] w-60 shrink-0 flex-col border-r border-border-neutral-l2 bg-surface-statics-vv-white md:flex">

		<!-- Logo row inside sidebar (shows brand + quick links) -->
		<!-- <div class="px-4 pt-4 pb-2">
			<a
				href="/docs/components"
				class="flex items-center gap-2 rounded-lg px-2 py-1.5 text-xs font-medium text-text-neutral-tertiary transition-colors hover:bg-surface-neutral-l2 hover:text-text-neutral-primary"
			>
				<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
				</svg>
				All Components
			</a>
		</div> -->

		<!-- Scrollable nav with gradient fades -->
		<div class="relative min-h-0 flex-1 overflow-hidden">

			<!-- Top fade -->
			<div class="pointer-events-none absolute top-0 right-0 left-0 z-10 h-24 bg-linear-to-b from-surface-statics-vv-white to-transparent"></div>

			<!-- Nav -->
			<nav class="h-full overflow-y-auto px-3 py-8 pb-48 scrollbar-none">
				<div class="flex flex-col gap-5">
					{#each navSections as section (section.title)}
						<div>
							<h3 class="mb-4 px-8 text-[11px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">
								{section.title}
							</h3>
							<ul class="flex flex-col gap-0.5">
								{#each section.items as item (item.href)}
									{@const isActive = page.url.pathname === item.href}
									<li>
										<a
											href={item.href}
											class="relative flex items-center rounded-lg px-2.5 py-1.5 text-[13px] transition-colors duration-100
											{isActive
												? 'bg-surface-brand-l1 font-medium text-text-brand-primary'
												: 'text-text-neutral-secondary hover:bg-surface-neutral-l2 hover:text-text-neutral-primary'}"
										>
											{#if isActive}
												<span class="absolute left-0 top-1/2 h-16 w-0.5 -translate-y-1/2 rounded-r-full bg-surface-brand-primary"></span>
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
			<div class="pointer-events-none absolute bottom-0 right-0 left-0 z-10 h-48 bg-linear-to-t from-surface-statics-vv-white to-transparent"></div>
		</div>
	</aside>

	<!-- ── Mobile sidebar overlay ───────────────────────────────────── -->
	{#if sidebarOpen}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="fixed inset-0 z-30 bg-black/25 backdrop-blur-[2px] md:hidden"
			onclick={() => (sidebarOpen = false)}
		></div>
	{/if}

	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<aside
		class="fixed top-56 left-0 z-40 flex h-[calc(100vh-56px)] w-60 flex-col border-r border-border-neutral-l2 bg-surface-statics-vv-white transition-transform duration-200 md:hidden
		{sidebarOpen ? 'translate-x-0' : '-translate-x-full'}"
		onclick={() => (sidebarOpen = false)}
	>
		<div class="px-16 pt-16 pb-8">
			<a
				href="/docs/components"
				class="flex items-center gap-8 rounded-lg px-8 py-1.5 text-xs font-medium text-text-neutral-tertiary transition-colors hover:bg-surface-neutral-l2 hover:text-text-neutral-primary"
			>
				<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
				</svg>
				All Components
			</a>
		</div>

		<div class="relative min-h-0 flex-1 overflow-hidden">
			<div class="pointer-events-none absolute top-0 right-0 left-0 z-10 h-24 bg-linear-to-b from-surface-statics-vv-white to-transparent"></div>
			<nav class="h-full overflow-y-auto px-3 py-8 pb-48 scrollbar-none">
				<div class="flex flex-col gap-5">
					{#each navSections as section (section.title)}
						<div>
							<h3 class="mb-4 px-8 text-[11px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">
								{section.title}
							</h3>
							<ul class="flex flex-col gap-0.5">
								{#each section.items as item (item.href)}
									{@const isActive = page.url.pathname === item.href}
									<li>
										<a
											href={item.href}
											class="relative flex items-center rounded-lg px-2.5 py-1.5 text-[13px] transition-colors duration-100
											{isActive
												? 'bg-surface-brand-l1 font-medium text-text-brand-primary'
												: 'text-text-neutral-secondary hover:bg-surface-neutral-l2 hover:text-text-neutral-primary'}"
										>
											{#if isActive}
												<span class="absolute left-0 top-1/2 h-16 w-0.5 -translate-y-1/2 rounded-r-full bg-surface-brand-primary"></span>
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
			<div class="pointer-events-none absolute bottom-0 right-0 left-0 z-10 h-48 bg-linear-to-t from-surface-statics-vv-white to-transparent"></div>
		</div>
	</aside>

	<!-- ── Main content ─────────────────────────────────────────────── -->
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
