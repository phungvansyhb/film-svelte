<script lang="ts">
	type ImageProps = {
		src: any;
		alt?: string;
		className?: string;
		priority?: 'low' | 'high' | 'auto';
		loading?: 'lazy' | 'eager' | undefined;
		sizes?: string;
	};

	const { alt, src, className, priority = 'low', loading = 'lazy', sizes }: ImageProps = $props();
</script>

<enhanced:img {src} {alt} class={[className, '']} fetchpriority={priority} {loading} {sizes} />
