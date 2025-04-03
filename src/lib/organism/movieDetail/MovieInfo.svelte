<script lang=ts>
	import CdnImage from "$lib/atoms/CdnImage.svelte";
	import type { MovieDetail } from "$lib/typeDefs/MovieDetail.type";

    type MovieDetailProps = { data: MovieDetail['data']['item'] }

    let { data }: MovieDetailProps = $props()
</script>
<div class="flex flex-col md:flex-row gap-6">
    <!-- Movie Poster -->
    <div class="w-full md:w-3/5 lg:w-2/5">
        <div class="relative aspect-[2/3] rounded-lg overflow-hidden">
            <CdnImage 
                src={`https://img.ophim.live/uploads/movies/${data.thumb_url}`}
                alt={data.name}
                class="w-full h-full object-cover"
                width={300}
                height={450}
            />
            {#if data.quality}
                <span class="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
                    {data.quality}
                </span>
            {/if}
        </div>
    </div>
    
    <!-- Movie Info -->
    <div class="w-full md:w-2/5 lg:w-3/5">
        <h1 class="text-2xl md:text-3xl font-bold text-white mb-2">
            {data.name}
        </h1>
        <p class="text-gray-400 text-sm mb-4">
            {data.origin_name} ({data.year})
        </p>
        
        <div class="flex flex-wrap gap-2 mb-4">
            {#each data.category as category}
                <a 
                    href={`/the-loai/${category.slug}`}
                    class="bg-gray-800 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-700 transition-colors"
                >
                    {category.name}
                </a>
            {/each}
        </div>
        
        <div class="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div class="bg-gray-800 p-3 rounded-lg">
                <p class="text-gray-400 text-sm">Quốc gia</p>
                <p class="text-white font-medium">
                    {#each data.country as country}
                        <a 
                            href={`/quoc-gia/${country.slug}`}
                            class="hover:text-teal-500 transition-colors"
                        >
                            {country.name}
                        </a>
                    {/each}
                </p>
            </div>
            <div class="bg-gray-800 p-3 rounded-lg">
                <p class="text-gray-400 text-sm">Thời lượng</p>
                <p class="text-white font-medium">{data.time}</p>
            </div>
            <div class="bg-gray-800 p-3 rounded-lg">
                <p class="text-gray-400 text-sm">Đánh giá</p>
                <p class="text-white font-medium">
                    {#if data.tmdb?.vote_average}
                        <span class="text-yellow-500">★</span> {data.tmdb.vote_average.toFixed(1)}
                        {#if data.tmdb.vote_count}
                            <span class="text-gray-400 text-xs ml-1">({data.tmdb.vote_count} đánh giá)</span>
                        {/if}
                    {:else}
                        Chưa có đánh giá
                    {/if}
                </p>
            </div>
        </div>
        
        <div class="mb-6">
            <h2 class="text-xl font-bold text-white mb-2">Nội dung phim</h2>
            <p class="!text-gray-300">{@html data.content}</p>
        </div>
        
        {#if data.actor && data.actor.length > 0}
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white mb-2">Diễn viên</h2>
                <p class="text-gray-300">{data.actor.join(', ')}</p>
            </div>
        {/if}
        
        {#if data.director && data.director.length > 0}
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white mb-2">Đạo diễn</h2>
                <p class="text-gray-300">{data.director.join(', ')}</p>
            </div>
        {/if}
        
        <!-- Categories and Countries -->
        <div class="mb-6">
            <h2 class="text-xl font-bold text-white mb-2">Thông tin phim</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Categories -->
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h3 class="text-lg font-bold text-white mb-2">Thể loại phim</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each data.category as category}
                            <a 
                                href={`/the-loai/${category.slug}`}
                                class="bg-gray-700 text-white text-sm px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                            >
                                {category.name}
                            </a>
                        {/each}
                    </div>
                </div>
                
                <!-- Countries -->
                <div class="bg-gray-800 p-4 rounded-lg">
                    <h3 class="text-lg font-bold text-white mb-2">Quốc gia</h3>
                    <div class="flex flex-wrap gap-2">
                        {#each data.country as country}
                            <a 
                                href={`/quoc-gia/${country.slug}`}
                                class="bg-gray-700 text-white text-sm px-3 py-1 rounded-full hover:bg-gray-600 transition-colors"
                            >
                                {country.name}
                            </a>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Behind the Scenes -->
        <div class="mb-6">
            <h2 class="text-xl font-bold text-white mb-2">Thông tin thêm</h2>
            <div class="bg-gray-800 p-4 rounded-lg">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p class="text-gray-400 text-sm">Trạng thái</p>
                        <p class="text-white font-medium">{data.status || 'Đang cập nhật'}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Ngôn ngữ</p>
                        <p class="text-white font-medium">{data.lang || 'Vietsub'}</p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Loại phim</p>
                        <p class="text-white font-medium">
                            {#if data.type === 'series'}
                                Phim bộ
                            {:else if data.type === 'single'}
                                Phim lẻ
                            {:else}
                                {data.type || 'Đang cập nhật'}
                            {/if}
                        </p>
                    </div>
                    <div>
                        <p class="text-gray-400 text-sm">Năm phát hành</p>
                        <p class="text-white font-medium">{data.year || 'Đang cập nhật'}</p>
                    </div>
                </div>
            </div>
        </div>
        
        {#if data.trailer_url}
            <div class="mb-6">
                <h2 class="text-xl font-bold text-white mb-2">Trailer</h2>
                <a 
                    href={data.trailer_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="inline-block bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                >
                    Xem trailer
                </a>
            </div>
        {/if}
    </div>
</div>