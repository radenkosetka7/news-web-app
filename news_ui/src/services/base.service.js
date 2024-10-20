import axios from "axios";


const baseService = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

function base64UrlDecode(str) {
    str = str.replace(/-/g, '+').replace(/_/g, '/');

    switch (str.length % 4) {
        case 2:
            str += '==';
            break;
        case 3:
            str += '=';
            break;
    }

    return atob(str);
}

function decodeJwt(token) {
    const parts = token.split('.');

    if (parts.length !== 3) {
        throw new Error('Invalid JWT token');
    }

    const payload = base64UrlDecode(parts[1]);

    return JSON.parse(payload);
}

const interceptor = store => {
    baseService.interceptors.request.use(
        request => {
            let token = localStorage.getItem("accessToken");

            const decodeToken = decodeJwt(token);
            if (decodeToken.exp < Date.now() / 1000) {
                getNewToken();
            }
            request.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
            return request;
        },
        error => {
            return Promise.reject(error);
        }
    );

    baseService.interceptors.response.use(
        response => {
            return response;
        },

        async error => {
            if (error && error.response.status === 401) {
                await getNewToken();

                const token = localStorage.getItem("accessToken");
                error.config.headers.Authorization = `Bearer ${token}`;
                return baseService(error.config);
            }
            return Promise.reject(error);
        }
    );
}

const getNewToken = async () => {
    try {
        const request = {
            refreshToken: localStorage.getItem("refreshToken")
        };
        const response = await axios.post('http://127.0.0.1:9001/api/v1/auth/token/refresh', request)

        localStorage.setItem("accessToken", response.data.accessToken);
    } catch (e) {
        console.log("Error", e);
    }
};

export default baseService;
export {interceptor};
