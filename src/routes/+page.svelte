<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { CodeBlock } from '$lib/components/docs';

	const components = [
		{ name: 'Button', desc: '9 variants, 7 sizes, icon support', href: '/docs/components/button' },
		{ name: 'Checkbox', desc: 'Native input, indeterminate state', href: '/docs/components/checkbox' },
		{ name: 'Input', desc: 'States, validation, icon slots', href: '/docs/components/input-inputgroup' },
		{ name: 'Dialog', desc: 'Modal with focus trap & backdrop', href: '/docs/components/dialog' },
		{ name: 'Dropdown Menu', desc: 'Submenus, shortcuts, radio items', href: '/docs/components/dropdown-menu' },
		{ name: 'Tabs', desc: 'Tabbed panels, brand & neutral', href: '/docs/components/tabs' },
		{ name: 'Toast', desc: 'Inline & expanded notifications', href: '/docs/components/toast' },
		{ name: 'Avatar', desc: 'Image, fallback, status indicator', href: '/docs/components/avatar' },
		{ name: 'Badge', desc: '18 variants, 3 sizes', href: '/docs/components/badge' },
		{ name: 'Sheet', desc: 'Slide-in side panel overlay', href: '/docs/components/sheet' },
		{ name: 'Tooltip', desc: 'Contextual hint on hover', href: '/docs/components/tooltip' }
	];

	const stats = [
		{ value: '25+', label: 'Components' },
		{ value: '3', label: 'Token Layers' },
		{ value: '5', label: 'Color Themes' },
		{ value: '100%', label: 'Accessible' }
	];

	const features = [
		{
			title: 'Copy & Own',
			desc: 'Components are copied into your project. You own the code — customize anything without constraints.',
			icon: 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
		},
		{
			title: '3-Layer Design Tokens',
			desc: 'Base palette → Semantic tokens → Component tokens. Change one variable, the entire system updates.',
			icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01'
		},
		{
			title: 'Accessible by Default',
			desc: 'Built on Bits UI primitives — keyboard navigation, ARIA, focus management, and screen reader support come standard.',
			icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z'
		},
		{
			title: 'Svelte 5 + Tailwind v4',
			desc: 'Built with runes, $props(), $bindable(). Styled with Tailwind CSS v4 and @theme for custom utilities.',
			icon: 'M13 10V3L4 14h7v7l9-11h-7z'
		},
		{
			title: 'CLI Powered',
			desc: 'npx nnuikit init → npx nnuikit add button. Dependencies install automatically. Tokens inject into your CSS.',
			icon: 'M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
		},
		{
			title: 'Theme Switching',
			desc: '5 color themes built in. Add class="violet" and every component changes. Blue, cyan, orange, pink, violet.',
			icon: 'M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25H6.75z'
		}
	];
	
</script>

<Seo
	description="A design-token-driven Svelte 5 component library with 25+ accessible components, 3-layer token architecture, and 5 built-in themes. Add components via CLI — npx nnuikit add. Built with Tailwind CSS v4 and Bits UI."
	keywords="svelte 5 ui library, svelte component library, design tokens, tailwindcss v4, shadcn svelte, CLI component library, accessible components"
/>

<div class="relative flex min-h-screen flex-col overflow-hidden bg-surface-statics-vv-white">

	<!-- ═══ HERO ═══ -->
	<header class="relative flex flex-col items-center justify-center px-24 pt-128 pb-80 text-center md:pt-128 md:pb-96">

		<!-- Animated gradient orbs -->
		<div class="hero-glow pointer-events-none">
			<div class="orb orb-1"></div>
			<div class="orb orb-2"></div>
			<div class="orb orb-3"></div>
		</div>

		<!-- Badge -->
		<div class="animate-fade-in relative z-10 mb-24 inline-flex items-center gap-8 rounded-full border border-border-neutral-l2 bg-surface-statics-vv-white/60 px-16 py-6 text-p-small text-text-neutral-secondary backdrop-blur-md">
			<span class="relative flex size-8">
				<span class="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75"></span>
				<span class="relative inline-flex size-8 rounded-full bg-green-500"></span>
			</span>
			Open Source
		</div>

		<!-- Heading -->
		<h1 class="animate-fade-in-up relative z-10 max-w-[720px] text-[48px] leading-[1.1] font-bold tracking-tight text-text-neutral-primary md:text-[64px]">
			Beautiful components for
			<span class="hero-gradient-text">Svelte 5</span>
		</h1>

		<!-- Subtitle -->
		<p class="animate-fade-in-up-delay relative z-10 mt-24 max-w-[520px] text-[16px] leading-[1.6] text-text-neutral-tertiary md:text-[18px]">
			Design-token-powered UI library. Copy components into your project, own the code, customize everything.
		</p>

		<!-- CTA Buttons -->
		<div class="animate-fade-in-up-delay-2 relative z-10 mt-40 flex flex-wrap items-center justify-center gap-12">
			<Button href="/docs" size="lg">Get Started</Button>
			<Button href="/docs/components/button" variant="tertiary" size="lg">Browse Components</Button>
		</div>

		<!-- Install command -->
		<div class="animate-fade-in-up-delay-3 relative z-10 mt-32 w-full max-w-[420px]">
			<CodeBlock code="npx nnuikit init" language="bash" />
		</div>
	</header>

	<!-- ═══ STATS ═══ -->
	<section class="relative z-10 mx-auto w-full max-w-[640px] px-24 py-32">
		<div class="grid grid-cols-2 gap-12 md:grid-cols-4">
			{#each stats as stat}
				<div class="flex flex-col items-center gap-4 rounded-12 border border-border-neutral-l2 bg-surface-statics-vv-white/60 px-16 py-20 backdrop-blur-sm">
					<span class="text-[28px] font-bold tracking-tight text-text-brand-primary">{stat.value}</span>
					<span class="text-[10px] font-medium text-text-neutral-tertiary uppercase tracking-widest">{stat.label}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ FEATURES ═══ -->
	<section class="mx-auto w-full max-w-[960px] px-24 py-80">
		<div class="mb-48 text-center">
			<h2 class="text-[32px] font-bold tracking-tight text-text-neutral-primary md:text-[40px]">Why nnuikit?</h2>
			<p class="mt-12 text-[15px] text-text-neutral-tertiary">Not another wrapper library. A different approach entirely.</p>
		</div>

		<div class="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
			{#each features as feature}
				<div class="group rounded-16 border border-border-neutral-l2 bg-surface-statics-vv-white p-24 transition-all duration-300 hover:border-border-brand-l3 hover:shadow-lg hover:shadow-surface-brand-l1/50">
					<div class="mb-16 inline-flex items-center justify-center rounded-10 bg-surface-brand-l1 p-10 transition-colors duration-300 group-hover:bg-surface-brand-l2">
						<svg class="size-20 text-text-brand-primary" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
							<path stroke-linecap="round" stroke-linejoin="round" d={feature.icon} />
						</svg>
					</div>
					<h3 class="text-[15px] font-semibold text-text-neutral-primary">{feature.title}</h3>
					<p class="mt-8 text-[13px] leading-[1.6] text-text-neutral-tertiary">{feature.desc}</p>
				</div>
			{/each}
		</div>
	</section>

	<!-- ═══ COMPONENT GRID ═══ -->
	<section class="mx-auto w-full max-w-[960px] px-24 py-80">
		<div class="mb-48 text-center">
			<h2 class="text-[32px] font-bold tracking-tight text-text-neutral-primary md:text-[40px]">
				25+ Components
				<span class="text-text-neutral-tertiary">&amp; growing</span>
			</h2>
			<p class="mt-12 text-[15px] text-text-neutral-tertiary">Each component ships with its own design tokens. From forms to overlays, everything you need.</p>
		</div>

		<div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
			{#each components as comp}
				<a
					href={comp.href}
					class="group flex flex-col rounded-12 border border-border-neutral-l2 bg-surface-statics-vv-white p-16 transition-all duration-200 hover:border-border-brand-l3 hover:shadow-md"
				>
					<span class="text-[13px] font-semibold text-text-neutral-primary group-hover:text-text-brand-primary transition-colors">{comp.name}</span>
					<span class="mt-4 text-[11px] text-text-neutral-tertiary">{comp.desc}</span>
				</a>
			{/each}
		</div>

		<div class="mt-32 text-center">
			<Button href="/docs/components" variant="tertiary" size="default">
				View all components
			</Button>
		</div>
	</section>

	<!-- ═══ HOW IT WORKS ═══ -->
	<section class="mx-auto w-full max-w-[640px] px-24 py-80">
		<div class="mb-48 text-center">
			<h2 class="text-[32px] font-bold tracking-tight text-text-neutral-primary md:text-[40px]">Get started in seconds</h2>
		</div>

		<div class="flex flex-col gap-24">
			<div class="flex items-start gap-16">
				<div class="flex size-32 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-[12px] font-bold text-text-statics-pure-white">1</div>
				<div class="flex-1">
					<h3 class="text-[14px] font-semibold text-text-neutral-primary">Initialize your project</h3>
					<div class="mt-8"><CodeBlock code="npx nnuikit init" language="bash" /></div>
				</div>
			</div>

			<div class="flex items-start gap-16">
				<div class="flex size-32 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-[12px] font-bold text-text-statics-pure-white">2</div>
				<div class="flex-1">
					<h3 class="text-[14px] font-semibold text-text-neutral-primary">Add components</h3>
					<div class="mt-8"><CodeBlock code="npx nnuikit add button checkbox input switch" language="bash" /></div>
				</div>
			</div>

			<div class="flex items-start gap-16">
				<div class="flex size-32 shrink-0 items-center justify-center rounded-full bg-surface-brand-primary text-[12px] font-bold text-text-statics-pure-white">3</div>
				<div class="flex-1">
					<h3 class="text-[14px] font-semibold text-text-neutral-primary">Use in your app</h3>
					<div class="mt-8"><CodeBlock code={`<script>\n  import { Button } from '$lib/components/ui/button';\n</script>\n\n<Button variant="primary">Click me</Button>`} language="svelte" /></div>
				</div>
			</div>
		</div>
	</section>

	<!-- ═══ CTA ═══ -->
	<section class="relative mx-auto w-full max-w-[960px] px-24 py-80">
		<div class="relative overflow-hidden rounded-24 border border-border-brand-l2 bg-surface-brand-l1 px-32 py-64 text-center">
			<div class="cta-glow pointer-events-none absolute inset-0"></div>
			<h2 class="relative z-10 text-[32px] font-bold tracking-tight text-text-brand-primary md:text-[40px]">
				Start building today
			</h2>
			<p class="relative z-10 mt-12 text-[15px] text-text-brand-tertiary">
				No lock-in. No breaking updates. Your code, your rules.
			</p>
			<div class="relative z-10 mt-32 flex flex-wrap items-center justify-center gap-12">
				<Button href="/docs" size="lg">Read the docs</Button>
				<Button href="https://github.com/harshparmar/nnuikit" variant="tertiary" size="lg">GitHub</Button>
			</div>
		</div>
	</section>

	<!-- ═══ FOOTER ═══ -->
	<footer class="mt-auto border-t border-border-neutral-l2 px-24 py-40">
		<div class="mx-auto flex max-w-[960px] flex-col items-center justify-between gap-16 md:flex-row">
			<div class="flex items-center gap-8 text-[14px] font-semibold text-text-neutral-primary">
				nnuikit
			</div>
			<div class="flex items-center gap-24 text-[13px] text-text-neutral-tertiary">
				<a href="/docs" class="hover:text-text-neutral-primary transition-colors">Docs</a>
				<a href="/docs/components" class="hover:text-text-neutral-primary transition-colors">Components</a>
				<a href="https://github.com/harshparmar/nnuikit" class="hover:text-text-neutral-primary transition-colors">GitHub</a>
			</div>
			<p class="text-[11px] text-text-neutral-tertiary">Built with Svelte 5 & Tailwind CSS v4</p>
		</div>
	</footer>
</div>

<style>
	/* ── Hero gradient orbs ── */
	.hero-glow {
		width: 800px;
		height: 600px;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
		z-index: 0;
	}

	.orb {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0.4;
		animation: float 8s ease-in-out infinite;
	}

	.orb-1 {
		width: 400px;
		height: 400px;
		background: var(--color-brand-200);
		top: -100px;
		left: 50%;
		transform: translateX(-50%);
		animation-delay: 0s;
	}

	.orb-2 {
		width: 300px;
		height: 300px;
		background: var(--color-brand-300);
		top: -50px;
		left: 20%;
		animation-delay: -3s;
		animation-duration: 10s;
	}

	.orb-3 {
		width: 250px;
		height: 250px;
		background: var(--color-brand-100);
		top: 0px;
		right: 20%;
		animation-delay: -5s;
		animation-duration: 12s;
	}

	@keyframes float {
		0%, 100% { transform: translateY(0) scale(1); }
		33% { transform: translateY(-20px) scale(1.05); }
		66% { transform: translateY(10px) scale(0.95); }
	}

	/* ── Gradient text ── */
	.hero-gradient-text {
		background: linear-gradient(135deg, var(--color-brand-700), var(--color-brand-500), var(--color-brand-800));
		background-size: 200% 200%;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradient-shift 4s ease-in-out infinite;
	}

	@keyframes gradient-shift {
		0%, 100% { background-position: 0% 50%; }
		50% { background-position: 100% 50%; }
	}

	/* ── CTA glow ── */
	.cta-glow {
		background: radial-gradient(
			ellipse at 50% 100%,
			var(--color-brand-200) 0%,
			transparent 60%
		);
		opacity: 0.5;
	}

	/* ── Fade-in animations ── */
	.animate-fade-in {
		animation: fade-in 0.6s ease-out both;
	}

	.animate-fade-in-up {
		animation: fade-in-up 0.6s ease-out both;
	}

	.animate-fade-in-up-delay {
		animation: fade-in-up 0.6s ease-out 0.15s both;
	}

	.animate-fade-in-up-delay-2 {
		animation: fade-in-up 0.6s ease-out 0.3s both;
	}

	.animate-fade-in-up-delay-3 {
		animation: fade-in-up 0.6s ease-out 0.45s both;
	}

	@keyframes fade-in {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	@keyframes fade-in-up {
		from {
			opacity: 0;
			transform: translateY(20px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
