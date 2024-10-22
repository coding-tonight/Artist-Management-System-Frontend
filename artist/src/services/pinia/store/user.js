import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';

import { UserEndpoints } from '@/services/endpoints';
import router from '@/routers/router';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';

export const userStore = defineStore('user', {
    state: () => ({
        user: null,
    }),

    actions: {
       async getUsers (page, loading) {
        try {
            loading.value = true
            const res = await UserEndpoints.all(page)
            if(res.status === HttpStatusCode.Ok) {
                const { users } = res.data.data
                const { pagination  } = res.data.meta
               
                return { users: users.map((user, index) => {
                    return {
                        index: index + 1,
                        key: user.id,
                        title: `${user.first_name} ${user.last_name}`,
                        ...user
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

      async createUser(values, loading) {
        try {
            loading.value = true
            const res = await UserEndpoints.create({'user': values })
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                router.push({ name: 'user'})
            }
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async getUserDetails (id, loading) {
        try {
            loading.value = true
            const res = await UserEndpoints.getById(id)
            if(res.status === HttpStatusCode.Ok) {
                return res.data
            }
        } catch(error) {
            console.log(error.response.data.error)
            showErrorNotification('error')
        } finally {
           loading.value = true
        }
      },

      async updateUser(id, values, loading) {
        try {
            loading.value = true
            const res = await UserEndpoints.update(id, {'user': values })
            console.log(res)
            if(res.status === HttpStatusCode.Ok) {
                showSuccessNotification(res.data.message ?? 'Success')
                router.push({ name: 'user'})
            }
            
        } catch (error) {
            showErrorNotification("error")
          throw new Error(error)
        } finally {
           loading.value = false
        }
      },

      async deleteUser (id, loading) {
        try {
            loading.value = true
            const res = await UserEndpoints.delete(id)
            if(res.status === HttpStatusCode.Ok) {
               showSuccessNotification(res.data.message ?? 'Successfully deleted')
               return  this.getUsers(1, loading)
            }
        } catch(error) {
            console.log(error.response.data.error)
            showErrorNotification('error')
        } finally {
           loading.value = false
        }
    }
    }
})