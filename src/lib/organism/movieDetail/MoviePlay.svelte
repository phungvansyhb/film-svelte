<script lang="ts">
	import type { Episode } from '$lib/typeDefs/MovieDetailContext.type';
	import VideoPlayer from '$lib/atoms/VideoPlayer.svelte';

	type MoviePlayProps = {
		movieName: string;
		currentEpisode: Episode | null;
		videoSourceType: 'm3u8' | 'embeded';
		toggleVideoSource: () => void;
		showM3U8Note: boolean;
		poster : string;
	};

	let { movieName, currentEpisode, videoSourceType, toggleVideoSource, showM3U8Note , poster }: MoviePlayProps = $props();

	let debugInfo = '';
	$effect(() => {
		if (currentEpisode) {
			debugInfo = `Current episode: ${currentEpisode.name}\nSource type: ${videoSourceType}`;
		}
	});
</script>

<div class="mt-8">
	

	{#if currentEpisode}
		<div class="mb-4">
			<div class="flex items-center justify-between ">
				<h2 class="mb-4 text-2xl font-bold text-white">{movieName} - {currentEpisode.name}</h2>
				<button
					onclick={toggleVideoSource}
					class="rounded-md bg-gray-700 px-4 py-2 text-sm text-white hover:bg-gray-600"
				>
					Switch to {videoSourceType === 'm3u8' ? 'embeded' : 'M3U8'}
				</button>
			</div>
			{#if showM3U8Note}
				<p class="mt-2 text-sm text-yellow-400">
					Note: M3U8 playback may require additional setup. If you experience issues, try switching to MP4.
				</p>
			{/if}
		</div>

		<div class="relative aspect-video w-full overflow-hidden rounded-lg">
			<VideoPlayer
				src={videoSourceType === 'm3u8' ? currentEpisode.link_m3u8 : currentEpisode.link_embed}
				poster={poster}
				title={currentEpisode.name}
			/>
		</div>

		<!-- {#if import.meta.env.DEV}
			<div class="mt-4 rounded-md bg-gray-800 p-4">
				<pre class="whitespace-pre-wrap text-sm text-gray-300">{debugInfo}</pre>
			</div>
		{/if} -->
	{:else}
		<p class="text-gray-400">No episode selected</p>
	{/if}
</div>
