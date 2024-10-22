import { createRouter , createWebHistory } from 'vue-router'

import dashboardRoutes from './dashboard'
import guestRoutes from './routes'
import { NotFoundView } from '@/pages'

const routes = [
  ...guestRoutes,
  ...dashboardRoutes,
  { path: '/:pathMatch(.*)*', component: NotFoundView }
]

const router = createRouter({
  history: createWebHistory(),
  routes, 
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // if no subsequentMiddleware exists, then return next()

  if(!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
     context.next(...parameters)
  // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  }
}

router.beforeEach((to, from, next) => {
   if(to.meta.middleware) {
      const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware]

      const context = {
        from,
        next,
        router,
        to,
      }
      const nextMiddleware = nextFactory(context, middleware, 1);
      return middleware[0]({ ...context, next: nextMiddleware });    
    }

    return next();
})

export default router