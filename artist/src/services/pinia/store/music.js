import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';
import router from '@/routers/router';

import { MusicEndpoints } from '@/services/endpoints';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';
import { authStore } from './auth';

export const musicStore = defineStore('music', {
    state: () => ({
        musics: null,
    }),

    actions: {
       async getMusics (page = 1, loading) {
        try {
            loading.value = true
            const res = await MusicEndpoints.all(page)
            if(res.status === HttpStatusCode.Ok) {
                const { musics } = res.data.data
                const { pagination  } = res.data.meta
               
                return { musics: musics.map((music, index) => {
                    return {
                        index: pagination.form + index + 1,
                        ...music
                    }
                }),
                pagination: pagination
            }
            }

            return []
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async createMusic(values, loading) {
        try {
            loading.value = true
            const res = await MusicEndpoints.create({ 'music': values })
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                const auth = authStore()
                if(auth.me.role == 'artist') {
                    router.push({ name: 'artistMusic'})
                    return 
                }
                router.push({ name: 'music'})
            }
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async getMusicDetails (id, loading) {
        try {
            loading.value = true
            const res = await MusicEndpoints.getById(id)
            if(res.status === HttpStatusCode.Ok) {
                return res.data.data
            }
        } catch(error) {
            console.log(error.response.data.error)
            showErrorNotification('error')
        } finally {
           loading.value = true
        }
      },

      async updateMusic(id, values, loading) { 
        try {
            loading.value = true
            const res = await MusicEndpoints.update(id, {'music': values })
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                const auth = authStore()
                if(auth.me.role == 'artist') {
                    router.push({ name: 'artistMusic'})
                    return 
                }
                router.push({ name: 'music'})
            }
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },


      async deleteMusic(id, loading) {
        try {
            loading.value = true
            const res = await MusicEndpoints.delete(id)
            if(res.status === HttpStatusCode.Ok) {
               showSuccessNotification(res.data.message ?? 'Successfully deleted')
               return this.getMusics(1, loading)
            }
        } catch(error) {
            console.log(error.response.data.error)
            showErrorNotification('error')
        } finally {
           loading.value = false
        }
    },
    },
})