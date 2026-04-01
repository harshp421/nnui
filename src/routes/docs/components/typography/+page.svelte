<script lang="ts">
  import { DocsPage, PageHeader } from "$lib/components/docs";

  const sample = "The quick brown fox jumps over the lazy dog.";
  const headings = [
    {
      level: "H1",
      token: "text-h1",
      weight: "bold",
      text: "Display — Bold",
      mobile: "2.5rem / 40px",
      desktop: "4.75rem / 76px",
    },
    {
      level: "H2",
      token: "text-h2",
      weight: "semibold",
      text: "Hero — Semibold",
      mobile: "2.25rem / 36px",
      desktop: "3.75rem / 60px",
    },
    {
      level: "H3",
      token: "text-h3",
      weight: "semibold",
      text: "Title — Semibold",
      mobile: "2rem / 32px",
      desktop: "3rem / 48px",
    },
    {
      level: "H4",
      token: "text-h4",
      weight: "semibold",
      text: "Section — Semibold",
      mobile: "1.75rem / 28px",
      desktop: "2.25rem / 36px",
    },
    {
      level: "H5",
      token: "text-h5",
      weight: "medium",
      text: "Subsection — Medium",
      mobile: "1.5rem / 24px",
      desktop: "2rem / 32px",
    },
    {
      level: "H6",
      token: "text-h6",
      weight: "medium",
      text: "Label — Medium",
      mobile: "1.25rem / 20px",
      desktop: "1.5rem / 24px",
    },
  ];

  const textBlocks = [
    {
      title: "Paragraph Large",
      className:
        "text-[length:var(--text-p-large)] leading-[var(--text-p-large--line-height)]",
      token: "--text-p-large",
      mobile: "1.5rem / 24px",
      desktop: "1.25rem / 20px",
    },
    {
      title: "Paragraph Medium",
      className:
        "text-[length:var(--text-p-medium)] leading-[var(--text-p-medium--line-height)]",
      token: "--text-p-medium",
      mobile: "1.25rem / 20px",
      desktop: "1rem / 16px",
    },
    {
      title: "Paragraph Small",
      className:
        "text-[length:var(--text-p-small)] leading-[var(--text-p-small--line-height)]",
      token: "--text-p-small",
      mobile: "1rem / 16px",
      desktop: "0.875rem / 14px",
    },
    {
      title: "Paragraph X-Small",
      className:
        "text-[length:var(--text-p-xsmall)] leading-[var(--text-p-xsmall--line-height)]",
      token: "--text-p-xsmall",
      mobile: "0.875rem / 14px",
      desktop: "0.75rem / 12px",
    },
    {
      title: "Paragraph XX-Small",
      className:
        "text-[length:var(--text-p-xxsmall)] leading-[var(--text-p-xxsmall--line-height)]",
      token: "--text-p-xxsmall",
      mobile: "0.75rem / 12px",
      desktop: "0.625rem / 10px",
    },
  ];

  const overlines = [
    {
      title: "Overline Large",
      className:
        "text-[length:var(--text-overline-large)] leading-[var(--text-overline-large--line-height)] font-bold uppercase tracking-wider",
      token: "--text-overline-large",
      mobile: "0.75rem / 12px",
      desktop: "0.875rem / 14px",
    },
    {
      title: "Overline Medium",
      className:
        "text-[length:var(--text-overline-medium)] leading-[var(--text-overline-medium--line-height)] font-bold uppercase tracking-wider",
      token: "--text-overline-medium",
      mobile: "0.625rem / 10px",
      desktop: "0.75rem / 12px",
    },
    {
      title: "Overline Small",
      className:
        "text-[length:var(--text-overline-small)] leading-[var(--text-overline-small--line-height)] font-bold uppercase tracking-wider",
      token: "--text-overline-small",
      mobile: "0.625rem / 10px",
      desktop: "0.625rem / 10px",
    },
  ];
</script>

<DocsPage>
  <PageHeader
    title="Typography"
    description="Our foundational type system, designed for clarity, hierarchy, and vertical rhythm across all digital interfaces."
  />

  <div class="flex flex-col gap-32 mt-28">
    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Headings</h2>
      <div class="grid gap-8 p-8 border rounded-xl bg-card shadow-sm">
        <div class="space-y-8">
          {#each headings as h}
            <div class="group">
              <div class="flex items-baseline justify-between mb-2">
                <div class="flex items-center gap-3">
                  <span
                    class="px-2 py-0.5 rounded bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider"
                    >{h.level}</span
                  >
                  <code class="text-[10px] text-muted-foreground font-mono"
                    >{h.token}</code
                  >
                </div>
                <div
                  class="flex items-center gap-4 text-[10px] text-muted-foreground font-mono"
                >
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full bg-blue-500/50"></span>
                    <span>M: {h.mobile}</span>
                  </div>
                  <div class="flex items-center gap-1.5">
                    <span class="size-1.5 rounded-full bg-emerald-500/50"
                    ></span>
                    <span>D: {h.desktop}</span>
                  </div>
                </div>
              </div>

              {#if h.level === "H1"}
                <h1>
                  {h.text}
                </h1>
              {:else if h.level === "H2"}
                <h2>
                  {h.text}
                </h2>
              {:else if h.level === "H3"}
                <h3>
                  {h.text}
                </h3>
              {:else if h.level === "H4"}
                <h4>
                  {h.text}
                </h4>
              {:else if h.level === "H5"}
                <h5>
                  {h.text}
                </h5>
              {:else}
                <h6>
                  {h.text}
                </h6>
              {/if}
            </div>
          {/each}
        </div>
      </div>
    </section>

    <div class="grid md:grid-cols-2 gap-8">
      <section class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight">Body Text</h2>
        <div class="space-y-4 p-6 border rounded-xl bg-card">
          {#each textBlocks as block}
            <div class="space-y-2 py-4 border-b last:border-0 border-border/50">
              <div class="flex items-center justify-between">
                <div
                  class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {block.title}
                </div>
                <code class="text-[9px] text-muted-foreground/60"
                  >{block.token}</code
                >
              </div>
              <p class={block.className}>{sample}</p>
              <div
                class="flex items-center gap-4 text-[9px] text-muted-foreground font-mono"
              >
                <span class="bg-muted px-1 rounded">M: {block.mobile}</span>
                <span class="bg-muted px-1 rounded">D: {block.desktop}</span>
              </div>
            </div>
          {/each}
        </div>
      </section>

      <section class="space-y-6">
        <h2 class="text-2xl font-bold tracking-tight">Overlines</h2>
        <div class="space-y-6 p-6 border rounded-xl bg-card">
          {#each overlines as block}
            <div class="space-y-2 py-4 border-b last:border-0 border-border/50">
              <div class="flex items-center justify-between">
                <div
                  class="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"
                >
                  {block.title}
                </div>
                <code class="text-[9px] text-muted-foreground/60"
                  >{block.token}</code
                >
              </div>
              <p class={block.className}>{sample.toUpperCase()}</p>
              <div
                class="flex items-center gap-4 text-[9px] text-muted-foreground font-mono"
              >
                <span class="bg-muted px-1 rounded">M: {block.mobile}</span>
                <span class="bg-muted px-1 rounded">D: {block.desktop}</span>
              </div>
            </div>
          {/each}
        </div>
      </section>
    </div>

    <section class="space-y-12">
      <h2 class="text-2xl font-bold tracking-tight text-center">
        Utility Reference
      </h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class="p-6 border rounded-xl bg-card space-y-4">
          <h3 class="text-sm font-bold border-b pb-2">Font Weights</h3>
          <div class="space-y-2 text-sm">
            <div class="flex justify-between items-baseline">
              <span class="font-thin">Thin (100)</span><code class="text-[10px]"
                >font-thin</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-extralight">Extralight (200)</span><code
                class="text-[10px]">font-extralight</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-light">Light (300)</span><code
                class="text-[10px]">font-light</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-normal">Regular (400)</span><code
                class="text-[10px]">font-normal</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-medium">Medium (500)</span><code
                class="text-[10px]">font-medium</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-semibold">Semibold (600)</span><code
                class="text-[10px]">font-semibold</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-bold">Bold (700)</span><code class="text-[10px]"
                >font-bold</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-extrabold">Extrabold (800)</span><code
                class="text-[10px]">font-extrabold</code
              >
            </div>
            <div class="flex justify-between items-baseline">
              <span class="font-black">Black (900)</span><code
                class="text-[10px]">font-black</code
              >
            </div>
          </div>
        </div>

        <div class="p-6 border rounded-xl bg-card space-y-4">
          <h3 class="text-sm font-bold border-b pb-2">Tracking</h3>
          <div class="space-y-4 text-sm">
            <div class="space-y-1">
              <p class="tracking-tighter text-xs">{sample}</p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-tighter (-0.05em)</code
              >
            </div>
            <div class="space-y-1">
              <p class="tracking-tight text-xs">{sample}</p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-tight (-0.025em)</code
              >
            </div>
            <div class="space-y-1">
              <p class="tracking-normal text-xs">{sample}</p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-normal (0em)</code
              >
            </div>
            <div class="space-y-1">
              <p class="tracking-wide text-xs">{sample}</p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-wide (0.025em)</code
              >
            </div>
            <div class="space-y-1">
              <p class="tracking-wider text-xs">{sample}</p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-wider (0.05em)</code
              >
            </div>
            <div class="space-y-1">
              <p class="tracking-widest text-xs uppercase text-[8px]">
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >tracking-widest (0.1em)</code
              >
            </div>
          </div>
        </div>

        <div class="p-6 border rounded-xl bg-card space-y-4">
          <h3 class="text-sm font-bold border-b pb-2">Leading</h3>
          <div class="space-y-4 text-sm">
            <div class="space-y-1">
              <p class="leading-tight text-[10px] line-clamp-2">
                {sample}
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >leading-tight (1.25)</code
              >
            </div>
            <div class="space-y-1">
              <p class="leading-snug text-[10px] line-clamp-2">
                {sample}
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >leading-snug (1.375)</code
              >
            </div>
            <div class="space-y-1">
              <p class="leading-normal text-[10px] line-clamp-2">
                {sample}
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >leading-normal (1.5)</code
              >
            </div>
            <div class="space-y-1">
              <p class="leading-relaxed text-[10px] line-clamp-2">
                {sample}
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >leading-relaxed (1.625)</code
              >
            </div>
            <div class="space-y-1">
              <p class="leading-loose text-[10px] line-clamp-2">
                {sample}
                {sample}
              </p>
              <code class="text-[10px] text-muted-foreground"
                >leading-loose (2)</code
              >
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</DocsPage>
