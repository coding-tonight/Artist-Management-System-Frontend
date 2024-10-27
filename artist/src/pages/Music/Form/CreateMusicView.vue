<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/musics">Musics</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Create</a-breadcrumb-item>
           </a-breadcrumb>
       </section>

       <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Create Music"
        />

        <a-card>
          <MusicBaseForm :onFinish="onFinish" />
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { ref } from 'vue';

import { DashboardLayout } from '@/layouts';

import { musicStore } from '@/services/pinia/store/music';
import MusicBaseForm from './MusicBaseForm.vue';

const loading = ref(false)
const store = musicStore()

const onFinish = async values => {  
    await store.createMusic(values, loading)
  };    
</script>

<style></style>

