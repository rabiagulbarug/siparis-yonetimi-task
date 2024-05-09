import axios from "axios";
import { useQuery } from '@tanstack/react-query';

async function orders() {
    try {
        const response = await axios.get('/database/database.json');
        return response.data.orders;
    } catch (error) {
        throw new Error('Veri alınamadı.');
    }
}

export const useOrdersQuery = () => {
    return useQuery({
        queryKey: ['orders'],
        queryFn: () => orders(),
    });
};
