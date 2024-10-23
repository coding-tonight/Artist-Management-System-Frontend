
<template>
  <a-drawer
    v-if="isSmallScreen"
    :placement="'left'"
    :closable="true"
    :visible="collapsed"
    @close="prop.closed"
     class="w-[100%]"
  >
     <a-menu 
        class="w-[100%]"
        v-model:selectedKeys="selectedKeys" 
        :items="auth.me?.role !== 'artist' ? sideMenu: artistSideMenu" @click="(item) => navigate(item)"
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
        v-model:selectedKeys="selectedKeys" 
        :items="auth.me?.role !== 'artist' ? sideMenu: artistSideMenu" @click="(item) => navigate(item)"
       />
    </a-layout-sider>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { authStore } from '@/services/pinia/store/auth';
import { sideMenu , artistSideMenu } from '@/constants/navigations';
import { useMediaQuery } from '@vueuse/core'

const prop = defineProps({
  collapsed: Boolean,
  closed: Function,
})

const auth = authStore()
const selectedKeys = ref([window.location.pathname])
const router = useRouter()
const isSmallScreen = useMediaQuery('(max-width: 600px)')

const navigate = (item) => {
  router.push(item.key)
}
</script>

