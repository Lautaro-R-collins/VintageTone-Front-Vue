import axios from 'axios'
export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'
const API_URL = BASE_URL

const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default api
