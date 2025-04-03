<script lang="ts">
    type BreadcrumbItem = {
        name: string;
        slug?: string;
        isCurrent?: boolean;
        position: number;
    }

    type Props = {
        items: BreadcrumbItem[];
    }

    const { items }:Props = $props();
</script>

<nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2">
        <li>
            <a 
                href="/" 
                class="text-teal-500 hover:text-teal-600" 
                tabindex="0" 
                aria-label="Trang chủ"
            >
                Trang chủ
            </a>
        </li>
        {#each items as item, index}
            <li class="flex items-center">
                <span class="text-gray-500 mx-2">/</span>
                {#if item.slug && !item.isCurrent}
                    <a 
                        href={item.slug} 
                        class="text-teal-500 hover:text-teal-600" 
                        tabindex="0" 
                        aria-label={item.name}
                    >
                        {item.name}
                    </a>
                {:else}
                    <span class="text-gray-500">{item.name}</span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>