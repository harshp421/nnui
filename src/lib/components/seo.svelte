<script lang="ts">
	import { page } from '$app/state';

	interface SeoProps {
		title?: string;
		description?: string;
		keywords?: string;
		ogImage?: string;
		canonical?: string;
	}

	const SITE_NAME = 'nnuikit';
	const SITE_URL = 'https://nnuikit.vercel.app';
	const DEFAULT_DESCRIPTION = 'A design-token-driven Svelte 5 component library with 22 accessible components, 3-layer token architecture, and CLI. Copy components into your project with npx nnuikit add.';
	const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.svg`;

	let {
		title,
		description = DEFAULT_DESCRIPTION,
		keywords = 'svelte 5 ui library, svelte component library, design tokens, tailwindcss v4, shadcn svelte, CLI component library, accessible components, dark mode',
		ogImage = DEFAULT_OG_IMAGE,
		canonical
	}: SeoProps = $props();

	const fullTitle = $derived(title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Svelte 5 Component Library`);
	const pageUrl = $derived(`${SITE_URL}${page.url.pathname}`);
	const canonicalUrl = $derived(canonical || pageUrl);

	const jsonLd = $derived(JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'WebPage',
		name: fullTitle,
		description,
		url: canonicalUrl,
		isPartOf: {
			'@type': 'WebSite',
			name: SITE_NAME,
			url: SITE_URL
		},
		publisher: {
			'@type': 'Organization',
			name: SITE_NAME,
			url: SITE_URL
		}
	}));
</script>

<svelte:head>
	<title>{fullTitle}</title>
	<meta name="description" content={description} />
	<meta name="keywords" content={keywords} />
	<link rel="canonical" href={canonicalUrl} />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:title" content={fullTitle} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={ogImage} />
	<meta property="og:site_name" content={SITE_NAME} />

	<!-- Twitter -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={fullTitle} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={ogImage} />

	<!-- JSON-LD Structured Data -->
	{@html `<script type="application/ld+json">${jsonLd}</script>`}
</svelte:head>
