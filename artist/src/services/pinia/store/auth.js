import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';

import { AuthEndpoints } from '@/services/endpoints';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';
import { decodeBase64, encodeBase64 , mapDate } from '@/helpers/common';
import router from '@/routers/router';
import { errorHandler } from '@/helpers/ApiErrorHandler';

export const authStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
    }),

    getters: {
       getToken: (state) => {
           if(!state.token) {
             const encodedData = localStorage.getItem('access_token')
             return decodeBase64(encodedData)
           }
           return state.token
       },

       me: (state) => {
         if(!state.user) {
            const encodedData = localStorage.getItem('user')
            const decoded =  decodeBase64(encodedData)
            return JSON.parse(decoded)
         }
         return state.user
       },
    },
    actions: {
       async signIn (values, loading) {
        try {
            loading.value = true
            const res = await AuthEndpoints.signIn({'user': values })
            if(res.status === HttpStatusCode.Ok) {
                const { token ,email , role , artist_id ,full_name } = res.data
                
                this.token = token
                this.user = {
                    email,
                    role,
                    artist_id,
                    full_name,
                }

                localStorage.setItem('access_token', encodeBase64(token.toString()))
                localStorage.setItem('user', encodeBase64(JSON.stringify({
                    email, 
                    role,
                    artist_id,
                    full_name,
                })))
                router.push({ name: 'dashboard'})
                showSuccessNotification("User logged In")
            }
        } catch (error) {
            showErrorNotification(error.response?.data.message)
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async register (values, loading) {
        try {
          loading.value = true
          const res = await AuthEndpoints.signUp({ 'user': {...values, dob: mapDate(values.dob) }})
          if(res.status === HttpStatusCode.Ok) {
            router.replace({ name: 'login' })
            showSuccessNotification(res.data?.message ?? 'Successfully registered')
          }
        } catch (error) {
           errorHandler(error)
           throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      logOut () {
        this.token = null
        this.user = null
        localStorage.clear()
        router.replace({ name: 'login' })
        showSuccessNotification("User logged Out")
      } 
    },
})