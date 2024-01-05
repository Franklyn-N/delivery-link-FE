/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const baseURL = "https://delivery-link-backend.onrender.com/api";

interface CustomRequest extends AxiosRequestConfig {
  headers: {
    Accept: string;
    "Content-Type": string;
    Authorization?: string;
  };
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL,
  headers: {
    Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json ",
    "Access-Control-Allow-Headers": "Content-Type",
  },
});

const addTokenToRequest: any = async (req: CustomRequest) => {
  const token = localStorage.getItem("DLTK");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
};

axiosInstance.interceptors.request.use(addTokenToRequest);

export default axiosInstance;
