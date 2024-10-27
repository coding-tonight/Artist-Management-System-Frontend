
<template>
  <a-drawer
    v-if="isSmallScreen"
    :placement="'left'"
    :closable="true"
    :open="collapsed"
    @close="prop.closed"
     class="w-[100%]"
  >
  <a-menu 
      class="w-[100%]"
      v-model:selectedKeys="selectedKeys"
      v-if="auth.me?.role == 'artist'" 
      :items="artistSideMenu" @click="(item) => navigate(item)"
    />

  <a-menu 
     class="w-[100%]"
     v-model:selectedKeys="selectedKeys" 
     v-else-if="auth.me?.role == 'artist_manager'"
     :items="artistManagerMenu" @click="(item) => navigate(item)"
    />

    <a-menu 
     class="w-[100%]"
     v-model:selectedKeys="selectedKeys" 
     v-else
     :items="sideMenu" @click="(item) => navigate(item)"
    />
  </a-drawer>

  <a-layout-sider 
      v-else
      v-model:collapsed="prop.collapsed" 
      :trigger="null" 
      :style="{ overflow: 'auto', height: '100vh', position: 'sticky', left: 0, top: 0, bottom: 0 }"
      collapsible theme="light"
    >
      <img 
        src="/logo.png" 
        alt="logo" 
        class="mt-2 mb-3 mx-auto" 
        height="300" 
        :width="collapsed ? 50: 100"
      >

       <a-menu 
        class="w-[100%]"
        v-model:selectedKeys="selectedKeys"
        v-if="auth.me?.role == 'artist'" 
        :items="artistSideMenu" @click="(item) => navigate(item)"
      />

      <a-menu 
        class="w-[100%]"
        v-model:selectedKeys="selectedKeys" 
        v-else-if="auth.me?.role == 'artist_manager'"
        :items="artistManagerMenu" @click="(item) => navigate(item)"
        />

      <a-menu 
        class="w-[100%]"
        v-model:selectedKeys="selectedKeys" 
        v-else
        :items="sideMenu" @click="(item) => navigate(item)"
      />
    </a-layout-sider>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { authStore } from '@/services/pinia/store/auth';
import { sideMenu , artistSideMenu, artistManagerMenu } from '@/constants/navigations';
import { useMediaQuery } from '@vueuse/core'

const prop = defineProps({
  collapsed: Boolean,
  closed: Function,
})

const currentPath = () => {
  const pathname = window.location.pathname
   if(pathname.startsWith('/musics')) return '/musics'
   else if (pathname === '/artists/musics') return pathname
   else if (pathname.startsWith('/artists')) return '/artists'
   else if (pathname.startsWith('/users')) return '/users'
   else return pathname
}

const auth = authStore()
const selectedKeys = ref([currentPath()])
const router = useRouter()
const isSmallScreen = useMediaQuery('(max-width: 600px)')

const navigate = (item) => {
  router.push(item.key)
}
</script>

