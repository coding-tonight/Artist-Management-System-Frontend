import { defineStore } from 'pinia'
import { HttpStatusCode } from 'axios';

import { ReportEndpoints } from '@/services/endpoints';

import { showErrorNotification, showSuccessNotification } from '@/helpers/notification';

export const reportStore = defineStore('report', {
    state: () => ({
        report: [],
        loading: false,
    }),

    getters: {
    
    },
    actions: {
        async getMusicStatusByGenre () {
            try {
                this.loading = true
                const res = await ReportEndpoints.musicsCountByGenre()
                if(res.status === HttpStatusCode.Ok) {
                    this.report = res.data.data
                    return res.data.data
                }
    
                return {}
                
            } catch (error) {
                showErrorNotification("Ops something went wrong")
              throw new Error(error)
            } finally {
               this.loading = false
            }
          },
    }
})