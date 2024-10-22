
<template>
  <a-layout-sider 
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
        :items="items" @click="(item) => navigate(item)"
       />
    </a-layout-sider>
</template>


<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { sideMenu as items } from '@/constants/navigations';

const prop = defineProps({
  collapsed: Boolean,
})
  
const selectedKeys = ref([window.location.pathname])
const router = useRouter()

const navigate = (item) => {
  router.push(item.key)
}

</script>
<style scoped>

</style>
