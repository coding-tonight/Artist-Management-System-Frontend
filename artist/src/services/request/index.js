import { getToken } from "@/helpers/common"

const httpClient = axios.create({
    baseURL: import.meta.VITE_BASE_API_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
})

httpClient.interceptors.request.use(config => {
    const token = getToken()
     if(token) {
        config.headers.common['Authorization'] = `bearer ${token}`
     }
     return config
}, error => {
   return Promise.reject(error)
})

httpClient.interceptors.response.use(response => {
     return response
}, error => {
    return Promise.reject(error)
})

export { httpClient }