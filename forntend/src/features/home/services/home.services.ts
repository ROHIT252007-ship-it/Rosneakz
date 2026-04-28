
import { apiClient } from "../../../shared/services/apiClient";
export const getProducts = async () => {
    try {
        
        const res = await apiClient.get(`/shoes/get`);
        
        return res.data;
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        return null;
    }
};