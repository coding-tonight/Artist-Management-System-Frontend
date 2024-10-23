import { 
    HomeView, 
    DashboardView ,
    ArtistView,
    CreateArtistView,
    EditArtistView,
    MusicView,
    CreateMusicView,
    EditMusicView,
    UserView,
    CreateUserView,
    EditUserView,
    PermissionDeniedView,
    ArtistMusicView,
    UploadCSVArtistView,
} from "@/pages"

import { auth } from "@/middleware"

const dashboardRoutes = [
    { 
        path: '/home',
        component: HomeView , 
        name: 'home', 
        meta: {
            middleware: auth,
            authorize: ['super_admin', 'artist_manager', 'artist']
        } 
    },
    { 
        path: '/',
        component: DashboardView , 
        name: 'dashboard', 
        meta: {
            middleware: auth,
            authorize: ['super_admin', 'artist_manager', 'artist']
        } 
    },
    { 
        path: '/users',
        component: UserView , 
        name: 'user',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/users/create',
        component: CreateUserView , 
        name: 'createUser',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/users/edit/:id',
        component: EditUserView , 
        name: 'editUser',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/artists',
        component: ArtistView , 
        name: 'artist',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/artists/create',
        component: CreateArtistView , 
        name: 'createArtist',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/artists/edit/:id',
        component: EditArtistView , 
        name: 'editArtist',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/artists/:id/musics',
        component: ArtistMusicView , 
        name: 'artistMusicId',
        meta: {
            middleware: auth,
            authorize: ['super_admin', 'artist_manager']
        }  
    },
    { 
        path: '/artists/musics',
        component: ArtistMusicView , 
        name: 'artistMusic',
        meta: {
            middleware: auth,
            authorize: ['artist']
        }  
    },
    { 
        path: '/artists/uploads',
        component: UploadCSVArtistView , 
        name: 'artistUploads',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/musics',
        component: MusicView , 
        name: 'music',
        meta: {
            middleware: auth,
            authorize: ['super_admin']
        }  
    },
    { 
        path: '/musics/create',
        component: CreateMusicView , 
        name: 'createMusic',
        meta: {
            middleware: auth,
            authorize: ['super_admin', 'artist']
        }  
    },
    { 
        path: '/musics/edit/:id',
        component: EditMusicView , 
        name: 'editMusic',
        meta: {
            middleware: auth,
            authorize: ['super_admin', 'artist']
        }  
    },
    { 
        path: '/unauthorized',
        component: PermissionDeniedView , 
        name: 'unauthorized',
        meta: {
            middleware: auth,
        }  
    },
]

export default dashboardRoutes 