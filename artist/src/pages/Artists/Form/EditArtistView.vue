<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/users">Users</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Edit</a-breadcrumb-item>
           </a-breadcrumb>
       </section>

       <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Update Artist"
        />
        <a-card>
          <ArtistBaseForm :onFinish="onFinish" :data="data" />
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { ref, watch } from 'vue';

import { useRoute } from 'vue-router';

import { DashboardLayout } from '@/layouts';

import { artistStore } from '@/services/pinia/store/artist';
import ArtistBaseForm from './ArtistBaseForm.vue';
import { mapDate } from '@/helpers/common';

const loading = ref(false)
const data = ref({})
const route = useRoute()

const store = artistStore()

const onFinish = async values => {  
    await store.updateArtist(route.params.id, {...values , 
      dob: mapDate(values.dob), first_release_year: mapDate(values.first_release_year)}, loading)
  };


watch(async(id) => {
   data.value = await store.getArtistDetails(route.params.id, loading)
})
    
</script>

<style></style>

