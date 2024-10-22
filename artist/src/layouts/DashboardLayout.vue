<template>
  <a-layout>
      <Sidebar :collapsed="collapsed" />
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;" class="flex items-center justify-between ps-1">
          <a-button  v-if="collapsed"
              class="trigger border-none shadow-none"
              @click="() => (collapsed = !collapsed)">
              <MenuFoldOutlined />
          </a-button>

          <a-button v-else class="trigger border-none shadow-none" @click="() => (collapsed = !collapsed)">
            <MenuUnfoldOutlined  />
          </a-button>
          
            <a-button class="border-none shadow-none" @click="user.logOut()">
              <LoginOutlined  />
            </a-button>
        </a-layout-header>

        <a-layout-content
          :style="{ margin: '24px 16px',
                    padding: '24px', 
                    minHeight: 'calc(100vh - 40px)' 
                  }"
        >
          <slot></slot>
        </a-layout-content>
      </a-layout>
  </a-layout>
</template>

<script setup>
 import { ref } from 'vue'

 import { LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons-vue';
 import { authStore } from '@/services/pinia/store/auth';

 import { Sidebar } from '@/components';

 const user = authStore()

 const collapsed = ref(false)
</script>

<style>
 #components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #30ce10;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}
.site-layout .site-layout-background {
  background: #fff;
}
</style>
