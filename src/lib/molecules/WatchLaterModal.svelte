<script lang="ts">
	import type { MovieLatestList } from '$lib/typeDefs/MovieLatest.type';
	import { bookmarkStore } from '$lib/stores/bookmarkStore';
	import { browser } from '$app/environment';

	type Props = {
		isOpen: boolean;
		onClose: () => void;
	};

	const { isOpen, onClose } = $props();
	let bookmarks = $state<{ watchLater: MovieLatestList['items'] }>({ watchLater: [] });

	$effect(() => {
		if (browser) {
			bookmarkStore.subscribe(value => {
				bookmarks = value;
			});
		}
	});

	function removeFromWatchLater(movieId: string) {
		bookmarkStore.removeFromWatchLater(movieId);
	}
</script>

{#if isOpen}
	<div class="modal-overlay" onclick={onClose} role="button" tabindex="0" onkeydown={onClose}>
		<div class="modal-content">
			<div class="modal-header">
				<h2>Danh sách xem sau</h2>
				<button class="close-button" onclick={onClose} aria-label="close button">
					<span class="icon-[material-symbols--close]"></span>
				</button>
			</div>
			<div class="modal-body">
				{#if bookmarks.watchLater.length === 0}
					<p class="empty-message">Chưa có phim nào trong danh sách xem sau</p>
				{:else}
					<div class="movie-list">
						{#each bookmarks.watchLater as movie (movie._id)}
							<div class="movie-item">
								<img src={movie.thumb_url} alt={movie.name} class="movie-thumbnail" />
								<div class="movie-info">
									<h3>{movie.name}</h3>
									<p class="movie-year">{movie.year}</p>
								</div>
								<button 
                                    aria-label="remove button"
									class="remove-button"
									onclick={() => removeFromWatchLater(movie._id)}
									title="Xóa khỏi danh sách"
								>
									<span class="icon-[material-symbols--delete]"></span>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	@reference "tailwindcss";

	.modal-overlay {
		@apply fixed inset-0 bg-black  z-50 flex items-center justify-center;
	}

	.modal-content {
		@apply bg-gray-900 rounded-lg w-full max-w-2xl max-h-[80vh] overflow-hidden;
	}

	.modal-header {
		@apply flex items-center justify-between p-4 border-b border-gray-700;
		h2 {
			@apply text-xl font-semibold text-white;
		}
	}

	.close-button {
		@apply text-gray-400 hover:text-white transition-colors p-2;
		span {
			@apply text-2xl;
		}
	}

	.modal-body {
		@apply p-4 overflow-y-auto max-h-[calc(80vh-4rem)];
	}

	.empty-message {
		@apply text-gray-400 text-center py-8;
	}

	.movie-list {
		@apply space-y-4;
	}

	.movie-item {
		@apply flex items-center gap-4 p-2 rounded-lg hover:bg-gray-800 transition-colors;
	}

	.movie-thumbnail {
		@apply w-20 h-28 object-cover rounded;
	}

	.movie-info {
		@apply flex-1;
		h3 {
			@apply text-white font-medium;
		}
	}

	.movie-year {
		@apply text-gray-400 text-sm mt-1;
	}

	.remove-button {
		@apply text-gray-400 hover:text-red-500 transition-colors p-2;
		span {
			@apply text-xl;
		}
	}
</style> 