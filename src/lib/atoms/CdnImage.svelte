<script lang="ts">
	import { Image, type ImageProps } from '@unpic/svelte';

	const props: ImageProps & { quality?: number } = $props();
	function generateSrcset(baseUrl: string): string {
		const sizes = [320, 640, 960, 1280, 1920];
		return sizes
			.map((size) => {
				return `${props.src}?width=${size}height=${(size * 3) / 4} ${size}w`;
			})
			.join(', ');
	}
</script>

<Image
	{...props}
	loading="lazy"
	decoding="async"
	placeholder="blur"
	srcset={generateSrcset(props.src)}
	quality={props.quality || 75}
	sizes="(max-width: 320px) 320px,
			   (max-width: 640px) 640px,
			   (max-width: 960px) 960px,
			   (max-width: 1280px) 1280px,
			   1920px"
/>
