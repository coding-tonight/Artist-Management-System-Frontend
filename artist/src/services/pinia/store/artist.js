import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';

import { ArtistEndpoints } from '@/services/endpoints';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';
import router from '@/routers/router';
import { errorHandler } from '@/helpers/ApiErrorHandler';
import { message } from 'ant-design-vue';

export const artistStore = defineStore('artist', {
    state: () => ({
        artists: [],
        isLoading: false,
        errors: null
    }),

    getters: {
        status: (state) => {
            return state.isLoading
        }
    },
    actions: {
       async getArtists (page, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.all(page)
            if(res.status === HttpStatusCode.Ok) {
                console.log(res.data.data.singers)
                const { singers } = res.data.data
                const { pagination  } = res.data.meta
               
                const data = { artists: singers.map((singer, index) => {
                    return {
                        index: pagination.form + index + 1,
                        title: singer.name.toString(),
                        ...singer
                    }
                }),
                pagination: pagination
            }

            this.data = data
            return data
        }

            return []
            
        } catch (error) {
            errorHandler(error)
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async getArtistMusics (id, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.getArtistMusics(id)
            if(res.status === HttpStatusCode.Ok) {   
                const musics = res.data.data
                return musics.map((music, index) => {
                     return {
                       index: index + 1,
                       ...music
                     }
                })
        }

            return []
            
        } catch (error) {
            errorHandler(error)
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async getArtistsWithoutPagination () {
        try {
            const res = await ArtistEndpoints.listWithoutPagination()
            if(res.status === HttpStatusCode.Ok) {
                const { singers } = res.data.data
                const data = { artists: singers.map((singer, index) => {
                    return {
                        index: index + 1,
                        title: singer.name.toString(),
                        ...singer
                    }
                }),
            }

            return data
        }

            return []
            
        } catch (error) {
            errorHandler(error)
          throw new Error(error)
        } finally {
           this.isLoading = false
        }
      },

      async createArtist(values, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.create({ 'singer': values })
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                router.push({ name: 'artist'})
            }
            
        } catch (error) {
           errorHandler(error)
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async getArtistDetails (id, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.getById(id)
            if(res.status === HttpStatusCode.Ok) {
                return res.data.data
            }
        } catch(error) {
            errorHandler(error)
        } finally {
           loading.value = true
        }
      },

      async updateArtist(id, values, loading) { 
        try {
            loading.value = true
            const res = await ArtistEndpoints.update(id, {'singer': values })
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                router.push({ name: 'artist'})
            }
            
        } catch (error) {
            errorHandler(error)
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },


      async deleteArtist (id, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.delete(id)
            if(res.status === HttpStatusCode.Ok) {
               showSuccessNotification(res.data.message ?? 'Successfully deleted')
               return this.getArtists(1, loading)
            }
        } catch(error) {
            errorHandler(error)
        } finally {
           loading.value = false
        }
    },
    
    async export() {
        try {
            this.isLoading = true
            message.loading("loading...")
            const res = await ArtistEndpoints.export()
            if(res.status === HttpStatusCode.Ok) {
               showSuccessNotification(res.data.message ?? 'Successfully Exported CSV')
               message.success("hello")
               const url = window.URL.createObjectURL(new Blob([res.data]))
               // Create an anchor element to trigger the download
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', 'singers.csv')
                document.body.appendChild(link);
                link.click()
                link.remove() // Clean up
            }
        } catch(error) {
            errorHandler(error)
        } finally {
          this.isLoading = false
          message.destroy()
        }
    },
    async import(file, loading) {
        try {
            loading.value = true
            const res = await ArtistEndpoints.import({ "file":file })
            if(res.status === HttpStatusCode.Ok) {
               showSuccessNotification(res.data.message ?? 'Successfully Exported CSV')
               router.push({ name: 'artist'})
            }
        } catch(error) {
            errorHandler(error)
        } finally {
          loading.value = false
        }
    }
},
})