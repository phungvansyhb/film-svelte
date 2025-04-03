<script lang="ts">
    type VideoPlayerProps = {
        src: string;
        poster?: string;
        title?: string;
        autoplay?: boolean;
        controls?: boolean;
        width?: number;
        height?: number;
    }

    const { 
        src, 
        poster = '', 
        title = '', 
        autoplay = false, 
        controls = true,
        width = 16,
        height = 9
    }: VideoPlayerProps = $props();

    let iframeElement = $state<HTMLIFrameElement | null>(null);
    let videoElement = $state<HTMLVideoElement | null>(null);
    let errorMessage = $state('');
    
    const isM3U8 = $derived(src.includes('.m3u8'));
    
    const videoSrc = (() => {
        try {
            new URL(src);
            if (isM3U8) {
                return src;
            }
            const autoplayParam = autoplay ? '1' : '0';
            
            if (src.includes('?')) {
                return `${src}&autoplay=${autoplayParam}`;
            } else {
                return `${src}?autoplay=${autoplayParam}`;
            }
        } catch (e) {
            errorMessage = `Invalid URL: ${src}`;
            console.error('Invalid video URL:', src);
            return '';
        }
    })();

    
    function handleIframeError() {
        errorMessage = 'Failed to load video. Please check the URL or try again later.';
        console.error('Video iframe failed to load:', src);
    }
    
    function handleVideoError() {
        errorMessage = 'Failed to load video. Please check the URL or try again later.';
        console.error('Video element failed to load:', src);
    }
</script>

<div class="video-player-container relative w-full bg-black rounded-lg overflow-hidden" style="aspect-ratio: {width}/{height};">
    {#if errorMessage}
        <div class="flex items-center justify-center h-full bg-gray-800 text-white p-4 text-center">
            <div>
                <p class="text-red-500 font-bold mb-2">Error</p>
                <p>{errorMessage}</p>
                <p class="text-sm mt-2">URL: {src}</p>
            </div>
        </div>
    {:else if videoSrc}
        <div class="relative w-full h-full">
            {#if isM3U8}
                <!-- For m3u8 links, use a video element -->
                <video
                    bind:this={videoElement}
                    class="w-full h-full"
                    controls={controls}
                    autoplay={autoplay}
                    poster={poster}
                    onerror={handleVideoError}
                >
                    <source src={videoSrc} type="application/x-mpegURL">
                    <track kind="captions" src="" label="English" srclang="en" default>
                    Your browser does not support the video tag.
                </video>
            {:else}
                <!-- For embed links, use an iframe -->
                <iframe
                    bind:this={iframeElement}
                    title={title}
                    src={videoSrc}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen; autoplay"
                    allowfullscreen
                    class="w-full h-full"
                    loading="lazy"
                    onerror={handleIframeError}
                ></iframe>
            {/if}
        </div>
    {:else}
        <div class="flex items-center justify-center h-full bg-gray-800 text-white p-4 text-center">
            <p>No video source provided</p>
        </div>
    {/if}
</div>

<style>
    .video-player-container {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
</style> 