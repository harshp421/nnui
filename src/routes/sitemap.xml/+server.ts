const SITE_URL = 'https://nnuikit.dev';

const pages = [
	'/',
	'/docs',
	'/docs/getting-started/installation',
	'/docs/getting-started/theming',
	'/docs/components/button',
	'/docs/components/checkbox',
	'/docs/components/input-inputgroup',
	'/docs/components/textarea',
	'/docs/components/switch',
	'/docs/components/radio-group',
	'/docs/components/progress',
	'/docs/components/skeleton'
];

export const prerender = true;

export function GET() {
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url>
    <loc>${SITE_URL}${page}</loc>
    <changefreq>${page === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${page === '/' ? '1.0' : page.includes('getting-started') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
