import axios, { InternalAxiosRequestConfig } from "axios";
import { appStore } from "@/store/index";

const api = axios.create({
  // url que viene del .env o el local
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3001/v1", 
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials:true
});

// Add a request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const { user } = appStore.getState();
  const token = user?.token;
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log("token", token);
  }

  return config;
});

export default api;
