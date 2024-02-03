export interface AnimeDataProps {
    data: {
        title: string;
        score: number;
        images: {
            jpg: {
                image_url: string;
                large_image_url: string;
                small_image_url: string;
            },
            webp: {
                image_url: string;
                large_image_url: string;
                small_image_url: string;
            }
        }
    }[];
    current_page: number;
    has_next_page: boolean;
}