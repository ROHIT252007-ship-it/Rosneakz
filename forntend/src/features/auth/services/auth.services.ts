
import { storeToken } from "../../../shared/services/token";
import { apiClient } from "../../../shared/services/apiClient";

export const getLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await apiClient.post(`/auth/login`, {
      email,
      password,
    });
    const storeTokens=await storeToken(res.data.token);
    if(storeTokens){

      return true; 
    }
    return false;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return false; 
  }
};

export const getSignup = async (name:string,email: string, password: string): Promise<boolean> => {
  try {
    const res = await apiClient.post(`/auth/register`, {
      name,
      email,
      password,

    });

    const storeTokens=await storeToken(res.data.token);
    if(storeTokens){

      return true; 
    }
    return false;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return false; 
  }
};

export const changePassword = async (email: string, password: string): Promise<boolean> => {
  try {
    const res = await apiClient.put(`/auth/change-password`, {
      email,
      password,
    });

  
   if (!res.data?.error) {
      return true;
    }
    return false;
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    return false; 
  }
};