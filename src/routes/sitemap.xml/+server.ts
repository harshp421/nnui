const SITE_URL = 'https://nnuikit.com';

const pages = [
	{ path: '/', priority: '1.0', changefreq: 'weekly' },
	{ path: '/docs', priority: '0.9', changefreq: 'weekly' },
	{ path: '/docs/getting-started/installation', priority: '0.9', changefreq: 'monthly' },
	{ path: '/docs/getting-started/colors', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/getting-started/theming', priority: '0.9', changefreq: 'monthly' },
	{ path: '/docs/getting-started/theming/architecture', priority: '0.8', changefreq: 'monthly' },
	{ path: '/docs/getting-started/design-tracks', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/getting-started/typography', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components', priority: '0.9', changefreq: 'weekly' },
	{ path: '/docs/components/button', priority: '0.8', changefreq: 'monthly' },
	{ path: '/docs/components/checkbox', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/input-inputgroup', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/textarea', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/radio-group', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/switch', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/range-selector', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/file-uploader', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/avatar', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/badge', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/breadcrumb', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/item', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/tabs', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/typography', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/dialog', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/dropdown-menu', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/sheet', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/toast', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/tooltip', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/progress', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/skeleton', priority: '0.7', changefreq: 'monthly' },
	{ path: '/docs/components/glass-ui', priority: '0.6', changefreq: 'monthly' },
	{ path: '/docs/components/mode-switch', priority: '0.6', changefreq: 'monthly' },
];

export const prerender = true;

export function GET() {
	const today = new Date().toISOString().split('T')[0];
	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url>
    <loc>${SITE_URL}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
}
