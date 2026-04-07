import axios from "axios";
import { useAuth } from "@clerk/expo";
import { useEffect } from "react";
import * as Sentry from "@sentry/react-native";

const API_URL = "https://master-sqody.sevalla.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let interceptorsRegistered = false;
let currentRequestInterceptor: number | null = null;
let currentResponseInterceptor: number | null = null;

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
        // Eject previous interceptors if they exist
    if (currentRequestInterceptor !== null) {
      api.interceptors.request.eject(currentRequestInterceptor);
    }
    if (currentResponseInterceptor !== null) {
      api.interceptors.response.eject(currentResponseInterceptor);
    }

    currentRequestInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    currentResponseInterceptor = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          // Handle api error from sentry
          Sentry.logger.error(
            Sentry.logger
              .fmt`API request failed: ${error.config.method.toUpperCase()} ${error.config.url}}`,
            {
              status: error.response.status,
              endpoint: error.config.url,
              method: error.config.method,
            },
          );
        } else if (error.request) {
          Sentry.logger.warn("API request failed - no response received", {
            endpoint: error.config.url,
            method: error.config.method,
          });
        }
        return Promise.reject(error);
      },
    );

     interceptorsRegistered = true;

    return () => {
      //Only cleanup on final unmount if needed
    };
  }, [getToken]);
  return api;
};
