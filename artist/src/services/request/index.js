import axios from "axios"

import { getToken } from "@/helpers/common"
import { errorHandler } from "@/helpers/ApiErrorHandler"
import { handleError } from "vue"
import router from "@/routers/router"

const httpClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
})

httpClient.interceptors.request.use(config => {
    const token = getToken()
     if(token) {
        config.headers['Authorization'] = `bearer ${token}`
     }
     return config
}, error => {
   return Promise.reject(error)
})

httpClient.interceptors.response.use(response => {
     return response
}, error => {
    if(error.response.status === 403) {
        router.replace({ name: 'unauthorized'})
        console.log(error.response.status)
    } else if(error.response.status === 401) {
         localStorage.clear()
         router.replace({ name: 'login' })
    } else {
        return Promise.reject(error)
    }
    return Promise.reject(error)
})

export { httpClient }