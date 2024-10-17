import axios from "axios";


const refreshAccessToken = async () => {
    const refreshToken = sessionStorage.getItem("refreshToken");
    try {
        const response = await axios.post('http://127.0.0.1:9001/api/v1/auth/token/refresh', {
            Authorization: refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        localStorage.setItem("accessToken", newAccessToken);
        return newAccessToken;
    } catch (error) {
        throw error;
    }
};
const baseService = {
    service: (useAuth) => {
        const instance = axios;
        instance.defaults.headers.common["Content-Type"] = "application/json";
        instance.defaults.headers.common["Accept"] = "application/json";
        if (useAuth) {
            instance.interceptors.request.use(
                async (config) => {
                    const token = sessionStorage.getItem("access");
                    if (token) {
                        config.headers = {
                            ...config.headers,
                            Authorization: `Bearer ${token}`
                        };
                    }
                    return config;
                },
                (error) => {
                    return Promise.reject(error);
                }
            );

            instance.interceptors.response.use(
                (response) => {
                    return response;
                },
                async (error) => {
                    const originalRequest = error.config;

                    if (error.response.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;

                        try {
                            const newAccessToken = await refreshAccessToken();
                            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                            return instance(originalRequest);
                        } catch (refreshError) {
                            return Promise.reject(refreshError);
                        }
                    }

                    return Promise.reject(error);
                }
            );
        }
        return instance;
    }
};
export default baseService;
