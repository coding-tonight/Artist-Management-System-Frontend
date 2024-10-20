import { h } from "vue"

import { UserOutlined , DashboardOutlined } from "@ant-design/icons-vue"

export const sideMenu = [
    {
        key: '/',
        label: 'Dashboard',
        icon: () => h(DashboardOutlined)
    },
    {
        key: '/artists',
        label: 'Artists',
        icon: () => h(UserOutlined)
    }
]