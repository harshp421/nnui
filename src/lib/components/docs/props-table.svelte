<script lang="ts">
	export type PropDef = {
		name: string;
		type: string;
		default?: string;
		description?: string;
		required?: boolean;
	};

	let { props } = $props<{
		props: PropDef[];
	}>();
</script>

<div class="w-full overflow-x-auto rounded-xl border border-border-neutral-l4">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-border-neutral-l4 bg-surface-neutral-l2">
				<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Prop</th>
				<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Type</th>
				<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Default</th>
				<th class="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-neutral-tertiary">Description</th>
			</tr>
		</thead>
		<tbody class="divide-y divide-border-neutral-l4">
			{#each props as prop (prop.name)}
				<tr class="transition-colors hover:bg-surface-neutral-l1">
					<td class="px-5 py-3 align-top">
						<code class="font-mono text-xs font-semibold text-text-brand-primary">{prop.name}</code>
						{#if prop.required}
							<span class="ml-1 text-surface-destructive-primary text-xs">*</span>
						{/if}
					</td>
					<td class="px-5 py-3 align-top">
						<code class="rounded bg-surface-neutral-l2 px-1.5 py-0.5 font-mono text-[11px] text-text-neutral-secondary">
							{prop.type}
						</code>
					</td>
					<td class="px-5 py-3 align-top font-mono text-xs text-text-neutral-tertiary">
						{prop.default || '-'}
					</td>
					<td class="px-5 py-3 align-top text-xs leading-relaxed text-text-neutral-secondary">
						{prop.description || '-'}
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
