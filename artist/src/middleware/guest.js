import { getToken } from "@/helpers/common";


/**
 * middleware check if the  user is authenticated or not
 * if not then redirect to login else redirect ot the dashboard
 * @param {*} param0 
 * @returns 
 */

export default function guest({ next, router }) {
   const token = getToken()

   if(token) return router.push({ name: 'dashboard' })
    next()
}