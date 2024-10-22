<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/artists">Artist</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Create</a-breadcrumb-item>
           </a-breadcrumb>
       </section>
        <a-card>
          <ArtistBaseForm :onFinish="onFinish" />
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { ref } from 'vue';

import { DashboardLayout } from '@/layouts';

import {  artistStore } from '@/services/pinia/store/artist';
import ArtistBaseForm from './ArtistBaseForm.vue';
import { mapDate } from '@/helpers/common';
import { Form } from 'ant-design-vue';

const loading = ref(false)
const form = Form.useForm()

const store = artistStore()

const onFinish = async values => {  
    await store.createArtist({...values , 
        dob: mapDate(values.dob), first_release_year: mapDate(values.first_release_year)
    }, loading, form)
  };
</script>

<style></style>

