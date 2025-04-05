<script lang="ts">
	import { searchMovie } from '$lib/services/movie.service';
	import type { MovieList } from '$lib/typeDefs/MovieList.type';
	import { goto } from '$app/navigation';

	const { isOpen, onClose } = $props<{ isOpen: boolean; onClose: () => void }>();

	let searchQuery = $state('');
	let searchResults = $state<MovieList | null>(null);
	let isLoading = $state(false);
	let error = $state<string | null>(null);
	let currentPage = $state(1);
	let totalPages = $state(1);

	let modalRef = $state<HTMLDivElement | null>(null);
	let closeButtonRef = $state<HTMLButtonElement | null>(null);
	let searchInputRef = $state<HTMLInputElement | null>(null);

	async function handleSearch(page = 1) {
		if (!searchQuery.trim()) return;

		isLoading = true;
		error = null;
		currentPage = page;

		try {
			const results = await searchMovie(searchQuery, { page });
			searchResults = results as MovieList;

			if (searchResults?.data?.params?.pagination) {
				totalPages = Math.ceil(
					searchResults.data.params.pagination.totalItems /
						searchResults.data.params.pagination.totalItemsPerPage
				);
			}
		} catch (e) {
			error = 'Có lỗi xảy ra khi tìm kiếm. Vui lòng thử lại.';
			console.error(e);
		} finally {
			isLoading = false;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			onClose();
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

	function navigateToMovie(slug: string) {
		onClose();
		goto(`/phim/${slug}`);
	}

	function goToPage(page: number) {
		if (page < 1 || page > totalPages || page === currentPage) return;
		handleSearch(page);
	}

	$effect(() => {
		if (isOpen) {
			// Focus search input when modal opens
			searchInputRef?.focus();
			// Prevent scrolling on body
			document.body.style.overflow = 'hidden';
		} else {
			// Restore scrolling when modal closes
			document.body.style.overflow = '';
			// Reset search state
			searchQuery = '';
			searchResults = null;
			error = null;
			currentPage = 1;
			totalPages = 1;
		}
	});
</script>

<svelte:window onkeydown={handleKeydown} />

{#if isOpen}
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
				<h2>Tìm kiếm phim</h2>
				<button
					class="close-button"
					bind:this={closeButtonRef}
					onclick={(e) => {
						e.stopPropagation();
						onClose();
					}}
					aria-label="close button"
					tabindex="0"
				>
					<span class="icon-[material-symbols--close]"></span>
				</button>
			</div>
			<div class="modal-body">
				<div class="search-container">
					<div class="search-input-wrapper">
						<input
							type="text"
							bind:value={searchQuery}
							bind:this={searchInputRef}
							placeholder="Nhập tên phim cần tìm..."
							class="search-input"
							onkeydown={(e) => {
								if (e.key === 'Enter') {
									handleSearch(1);
								}
							}}
						/>
						<button
							class="search-button"
							onclick={() => handleSearch(1)}
							aria-label="Tìm kiếm"
							disabled={isLoading}
							tabindex="0"
						>
							<span class="icon-[material-symbols--search]"></span>
						</button>
					</div>

					{#if isLoading}
						<div class="loading-container">
							<span class="loading-spinner"></span>
							<p>Đang tìm kiếm...</p>
						</div>
					{:else if error}
						<div class="error-message">
							<p>{error}</p>
						</div>
					{:else if searchResults && searchResults.data && searchResults.data.items && searchResults.data.items.length > 0}
						<div class="search-results">
							<h3>Kết quả tìm kiếm ({searchResults.data.params.pagination.totalItems})</h3>
							<div class="movie-grid">
								{#each searchResults.data.items as movie (movie._id)}
									<div
										class="movie-card"
										onclick={() => navigateToMovie(movie.slug)}
										onkeydown={(e) => {
											if (e.key === 'Enter' || e.key === ' ') {
												e.preventDefault();
												navigateToMovie(movie.slug);
											}
										}}
										tabindex="0"
										role="button"
									>
										<img
											src={searchResults.data.APP_DOMAIN_CDN_IMAGE +
												'/uploads/movies/' +
												movie.thumb_url}
											loading="lazy"
											alt={movie.name}
											class="movie-thumbnail"
										/>
										<div class="movie-info">
											<h4>{movie.name}</h4>
											<p class="movie-year">{movie.year}</p>
										</div>
									</div>
								{/each}
							</div>

							{#if totalPages > 1}
								<div class="pagination">
									<button
										class="pagination-button"
										onclick={() => goToPage(1)}
										disabled={currentPage === 1}
										aria-label="Trang đầu"
										tabindex="0"
									>
										<span class="icon-[material-symbols--first-page]"></span>
									</button>
									<button
										class="pagination-button"
										onclick={() => goToPage(currentPage - 1)}
										disabled={currentPage === 1}
										aria-label="Trang trước"
										tabindex="0"
									>
										<span class="icon-[material-symbols--chevron-left]"></span>
									</button>

									<div class="pagination-pages">
										{#each Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
											let pageNum;
											if (totalPages <= 5) {
												pageNum = i + 1;
											} else if (currentPage <= 3) {
												pageNum = i + 1;
											} else if (currentPage >= totalPages - 2) {
												pageNum = totalPages - 4 + i;
											} else {
												pageNum = currentPage - 2 + i;
											}
											return pageNum;
										}) as pageNum}
											<button
												class="pagination-page {currentPage === pageNum ? 'active' : ''}"
												onclick={() => goToPage(pageNum)}
												aria-label="Trang {pageNum}"
												aria-current={currentPage === pageNum ? 'page' : undefined}
												tabindex="0"
											>
												{pageNum}
											</button>
										{/each}
									</div>

									<button
										class="pagination-button"
										onclick={() => goToPage(currentPage + 1)}
										disabled={currentPage === totalPages}
										aria-label="Trang sau"
										tabindex="0"
									>
										<span class="icon-[material-symbols--chevron-right]"></span>
									</button>
									<button
										class="pagination-button"
										onclick={() => goToPage(totalPages)}
										disabled={currentPage === totalPages}
										aria-label="Trang cuối"
										tabindex="0"
									>
										<span class="icon-[material-symbols--last-page]"></span>
									</button>
								</div>
							{/if}
						</div>
					{:else if searchResults && searchResults.data && searchResults.data.items && searchResults.data.items.length === 0}
						<div class="empty-results">
							<p>Không tìm thấy kết quả nào cho "{searchQuery}"</p>
						</div>
					{/if}
				</div>
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
		@apply mx-2 max-h-[80vh] w-full max-w-4xl overflow-hidden rounded-lg bg-gray-900;
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
		@apply max-h-[calc(80vh-4rem)] overflow-y-auto p-4 py-8;
	}

	.search-container {
		@apply space-y-4;
	}

	.search-input-wrapper {
		@apply flex items-center gap-2;
	}

	.search-input {
		@apply flex-1 rounded-lg bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-500 focus:outline-none;
	}

	.search-button {
		@apply inline-flex items-center justify-center rounded-lg bg-teal-500 p-2 text-white transition-colors hover:bg-teal-600 focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-gray-900 focus:outline-none disabled:opacity-50;
		span {
			@apply text-xl;
		}
	}

	.loading-container {
		@apply flex flex-col items-center justify-center py-8 text-gray-400;
	}

	.loading-spinner {
		@apply mb-2 h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-teal-500;
	}

	.error-message {
		@apply rounded-lg bg-red-900/50 p-4 text-center text-red-200;
	}

	.search-results {
		@apply space-y-4;
		h3 {
			@apply text-lg font-medium text-white;
		}
	}

	.movie-grid {
		@apply grid grid-cols-2 gap-4 pb-8 sm:grid-cols-3 md:grid-cols-4;
	}

	.movie-card {
		@apply cursor-pointer rounded-lg bg-gray-800 transition-transform hover:scale-105 hover:bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none;
	}

	.movie-thumbnail {
		@apply h-40 w-full rounded-t-lg object-cover;
	}

	.movie-info {
		@apply p-2;
		h4 {
			@apply line-clamp-2 font-medium text-white;
		}
	}

	.movie-year {
		@apply mt-1 text-sm text-gray-400;
	}

	.empty-results {
		@apply py-8 text-center text-gray-400;
	}

	.pagination {
		@apply flex items-center justify-center gap-2 py-4;
	}

	.pagination-button {
		@apply inline-flex items-center justify-center rounded-lg bg-gray-800 p-2 text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-50;
		span {
			@apply text-xl;
		}
	}

	.pagination-pages {
		@apply flex items-center gap-1;
	}

	.pagination-page {
		@apply inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gray-800 text-white transition-colors hover:bg-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none;
	}

	.pagination-page.active {
		@apply bg-teal-500 font-medium;
	}
</style>
