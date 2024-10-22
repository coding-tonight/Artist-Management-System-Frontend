import { getToken } from "@/helpers/common";
import { authStore } from "@/services/pinia/store/auth";


/**
 * middleware check if the  user is authenticated or not
 * if not then redirect to login page
 * @param {*} param0 
 * @returns 
 */

export default function auth({ next, router, to }) {
   const token = getToken()
   const store = authStore()

   if(!token) return router.push({ name: 'login' })

    const { authorize } = to.meta

    if (!authorize) {
      next()
      return 
    }
    
    if(authorize && authorize.includes(store.me.role)) {
        next()
    } else {
       window.location.replace('/unauthorized')
    }
}