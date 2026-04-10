<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu";
  import IconDevices from "$lib/icons/icon-devices.svelte";
  import IconDotsVertical from "$lib/icons/icon-dots-vertical.svelte";
  import IconFocus2 from "$lib/icons/icon-focus2.svelte";
  import IconChevronDown from "$lib/icons/icon-chevron-down.svelte";
  import {
    CodeBlock,
    ComponentPreview,
    ComponentSource,
    DocsPage,
    PageHeader,
    PropsTable,
  } from "$lib/components/docs";
  import IconIndicator from "$lib/components/ui/icon-indicator/icon-indicator.svelte";

  const installationCode = `npx nnuikit add dropdown-menu

import * as DropdownMenu from "$lib/components/ui/dropdown-menu";`;

  const basicUsageCode = `
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="tertiary">Open Menu</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Settings</DropdownMenu.Item>
      <DropdownMenu.Item>Keyboard shortcuts</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Email</DropdownMenu.Item>
          <DropdownMenu.Item>Message</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>New Team</DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>Log out</DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;

  const checkboxCode = `let showStatusBar = $state(true);
let showActivityBar = $state(false);
let showPanel = $state(false);

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="tertiary">View Options</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-256">
    <DropdownMenu.Label>Appearance</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
      Status Bar
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
      Activity Bar
    </DropdownMenu.CheckboxItem>
    <DropdownMenu.CheckboxItem bind:checked={showPanel}>
      Panel
    </DropdownMenu.CheckboxItem>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;

  const radioCode = `let position = $state("bottom");

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="tertiary">Position: {position}</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
    <DropdownMenu.Separator />
    <DropdownMenu.RadioGroup bind:value={position}>
      <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
      <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
    </DropdownMenu.RadioGroup>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;

  const preventCloseCode = `<!-- Use onSelect with e.preventDefault() to keep the menu open -->
<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    <Button variant="tertiary">Actions</Button>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Label>Actions</DropdownMenu.Label>
    <DropdownMenu.Separator />

    <!-- This item will NOT close the dropdown -->
    <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
      Bookmark (stays open)
    </DropdownMenu.Item>

    <!-- This item will NOT close the dropdown -->
    <DropdownMenu.Item onSelect={(e) => e.preventDefault()}>
      Add to favorites (stays open)
    </DropdownMenu.Item>

    <DropdownMenu.Separator />

    <!-- This item WILL close the dropdown (default) -->
    <DropdownMenu.Item>
      Delete (closes menu)
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>`;

  let bookmarked = $state(false);
  let favorited = $state(false);

  const rootProps = [
    {
      name: "open",
      type: "boolean",
      default: "false",
      description: "The controlled open state of the dropdown menu.",
    },
    {
      name: "dir",
      type: "'ltr' | 'rtl'",
      default: "'ltr'",
      description: "The reading direction of the menu.",
    },
    {
      name: "preventScroll",
      type: "boolean",
      default: "false",
      description: "Whether to prevent body scrolling when menu is open.",
    },
  ];

  const contentProps = [
    {
      name: "align",
      type: "'start' | 'center' | 'end'",
      default: "'center'",
      description: "Alignment of the content relative to the trigger.",
    },
    {
      name: "side",
      type: "'top' | 'right' | 'bottom' | 'left'",
      default: "'bottom'",
      description: "The side of the trigger the content should appear on.",
    },
    {
      name: "sideOffset",
      type: "number",
      default: "4",
      description: "The distance in pixels from the trigger.",
    },
  ];

  let showStatusBar = $state(true);
  let showActivityBar = $state(false);
  let showPanel = $state(false);
  let position = $state("bottom");

  const devices = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: "Device Name",
    type: "Device Type",
  }));

  const deviceListCode = `
  //put this on the script tag
    const devices = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    name: "Device Name",
    type: "Device Type",
  }));
  <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">
                  <IconDevices size="16" />
                  All Devices
                  <IconChevronDown size="14" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                class="min-w-sm p-0 rounded-xl overflow-visible"
                align="start"
              >
                <!-- Header with sub-menu filters -->
                <div
                  class="flex items-center justify-between px-4 py-3 border-b border-border-neutral-l4"
                >
                  <span class="text-sm font-medium text-text-neutral-primary"
                    >09 Devices</span
                  >
                  <div class="flex items-center gap-1">
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger
                        class="flex items-center gap-1 text-sm text-text-neutral-secondary px-2 py-1 rounded-md hover:bg-surface-neutral-l2"
                      >
                        Type <IconChevronDown className="size-16" />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>All Types</DropdownMenu.Item>
                        <DropdownMenu.Item>Sensor</DropdownMenu.Item>
                        <DropdownMenu.Item>Monitor</DropdownMenu.Item>
                        <DropdownMenu.Item>Gateway</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger
                        class="flex items-center gap-1 text-sm text-text-neutral-secondary px-2 py-1 rounded-md hover:bg-surface-neutral-l2"
                      >
                        Location <IconChevronDown className="size-16" />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>All Locations</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 1</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 2</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 3</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </div>
                </div>

                <!-- Device List -->
                <div class="max-h-256 overflow-y-auto py-1">
                  {#each devices as device (device.id)}
                    <div
                      class="flex items-center gap-3 px-4 py-2.5 hover:bg-alpha-viceversa-black-25 hover:text-glass-text-primary"
                    >
                      <IconIndicator
                        rounded="semi-rounded"
                        className="bg-alpha-viceversa-black-25"
                      >
                        <IconDevices />
                      </IconIndicator>

                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-text-neutral-primary leading-tight"
                        >
                          {device.name}
                        </p>
                        <p
                          class="text-xs text-text-neutral-tertiary leading-tight mt-0.5"
                        >
                          {device.type}
                        </p>
                      </div>
                      <button
                        class="shrink-0 p-1.5 rounded-md text-text-neutral-tertiary hover:text-text-neutral-primary hover:bg-surface-neutral-l2 transition-colors"
                        onclick={(e) => e.stopPropagation()}
                      >
                        <IconFocus2 size="16" />
                      </button>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                          class="shrink-0 p-1.5 rounded-md text-text-neutral-tertiary hover:text-text-neutral-primary hover:bg-surface-neutral-l2"
                        >
                          <IconDotsVertical className="size-16" />
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>View Details</DropdownMenu.Item>
                          <DropdownMenu.Item>Edit Device</DropdownMenu.Item>
                          <DropdownMenu.Item>Configure</DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>Remove</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    </div>
                  {/each}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>`;
</script>

<DocsPage>
  <PageHeader
    title="Dropdown Menu"
    description="Displays a menu to the user — such as a set of actions or functions — triggered by a button."
  />

  <div class="flex flex-col gap-32 mt-28">
    <div>
      <ComponentSource
        name="dropdown-menu"
        path="src/lib/components/ui/dropdown-menu"
      />
    </div>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">Installation</h2>
      <CodeBlock
        code={installationCode}
        language="typescript"
        title="Installation"
      />
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Basic Usage</h2>
        <p class="text-text-neutral-secondary">
          Basic dropdown with groups, items, separators, and shortcuts.
        </p>
      </div>
      <ComponentPreview code={basicUsageCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-20 w-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">Open Menu</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                class="w-(--bits-dropdown-menu-anchor-width) min-w-3xs rounded-lg"
              >
                <DropdownMenu.Group>
                  <DropdownMenu.Label>My Account</DropdownMenu.Label>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Item>Profile</DropdownMenu.Item>
                  <DropdownMenu.Item>Billing</DropdownMenu.Item>
                  <DropdownMenu.Item>Settings</DropdownMenu.Item>
                  <DropdownMenu.Item>
                    <span>Keyboard shortcuts</span>
                    <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Group>
                  <DropdownMenu.Item>Team</DropdownMenu.Item>
                  <DropdownMenu.Sub>
                    <DropdownMenu.SubTrigger
                      >Invite users</DropdownMenu.SubTrigger
                    >
                    <DropdownMenu.SubContent>
                      <DropdownMenu.Item>Email</DropdownMenu.Item>
                      <DropdownMenu.Item>Message</DropdownMenu.Item>
                      <DropdownMenu.Separator />
                      <DropdownMenu.Item>More...</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                  </DropdownMenu.Sub>
                  <DropdownMenu.Item>New Team</DropdownMenu.Item>
                </DropdownMenu.Group>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>Log out</DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Checkboxes</h2>
        <p class="text-text-neutral-secondary">
          Use <code>CheckboxItem</code> for items that can be toggled.
        </p>
      </div>
      <ComponentPreview code={checkboxCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-20 w-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">View Options</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content class="w-256">
                <DropdownMenu.Label>Appearance</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
                  Status Bar
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem
                  bind:checked={showActivityBar}
                  disabled
                >
                  Activity Bar
                </DropdownMenu.CheckboxItem>
                <DropdownMenu.CheckboxItem bind:checked={showPanel}>
                  Panel
                </DropdownMenu.CheckboxItem>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Radio Group</h2>
        <p class="text-text-neutral-secondary">
          Use <code>RadioGroup</code> and <code>RadioItem</code> for mutually exclusive
          options.
        </p>
      </div>
      <ComponentPreview code={radioCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-20 w-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">Position: {position}</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content class="w-56">
                <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.RadioGroup bind:value={position}>
                  <DropdownMenu.RadioItem value="top"
                    >Top</DropdownMenu.RadioItem
                  >
                  <DropdownMenu.RadioItem value="bottom"
                    >Bottom</DropdownMenu.RadioItem
                  >
                  <DropdownMenu.RadioItem value="right"
                    >Right</DropdownMenu.RadioItem
                  >
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- PREVENT CLOSE EXAMPLE -->
    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Prevent Close</h2>
        <p class="text-text-neutral-secondary">
          Use <code>onSelect=&#123;(e) =&gt; e.preventDefault()&#125;</code> on an item to prevent the dropdown from closing when clicked.
        </p>
      </div>
      <ComponentPreview code={preventCloseCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-20 w-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">Actions</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content class="w-256">
                <DropdownMenu.Label>Actions</DropdownMenu.Label>
                <DropdownMenu.Separator />
                <DropdownMenu.Item
                  onSelect={(e: Event) => {
                    e.preventDefault();
                    bookmarked = !bookmarked;
                  }}
                >
                  {bookmarked ? "Bookmarked" : "Bookmark"} (stays open)
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={(e: Event) => {
                    e.preventDefault();
                    favorited = !favorited;
                  }}
                >
                  {favorited ? "Favorited" : "Add to favorites"} (stays open)
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item>
                  Delete (closes menu)
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <!-- DEVICE LIST EXAMPLE -->
    <section class="space-y-8">
      <div class="space-y-4">
        <h2 class="text-2xl font-bold tracking-tight">Device List</h2>
        <p class="text-text-neutral-secondary">
          A device list panel inside a dropdown, triggered by a single button.
          Uses sub-menus for Type and Location filters.
        </p>
      </div>
      <ComponentPreview code={deviceListCode}>
        {#snippet preview()}
          <div class="flex items-center justify-center p-20 w-full">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button variant="tertiary">
                  <IconDevices size="16" />
                  All Devices
                  <IconChevronDown size="14" />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content
                class="min-w-sm p-0 rounded-xl overflow-visible"
                align="start"
              >
                <!-- Header with sub-menu filters -->
                <div
                  class="flex items-center justify-between px-4 py-3 border-b border-border-neutral-l4"
                >
                  <span class="text-sm font-medium text-text-neutral-primary"
                    >09 Devices</span
                  >
                  <div class="flex items-center gap-1">
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger
                        class="flex items-center gap-1 text-sm text-text-neutral-secondary px-2 py-1 rounded-md hover:bg-surface-neutral-l2"
                      >
                        Type <IconChevronDown className="size-16" />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>All Types</DropdownMenu.Item>
                        <DropdownMenu.Item>Sensor</DropdownMenu.Item>
                        <DropdownMenu.Item>Monitor</DropdownMenu.Item>
                        <DropdownMenu.Item>Gateway</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger
                        class="flex items-center gap-1 text-sm text-text-neutral-secondary px-2 py-1 rounded-md hover:bg-surface-neutral-l2"
                      >
                        Location <IconChevronDown className="size-16" />
                      </DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>All Locations</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 1</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 2</DropdownMenu.Item>
                        <DropdownMenu.Item>Floor 3</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>
                  </div>
                </div>

                <!-- Device List -->
                <div class="max-h-256 overflow-y-auto py-1">
                  {#each devices as device (device.id)}
                    <div
                      class="flex items-center gap-3 px-4 py-2.5 hover:bg-alpha-viceversa-black-25 hover:text-glass-text-primary"
                    >
                      <IconIndicator
                        rounded="semi-rounded"
                        className="bg-alpha-viceversa-black-25"
                      >
                        <IconDevices />
                      </IconIndicator>

                      <div class="flex-1 min-w-0">
                        <p
                          class="text-sm font-medium text-text-neutral-primary leading-tight"
                        >
                          {device.name}
                        </p>
                        <p
                          class="text-xs text-text-neutral-tertiary leading-tight mt-0.5"
                        >
                          {device.type}
                        </p>
                      </div>
                      <button
                        class="shrink-0 p-1.5 rounded-md text-text-neutral-tertiary hover:text-text-neutral-primary hover:bg-surface-neutral-l2 transition-colors"
                        onclick={(e) => e.stopPropagation()}
                      >
                        <IconFocus2 size="16" />
                      </button>
                      <DropdownMenu.Sub>
                        <DropdownMenu.SubTrigger
                          class="shrink-0 p-1.5 rounded-md text-text-neutral-tertiary hover:text-text-neutral-primary hover:bg-surface-neutral-l2"
                        >
                          <IconDotsVertical className="size-16" />
                        </DropdownMenu.SubTrigger>
                        <DropdownMenu.SubContent>
                          <DropdownMenu.Item>View Details</DropdownMenu.Item>
                          <DropdownMenu.Item>Edit Device</DropdownMenu.Item>
                          <DropdownMenu.Item>Configure</DropdownMenu.Item>
                          <DropdownMenu.Separator />
                          <DropdownMenu.Item>Remove</DropdownMenu.Item>
                        </DropdownMenu.SubContent>
                      </DropdownMenu.Sub>
                    </div>
                  {/each}
                </div>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </div>
        {/snippet}
      </ComponentPreview>
    </section>

    <section class="space-y-8">
      <h2 class="text-2xl font-bold tracking-tight">API Reference</h2>

      <div class="space-y-20">
        <div class="space-y-4">
          <h3 class="text-xl font-semibold">DropdownMenu.Root</h3>
          <p class="text-text-neutral-secondary text-sm">
            The main container for the dropdown.
          </p>
          <PropsTable props={rootProps} />
        </div>

        <div class="space-y-4">
          <h3 class="text-xl font-semibold">DropdownMenu.Content</h3>
          <p class="text-text-neutral-secondary text-sm">
            The popup content component.
          </p>
          <PropsTable props={contentProps} />
        </div>
      </div>
    </section>
  </div>
</DocsPage>
