import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const baseUrl = "http://localhost:5000/api";

export const axiosInstance = axios.create({
  baseURL: baseUrl,
});
