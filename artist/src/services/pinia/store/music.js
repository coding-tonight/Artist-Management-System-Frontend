import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';

import { MusicEndpoints } from '@/services/endpoints';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';

export const musicStore = defineStore('music', {
    state: () => ({
        musics: null,
    }),

    getters: {
     
    },

    actions: {
       async getMusics (page = 1, loading) {
        try {
            loading.value = true
            const res = await MusicEndpoints.all(page)
            if(res.status === HttpStatusCode.Ok) {
                console.log(res.data.data.singers)
                const { musics } = res.data.data
                const { pagination  } = res.data.meta
               
                return { musics: musics.map((music, index) => {
                    return {
                        index: index + 1,
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
                router.push({ name: 'music'})
            }
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },
    },
})