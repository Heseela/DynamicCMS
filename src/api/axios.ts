
import axios from "axios";
import { useAuth } from "../components/context/AuthProvider";

export const useAxios = () => {
    const { access_token, setAuth } = useAuth();

    const axiosInstance = axios.create({
        baseURL: import.meta.env.VITE_URL,
        headers: {
            Authorization: `Bearer ${access_token}`,
        },
        withCredentials: true,
    });

    const MAX_RETRIES = 3;

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            // Handle 401 Unauthorized
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;
                const response = await axios.post(
                    `${import.meta.env.VITE_URL}/auth/refresh`,
                    {},
                    {
                        withCredentials: true,
                    }
                );

                if (response.status === 200) {
                    const newAccessToken = response.data.access_token;
                    setAuth(newAccessToken);

                    axiosInstance.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                    return axiosInstance(originalRequest);
                }
            }

            // Handle 429 Too Many Requests
            if (error.response.status === 429 && !originalRequest._retryCount) {
                originalRequest._retryCount = originalRequest._retryCount || 0;

                if (originalRequest._retryCount < MAX_RETRIES) {
                    originalRequest._retryCount += 1;

                    // Extract the retry-after header if available
                    const retryAfter = error.response.headers["retry-after"];
                    const delay = retryAfter ? parseInt(retryAfter) * 1000 : 2000; // default delay of 2 seconds

                    await new Promise((resolve) => setTimeout(resolve, delay));

                    return axiosInstance(originalRequest);
                }
            }

            return Promise.reject(error);
        }
    );

    return axiosInstance;
};
