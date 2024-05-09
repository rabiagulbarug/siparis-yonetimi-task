import axios from "axios";
import { useQuery } from '@tanstack/react-query';

async function baskets() {
    try {
        const response = await axios.get('/database/database.json');
        return response.data.baskets;
    } catch (error) {
        throw new Error('Veri alınamadı.');
    }
}

export const useBasketsQuery = () => {
    return useQuery({
        queryKey: ['baskets'],
        queryFn: () => baskets(),
    });
};
