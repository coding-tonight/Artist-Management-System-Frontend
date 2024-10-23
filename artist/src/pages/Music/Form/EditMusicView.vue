<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/musics">Musics</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Edit</a-breadcrumb-item>
           </a-breadcrumb>
       </section>
        <a-card>
          <MusicBaseFrom :onFinish="onFinish" :data="data" />
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import { DashboardLayout } from '@/layouts';

import { musicStore } from '@/services/pinia/store/music';
import MusicBaseFrom from './MusicBaseForm.vue';

const loading = ref(false)
const data = ref({})
const route = useRoute()

const store = musicStore()

const onFinish = async values => {  
    await store.updateMusic(route.params.id, values, loading)
  };


watch(async(id) => {
   data.value = await store.getMusicDetails(route.params.id, loading)
})
    
</script>

<style></style>

