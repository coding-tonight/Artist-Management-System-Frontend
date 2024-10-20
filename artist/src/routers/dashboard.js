import { HomeView, DashboardView , ArtistView } from "@/pages"
import { auth } from "@/middleware"

const dashboardRoutes = [
    { 
        path: '/home',
        component: HomeView , 
        name: 'home', 
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        } 
    },
    { 
        path: '/',
        component: DashboardView , 
        name: 'dashboard', 
    },
    { 
        path: '/artists',
        component: ArtistView , 
        name: 'artist', 
    },
]

export default dashboardRoutes 