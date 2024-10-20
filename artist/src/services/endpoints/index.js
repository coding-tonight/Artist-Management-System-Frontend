import { httpClient } from "../request"

export const AuthEndpoints = {
    signIn: (data) => {
        return httpClient.post('/tokens', data)
    },
    SignUp: (data) => {
        return httpClient.post('/users', data)
    }
}

export const ArtistEndpoints = {
    all: () => {
        return httpClient.get('/singers')
    },
    getById: (id) => {
       return httpClient.get(`/singers/${id}`)
    },
    create: (data) => {
       return httpClient.post('/signers', data)
    },
    update: (id, data) => {
       return httpClient.post(`/singers/${id}`, data)
    }
}


export const UserEndpoints = {
    all: () => {
        return httpClient.get('/singers')
    },
    getById: (id) => {
       return httpClient.get(`/singers/${id}`)
    },
    create: (data) => {
       return httpClient.post('/signers', data)
    },
    update: (id, data) => {
       return httpClient.post(`/singers/${id}`, data)
    }
}

export const MusicEndpoints = {
    all: () => {
        return httpClient.get('/singers')
    },
    getById: (id) => {
       return httpClient.get(`/singers/${id}`)
    },
    create: (data) => {
       return httpClient.post('/signers', data)
    },
    update: (id, data) => {
       return httpClient.post(`/singers/${id}`, data)
    }
}