<script lang="ts">
	type VideoPlayerProps = {
		src: string;
		poster?: string;
		title?: string;
		controls?: boolean;
		width?: number;
		height?: number;
	};

	const {
		src,
		poster = '',
		title = '',

		controls = true,
		width = 16,
		height = 9
	}: VideoPlayerProps = $props();

	let iframeElement = $state<HTMLIFrameElement | null>(null);
	let errorMessage = $state('');

	const videoSrc = (() => {
		try {
			new URL(src);
			return `${src}?autoplay=0`;
		} catch (e) {
			errorMessage = `Invalid URL: ${src}`;
			console.error('Invalid video URL:', src);
			return '';
		}
	})();

	function handleIframeError() {
		errorMessage = 'Failed to load video. Please check the URL or try again later.';
		console.error('Video iframe failed to load:', src);
	}
</script>

<div
	class="video-player-container relative w-full overflow-hidden rounded-lg bg-black"
	style="aspect-ratio: {width}/{height};"
>
	{#if errorMessage}
		<div class="flex h-full items-center justify-center bg-gray-800 p-4 text-center text-white">
			<div>
				<p class="mb-2 font-bold text-red-500">Error</p>
				<p>{errorMessage}</p>
				<p class="mt-2 text-sm">URL: {src}</p>
			</div>
		</div>
	{:else if videoSrc}
		<div class="group relative h-full w-full">
			<div
				class="absolute top-0 left-0 z-10 hidden h-10 w-full bg-slate-900/10 p-2 group-hover:block"
			>
				<h2 class="text-xl text-white">{title}</h2>
			</div>
			<iframe
				bind:this={iframeElement}
				{title}
				src={videoSrc}
				allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; autoplay"
				allowfullscreen
				class="h-full w-full"
				loading="lazy"
				onerror={handleIframeError}
			></iframe>
		</div>
	{:else}
		<div class="flex h-full items-center justify-center bg-gray-800 p-4 text-center text-white">
			<p>No video source provided</p>
		</div>
	{/if}
</div>

<style>
	.video-player-container {
		box-shadow:
			0 4px 6px -1px rgba(0, 0, 0, 0.1),
			0 2px 4px -1px rgba(0, 0, 0, 0.06);
	}
</style>
