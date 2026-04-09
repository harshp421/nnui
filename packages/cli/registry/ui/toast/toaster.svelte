<script lang="ts">
    import { toast } from "./toast-state.svelte.js";
    import Toast from "./toast.svelte";
    import { flip } from "svelte/animate";
    import { fly } from "svelte/transition";

    import type { ToastMode } from "./toast-state.svelte.js";

    interface Props {
        position?:
            | "top-left"
            | "top-center"
            | "top-right"
            | "bottom-left"
            | "bottom-center"
            | "bottom-right";
        /** Default mode for all toasts. Individual toasts can override. */
        mode?: ToastMode;
        maxToasts?: number;
        class?: string;
    }

    let {
        position = "top-right",
        mode = "inline",
        maxToasts = 4,
        class: className,
    }: Props = $props();

    // Hover state for stack expansion
    let isHovered = $state(false);

    // Position classes mapping
    const positionClasses = {
        "top-left": "top-0 left-0",
        "top-center": "top-0 left-1/2 -translate-x-1/2",
        "top-right": "top-0 right-0",
        "bottom-left": "bottom-0 left-0",
        "bottom-center": "bottom-0 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-0 right-0",
    };

    const positionClass = $derived(positionClasses[position]);

    function handleDismiss(id: string) {
        toast.dismiss(id);
    }

    function handleMouseEnter(id: string) {
        toast.pause(id);
    }

    function handleMouseLeave(id: string) {
        toast.resume(id);
    }

    // Limit visible toasts
    const visibleToasts = $derived(toast.items.slice(-maxToasts));

    
</script>

<div
    class="pointer-events-none fixed z-100 flex max-h-screen w-full flex-col-reverse gap-8 p-16 sm:flex-col md:max-w-[520px] {positionClass} {className ||
        ''}"
    aria-label="Notifications"
    role="region"
    aria-relevant="additions removals"
    onmouseenter={() => (isHovered = true)}
    onmouseleave={() => (isHovered = false)}
>
    {#each visibleToasts as item (item.id)}
       
        <div
            class="pointer-events-auto"
            animate:flip={{ duration: 200 }}
            in:fly={{
                x: position.includes("right")
                    ? 300
                    : position.includes("left")
                      ? -300
                      : 0,
                y: position.includes("top")
                    ? -100
                    : position.includes("bottom")
                      ? 100
                      : 0,
                duration: 200,
            }}
            out:fly={{
                x: position.includes("right")
                    ? 300
                    : position.includes("left")
                      ? -300
                      : 0,
                opacity: 0,
                duration: 300,
            }}
        >
            <Toast
                {...item}
                mode={item.mode ?? mode}
                onDismissClick={() => handleDismiss(item.id)}
                onMouseEnter={() => handleMouseEnter(item.id)}
                onMouseLeave={() => handleMouseLeave(item.id)}
            />
        </div>
    {/each}
</div>
