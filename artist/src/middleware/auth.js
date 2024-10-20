import { getToken } from "@/helpers/common";


/**
 * middleware check if the  user is authenticated or not
 * if not then redirect to login page
 * @param {*} param0 
 * @returns 
 */

export default function auth({ next, router, to }) {
   const token = getToken()

   if(!token) return router.push({ name: 'login' })

    const { authorize } = to.meta

    if(authorize) {
      console.log('hello')
    }
    next()
}