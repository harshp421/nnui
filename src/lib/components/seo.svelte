<script lang="ts">
	interface SeoProps {
		title?: string;
		description?: string;
		keywords?: string;
		ogImage?: string;
		canonical?: string;
	}

	const SITE_NAME = 'nnuikit';
	const DEFAULT_DESCRIPTION = 'A design-token-driven Svelte 5 component library with a shadcn-style CLI. Copy components into your project with npx nnuikit add.';
	const DEFAULT_OG_IMAGE = '/og-image.svg';

	let {
		title,
		description = DEFAULT_DESCRIPTION,
		keywords = 'svelte, svelte 5, ui library, component library, design tokens, tailwindcss, shadcn, CLI',
		ogImage = DEFAULT_OG_IMAGE,
		canonical
	}: SeoProps = $props();

	const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Svelte 5 Component Library`;
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={SITE_NAME} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	{#if canonical}
		<link rel="canonical" href={canonical} />
	{/if}
</svelte:head>
