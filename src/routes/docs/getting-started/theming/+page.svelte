<script lang="ts">
	import Seo from '$lib/components/seo.svelte';
	import { DocsPage, PageHeader, CodeBlock } from '$lib/components/docs';
	import {
		generatePalette,
		applyBrandPalette,
		applyPresetTheme,
		exportCssTokens,
		extractColorsFromImage,
		// askGeminiBrandColor,
		// askGeminiPickFromColors,
		PALETTE_STEPS,
		type BrandPalette,
		type PaletteStep
	} from '$lib/utils/theme-utils';
	import Button from '$lib/components/ui/button/button.svelte';

	// ── Builder state ──────────────────────────────────────────────────

	let activeTab = $state<'preset' | 'hex' | 'logo'>('preset');
	let activePreset = $state('green');

	// Hex tab
	let hexColor = $state('#30a46c');
	let hexInputText = $state('#30a46c');
	let hexError = $state('');

	// Logo tab
	let isDragging = $state(false);
	let logoPreviewUrl = $state<string | null>(null);
	let extractedColors = $state<string[]>([]);
	let extracting = $state(false);
	let logoSelectedIdx = $state(0);
	let logoInput = $state<HTMLInputElement | null>(null);

	// AI tab (coming soon)
	// let geminiKey = $state('');
	// let brandDesc = $state('');
	// let aiLoading = $state(false);
	// let aiError = $state('');
	// let aiResult = $state<{ color: string; rationale: string } | null>(null);

	// Current palette (always in sync with applied theme)
	let currentPalette = $state<BrandPalette>(generatePalette('#30a46c'));

	// Export
	let copied = $state(false);

	const PRESETS = [
		{ name: 'green',  label: 'Green',  hex: '#30a46c' },
		{ name: 'blue',   label: 'Blue',   hex: '#3e63dd' },
		{ name: 'violet', label: 'Violet', hex: '#6e56cf' },
		{ name: 'pink',   label: 'Pink',   hex: '#e93d82' },
		{ name: 'cyan',   label: 'Cyan',   hex: '#05a2c2' },
		{ name: 'orange', label: 'Orange', hex: '#f76808' }
	];

	// Restore saved state on mount
	import { onMount } from 'svelte';
	onMount(() => {
		// Restore theme
		const savedPreset = localStorage.getItem('nnuikit_theme_preset');
		const savedHex = localStorage.getItem('nnuikit_theme_hex');
		const savedTab = localStorage.getItem('nnuikit_theme_tab');

		if (savedTab === 'preset' || savedTab === 'hex' || savedTab === 'logo') {
			activeTab = savedTab;
		}

		if (savedPreset && savedPreset !== 'custom') {
			const preset = PRESETS.find(p => p.name === savedPreset);
			if (preset) {
				activePreset = preset.name;
				hexColor = preset.hex;
				hexInputText = preset.hex;
				currentPalette = generatePalette(preset.hex);
				applyPresetTheme(preset.name);
			}
		} else if (savedHex && /^#[0-9a-fA-F]{6}$/.test(savedHex)) {
			activePreset = 'custom';
			hexColor = savedHex;
			hexInputText = savedHex;
			currentPalette = generatePalette(savedHex);
			applyBrandPalette(currentPalette);
		}

		// Restore logo
		const savedLogo = localStorage.getItem('nnuikit_logo_image');
		const savedColors = localStorage.getItem('nnuikit_logo_colors');
		const savedIdx = localStorage.getItem('nnuikit_logo_selected');
		if (savedLogo) logoPreviewUrl = savedLogo;
		if (savedColors) {
			try { extractedColors = JSON.parse(savedColors); } catch { /* ignore */ }
		}
		if (savedIdx) logoSelectedIdx = parseInt(savedIdx, 10);
	});

	// ── Actions ────────────────────────────────────────────────────────

	function pickPreset(name: string, hex: string) {
		activePreset = name;
		currentPalette = generatePalette(hex);
		hexColor = hex;
		hexInputText = hex;
		applyPresetTheme(name);
		localStorage.setItem('nnuikit_theme_preset', name);
		localStorage.setItem('nnuikit_theme_hex', hex);
		localStorage.setItem('nnuikit_theme_tab', 'preset');
	}

	function handleHexInput(val: string) {
		hexInputText = val;
		const clean = val.startsWith('#') ? val : `#${val}`;
		if (/^#[0-9a-fA-F]{6}$/.test(clean)) {
			hexError = '';
			hexColor = clean;
			currentPalette = generatePalette(clean);
			applyBrandPalette(currentPalette);
			activePreset = 'custom';
			localStorage.setItem('nnuikit_theme_preset', 'custom');
			localStorage.setItem('nnuikit_theme_hex', clean);
			localStorage.setItem('nnuikit_theme_tab', 'hex');
		} else {
			hexError = 'Enter a valid 6-digit hex like #7c3aed';
		}
	}

	function handleColorPicker(e: Event) {
		const val = (e.target as HTMLInputElement).value;
		hexColor = val;
		hexInputText = val;
		hexError = '';
		currentPalette = generatePalette(val);
		applyBrandPalette(currentPalette);
		activePreset = 'custom';
		localStorage.setItem('nnuikit_theme_preset', 'custom');
		localStorage.setItem('nnuikit_theme_hex', val);
		localStorage.setItem('nnuikit_theme_tab', 'hex');
	}

	async function handleLogoFile(file: File) {
		if (!file.type.startsWith('image/')) return;
		extracting = true;
		extractedColors = [];

		// Convert to base64 for persistence
		const reader = new FileReader();
		reader.onload = () => {
			logoPreviewUrl = reader.result as string;
			localStorage.setItem('nnuikit_logo_image', logoPreviewUrl);
		};
		reader.readAsDataURL(file);

		extractedColors = await extractColorsFromImage(file);
		extracting = false;
		logoSelectedIdx = 0;
		localStorage.setItem('nnuikit_logo_colors', JSON.stringify(extractedColors));
		localStorage.setItem('nnuikit_logo_selected', '0');
		if (extractedColors.length > 0) applyExtracted(0);
	}

	function applyExtracted(idx: number) {
		logoSelectedIdx = idx;
		localStorage.setItem('nnuikit_logo_selected', String(idx));
		const color = extractedColors[idx];
		if (!color) return;
		currentPalette = generatePalette(color);
		hexColor = color;
		hexInputText = color;
		applyBrandPalette(currentPalette);
		activePreset = 'custom';
		localStorage.setItem('nnuikit_theme_preset', 'custom');
		localStorage.setItem('nnuikit_theme_hex', color);
		localStorage.setItem('nnuikit_theme_tab', 'logo');
	}

	function removeLogo() {
		logoPreviewUrl = null;
		extractedColors = [];
		logoSelectedIdx = 0;
		localStorage.removeItem('nnuikit_logo_image');
		localStorage.removeItem('nnuikit_logo_colors');
		localStorage.removeItem('nnuikit_logo_selected');
	}

	// AI functions (coming soon)
	// async function generateAiColor() { ... }
	// async function aiPickFromLogo() { ... }

	function copyTokens() {
		navigator.clipboard.writeText(exportCssTokens(currentPalette));
		copied = true;
		setTimeout(() => (copied = false), 2000);
	}

	function isDarkStep(step: number): boolean {
		return step >= 500;
	}
</script>

<Seo title="Theming" description="Customize your brand color with the interactive Theme Builder. Pick a preset, enter a hex, upload your logo, or use AI — then copy the generated CSS tokens into your project." />

<DocsPage>
	<PageHeader
		title="Theming"
		description="Customize your brand color interactively. Pick a preset, enter a hex value, upload your logo, or ask AI — the page updates live so you can see how every component looks."
	/>

	<div class="mt-8 flex flex-col gap-10">

		<!-- ═══════════════════════════════════════════════════════════════
		     INTERACTIVE THEME BUILDER
		     ═══════════════════════════════════════════════════════════════ -->
		<section class="flex flex-col px-16 mt-16 py-16 gap-8 rounded-2xl border border-border-neutral-l4 bg-surface-neutral-l1 p-6">

			<!-- Header -->
			<div class="py-16 px-8">
				<h2 class="text-xl font-bold tracking-tight">Theme Builder</h2>
				<p class="mt-1 text-sm text-text-neutral-tertiary">
					Pick a preset, enter a hex color, upload your logo, or use AI — the entire page updates live.
				</p>
			</div>

			<!-- Tab bar -->
			<div class="flex gap-1 my-12 rounded-xl border border-border-neutral-l4 bg-surface-statics-vv-white p-1">
				{#each [['preset','Presets'], ['hex','Color'], ['logo','Logo']] as [tab, label] (tab)}
					<Button
						onclick={() => (activeTab = tab as typeof activeTab)}
						variant={activeTab === tab ? 'primary' : 'orphan'}
						class="flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all"
					
					>
						{label}
					</Button>
				{/each}
			</div>

			<!-- ── Tab: Presets ───────────────────────────────────────────── -->
			{#if activeTab === 'preset'}
				<div class="grid grid-cols-3 gap-3 sm:grid-cols-6">
					{#each PRESETS as preset (preset.name)}
						<button
							onclick={() => pickPreset(preset.name, preset.hex)}
							class="flex flex-col items-center gap-2.5 rounded-xl border-2 py-4 transition-all
								{activePreset === preset.name
									? 'border-border-brand-l3 bg-surface-brand-l1'
									: 'border-border-neutral-l4 hover:border-border-neutral-l2 hover:bg-surface-neutral-l1'}"
						>
							<div class="size-8 rounded-full shadow-sm" style="background-color: {preset.hex}"></div>
							<span class="text-xs font-medium {activePreset === preset.name ? 'text-text-brand-primary' : 'text-text-neutral-secondary'}">
								{preset.label}
							</span>
						</button>
					{/each}
				</div>

			<!-- ── Tab: Custom Hex ────────────────────────────────────────── -->
			{:else if activeTab === 'hex'}
				<div class="flex flex-col gap-4">
					<p class="text-sm leading-relaxed text-text-neutral-secondary">
						Enter any hex — it becomes <code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-xs">brand-700</code> and a full 12-step palette is generated around it automatically.
					</p>
					<div class="flex items-center gap-3">
						<input
							type="color"
							value={hexColor}
							oninput={handleColorPicker}
							onchange={handleColorPicker}
							class="h-36 w-36 shrink-0 cursor-pointer rounded-lg border border-border-neutral-l2 p-0.5"
						/>
						<input
							type="text"
							value={hexInputText}
							oninput={(e) => handleHexInput((e.target as HTMLInputElement).value)}
							placeholder="#30a46c"
							spellcheck={false}
							class="flex-1 rounded-lg border border-border-neutral-l2 bg-surface-statics-vv-white px-3 py-2 font-mono text-sm outline-none focus:border-border-brand-l3 focus:ring-2 focus:ring-surface-brand-l2"
						/>
					</div>
					{#if hexError}
						<p class="text-xs text-red-500">{hexError}</p>
					{/if}
				</div>

			<!-- ── Tab: Logo Upload ───────────────────────────────────────── -->
			{:else if activeTab === 'logo'}
				<div class="flex flex-col gap-5">
					<p class="text-sm leading-relaxed text-text-neutral-secondary">
						Upload your brand logo — dominant colors are extracted in-browser using the Canvas API. Pick which color becomes your brand.
					</p>

					{#if logoPreviewUrl}
						<!-- Uploaded logo preview with remove -->
						<div class="flex items-start gap-4 rounded-xl border border-border-neutral-l4 bg-surface-neutral-l1 p-4">
							<img src={logoPreviewUrl} alt="Uploaded logo" class="h-44 w-auto shrink-0 rounded-lg border border-border-neutral-l4 bg-surface-statics-vv-white object-contain p-2" />
							<div class="flex flex-1 flex-col gap-1.5">
								<p class="text-sm font-medium text-text-neutral-primary">Logo uploaded</p>
								<p class="text-xs text-text-neutral-tertiary">Colors extracted from your image. Click a swatch to apply.</p>
							</div>
							<button
								onclick={removeLogo}
								class="shrink-0 rounded-lg p-1.5 text-text-neutral-tertiary transition-colors hover:bg-surface-neutral-l3 hover:text-text-neutral-primary"
								aria-label="Remove logo"
							>
								<svg class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
					{:else}
						<!-- Drop zone -->
						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<div
							role="button"
							tabindex="0"
							class="flex cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-5 py-10 transition-colors
								{isDragging ? 'border-border-brand-l3 bg-surface-brand-l1' : 'border-border-neutral-l3 hover:border-border-neutral-l2 hover:bg-surface-neutral-l1'}"
							ondragover={(e) => { e.preventDefault(); isDragging = true; }}
							ondragleave={() => (isDragging = false)}
							ondrop={(e) => { e.preventDefault(); isDragging = false; const f = e.dataTransfer?.files[0]; if (f) handleLogoFile(f); }}
							onclick={() => logoInput?.click()}
							onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') logoInput?.click(); }}
						>
							<svg class="size-9 text-text-neutral-tertiary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
							</svg>
							<p class="text-sm font-medium text-text-neutral-secondary">Drop your logo or click to upload</p>
							<p class="text-xs text-text-neutral-tertiary">PNG, JPG, SVG, WebP</p>
						</div>
					{/if}

					<input
						bind:this={logoInput}
						type="file"
						accept="image/*"
						class="hidden"
						onchange={(e) => { const f = (e.target as HTMLInputElement).files?.[0]; if (f) handleLogoFile(f); }}
					/>

					{#if extracting}
						<div class="flex items-center gap-2 text-sm text-text-neutral-tertiary">
							<svg class="size-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
							</svg>
							Extracting colors from image...
						</div>
					{:else if extractedColors.length > 0}
						<div>
							<p class="mb-2.5 text-xs font-medium text-text-neutral-secondary">Extracted colors — click to apply</p>
							<div class="flex flex-wrap gap-2.5">
								{#each extractedColors as color, i (color)}
									<button
										onclick={() => applyExtracted(i)}
										title={color}
										class="relative size-28 rounded-lg border-2 transition-all
											{logoSelectedIdx === i
												? 'scale-110 border-border-brand-l3 shadow-sm'
												: 'border-transparent hover:scale-105 hover:border-border-neutral-l2'}"
										style="background-color: {color}"
									>
										{#if logoSelectedIdx === i}
											<span class="absolute inset-0 flex items-center justify-center">
												<svg class="size-16 drop-shadow-sm" fill="none" stroke="white" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
												</svg>
											</span>
										{/if}
									</button>
								{/each}
							</div>
						</div>

						<!-- Replace logo button -->
						<button
							onclick={() => logoInput?.click()}
							class="self-start text-xs font-medium text-text-brand-primary underline underline-offset-2 hover:opacity-80"
						>
							Upload a different logo
						</button>
					{/if}
				</div>

			<!-- ── Tab: AI Assistant (coming soon) ────────────────────────── -->
			<!-- AI tab is temporarily disabled — will be re-enabled soon -->
			{/if}

			<!-- ── Palette strip (always visible) ────────────────────────── -->
			<div class="flex flex-col gap-4 py-16">
				<p class="mb-8 text-[11px] font-medium tracking-widest text-text-neutral-tertiary uppercase">
					Generated palette
				</p>
				<div class="flex overflow-hidden rounded-xl border border-border-neutral-l4">
					{#each PALETTE_STEPS as step (step)}
						<div
							class="group relative flex-1 py-56"
							style="background-color: {currentPalette[step as PaletteStep]}"
							title="{step}: {currentPalette[step as PaletteStep]}"
						>
							<span
								class="absolute bottom-1 left-0 right-0 text-center text-[9px] font-medium opacity-0 transition-opacity group-hover:opacity-80"
								style="color: {isDarkStep(step) ? '#fff' : '#000'}"
							>
								{step}
							</span>
						</div>
					{/each}
				</div>
			</div>

			

			<!-- ── Generated tokens export ───────────────────────────────── -->
			<div class="rounded-xl border border-border-neutral-l4 bg-surface-neutral-l2">
				<div class="flex items-center justify-between border-b border-border-neutral-l4 px-4 py-3">
					<p class="text-[11px] font-medium tracking-widest text-text-neutral-tertiary uppercase">
						Your CSS tokens
					</p>
					<button
						onclick={copyTokens}
						class="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors
							{copied
								? 'bg-green-100 text-green-700'
								: 'text-text-brand-primary hover:bg-surface-brand-l1'}"
					>
						{#if copied}
							<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" /></svg>
							Copied!
						{:else}
							<svg class="size-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
							Copy
						{/if}
					</button>
				</div>
				<pre class="overflow-x-auto px-4 py-3 font-mono text-xs leading-relaxed text-text-neutral-secondary">{exportCssTokens(currentPalette)}</pre>
				<div class="border-t border-border-neutral-l4 px-4 py-3 text-xs text-text-neutral-tertiary">
					Paste at the bottom of <code class="rounded bg-surface-neutral-l1 px-1 py-0.5 font-mono">src/lib/nnuikit-tokens.css</code> to override brand colors project-wide.
				</div>
			</div>

		</section>
		<!-- end Theme Builder -->

		<!-- Link to Architecture docs -->
		<a
			href="/docs/getting-started/theming/architecture"
			class="group flex items-start justify-between gap-8 rounded-2xl border border-border-neutral-l4 bg-surface-neutral-l1 px-8 py-12 transition-all hover:border-border-brand-l3 hover:bg-surface-brand-l1 hover:shadow-sm"
		>
			<div class="flex flex-col px-8 gap-8">
				<p class="text-[11px] py-4 font-semibold uppercase tracking-widest text-text-neutral-tertiary group-hover:text-text-brand-primary">
					Next
				</p>
				<h3 class="text-lg font-semibold text-text-neutral-primary group-hover:text-text-brand-primary">
					Token Architecture
				</h3>
				<p class="text-sm leading-relaxed text-text-neutral-secondary">
					Understand the 3-layer design token system — why it's structured this way, how dark mode and theme switching work without writing hundreds of overrides, and how to customize at the right level.
				</p>
			</div>
			<svg
				class="mt-1 size-5 shrink-0 text-text-neutral-tertiary transition-transform group-hover:translate-x-1 group-hover:text-text-brand-primary"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
			>
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 5l7 7-7 7" />
			</svg>
		</a>

	</div>
</DocsPage>
