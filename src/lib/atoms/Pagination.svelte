<script lang="ts">
    type PaginationProps = {
        currentPage: number;
        totalItems: number;
        totalItemsPerPage: number;
        pageRanges: number;
    }

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

<nav aria-label="Pagination" class="flex justify-center mt-8">
    <ul class="flex items-center gap-2">
        {#if currentPage > 1}
            <li>
                <a 
                    href={getPageUrl(currentPage - 1)}
                    class="px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    aria-label="Previous page"
                >
                    &lt;
                </a>
            </li>
        {/if}

        {#if startPage > 1}
            <li>
                <a 
                    href={getPageUrl(1)}
                    class="px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
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
                    href={getPageUrl(page)}
                    class="px-3 py-2 rounded-lg {page === currentPage ? 'bg-teal-600 text-white' : 'bg-gray-800 text-white hover:bg-gray-700'} transition-colors"
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
                    href={getPageUrl(totalPages)}
                    class="px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                    {totalPages}
                </a>
            </li>
        {/if}

        {#if currentPage < totalPages}
            <li>
                <a 
                    href={getPageUrl(currentPage + 1)}
                    class="px-3 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                    aria-label="Next page"
                >
                    &gt;
                </a>
            </li>
        {/if}
    </ul>
</nav> 