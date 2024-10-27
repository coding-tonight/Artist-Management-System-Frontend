<template>
    <DashboardLayout>
       <DeleteModal 
             :open="open"
             :title="'Delete Confirmation'"
             :handleOk="handleOk"
             :handleCancel="handleCancel"
             :loading="loading"
        />
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/artists">Artists</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Music</a-breadcrumb-item>
           </a-breadcrumb>
       </section>

       <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Musics"
             :avatar="{ src: '/album.jpg' }"
             :sub-title="artist?.name ?? 'artist'"
        />

        <a-card>
            <div v-if="auth.me.role == 'artist'" class="flex justify-start my-2">
                <RouterLink to="/musics/create">
                    <a-button class="flex items-center">
                       <template #icon><PlusCircleOutlined /></template>
                      Create
                   </a-button>
                </RouterLink>
            </div>


            <a-table
                :columns="columns"
                :row-key="record => record.id"
                :data-source="dataSource"
                :scroll="{
                   x: true,
                   y: true
                }"
                :pagination="false"
                :loading="loading"
                @change="handleTableChange"
                >
                <template #bodyCell="{ column, record }">
                     <template v-if="column.dataIndex === 'action'">
                         <div class="text-nowrap">
                             <RouterLink :to="{ path: `/musics/edit/${record.id}` }">
                                 <EditOutlined class="text-green-700 cursor-pointer me-2" />
                             </RouterLink>
                             <DeleteOutlined class="text-red-700 cursor-pointer" @click="() => showModal(record.id)" />
                         </div>
                     </template>
                </template>
            </a-table>
        </a-card>
    </DashboardLayout>
 </template>
    
 <script setup>
 import { onMounted, ref, watch  } from 'vue';
 import { useRoute } from 'vue-router';

 import { DashboardLayout } from '@/layouts';
 import { artistMusicTableHeader as columns } from '@/constants/tableHeaders';
 import { artistStore } from '@/services/pinia/store/artist';
 import { musicStore } from '@/services/pinia/store/music';
 import { authStore } from '@/services/pinia/store/auth';
 import {  DeleteOutlined , EditOutlined  } from '@ant-design/icons-vue';
 import { DeleteModal } from '@/components';
import { storeToRefs } from 'pinia';
 
 
 const loading = ref(false)
 const artistLoading = ref(false)
 const dataSource  = ref([])
 const open = ref(false)
 const selectedId = ref(null)
 const artist = ref({})
 
 const store = artistStore()
 const musicApi = musicStore()
 const auth = authStore()
 const route = useRoute()
 const { me } = storeToRefs(auth)

 const queryData =  async () => {
    const data = await store.getArtistMusics(route.params?.id ?? me.value?.artist_id , loading)
    dataSource.value = data
 }
 
 const handleOk = async () => {
     const { musics } = await musicApi.deleteMusic(selectedId.value, loading)
     if(musics) {
         dataSource.value = await store.getArtistMusics(route.params?.id ?? me.value?.artist_id, loading)
         open.value = false
     }
 }
 
 const handleCancel = async () => {
     open.value = false
     selectedId.value = null
 }
 
 const showModal = (id) => {
     open.value = true
     selectedId.value = id
 }
 
 onMounted(async() => {
    await queryData()
 })

 watch(async () => {
    artist.value =  await store.getArtistDetails(route.params?.id ?? me.value?.artist_id, artistLoading)
 })
    
 </script>
 
 <style></style>
 
 