<script lang="ts">
	import { onMount } from 'svelte';

	type ImageProps = {
		src: string;
		alt: string;
		className?: string;
		width?: number;
		height?: number;
		quality?: number;
		format?: 'webp' | 'jpeg' | 'auto';
	};

	const {
		src,
		alt,
		className = '',
		width,
		height,
		quality = 75,
		format = 'auto'
	}: ImageProps = $props();

	let isLoaded = $state(false);
	let imgElement: HTMLImageElement;

	function generateSrcset(baseUrl: string): string {
		const sizes = [320, 640, 960, 1280, 1920];
		return sizes
			.map((size) => {
				const optimizedUrl = optimizeImageUrl(baseUrl, size, quality, format);
				return `${optimizedUrl} ${size}w`;
			})
			.join(', ');
	}

	function optimizeImageUrl(
		url: string,
		width?: number,
		quality?: number,
		format?: string
	): string {
		// If using an image optimization service, add parameters here
		// Example with Cloudinary:
		// return url.replace('/upload/', `/upload/w_${width},q_${quality},f_${format}/`);

		// For now, return original URL
		return url;
	}

	onMount(() => {
		if (imgElement) {
			imgElement.addEventListener('load', () => {
				isLoaded = true;
			});
		}
	});
</script>

<div class="image-container {className} {!isLoaded ? 'loading' : ''}">
	<img
		bind:this={imgElement}
		{src}
		{alt}
		class="main-image"
		loading="lazy"
		decoding="async"
		{width}
		{height}
		srcset={generateSrcset(src)}
		sizes="(max-width: 320px) 320px,
			   (max-width: 640px) 640px,
			   (max-width: 960px) 960px,
			   (max-width: 1280px) 1280px,
			   1920px"
	/>
	{#if !isLoaded}
		<div class="placeholder" ></div>
	{/if}
</div>

<style>
	.image-container {
		position: relative;
		overflow: hidden;
		background-color: #f3f4f6;
	}

	.loading {
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	.main-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: opacity 0.3s ease-in-out;
	}

	.placeholder {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
		background-size: 200% 100%;
		animation: shimmer 1.5s linear infinite;
	}

	@keyframes pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.5;
		}
	}

	@keyframes shimmer {
		to {
			background-position: -200% 0;
		}
	}
</style>
