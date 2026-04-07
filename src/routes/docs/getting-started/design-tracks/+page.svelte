<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Input } from '$lib/components/ui/input';
	import { Switch } from '$lib/components/ui/switch';
	import { Progress } from '$lib/components/ui/progress';
	import { Badge } from '$lib/components/ui/badge';

	let activeTrack = $state<string | null>(null);

	const tracks = [
		{
			id: 'glass-track',
			name: 'Glassmorphism',
			status: 'available' as const,
			description: 'Frosted translucent surfaces with backdrop blur. Every component becomes see-through with a soft glow.',
			preview: 'Translucent surfaces, white/rgba borders, backdrop-blur on all containers.',
			className: 'glass-track'
		},
		{
			id: 'clay-track',
			name: 'Claymorphism',
			status: 'coming' as const,
			description: 'Soft, puffy 3D surfaces with inner shadows and rounded forms. Playful and approachable.',
			preview: 'Pastel surfaces, puffy outer shadows, large border-radius, no hard borders.',
			className: 'clay-track'
		},
		{
			id: 'neu-track',
			name: 'Neumorphism',
			status: 'coming' as const,
			description: 'Elements extruded from the background using inset and outer shadows on same-color surfaces.',
			preview: 'Dual shadow (light + dark), same-bg surfaces, no borders, soft depth.',
			className: 'neu-track'
		},
		{
			id: 'brutalist-track',
			name: 'Brutalist',
			status: 'coming' as const,
			description: 'Raw, bold aesthetics — no radius, thick borders, high contrast. Editorial and unapologetic.',
			preview: 'Zero radius, heavy borders, monospace type accents, stark shadows.',
			className: 'brutalist-track'
		},
		{
			id: 'skeu-track',
			name: 'Skeuomorphism',
			status: 'coming' as const,
			description: 'Textured, realistic surfaces with bevels, gradients, and layered shadows. Premium and tactile.',
			preview: 'Textured gradients, beveled edges, multi-layer shadows, small radius.',
			className: 'skeu-track'
		}
	];

	function toggleTrack(trackId: string) {
		if (activeTrack === trackId) {
			activeTrack = null;
			document.documentElement.classList.remove(trackId);
		} else {
			// Remove previous track
			if (activeTrack) {
				document.documentElement.classList.remove(activeTrack);
			}
			activeTrack = trackId;
			document.documentElement.classList.add(trackId);
		}
	}

	// Clean up on unmount
	import { onDestroy } from 'svelte';
	onDestroy(() => {
		if (activeTrack) {
			document.documentElement.classList.remove(activeTrack);
		}
	});

	const usageCode = `<!-- Add to your <html> or root layout element -->

<!-- Glass track only -->
<html class="glass-track">

<!-- Composable with color themes + dark mode -->
<html class="violet glass-track">
<html class="dark glass-track">
<html class="violet dark glass-track">`;

	const howItWorksCode = `/* Default — solid surfaces */
:root {
  --color-surface-neutral-l1: var(--color-neutral-25);  /* solid */
  --color-border-neutral-l2: var(--color-neutral-200);  /* solid */
}

/* Glass track — translucent surfaces */
.glass-track {
  --color-surface-neutral-l1: rgba(255, 255, 255, 0.45);
  --color-border-neutral-l2: rgba(255, 255, 255, 0.25);
}

/* Components auto-adapt — no code changes needed */
/* Button, Input, Dialog, Toast... all become frosted */`;

	let previewChecked = $state(false);
	let previewProgress = $state(62);
</script>

<Seo
	title="Design Tracks"
	description="Switch your entire UI's visual language with one CSS class. Glassmorphism, Claymorphism, Neumorphism, and more — every component adapts instantly."
/>

<DocsPage>
	<PageHeader
		title="Design Tracks"
		description="One class. Every component transforms. Switch your entire UI's visual language — from flat to glass to clay — without touching a single component."
	/>

	<div class="mt-8 flex flex-col gap-10">

		<!-- Intro -->
		<div class="rounded-2xl border border-border-brand-l3 bg-surface-brand-l1 px-5 py-4">
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				<strong class="text-text-brand-primary">Design Tracks</strong> go beyond color themes. While color themes change <em>what</em> colors you use, design tracks change <em>how</em> surfaces, borders, shadows, and depth look. They compose with color themes and dark mode — <code class="rounded bg-surface-neutral-l2 px-1 py-0.5 font-mono text-[10px]">class="violet dark glass-track"</code> gives you violet + dark + glassmorphism.
			</p>
		</div>

		<!-- Track cards -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Available Tracks</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
			</div>

			<div class="grid gap-3 sm:grid-cols-2">
				{#each tracks as track (track.id)}
					{@const isActive = activeTrack === track.id}
					{@const isAvailable = track.status === 'available'}
					<button
						onclick={() => isAvailable && toggleTrack(track.id)}
						disabled={!isAvailable}
						class="group relative flex flex-col gap-2.5 rounded-xl border-2 p-5 text-left transition-all
							{isActive
								? 'border-border-brand-l3 bg-surface-brand-l1 shadow-sm'
								: isAvailable
									? 'border-border-neutral-l4 hover:border-border-brand-l3 hover:bg-surface-brand-l1 hover:shadow-sm cursor-pointer'
									: 'border-border-neutral-l4 opacity-60 cursor-not-allowed'}"
					>
						<!-- Status badge -->
						<div class="flex items-center justify-between">
							<h3 class="text-sm font-semibold text-text-neutral-primary {isActive ? 'text-text-brand-primary' : ''}">
								{track.name}
							</h3>
							{#if isAvailable}
								<span class="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider
									{isActive ? 'bg-surface-brand-primary text-text-statics-pure-white' : 'bg-surface-neutral-l3 text-text-neutral-tertiary'}">
									{isActive ? 'Active' : 'Try it'}
								</span>
							{:else}
								<span class="inline-flex items-center gap-1 rounded-full bg-surface-neutral-l2 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-text-neutral-tertiary">
									Coming soon
								</span>
							{/if}
						</div>
						<p class="text-xs leading-relaxed text-text-neutral-secondary">{track.description}</p>
						<p class="text-[11px] text-text-neutral-tertiary italic">{track.preview}</p>
					</button>
				{/each}
			</div>
		</section>

		<!-- Live preview -->
		<section class="flex flex-col gap-5">
			<div class="flex items-center gap-3">
				<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Live Preview</h2>
				<div class="h-px flex-1 bg-border-neutral-l4"></div>
				{#if activeTrack}
					<span class="text-xs font-medium text-text-brand-primary">{tracks.find(t => t.id === activeTrack)?.name} active</span>
				{:else}
					<span class="text-xs text-text-neutral-tertiary">Default (flat)</span>
				{/if}
			</div>

			<!-- Preview container with gradient bg so glass blur is visible -->
			<div class="relative overflow-hidden rounded-2xl border border-border-neutral-l4">
				<!-- Colorful background for glass effect visibility -->
				<div class="absolute inset-0 -z-0">
					<div class="absolute top-0 left-1/4 h-48 w-48 rounded-full bg-brand-300/30 blur-3xl"></div>
					<div class="absolute bottom-0 right-1/4 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl"></div>
					<div class="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-300/20 blur-3xl"></div>
				</div>

				<div class="relative z-10 flex flex-col gap-5 p-6">
					<!-- Row 1: Buttons -->
					<div class="flex flex-col gap-2">
						<span class="text-[10px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">Buttons</span>
						<div class="flex flex-wrap items-center gap-2.5">
							<Button variant="primary" size="sm">Primary</Button>
							<Button variant="secondary" size="sm">Secondary</Button>
							<Button variant="tertiary" size="sm">Tertiary</Button>
							<Button variant="destructive" size="sm">Destructive</Button>
						</div>
					</div>

					<!-- Row 2: Form elements -->
					<div class="flex flex-col gap-2">
						<span class="text-[10px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">Form</span>
						<div class="flex flex-wrap items-center gap-3">
							<Input placeholder="Type something..." class="max-w-[200px]" />
							<div class="flex items-center gap-2">
								<Switch bind:checked={previewChecked} size="sm" />
								<span class="text-xs text-text-neutral-secondary">{previewChecked ? 'On' : 'Off'}</span>
							</div>
							<Checkbox />
						</div>
					</div>

					<!-- Row 3: Badges & Progress -->
					<div class="flex flex-col gap-2">
						<span class="text-[10px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">Feedback</span>
						<div class="flex flex-wrap items-center gap-2.5">
							<Badge variant="primary">Brand</Badge>
							<Badge variant="success">Success</Badge>
							<Badge variant="destructive">Error</Badge>
							<Badge variant="info">Info</Badge>
						</div>
						<Progress value={previewProgress} variant="brand" class="max-w-[300px]" />
					</div>

					<!-- Row 4: Card -->
					<div class="flex flex-col gap-2">
						<span class="text-[10px] font-semibold uppercase tracking-widest text-text-neutral-tertiary">Surface</span>
						<div class="max-w-[320px] rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-4">
							<h4 class="text-sm font-semibold text-text-neutral-primary">Card component</h4>
							<p class="mt-1 text-xs text-text-neutral-secondary">This surface adapts to the active design track. Toggle glass above to see it become translucent.</p>
						</div>
					</div>
				</div>
			</div>
		</section>

		<!-- Usage -->
		<section class="flex flex-col gap-5">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Usage</h2>
			<CodeBlock code={usageCode} language="html" title="Apply a design track" />
		</section>

		<!-- How it works -->
		<section class="flex flex-col gap-5">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">How it works</h2>
			<p class="text-sm leading-relaxed text-text-neutral-secondary">
				Design tracks override <strong class="text-text-neutral-primary">semantic tokens</strong> — the same layer that powers dark mode and color themes. When you apply <code class="rounded bg-surface-neutral-l2 px-1 py-0.5 font-mono text-[10px]">.glass-track</code>, surface tokens change from solid colors to translucent <code class="rounded bg-surface-neutral-l2 px-1 py-0.5 font-mono text-[10px]">rgba()</code> values, and the <code class="rounded bg-surface-neutral-l2 px-1 py-0.5 font-mono text-[10px]">glass:</code> Tailwind variant activates backdrop-blur on components.
			</p>
			<CodeBlock code={howItWorksCode} language="css" title="Token override pattern" />
		</section>

		<!-- Composability -->
		<section class="flex flex-col gap-5">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Composability</h2>
			<div class="grid gap-3 sm:grid-cols-3">
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-4">
					<p class="text-xs font-semibold text-text-neutral-primary">Color themes</p>
					<p class="mt-1 text-[11px] text-text-neutral-tertiary">Change brand color — green, blue, violet, pink, cyan, orange.</p>
					<code class="mt-2 block font-mono text-[10px] text-text-brand-primary">class="violet"</code>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-4">
					<p class="text-xs font-semibold text-text-neutral-primary">Dark mode</p>
					<p class="mt-1 text-[11px] text-text-neutral-tertiary">Switch light/dark — tokens remap automatically.</p>
					<code class="mt-2 block font-mono text-[10px] text-text-brand-primary">class="dark"</code>
				</div>
				<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-4">
					<p class="text-xs font-semibold text-text-neutral-primary">Design tracks</p>
					<p class="mt-1 text-[11px] text-text-neutral-tertiary">Change visual language — surfaces, depth, borders.</p>
					<code class="mt-2 block font-mono text-[10px] text-text-brand-primary">class="glass-track"</code>
				</div>
			</div>
			<p class="text-xs text-text-neutral-tertiary">
				All three compose: <code class="rounded bg-surface-neutral-l2 px-1 py-0.5 font-mono text-[10px]">class="violet dark glass-track"</code> = violet brand + dark mode + glassmorphism. Every component adapts with zero code changes.
			</p>
		</section>

		<!-- Roadmap -->
		<section class="flex flex-col gap-5">
			<h2 class="text-sm font-semibold uppercase tracking-widest text-text-neutral-tertiary">Roadmap</h2>
			<div class="flex flex-col gap-2.5">
				{#each tracks as track (track.id)}
					<div class="flex items-center gap-3 rounded-lg border border-border-neutral-l4 px-4 py-3">
						{#if track.status === 'available'}
							<svg class="size-4 shrink-0 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
						{:else}
							<svg class="size-4 shrink-0 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9" stroke-width="1.5"/></svg>
						{/if}
						<span class="text-sm font-medium text-text-neutral-primary">{track.name}</span>
						<span class="ml-auto text-[10px] font-semibold uppercase tracking-wider
							{track.status === 'available' ? 'text-green-600' : 'text-text-neutral-tertiary'}">
							{track.status === 'available' ? 'Available' : 'Coming soon'}
						</span>
					</div>
				{/each}
			</div>
		</section>

	</div>
</DocsPage>
