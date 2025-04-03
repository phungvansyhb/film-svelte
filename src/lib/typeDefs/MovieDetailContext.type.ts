export type Episode = {
    name: string;
    slug: string;
    filename : string
    link_embed: string;
    link_m3u8: string;
}

export type MovieContext = {
    currentServer: string | null;
    currentEpisode: Episode | null;
    playEpisode: (episode: Episode) => void;
    videoSourceType: string;
    toggleVideoSource: () => void;
    showM3U8Note: boolean;
};