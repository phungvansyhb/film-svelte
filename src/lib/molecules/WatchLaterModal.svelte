<script lang="ts">
	import { bookmarkStore, initialBookmarks } from '$lib/stores/bookmarkStore';

	let bookmarks = $state(initialBookmarks);
	let modalRef = $state<HTMLDivElement | null>(null);
	let closeButtonRef = $state<HTMLButtonElement | null>(null);

	$effect(() => {
		bookmarkStore.subscribe((value) => {
			bookmarks = value;
		});
	});

	function removeFromWatchLater(movieId: string) {
		bookmarkStore.removeFromWatchLater(movieId);
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			bookmarkStore.toggleWatchList(false);
		}
	}

	function handleTabKey(event: KeyboardEvent) {
		if (event.key !== 'Tab' || !modalRef) return;

		const focusableElements = Array.from(
			modalRef.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		) as HTMLElement[];

		const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement);
		const nextIndex = event.shiftKey
			? currentIndex <= 0
				? focusableElements.length - 1
				: currentIndex - 1
			: currentIndex >= focusableElements.length - 1
				? 0
				: currentIndex + 1;

		focusableElements[nextIndex].focus();
		event.preventDefault();
	}

	$effect(() => {
		if (bookmarks.isShowWatchLater) {
			closeButtonRef?.focus();
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if bookmarks.isShowWatchLater}
	<div class="modal-overlay">
		<div
			class="modal-content"
			bind:this={modalRef}
			onkeydown={handleTabKey}
			role="dialog"
			aria-modal="true"
			tabindex="0"
		>
			<div class="modal-header">
				<h2>Danh sách xem sau</h2>
				<button
					class="close-button"
					bind:this={closeButtonRef}
					onclick={(e) => {
						e.stopPropagation();
						bookmarkStore.toggleWatchList(false);
					}}
					aria-label="close button"
					tabindex="0"
				>
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
									tabindex="0"
									onkeydown={(e) => {
										if (e.key === 'Enter' || e.key === ' ') {
											e.preventDefault();
											removeFromWatchLater(movie._id);
										}
									}}
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
		@apply fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.9)];
	}

	.modal-content {
		@apply mx-2 max-h-[80vh] w-full max-w-2xl overflow-hidden rounded-lg bg-gray-900;
	}

	.modal-header {
		@apply flex items-center justify-between border-b border-gray-700 p-4;
		h2 {
			@apply text-xl font-semibold text-white;
		}
	}

	.close-button {
		@apply cursor-pointer p-2 text-gray-400 transition-colors hover:text-white;
		span {
			@apply text-2xl;
		}
		&:focus {
			@apply rounded ring-2 ring-white outline-none;
		}
	}

	.modal-body {
		@apply max-h-[calc(80vh-4rem)] overflow-y-auto p-4;
	}

	.empty-message {
		@apply py-8 text-center text-gray-400;
	}

	.movie-list {
		@apply space-y-4;
	}

	.movie-item {
		@apply flex items-center gap-4 rounded-lg p-2 transition-colors hover:bg-gray-800;
	}

	.movie-thumbnail {
		@apply h-28 w-20 rounded object-cover;
	}

	.movie-info {
		@apply flex-1;
		h3 {
			@apply font-medium text-white;
		}
	}

	.movie-year {
		@apply mt-1 text-sm text-gray-400;
	}

	.remove-button {
		@apply cursor-pointer p-2 text-gray-400 transition-colors hover:text-amber-500;
		span {
			@apply text-xl;
		}
	}
</style>
