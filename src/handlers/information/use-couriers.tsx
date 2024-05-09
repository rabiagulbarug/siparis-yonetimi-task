import axios from "axios";
import { useQuery } from '@tanstack/react-query';

async function couriers() {
    try {
        const response = await axios.get('/database/database.json');
        return response.data.couriers;
    } catch (error) {
        throw new Error('Veri alınamadı.');
    }
}

export const useCouriersQuery = () => {
    return useQuery({
        queryKey: ['couriers'],
        queryFn: () => couriers(),
    });
};
