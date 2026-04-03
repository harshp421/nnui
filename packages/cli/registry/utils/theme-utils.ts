// ── Types ─────────────────────────────────────────────────────────

export interface BrandPalette {
	25: string; 50: string; 100: string; 200: string;
	300: string; 400: string; 500: string; 600: string;
	700: string; 800: string; 900: string; 950: string;
}

export type PaletteStep = keyof BrandPalette;

// ── Color Math ─────────────────────────────────────────────────────

function hexToRgb(hex: string): [number, number, number] {
	const c = hex.replace('#', '');
	return [parseInt(c.slice(0, 2), 16), parseInt(c.slice(2, 4), 16), parseInt(c.slice(4, 6), 16)];
}

function rgbToHex(r: number, g: number, b: number): string {
	return (
		'#' +
		[r, g, b]
			.map((v) =>
				Math.round(Math.max(0, Math.min(255, v)))
					.toString(16)
					.padStart(2, '0')
			)
			.join('')
	);
}

function tint(rgb: [number, number, number], w: number): string {
	return rgbToHex(
		rgb[0] + (255 - rgb[0]) * w,
		rgb[1] + (255 - rgb[1]) * w,
		rgb[2] + (255 - rgb[2]) * w
	);
}

function shade(rgb: [number, number, number], w: number): string {
	return rgbToHex(rgb[0] * (1 - w), rgb[1] * (1 - w), rgb[2] * (1 - w));
}

// ── Palette Generation ─────────────────────────────────────────────
// The input hex is treated as brand-700 (the primary mid-tone).
// Lighter steps (25–600) are tints toward white.
// Darker steps (800–950) are shades toward black.

export function generatePalette(hex: string): BrandPalette {
	const clean = hex.startsWith('#') ? hex : `#${hex}`;
	const rgb = hexToRgb(clean);
	return {
		25: tint(rgb, 0.97),
		50: tint(rgb, 0.93),
		100: tint(rgb, 0.86),
		200: tint(rgb, 0.75),
		300: tint(rgb, 0.60),
		400: tint(rgb, 0.43),
		500: tint(rgb, 0.25),
		600: tint(rgb, 0.10),
		700: clean,
		800: shade(rgb, 0.15),
		900: shade(rgb, 0.38),
		950: shade(rgb, 0.60)
	};
}

// ── DOM Application ────────────────────────────────────────────────

export const PALETTE_STEPS = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
const PRESET_CLASSES = ['blue', 'violet', 'pink', 'cyan', 'orange'] as const;

export function applyBrandPalette(palette: BrandPalette): void {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	PRESET_CLASSES.forEach((t) => root.classList.remove(t));
	PALETTE_STEPS.forEach((s) => root.style.setProperty(`--color-brand-${s}`, palette[s as PaletteStep]));
}

export function applyPresetTheme(theme: string): void {
	if (typeof document === 'undefined') return;
	const root = document.documentElement;
	PALETTE_STEPS.forEach((s) => root.style.removeProperty(`--color-brand-${s}`));
	PRESET_CLASSES.forEach((t) => root.classList.remove(t));
	if (theme !== 'green') root.classList.add(theme as (typeof PRESET_CLASSES)[number]);
}

// ── CSS Export ─────────────────────────────────────────────────────

export function exportCssTokens(palette: BrandPalette): string {
	const lines = PALETTE_STEPS.map((s) => `  --color-brand-${s}: ${palette[s as PaletteStep]};`);
	return `:root {\n${lines.join('\n')}\n}`;
}

// ── Image Color Extraction (Canvas API, no external deps) ──────────

export async function extractColorsFromImage(file: File): Promise<string[]> {
	return new Promise((resolve) => {
		const img = new Image();
		const url = URL.createObjectURL(file);

		img.onload = () => {
			const canvas = document.createElement('canvas');
			canvas.width = 80;
			canvas.height = 80;
			const ctx = canvas.getContext('2d');
			if (!ctx) { URL.revokeObjectURL(url); resolve(['#30a46c']); return; }

			ctx.drawImage(img, 0, 0, 80, 80);
			URL.revokeObjectURL(url);
			const data = ctx.getImageData(0, 0, 80, 80).data;

			const counts = new Map<string, number>();
			for (let i = 0; i < data.length; i += 12) {
				const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
				if (a < 128) continue;
				// Skip near-white and near-black (they're not brand colors)
				const luma = (r * 299 + g * 587 + b * 114) / 1000;
				if (luma > 235 || luma < 20) continue;
				// Quantize to 32-step buckets to reduce unique colors
				const qr = Math.round(r / 32) * 32;
				const qg = Math.round(g / 32) * 32;
				const qb = Math.round(b / 32) * 32;
				const key = rgbToHex(qr, qg, qb);
				counts.set(key, (counts.get(key) ?? 0) + 1);
			}

			const top = [...counts.entries()]
				.sort((a, b) => b[1] - a[1])
				.slice(0, 6)
				.map(([c]) => c);

			resolve(top.length > 0 ? top : ['#30a46c']);
		};

		img.onerror = () => { URL.revokeObjectURL(url); resolve(['#30a46c']); };
		img.src = url;
	});
}

// ── Gemini Flash REST API ──────────────────────────────────────────

async function callGemini(
	apiKey: string,
	prompt: string
): Promise<{ color: string; rationale: string }> {
	const res = await fetch(
		`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
		}
	);

	if (!res.ok) {
		const err = await res.json().catch(() => ({})) as { error?: { message?: string } };
		throw new Error(err?.error?.message ?? `Gemini API error (${res.status})`);
	}

	const data = await res.json() as {
		candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>
	};
	const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

	const match = text.match(/\{[\s\S]*?\}/);
	if (!match) throw new Error('Unexpected response format from AI');

	try {
		return JSON.parse(match[0]) as { color: string; rationale: string };
	} catch {
		throw new Error('Could not parse AI response as JSON');
	}
}

export function askGeminiBrandColor(
	apiKey: string,
	description: string
): Promise<{ color: string; rationale: string }> {
	return callGemini(
		apiKey,
		`You are a brand color expert. Suggest the perfect primary brand color (a mid-tone hex, works well as a button background) for this brand: "${description}". ` +
		`Respond ONLY with JSON — no markdown, no extra text: {"color":"#hexcode","rationale":"one sentence max"}`
	);
}

export function askGeminiPickFromColors(
	apiKey: string,
	colors: string[]
): Promise<{ color: string; rationale: string }> {
	return callGemini(
		apiKey,
		`You are a brand color expert. From these colors extracted from a brand logo: ${colors.join(', ')} — ` +
		`pick the single best one to use as the primary brand color for UI components (buttons, links, focus rings). ` +
		`Respond ONLY with JSON — no markdown, no extra text: {"color":"one of the listed hexes","rationale":"one sentence max"}`
	);
}
