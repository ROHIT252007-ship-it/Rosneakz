import axios, { AxiosError } from "axios";
import { getCartFromStorage } from "./cartStorage";
import { URL } from "@env";
import { getToken } from "../../../shared/services/token";
import { apiClient } from "../../../shared/services/apiClient";

export const cartStore = async (
  email: string,
  phone: string,
  address: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const cart = await getCartFromStorage();
    const token = await getToken();

    if (!URL) {
      return {
        success: false,
        message: "API URL is missing from .env",
      };
    }

    if (!token) {
      return {
        success: false,
        message: "Token not found",
      };
    }

    const res = await apiClient.post(
      `/add-cart`,
      { email, phone, address, cart },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
if(!res.data.error){

  return {
    success: true,
    message: res.data.message || "Cart saved",
  };
}else{
  return {
      success: false,
      message:
        res.data.message || "Cart failed",
    };
}
  } catch (err) {
    const error = err as AxiosError<any>;
    return {
      success: false,
      message:
        error.response?.data?.message || error.message || "Cart failed",
    };
  }
};