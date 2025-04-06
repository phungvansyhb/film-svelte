<script lang="ts">
	type PaginationProps = {
		currentPage: number;
		totalItems: number;
		totalItemsPerPage: number;
		pageRanges: number;
	};

	const { currentPage, totalItems, totalItemsPerPage, pageRanges }: PaginationProps = $props();

	const totalPages = $derived(Math.ceil(totalItems / totalItemsPerPage));
	const startPage = $derived(Math.max(1, currentPage - Math.floor(pageRanges / 2)));
	const endPage = $derived(Math.min(totalPages, startPage + pageRanges - 1));

	function getPageUrl(page: number): string {
		if (typeof window === 'undefined') return '';
		const url = new URL(window.location.href);
		url.searchParams.set('page', page.toString());
		return url.toString();
	}
</script>

<nav aria-label="Pagination" class="mt-8 flex justify-center">
	<ul class="flex items-center gap-2">
		{#if currentPage > 1}
			<li>
				<a
					data-sveltekit-reload
					href={getPageUrl(currentPage - 1)}
					class="rounded-lg bg-gray-800 px-3 py-2 text-white transition-colors hover:bg-gray-700"
					aria-label="Previous page"
				>
					&lt;
				</a>
			</li>
		{/if}

		{#if startPage > 1}
			<li>
				<a
					data-sveltekit-reload
					href={getPageUrl(1)}
					class="rounded-lg bg-gray-800 px-3 py-2 text-white transition-colors hover:bg-gray-700"
				>
					1
				</a>
			</li>
			{#if startPage > 2}
				<li>
					<span class="px-3 py-2 text-gray-400">...</span>
				</li>
			{/if}
		{/if}

		{#each Array(endPage - startPage + 1) as _, i}
			{@const page = startPage + i}
			<li>
				<a
					data-sveltekit-reload
					href={getPageUrl(page)}
					class="rounded-lg px-3 py-2 {page === currentPage
						? 'bg-teal-600 text-white'
						: 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors"
					aria-current={page === currentPage ? 'page' : undefined}
				>
					{page}
				</a>
			</li>
		{/each}

		{#if endPage < totalPages}
			{#if endPage < totalPages - 1}
				<li>
					<span class="px-3 py-2 text-gray-400">...</span>
				</li>
			{/if}
			<li>
				<a
					data-sveltekit-reload
					href={getPageUrl(totalPages)}
					class="rounded-lg bg-gray-800 px-3 py-2 text-white transition-colors hover:bg-gray-700"
				>
					{totalPages}
				</a>
			</li>
		{/if}

		{#if currentPage < totalPages}
			<li>
				<a
					data-sveltekit-reload
					href={getPageUrl(currentPage + 1)}
					class="rounded-lg bg-gray-800 px-3 py-2 text-white transition-colors hover:bg-gray-700"
					aria-label="Next page"
				>
					&gt;
				</a>
			</li>
		{/if}
	</ul>
</nav>
