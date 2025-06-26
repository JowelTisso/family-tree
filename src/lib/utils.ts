import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});

export const saveToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: string) => {
  const result = localStorage.getItem(key);
  return result;
};
