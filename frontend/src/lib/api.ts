import axios from "axios";
import { useAuthStore } from "@/store/authStore";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Access token directly from Zustand state
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Global error handler
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const accountApi = {
  getProfile: () => api.get("/accounts/me/"),
  updateProfile: (data: any) => api.patch("/accounts/me/", data),
  
  getAddresses: () => api.get("/accounts/addresses/"),
  addAddress: (data: any) => api.post("/accounts/addresses/", data),
  updateAddress: (id: string, data: any) => api.patch(`/accounts/addresses/${id}/`, data),
  deleteAddress: (id: string) => api.delete(`/accounts/addresses/${id}/`),
  
  getWishlist: () => api.get("/accounts/wishlist/"),
  addToWishlist: (productId: string) => api.post("/accounts/wishlist/", { product: productId }),
  removeFromWishlist: (id: string) => api.delete(`/accounts/wishlist/${id}/`),
};
