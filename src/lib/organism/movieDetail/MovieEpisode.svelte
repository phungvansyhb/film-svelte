<script lang="ts">
	import type { MovieDetail } from '$lib/typeDefs/MovieDetail.type';
	import type { Episode } from '$lib/typeDefs/MovieDetailContext.type';

	type MovieDetailProps = { 
		data: MovieDetail['data']['item']['episodes'];
		currentEpisode: Episode | null;
		currentServer: string | null;
		playEpisode: (episode: Episode) => void;
	};

	let { data, currentEpisode, currentServer, playEpisode }: MovieDetailProps = $props();
    
	let shouldUseDropdown = $derived(
		data &&
			data.some((server) => server.server_data.length > 4)
	);
</script>

{#if data && data.length > 0}
	<div class="mt-8">
		<h2 class="mb-4 text-2xl font-bold text-white">Danh sách tập</h2>

		{#if shouldUseDropdown}
			<!-- Use dropdown for series with many episodes -->
			<div class="mb-6 ">
				<div class="flex flex-wrap gap-4">
					<!-- Server selector -->
					<select
						class="w-[200px] rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
						onchange={(e) => {
							const select = e.target as HTMLSelectElement;
							const selectedServerName = select.value;
							// Find the first episode of the selected server
							const selectedServer = data.find(
								(server) => server.server_name === selectedServerName
							);
							if (selectedServer && selectedServer.server_data.length > 0) {
								playEpisode(selectedServer.server_data[0]);
							}
						}}
						aria-label="Chọn server"
					>
						<option value="" disabled selected>Chọn server</option>
						{#each data as server}
							<option value={server.server_name} selected={currentServer === server.server_name}>
								{server.server_name}
							</option>
						{/each}
					</select>

					<!-- Episode selector - only show episodes from selected server -->
					<select
						class="w-[200px] rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
						onchange={(e) => {
							const select = e.target as HTMLSelectElement;
							const selectedSlug = select.value;
							// Find the episode in the current server
							const currentServerObj = data.find((server) =>
								server.server_name === currentServer
							);
							
							if (currentServerObj) {
								const selectedEpisode = currentServerObj.server_data.find(
									(episode) => episode.slug === selectedSlug
								);
								if (selectedEpisode) playEpisode(selectedEpisode);
							}
						}}
						aria-label="Chọn tập phim"
					>
						<option value="" disabled selected>Chọn tập phim</option>
						{#if currentEpisode}
							{#each data.find( (server) => server.server_data.some((episode) => episode.slug === currentEpisode?.slug) )?.server_data || [] as episode}
								<option value={episode.slug} selected={currentEpisode?.slug === episode.slug}>
									{episode.name}
								</option>
							{/each}
						{/if}
					</select>
				</div>
			</div>
		{:else}
			<!-- Use buttons for series with few episodes -->
			{#each data as server}
				<div class="mb-6">
					<h3 class="mb-2 text-xl font-bold text-white">{server.server_name}</h3>
					<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{#each server.server_data as episode}
							<button
								tabindex="0"
								aria-label={episode.filename}
								onclick={() => playEpisode(episode)}
								class="rounded-lg bg-gray-800 p-3 text-center text-white transition-colors hover:bg-gray-700 {currentEpisode?.slug ===
								episode.slug
									? 'ring-2 ring-teal-500'
									: ''}"
							>
								{episode.name}
							</button>
						{/each}
					</div>
				</div>
			{/each}
		{/if}
	</div>
{/if}
