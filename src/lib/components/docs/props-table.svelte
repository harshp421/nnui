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

<div
	class="my-6 w-full overflow-y-auto rounded-lg border border-border-neutral-l4 bg-surface-neutral-l2"
>
	<table class="w-full caption-bottom text-sm">
		<thead class="[&_tr]:border-b">
			<tr
				class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-border-neutral-l4 text-lg transition-colors"
			>
				<th class="text-muted-foreground px-4 text-left align-middle text-lg font-medium">Prop</th>
				<th class="text-muted-foreground px-4 py-4 text-left align-middle text-lg font-medium"
					>Type</th
				>
				<th class="text-muted-foreground px-4 py-4 text-left align-middle text-lg font-medium"
					>Default</th
				>
				<th class="text-muted-foreground px-4 py-4 text-left align-middle text-lg font-medium"
					>Description</th
				>
			</tr>
		</thead>
		<tbody class="[&_tr:last-child]:border-0">
			{#each props as prop (prop.name)}
				<tr
					class="hover:bg-muted/50 data-[state=selected]:bg-muted border-b border-border-neutral-l4 transition-colors"
				>
					<td class="p-4 align-middle font-mono font-semibold">
						{prop.name}
						{#if prop.required}
							<span class="text-destructive">*</span>
						{/if}
					</td>
					<td class="text-muted-foreground p-4 align-middle font-mono text-xs">
						<code
							class="relative rounded bg-surface-neutral-l2 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold"
						>
							{prop.type}
						</code>
					</td>
					<td class="p-4 align-middle font-mono text-xs">
						{#if prop.default}
							{prop.default}
						{:else}
							<span class="text-muted-foreground">-</span>
						{/if}
					</td>
					<td class="p-4 align-middle">{prop.description || '-'}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
