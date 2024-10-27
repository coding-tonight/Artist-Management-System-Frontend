import { httpClient } from "../request"
import axios from "axios"

export const AuthEndpoints = {
    signIn: (data) => {
        return axios.post(`${import.meta.env.VITE_BASE_API_URL}tokens`, data)
    },
    signUp: (data) => {
        return axios.post(`${import.meta.env.VITE_BASE_API_URL}/users`, data)
    }
}

export const ArtistEndpoints = {
    all: (page) => {
        return httpClient.get(`/singers?page=${page}`)
    },
    listWithoutPagination: () => {
        return httpClient.get('/singer/list')
    },
    getById: (id) => {
       return httpClient.get(`/singers/${id}`)
    },
    create: (data) => {
       return httpClient.post('/singers', data)
    },
    update: (id, data) => {
       return httpClient.patch(`/singers/${id}`, data)
    },
    delete: (id) => {
        return httpClient.delete(`/singers/${id}`)
    },
    export: () => {
        return httpClient.post('/singers/export', {
            responseType: 'blob' 
        })
    },
    import: (file) => {
        return httpClient.post('singers/import', file, {
            headers: {
                'Content-Type': 'multipart/form-data',
             },
        })
    },
    getArtistMusics(id) {
       return httpClient.get(`singers/${id}/musics`)
    }
}


export const UserEndpoints = {
    all: (page = 1) => {
        return httpClient.get(`/users?page=${page}`)
    },
    getById: (id) => {
       return httpClient.get(`/users/${id}`)
    },
    create: (data) => {
       return httpClient.post('/users/admin', data)
    },
    update: (id, data) => {
       return httpClient.patch(`/users/${id}`, data)
    },
    delete: (id) => {
        return httpClient.delete(`/users/${id}`)
    }
}

export const MusicEndpoints = {
    all: (page) => {
        return httpClient.get(`/musics?page=${page}`)
    },

    getById: (id) => {
       return httpClient.get(`/musics/${id}`)
    },
    create: (data) => {
       return httpClient.post('/musics', data)
    },
    update: (id, data) => {
       return httpClient.put(`/musics/${id}`, data)
    },
    delete: (id) => {
        return httpClient.delete(`/musics/${id}`)
    }
}

export const ReportEndpoints = {
    musicsCountByGenre: () => {
        return httpClient.get('/reports')
    }
}