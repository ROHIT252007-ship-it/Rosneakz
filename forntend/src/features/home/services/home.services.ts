
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

export const getLoaction=async()=>{
    
    try {
        
        const res = await apiClient.get(`/location`);
        console.log(res.data?.data)
        return res.data?.data;
    } catch (error: any) {
        console.error(error.response?.data || error.message);
        return null;
    }
}
