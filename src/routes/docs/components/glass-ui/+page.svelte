<script lang="ts">
  import Seo from "$lib/components/seo.svelte";
  import { cn } from "$lib/utils/tailwindUtil";
  import {
    DocsPage,
    PageHeader,
    CodeBlock,
  } from "$lib/components/docs";

  let copiedClass = $state("");

  function copyClass(text: string) {
    navigator.clipboard.writeText(text);
    copiedClass = text;
    setTimeout(() => (copiedClass = ""), 1500);
  }

  // ─── Shadow data ──────────────────────────────────────────────────────
  const boxShadows = [
    { name: "shadow-2xs", class: "shadow-2xs", desc: "Barely visible, subtle depth" },
    { name: "shadow-xs", class: "shadow-xs", desc: "Extra small shadow" },
    { name: "shadow-sm", class: "shadow-sm", desc: "Small shadow" },
    { name: "shadow-md", class: "shadow-md", desc: "Medium — cards, dropdowns" },
    { name: "shadow-lg", class: "shadow-lg", desc: "Large — modals, panels" },
    { name: "shadow-xl", class: "shadow-xl", desc: "Extra large — floating panels" },
    { name: "shadow-2xl", class: "shadow-2xl", desc: "Maximum depth" },
  ];

  const customShadows = [
    { name: "shadow-l1", class: "shadow-l1", desc: "Level 1 — subtle elevation" },
    { name: "shadow-l2", class: "shadow-l2", desc: "Level 2 — light cards" },
    { name: "shadow-l3", class: "shadow-l3", desc: "Level 3 — dropdowns" },
    { name: "shadow-l4", class: "shadow-l4", desc: "Level 4 — modals" },
    { name: "shadow-l5", class: "shadow-l5", desc: "Level 5 — maximum depth" },
  ];

  const insetShadows = [
    { name: "inset-shadow-2xs", class: "inset-shadow-2xs", desc: "Barely inset" },
    { name: "inset-shadow-xs", class: "inset-shadow-xs", desc: "Extra small inset" },
    { name: "inset-shadow-sm", class: "inset-shadow-sm", desc: "Small inset" },
  ];

  const dropShadowsStandard = [
    { name: "drop-shadow-xs", class: "drop-shadow-xs", desc: "Extra small" },
    { name: "drop-shadow-sm", class: "drop-shadow-sm", desc: "Small" },
    { name: "drop-shadow-md", class: "drop-shadow-md", desc: "Medium" },
    { name: "drop-shadow-lg", class: "drop-shadow-lg", desc: "Large" },
    { name: "drop-shadow-xl", class: "drop-shadow-xl", desc: "Extra large" },
    { name: "drop-shadow-2xl", class: "drop-shadow-2xl", desc: "Maximum" },
  ];

  const dropShadowsCustom = [
    { name: "drop-shadow-l1", class: "drop-shadow-l1", desc: "Level 1" },
    { name: "drop-shadow-l2", class: "drop-shadow-l2", desc: "Level 2" },
    { name: "drop-shadow-l3", class: "drop-shadow-l3", desc: "Level 3" },
    { name: "drop-shadow-l4", class: "drop-shadow-l4", desc: "Level 4" },
    { name: "drop-shadow-l5", class: "drop-shadow-l5", desc: "Level 5" },
    { name: "drop-shadow-l6", class: "drop-shadow-l6", desc: "Level 6" },
    { name: "drop-shadow-l7", class: "drop-shadow-l7", desc: "Level 7" },
  ];

  const blurValues = [
    { name: "blur-xs", class: "blur-xs", px: "4px" },
    { name: "blur-sm", class: "blur-sm", px: "8px" },
    { name: "blur-md", class: "blur-md", px: "12px" },
    { name: "blur-lg", class: "blur-lg", px: "16px" },
    { name: "blur-xl", class: "blur-xl", px: "24px" },
    { name: "blur-2xl", class: "blur-2xl", px: "40px" },
    { name: "blur-3xl", class: "blur-3xl", px: "64px" },
  ];

  const backdropBlurs = [
    { name: "backdrop-blur-light", class: "backdrop-blur-light", px: "16px" },
    { name: "backdrop-blur-medium", class: "backdrop-blur-medium", px: "24px" },
    { name: "backdrop-blur-heavy", class: "backdrop-blur-heavy", px: "32px" },
    { name: "backdrop-blur-full", class: "backdrop-blur-full", px: "100px" },
  ];

  const glassSurfaces = [
    { name: "Glass Blur Surface", class: "bg-glass-blur-surface", token: "--color-glass-blur-surface" },
    { name: "Glass Surface Default", class: "bg-glass-surface-default", token: "--color-glass-surface-default" },
    { name: "Glass Surface Hover", class: "bg-glass-surface-hover", token: "--color-glass-surface-hover" },
    { name: "Glass Surface Active", class: "bg-glass-surface-active", token: "--color-glass-surface-active" },
    { name: "Glass Surface Disabled", class: "bg-glass-surface-disabled", token: "--color-glass-surface-disabled" },
  ];

  const glassBorders = [
    { name: "Blur Border", class: "border-glass-blur-border", token: "--color-glass-blur-border" },
    { name: "Border L1", class: "border-glass-border-l1", token: "--color-glass-border-l1" },
    { name: "Border L2", class: "border-glass-border-l2", token: "--color-glass-border-l2" },
    { name: "Border L3", class: "border-glass-border-l3", token: "--color-glass-border-l3" },
    { name: "Border L4", class: "border-glass-border-l4", token: "--color-glass-border-l4" },
    { name: "Border L5", class: "border-glass-border-l5", token: "--color-glass-border-l5" },
  ];

  const glassTexts = [
    { name: "Primary", class: "text-glass-text-primary", token: "--color-glass-text-primary" },
    { name: "Secondary", class: "text-glass-text-secondary", token: "--color-glass-text-secondary" },
    { name: "Tertiary", class: "text-glass-text-tertiary", token: "--color-glass-text-tertiary" },
  ];
</script>

<Seo title="Glass Ui" />

<DocsPage>
  <PageHeader
    title="Shadow & Glass"
    description="Box shadows, drop shadows, blur effects, and glassmorphism design tokens. Click any class name to copy it."
  />

  <div class="flex flex-col gap-40 mt-28">
    <!-- ════════════════════════════════════════════════════════════════════ -->
    <!-- SHADOWS -->
    <!-- ════════════════════════════════════════════════════════════════════ -->

    <!-- ── Box Shadows (Standard) ──────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Box Shadows</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Standard Tailwind box shadows. Use on cards, dropdowns, modals, and panels.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
        {#each boxShadows as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-12 p-16 rounded-12 border border-border-neutral-l1 bg-surface-neutral-l1 hover:border-border-neutral-l2 transition-all group cursor-pointer"
          >
            <div class={cn("w-full h-64 rounded-8 bg-surface-neutral-l1", s.class)}></div>
            <div class="text-center space-y-2">
              <p class={cn(
                "text-p-xsmall font-mono font-semibold transition-colors",
                copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === s.class ? "Copied!" : s.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary">{s.desc}</p>
            </div>
          </button>
        {/each}
      </div>
      <CodeBlock
        code={`/* Standard box shadows */
--shadow-2xs: 0 1px rgb(0 0 0 / 0.05);
--shadow-xs:  0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-sm:  0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md:  0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-lg:  0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
--shadow-xl:  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-2xl: 0 25px 50px -12px rgb(0 0 0 / 0.25);

/* Usage */
<div class="shadow-md">Card</div>
<div class="shadow-xl">Modal</div>`}
        language="css"
        title="shadow.css"
      />
    </section>

    <!-- ── Custom Shadows (L1–L5) ──────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Custom Shadows (L1–L5)</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Project-specific elevation levels using <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">--color-alphapure-black-100</code>. Consistent across light/dark themes.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-16">
        {#each customShadows as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-12 p-16 rounded-12 border border-border-neutral-l1 bg-surface-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-full h-56 rounded-8 bg-surface-neutral-l1", s.class)}></div>
            <div class="text-center space-y-2">
              <p class={cn(
                "text-p-xsmall font-mono font-semibold transition-colors",
                copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === s.class ? "Copied!" : s.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary">{s.desc}</p>
            </div>
          </button>
        {/each}
      </div>
      <CodeBlock
        code={`/* Custom project shadows */
--shadow-l1: 2px 2px 12px 0px var(--color-alphapure-black-100);
--shadow-l2: 2px 2px 16px 0px var(--color-alphapure-black-100);
--shadow-l3: 2px 2px 24px 0px var(--color-alphapure-black-100);
--shadow-l4: 2px 2px 32px 0px var(--color-alphapure-black-100);
--shadow-l5: 2px 2px 100px 0px var(--color-alphapure-black-100);`}
        language="css"
      />
    </section>

    <!-- ── Inset Shadows ───────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Inset Shadows</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Inner shadows for pressed/recessed effects. Great for inputs and toggle tracks.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-16">
        {#each insetShadows as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-12 p-16 rounded-12 border border-border-neutral-l1 bg-surface-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-full h-48 rounded-8 bg-surface-neutral-l2", s.class)}></div>
            <p class={cn(
              "text-p-xsmall font-mono font-semibold transition-colors",
              copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
            )}>
              {copiedClass === s.class ? "Copied!" : s.class}
            </p>
            <p class="text-p-xsmall text-text-neutral-tertiary">{s.desc}</p>
          </button>
        {/each}
      </div>
    </section>

    <!-- ── Drop Shadows (Standard) ─────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Drop Shadows</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Applied via <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">filter: drop-shadow()</code>. Works on non-rectangular shapes (icons, SVGs, rounded images).
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-16">
        {#each dropShadowsStandard as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-8 p-12 rounded-12 border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-40 h-40 rounded-full bg-surface-neutral-l1", s.class)}></div>
            <p class={cn(
              "text-p-xsmall font-mono font-semibold transition-colors text-center",
              copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
            )}>
              {copiedClass === s.class ? "Copied!" : s.name}
            </p>
          </button>
        {/each}
      </div>
    </section>

    <!-- ── Drop Shadows (Custom L1–L7) ─────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Drop Shadows (L1–L7)</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Project elevation levels for drop shadows using alpha-pure-black tokens.
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-12">
        {#each dropShadowsCustom as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-8 p-12 rounded-12 border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-48 h-48 rounded-full bg-surface-neutral-l1", s.class)}></div>
            <p class={cn(
              "text-p-xsmall font-mono font-semibold transition-colors",
              copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
            )}>
              {copiedClass === s.class ? "Copied!" : s.name}
            </p>
          </button>
        {/each}
      </div>
      <CodeBlock
        code={`/* Custom drop shadows */
--drop-shadow-l1: 0px 1px 2px var(--color-surface-alpha-pureblack-l1);
--drop-shadow-l2: 0px 1px 3px var(--color-surface-alpha-pureblack-l2);
--drop-shadow-l3: 0px 4px 8px var(--color-surface-alpha-pureblack-l3);
--drop-shadow-l4: 0px 12px 16px var(--color-surface-alpha-pureblack-l3);
--drop-shadow-l5: 0px 20px 24px var(--color-surface-alpha-pureblack-l3);
--drop-shadow-l6: 0px 24px 48px var(--color-surface-alpha-pureblack-l3);
--drop-shadow-l7: 0px 32px 64px var(--color-surface-alpha-pureblack-l3);`}
        language="css"
      />
    </section>

    <!-- ════════════════════════════════════════════════════════════════════ -->
    <!-- BLUR -->
    <!-- ════════════════════════════════════════════════════════════════════ -->

    <!-- ── Blur Values ─────────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Blur</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Direct blur on elements. Use <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">blur-{'{size}'}</code> to blur the element itself.
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-12">
        {#each blurValues as b}
          <button
            type="button"
            onclick={() => copyClass(b.class)}
            class="flex flex-col items-center gap-8 p-12 rounded-12 border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class="relative w-48 h-48 rounded-8 overflow-hidden bg-surface-neutral-l2">
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-20 h-20 bg-surface-brand-primary rounded-full"></div>
                <div class="w-14 h-14 bg-surface-destructive-primary rounded-full -ml-8 -mt-8"></div>
              </div>
              <div class={cn("absolute inset-0", b.class)}></div>
            </div>
            <div class="text-center space-y-2">
              <p class={cn(
                "text-p-xsmall font-mono font-semibold transition-colors",
                copiedClass === b.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === b.class ? "Copied!" : b.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary">{b.px}</p>
            </div>
          </button>
        {/each}
      </div>
      <CodeBlock
        code={`/* Blur values */
--blur-xs:  4px;   --blur-sm:  8px;   --blur-md:  12px;
--blur-lg:  16px;  --blur-xl:  24px;  --blur-2xl: 40px;  --blur-3xl: 64px;

/* Usage: blurs the element itself */
<div class="blur-md">Blurred content</div>`}
        language="css"
      />
    </section>

    <!-- ── Backdrop Blur ───────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Backdrop Blur</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Blurs content <strong>behind</strong> an element. The foundation of glassmorphism effects.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16">
        {#each backdropBlurs as b}
          <button
            type="button"
            onclick={() => copyClass(b.class)}
            class="relative h-[180px] rounded-12 overflow-hidden border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <!-- Background shapes to demonstrate blur -->
            <div class="absolute inset-0 flex items-center justify-center bg-surface-neutral-l2">
              <div class="w-56 h-56 bg-surface-brand-primary rounded-full -mr-20 -mb-16 opacity-80"></div>
              <div class="w-40 h-40 bg-surface-destructive-primary rounded-full -ml-16 -mt-12 opacity-80"></div>
            </div>
            <!-- Blur overlay -->
            <div class={cn("absolute inset-0 flex flex-col items-center justify-center bg-glass-blur-surface", b.class)}>
              <p class={cn(
                "text-p-xsmall font-mono font-semibold px-8 py-4 rounded-6 bg-surface-neutral-l1/80 transition-colors",
                copiedClass === b.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === b.class ? "Copied!" : b.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary mt-4">{b.px}</p>
            </div>
          </button>
        {/each}
      </div>
      <CodeBlock
        code={`/* Backdrop blur tokens */
--backdrop-filter-blur-light:  blur(16px);
--backdrop-filter-blur-medium: blur(24px);
--backdrop-filter-blur-heavy:  blur(32px);
--backdrop-filter-blur-full:   blur(100px);

/* Usage: blurs what's behind the element */
<div class="backdrop-blur-light bg-glass-blur-surface">
  Glass overlay
</div>`}
        language="css"
      />
    </section>

    <!-- ════════════════════════════════════════════════════════════════════ -->
    <!-- GLASS -->
    <!-- ════════════════════════════════════════════════════════════════════ -->

    <!-- ── Glass Card Demo ─────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Glass Card</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Combine <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">bg-glass-blur-surface</code> +
          <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">backdrop-blur-light</code> +
          <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">border-glass-blur-border</code> +
          <code class="text-p-xsmall px-4 py-2 rounded-4 bg-surface-neutral-l2 text-text-neutral-primary font-mono">noise</code> for the full glass effect.
        </p>
      </div>
      <div class="relative rounded-16 overflow-hidden p-32 min-h-[280px] flex items-center justify-center"
        style="background: linear-gradient(135deg, var(--color-surface-brand-primary) 0%, var(--color-surface-brand-l2) 50%, var(--color-surface-info-primary) 100%);"
      >
        <!-- Background decoration -->
        <div class="absolute w-80 h-80 rounded-full bg-surface-warning-primary/50 top-12 left-24 animate-blob"></div>
        <div class="absolute w-64 h-64 rounded-full bg-surface-destructive-primary/40 bottom-16 right-32 animate-blob animation-delay-2000"></div>

        <!-- Glass card -->
        <div class="relative z-10 bg-glass-blur-surface border border-glass-blur-border backdrop-blur-light p-24 rounded-16 max-w-sm shadow-l3 noise">
          <h3 class="text-lg font-semibold text-glass-text-primary mb-4">Glass Card</h3>
          <p class="text-p-small text-glass-text-secondary mb-16">
            This card uses backdrop-filter to blur the vibrant content behind it, with a noise overlay for texture.
          </p>
          <div class="flex gap-8">
            <button class="px-12 py-6 rounded-8 bg-glass-button-default text-glass-text-primary text-p-xsmall font-medium border border-glass-border-l2 hover:bg-glass-button-hover transition-colors">
              Secondary
            </button>
            <button class="px-12 py-6 rounded-8 bg-glass-button-brand-active text-text-statics-pure-white text-p-xsmall font-medium hover:opacity-90 transition-opacity">
              Primary
            </button>
          </div>
        </div>
      </div>
      <CodeBlock
        code={`<div class="bg-glass-blur-surface border border-glass-blur-border
  backdrop-blur-light p-24 rounded-16 shadow-l3 noise">
  <h3 class="text-glass-text-primary">Glass Card</h3>
  <p class="text-glass-text-secondary">Content here...</p>
  <button class="bg-glass-button-default border border-glass-border-l2
    text-glass-text-primary hover:bg-glass-button-hover">
    Action
  </button>
</div>`}
        language="html"
        title="Glass Card"
      />
    </section>

    <!-- ── Glass Surfaces ──────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Glass Surfaces</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Background tokens for glass layers and states.
        </p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-12">
        {#each glassSurfaces as s}
          <button
            type="button"
            onclick={() => copyClass(s.class)}
            class="flex flex-col items-center gap-8 p-12 rounded-12 border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-full h-48 rounded-8 border border-glass-blur-border", s.class)}></div>
            <div class="text-center space-y-2">
              <p class={cn(
                "text-p-xsmall font-mono font-semibold transition-colors",
                copiedClass === s.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === s.class ? "Copied!" : s.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary">{s.name}</p>
            </div>
          </button>
        {/each}
      </div>
    </section>

    <!-- ── Glass Borders ───────────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Glass Borders</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Border tokens ranging from subtle (L1) to prominent (L5).
        </p>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-12">
        {#each glassBorders as b}
          <button
            type="button"
            onclick={() => copyClass(b.class)}
            class="flex flex-col items-center gap-8 p-12 rounded-12 border border-border-neutral-l1 hover:border-border-neutral-l2 transition-all cursor-pointer"
          >
            <div class={cn("w-full h-40 rounded-8 border-2 bg-glass-blur-surface", b.class)}></div>
            <div class="text-center space-y-2">
              <p class={cn(
                "text-p-xsmall font-mono font-semibold transition-colors",
                copiedClass === b.class ? "text-text-success-primary" : "text-text-neutral-primary"
              )}>
                {copiedClass === b.class ? "Copied!" : b.class}
              </p>
              <p class="text-p-xsmall text-text-neutral-tertiary">{b.name}</p>
            </div>
          </button>
        {/each}
      </div>
    </section>

    <!-- ── Glass Text Colors ───────────────────────────────────────────── -->
    <section class="space-y-12">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight text-text-neutral-primary">Glass Text Colors</h2>
        <p class="text-p-small text-text-neutral-secondary">
          Text color tokens for glass surfaces — primary, secondary, and tertiary hierarchy.
        </p>
      </div>
      <div class="relative rounded-12 overflow-hidden p-24"
        style="background: linear-gradient(135deg, var(--color-surface-brand-primary), var(--color-surface-info-primary));"
      >
        <div class="relative z-10 bg-glass-blur-surface backdrop-blur-light border border-glass-blur-border rounded-12 p-20 noise space-y-12">
          {#each glassTexts as t}
            <button
              type="button"
              onclick={() => copyClass(t.class)}
              class="w-full flex items-center justify-between p-8 rounded-8 hover:bg-glass-surface-hover transition-colors cursor-pointer"
            >
              <span class={cn("text-p-small font-semibold", t.class)}>
                {t.name} — The quick brown fox jumps over the lazy dog
              </span>
              <span class={cn(
                "text-p-xsmall font-mono shrink-0 ml-12 transition-colors",
                copiedClass === t.class ? "text-text-success-primary" : "text-glass-text-tertiary"
              )}>
                {copiedClass === t.class ? "Copied!" : t.class}
              </span>
            </button>
          {/each}
        </div>
      </div>
    </section>

    <!-- ── Quick Reference Table ───────────────────────────────────────── -->
    <section class="space-y-12">
      <h2 class="py-8 text-2xl font-bold tracking-tight border-b border-border-neutral-l1 text-text-neutral-primary">
        Quick Reference
      </h2>
      <div class="rounded-12 border border-border-neutral-l1 overflow-hidden">
        <table class="w-full text-p-xsmall">
          <thead>
            <tr class="bg-surface-neutral-l2 text-text-neutral-secondary">
              <th class="text-left px-12 py-8 font-semibold">Category</th>
              <th class="text-left px-12 py-8 font-semibold">Classes</th>
              <th class="text-left px-12 py-8 font-semibold">Use Case</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-border-neutral-l1">
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Box Shadow</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">shadow-{'{2xs|xs|sm|md|lg|xl|2xl}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Cards, modals, panels</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Custom Shadow</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">shadow-{'{l1|l2|l3|l4|l5}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Theme-aware elevation</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Inset Shadow</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">inset-shadow-{'{2xs|xs|sm}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Pressed/recessed inputs</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Drop Shadow</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">drop-shadow-{'{xs…2xl}'}, drop-shadow-{'{l1…l7}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Icons, SVGs, non-rectangular</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Blur</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">blur-{'{xs|sm|md|lg|xl|2xl|3xl}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Blur element itself</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Backdrop Blur</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">backdrop-blur-{'{light|medium|heavy|full}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Glass overlays</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Glass Surface</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">bg-glass-{'{blur-surface|surface-default|…}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Glassmorphism backgrounds</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Glass Border</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">border-glass-{'{blur-border|border-l1…l5}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Glass panel borders</td>
            </tr>
            <tr>
              <td class="px-12 py-8 font-medium text-text-neutral-primary">Glass Text</td>
              <td class="px-12 py-8 font-mono text-text-neutral-secondary">text-glass-text-{'{primary|secondary|tertiary}'}</td>
              <td class="px-12 py-8 text-text-neutral-tertiary">Text on glass surfaces</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</DocsPage>

<style>
  @keyframes blob {
    0% { transform: translate(0px, 0px) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
    100% { transform: translate(0px, 0px) scale(1); }
  }
  .animate-blob { animation: blob 7s infinite; }
  .animation-delay-2000 { animation-delay: 2s; }
</style>
