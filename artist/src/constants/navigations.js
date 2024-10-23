import { h } from "vue"

import { UserOutlined , DashboardOutlined , AudioOutlined, ContactsOutlined } from "@ant-design/icons-vue"

export const sideMenu = [
    {
        key: '/',
        label: 'Dashboard',
        icon: () => h(DashboardOutlined)
    },
    {
        key: '/users',
        label: 'User',
        icon: () => h(UserOutlined)
    },
    {
        key: '/artists',
        label: 'Artists',
        icon: () => h(ContactsOutlined)
    },
    {
        key: '/musics',
        label: 'Music',
        icon: () => h(AudioOutlined)
    }
]

export const artistSideMenu = [
    {
        key: '/',
        label: 'Dashboard',
        icon: () => h(DashboardOutlined)
    },
    {
        key: '/artists/musics',
        label: 'Music',
        icon: () => h(AudioOutlined)
    }
]