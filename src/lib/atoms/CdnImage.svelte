<script lang="ts">
	import { Image, type ImageProps } from '@unpic/svelte';

	const props: ImageProps = $props();
</script>

<Image {...props} />
