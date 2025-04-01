<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ButtonProps = {
		text : string ,
		className : string
	}

	let { text , className , ...rest } :  HTMLButtonAttributes & ButtonProps  = $props();
</script>

<button class={[className , "p-2 border-none rounded font-medium"]} {...rest}>
	{text}
</button>






