<script lang="ts">
  import { onMount } from "svelte";

  import IconCopy from "$lib/icons/icon-copy.svelte";
  import { toast } from "$lib/components/ui/toast/index.js";
  import { DocsPage, PageHeader } from "$lib/components/docs";

  let copiedValue = $state("");

  onMount(() => {
    refreshHexValues();
  });
  const card =
    "rounded-xl border from-card to-muted/20 backdrop-blur-sm shadow-sm";
  const buttonToggle =
    "px-4 py-2.5 text-sm rounded-lg border-2 transition-all hover:scale-[1.02] active:scale-[0.98]";

  function copyValue(value: string, label?: string) {
    console.log(value, label);
    if (colorFormat === "hex") {
      navigator.clipboard.writeText(value);
      copiedValue = value;
      toast.success(`${value} copied to clipboard`);
    } else {
      navigator.clipboard.writeText(value);
      copiedValue = value;
      toast.success(`${value} copied to clipboard`);
    }
    setTimeout(() => (copiedValue = ""), 2000);
  }

  const PALETTES = [
    { name: "Brand", key: "brand" },
    { name: "Neutral", key: "neutral" },
    { name: "Red", key: "red" },
    { name: "Orange", key: "orange" },
    { name: "Yellow", key: "yellow" },
    { name: "Green", key: "green" },
    { name: "Blue", key: "blue" },
    { name: "Cyan", key: "cyan" },
    { name: "Violet", key: "violet" },
    { name: "Purple", key: "purple" },
    { name: "Pink", key: "pink" },
  ];

  const SCALES = [25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  function getColorName(palette: string, scale: number) {
    if (palette === "green" && scale === 700) {
      return `${palette}-base-${scale}`;
    }
    return `${palette}-${scale}`;
  }

  function getColorCss(palette: string, scale: number) {
    if (palette === "green" && scale === 700) {
      return `var(--color-green-base-700)`;
    }
    return `var(--color-${palette}-${scale})`;
  }

  let colorFormat: "hex" | "var" = $state("var");
  let hexValues = $state<Record<string, string>>({});

  function rgbToHex(rgb: string) {
    const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!match) {
      const matchRgba = rgb.match(
        /^rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)$/,
      );
      if (!matchRgba) return rgb;
      const r = parseInt(matchRgba[1]);
      const g = parseInt(matchRgba[2]);
      const b = parseInt(matchRgba[3]);
      return (
        "#" +
        ((1 << 24) + (r << 16) + (g << 8) + b)
          .toString(16)
          .slice(1)
          .toUpperCase()
      );
    }
    const r = parseInt(match[1]);
    const g = parseInt(match[2]);
    const b = parseInt(match[3]);
    return (
      "#" +
      ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
    );
  }

  function getHexValue(colorVar: string) {
    if (typeof document === "undefined") return "";
    const temp = document.createElement("div");
    temp.style.color = colorVar;
    temp.style.display = "none";
    document.body.appendChild(temp);
    const computedColor = getComputedStyle(temp).color;
    document.body.removeChild(temp);
    return rgbToHex(computedColor);
  }

  function refreshHexValues() {
    const newValues: Record<string, string> = {};
    PALETTES.forEach((p) => {
      SCALES.forEach((s) => {
        const cssVar = getColorCss(p.key, s);
        newValues[`${p.key}-${s}`] = getHexValue(cssVar);
      });
    });
    hexValues = newValues;
  }
</script>

<DocsPage>
  <PageHeader
    title="Color Palette"
    description="The complete collection of color tokens available in the design system. Use the Theme Settings page to change the active brand color."
  />

  <section class="mt-8 space-y-8">
    <!-- Full Color Palette -->
    <div
      class="rounded-12 border border-border-neutral-l1 p-12 bg-surface-neutral-l1"
    >
      <p class="text-p-small text-text-neutral-secondary">
        To change the brand color theme, go to <a
          href="/docs/getting-started/theming"
          class="text-text-brand-primary font-medium underline underline-offset-4"
          >Theme Settings</a
        >.
      </p>
    </div>

    <div class="hidden">
      <!-- Old theme selector code preserved for reference -->
      <!-- <div>
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <h3
                class="text-sm font-bold uppercase tracking-widest text-muted-foreground"
              >
                Color Preset
              </h3>
              <Badge
                variant="neutral"
                border={true}
                size="sm"
                class="capitalize">{selected}</Badge
              >
            </div>
            <div class="grid grid-cols-2 gap-3">
              {#each THEMES as theme}
                <button
                  onclick={() => (selected = theme.id)}
                  class={`${buttonToggle} ${selected === theme.id ? "border-primary bg-primary/5 font-semibold text-primary" : "border-transparent bg-muted/30 hover:bg-muted/50"} flex items-center gap-3`}
                >
                  <div
                    class="size-5 rounded-full shadow-inner"
                    style="background: {theme.color}"
                  ></div>
                  <span class="truncate">{theme.name}</span>
                  {#if selected === theme.id}
                    <IconCheck className="ml-auto" />
                  {/if}
                </button>
              {/each}
            </div>
          </div>

          <div class="pt-6 border-t border-border/50">
            <div class="flex items-center justify-between mb-4">
              <h3
                class="text-sm font-bold uppercase tracking-widest text-muted-foreground"
              >
                Dark Mode
              </h3>
              <Switch bind:checked={dark} size="lg" />
            </div>
            <div
              class="p-4 rounded-xl border bg-muted/20 flex items-center gap-4 transition-colors"
              class:bg-black={dark}
              class:text-white={dark}
            >
              <div
                class="size-10 rounded-lg bg-background flex items-center justify-center shadow-sm border text-foreground"
              >
                {#if dark}
                  <IconMoon size="20" />
                {:else}
                  <IconSun size="20" />
                {/if}
              </div>
              <div>
                <p class="text-sm font-medium">Auto-Detection</p>
                <p class="text-xs text-muted-foreground">
                  Theme will adapt to system preference
                </p>
              </div>
            </div>
          </div>
        </div> -->
    </div>

    <!-- Preview Panel -->
    <!-- <div class="lg:col-span-7 space-y-6">
        <div
          class={`${card} p-8 border-primary/20 bg-primary/[0.02] relative group overflow-hidden`}
        >
         
          <div
            class="absolute -top-24 -right-24 size-64 blur-[100px] rounded-full pointer-events-none"
          ></div>

          <div class="relative space-y-8">
            <div class="flex items-center gap-3">
              <div
                class="size-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--primary-rgb),0.5)]"
              ></div>
              <h3 class="text-sm font-bold uppercase tracking-widest">
                Live Component Preview
              </h3>
            </div>

            <div class="grid md:grid-cols-1 gap-6">
              <div class="space-y-4">
                <Item.Root
                  variant="outline"
                  class="bg-background/50 border-primary/20"
                >
                  <Item.Content>
                    <Item.Header>
                      <Item.Title>Interactive Item</Item.Title>
                      <Badge variant="primary" size="sm">New</Badge>
                    </Item.Header>
                    <Item.Description
                      >Hover to see theme effects</Item.Description
                    >
                  </Item.Content>
                </Item.Root>

                <div class="flex flex-col gap-3">
                  <Button class="w-full shadow-lg shadow-primary/20"
                    >Action Primary</Button
                  >
                  <Button variant="tertiary" class="w-full"
                    >Secondary Outline</Button
                  >
                  <Button variant="tertiary" class="w-full"
                    >Ghost Interaction</Button
                  >
                </div>
              </div>

              <div class="space-y-6">
                <div class="space-y-2">
                  <label
                    for="demo"
                    class="text-[10px] font-bold text-muted-foreground uppercase ml-1"
                    >Badges & Indicators</label
                  >
                  <div class="flex flex-wrap gap-2">
                    <Badge variant="primary">Brand</Badge>
                    <Badge variant="success">Safe</Badge>
                    <Badge variant="warning">Alert</Badge>
                    <Badge variant="destructive">Risk</Badge>
                    <Badge variant="neutral" border={true}>Border</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>-->

    <!-- Theme Presets Palette -->
    <!-- <div class={`${card} p-8 space-y-6`}>
      <div class="flex items-center justify-between">
        <h3
          class="text-sm font-bold uppercase tracking-widest text-muted-foreground"
        >
          Theme Presets Palette
        </h3>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {#each THEMES as theme}
          <div
            class="group relative space-y-3 p-4 rounded-xl border bg-muted/10 hover:bg-muted/30 transition-all hover:border-primary/30"
          >
            <div
              class="h-16 w-full rounded-lg shadow-inner ring-1 ring-black/5"
              style="background: {theme.color}"
            ></div>
            <div class="space-y-1">
              <p class="text-xs font-bold">
                {theme.name}
              </p>
              <button
                onclick={() => copyValue(theme.hex)}
                class="flex items-center justify-between w-full text-[10px] text-muted-foreground font-mono hover:text-primary transition-colors"
              >
                <span>{theme.hex}</span>
                <IconCopy size="10" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    </div> -->

    <!-- Full Color Palette -->
    <div class="space-y-12 mt-36">
      <div class="flex items-center justify-between">
        <div class="space-y-4">
          <h2 class="text-xl font-bold tracking-tight">Full Color Palette</h2>
          <p class="text-sm text-text-neutral-secondary">
            The complete collection of colors available in your theme.
          </p>
        </div>
        <div
          class="flex items-center gap-2 bg-surface-neutral-l2 p-1 rounded-lg border transition-all"
        >
          <button
            onclick={() => (colorFormat = "var")}
            class={`px-3 py-1.5 text-xs rounded-md transition-all ${colorFormat === "var" ? "bg-base-pure-white shadow-sm text-text-neutral-secondary  border" : "text-text-neutral-secondary hover:text-foreground"}`}
          >
            Variable
          </button>
          <button
            onclick={() => (colorFormat = "hex")}
            class={`px-3 py-1.5 text-xs rounded-md transition-all ${colorFormat === "hex" ? "bg-base-pure-white shadow-sm border text-text-neutral-secondary" : "text-text-neutral-secondary hover:text-foreground"}`}
          >
            HEX
          </button>
        </div>
      </div>

      <div class="space-y-44">
        {#each PALETTES as palette}
          <div class="space-y-32">
            <h3
              class="text-sm font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2"
            >
              {palette.name}
            </h3>
            <div class="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-12 gap-6">
              {#each SCALES as scale}
                {@const colorVar = getColorName(palette.key, scale)}
              {@const colorCss = getColorCss(palette.key, scale)}
                <button
                  onclick={() => {
                    const hex = hexValues[`${palette.key}-${scale}`] || "";
                    copyValue(hex, `${palette.key}-${scale}`);
                  }}
                  class="group flex flex-col gap-4 text-left transition-transform hover:-translate-y-6"
                >
                  <div
                    class="h-128 w-full rounded-lg shadow-sm transition-all relative overflow-hidden"
                    style="background: {colorCss}"
                  >
                    <div
                      class="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100"
                    >
                      <div
                        class="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform"
                      >
                        <IconCopy size="20" />
                      </div>
                    </div>
                  </div>
                  <div class="px-0.5">
                    <p class="text-[10px] font-bold leading-none capitalize">
                      {scale}
                    </p>
                    <p
                      class="text-[9px] text-muted-foreground truncate font-mono"
                    >
                      {colorFormat === "var"
                        ? colorVar
                        : hexValues[`${palette.key}-${scale}`] || "Loading..."}
                    </p>
                  </div>
                </button>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <section class="mt-36 space-y-28">
    <div class="space-y-2">
      <h2 class="text-2xl font-bold tracking-tight">Best Practices</h2>
      <p class="text-sm text-muted-foreground">
        Guidelines for implementing themes effectively in your application.
      </p>
    </div>
    <div class="grid md:grid-cols-3 gap-6">
      <div
        class={`${card} p-16 space-y-16 group border-none transition-all duration-300`}
      >
        <div
          class="size-44 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /></svg
          >
        </div>
        <div class="space-y-4">
          <h4 class="font-bold text-base">Accessibility</h4>
          <p class="text-sm text-text-neutral-secondary leading-relaxed">
            Our themes are designed to pass WCAG 2.1 AA contrast ratios for
            common elements like buttons and text.
          </p>
        </div>
      </div>

      <div
        class={`${card} p-16 space-y-16 border-none group transition-all duration-300`}
      >
        <div
          class="size-44 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center ring-1 ring-emerald-500/20 group-hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path
              d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line
              x1="12"
              y1="22.08"
              x2="12"
              y2="12"
            /></svg
          >
        </div>
        <div class="space-y-2">
          <h4 class="font-bold text-base">Consistency</h4>
          <p class="text-sm text-text-neutral-secondary leading-relaxed">
            Use semantic tokens (e.g. <code
              class="bg-muted/50 px-1 rounded text-[11px]">--primary</code
            >) instead of hex values to ensure your app automatically updates.
          </p>
        </div>
      </div>

      <div
        class={`${card} p-16 space-y-16 border-none group transition-all duration-300`}
      >
        <div
          class="size-44 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center ring-1 ring-amber-500/20 group-hover:scale-110 transition-transform"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            ><path d="M12 2v4" /><path d="m16.2 7.8 2.9-2.9" /><path
              d="M18 12h4"
            /><path d="m16.2 16.2 2.9 2.9" /><path d="M12 18v4" /><path
              d="m4.9 19.1 2.9-2.9"
            /><path d="M2 12h4" /><path d="m4.9 4.9 2.9 2.9" /></svg
          >
        </div>
        <div class="space-y-2">
          <h4 class="font-bold text-base">Dark Mode</h4>
          <p class="text-sm text-text-neutral-secondary leading-relaxed">
            The <code class="bg-muted/50 px-1 rounded text-[11px]">.dark</code> class
            switches the variable mapping. All OKLCH values are optimized for low-light.
          </p>
        </div>
      </div>
    </div>
  </section>
</DocsPage>
