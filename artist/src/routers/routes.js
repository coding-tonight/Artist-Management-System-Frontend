import { LoginView, RegisterView  } from "@/pages"
import { guest } from "@/middleware"

const guestRoutes = [
    { 
        path: '/login',
        component: LoginView , 
        name: 'login', 
        meta: {
            middleware: guest,
            authorize: ['super_admin']
        } 
    },
    { 
        path: '/register',
        component: RegisterView, 
        name: 'register', 
        meta: {
            middleware: guest,
            authorize: ['super_admin']
        } 
    },
]

export default guestRoutes