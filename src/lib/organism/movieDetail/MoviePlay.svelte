<script lang="ts">
	import type { Episode } from '$lib/typeDefs/MovieDetailContext.type';
	import VideoPlayer from '$lib/atoms/VideoPlayer.svelte';

	type MoviePlayProps = {
		movieName: string;
		currentEpisode: Episode | null;
		poster: string;
	};

	let { movieName, currentEpisode, poster }: MoviePlayProps = $props();

	let debugInfo = '';
	$effect(() => {
		if (currentEpisode) {
			debugInfo = `Current episode: ${currentEpisode.name}\nSource type: `;
		}
	});
</script>

<div class="mt-8">
	{#if currentEpisode}
		<div class="mb-4">
			<div class="mb-4 flex items-center gap-4">
				<h2 class="text-2xl font-bold text-white">{movieName} - {currentEpisode.name}</h2>
				<button
					class=" inline-flex cursor-pointer items-center bg-gray-800/50 p-2 text-white hover:bg-gray-700/50"
					tabindex="0"
					aria-label="Xem sau"
				>
					<span class="icon-[material-symbols--bookmark]"></span>
				</button>
			</div>
		</div>

		<div class="relative aspect-video w-full overflow-hidden rounded-lg">
			<VideoPlayer
				src={currentEpisode.link_embed}
				{poster}
				title={movieName + ' - ' + currentEpisode.name}
			/>
		</div>
	{:else}
		<p class="text-gray-400">No episode selected</p>
	{/if}
</div>
