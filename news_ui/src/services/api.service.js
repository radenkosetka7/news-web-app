import axios from "axios";

const apiService = axios.create({
    baseURL: "/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default apiService;