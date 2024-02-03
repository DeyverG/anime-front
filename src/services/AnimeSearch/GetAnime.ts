import { AnimeDataProps } from "../../interfaces/AnimeSearch/AnimeSearch";

// Function: GetAnime, search for anime by name 
export const GetAnime = async (name: string, page: number): Promise<AnimeDataProps | null> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BACKEND_URL}/anime?name=${name}&limit=10&page=${page}`);
        const data = await response.json();
        return data;
    } catch (error) {
        return null;
    }
};