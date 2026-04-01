<script lang="ts">
   
    import Button from "$lib/components/ui/button/button.svelte";
	import FileUploader from "$lib/components/ui/file-uploader/file-uploader.svelte";
    import * as Item from "$lib/components/ui/item/index.js";
    import Progress from "$lib/components/ui/progress/progress.svelte";
    import RangeSelector from "$lib/components/ui/range-selector/range-selector.svelte";
    
   
    import IconCross from "$lib/icons/icon-cross.svelte";
    import IconPdf from "$lib/icons/icon-pdf.svelte";
    let files = $state<File[]>([]);

    function handleRemoveFile(index: number) {
        files = files.filter((_, i) => i !== index);
    }

</script>

<div class="max-w-xl mx-auto">
    <FileUploader
        onFilesChange={(newFiles: File[]) => (files = [...files, ...newFiles])}
        maxFilesToUpload={3}
    />
    {#if files}
        <div class="mt-4">
            {#each Array.from(files) as file}
                <div class="p-2 border  border-alphapure-black-25 rounded-8 mb-2">
                    <Item.Root class="flex gap-12 p-12">
                        <Item.Media>
                            <IconPdf />
                        </Item.Media>
                        <Item.Content >
                            <div class="flex flex-col">
                                <span class="text-p-small font-medium text-text-glass-primary">{file.name}</span>
                                <span class="text-sm text-muted-foreground">
                                    {(file.size / 1024).toFixed(2)} KB
                                </span>
                                <span> 
                                    <RangeSelector type="multiple" max={100} value={[20,70]} min={10} class="w-full mt-8" />
                                </span>
                            </div>
                        </Item.Content>
                        <Item.Actions>
                            <Button variant="tertiary" size="icon-md" fullyRounded onclick={() => handleRemoveFile(files.indexOf(file))}>
                                <IconCross size="28" />
                            </Button>
                        </Item.Actions>
                    </Item.Root>
                </div>
                
            {/each}
        </div>
    {/if}
</div>
