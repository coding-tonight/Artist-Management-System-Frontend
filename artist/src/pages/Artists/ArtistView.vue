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
          </a-breadcrumb>
      </section>

      <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Artists"
            :avatar="{ src: 'https://avatars1.githubusercontent.com/u/8186664?s=460&v=4' }"
        />

       <a-card>
           <div class="flex flex-col sm:flex-row justify-start my-2 flex-wrap gap-2">
                <RouterLink to="/artists/create">
                    <a-button class="flex items-center justify-center" block>
                       <template #icon><PlusCircleOutlined /></template>
                       <span class="hidden sm:block">
                          Create
                       </span>
                   </a-button>
                </RouterLink>

                <a-button class="flex items-center justify-center" @click="async () =>  await store.export()">
                    <template #icon><ExportOutlined  /></template>
                    Export
                </a-button>

                <RouterLink to="/artists/uploads">
                    <a-button class="flex items-center justify-center" block>
                        <template #icon><ImportOutlined  /></template>
                        import
                    </a-button>
                </RouterLink>
            </div>

           <a-table
               :columns="columns"
               :row-key="record => record.id"
               :data-source="dataSource"
               :scroll="{
                  x: true
               }"
               :pagination="{
                   total: !loading ? meta.total_count : 10,
                   onChange: async (page) => {
                       queryData(page)
                   },
                   current: !loading ?  meta.current_page: 1,
                   showSizeChanger: false,
               }"
               :loading="loading"
               @change="handleTableChange"
               >
               <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'title'">
                        <div class="text-nowrap">{{ record.title }}</div>
                    </template>
                    
                    <template v-if="column.dataIndex === 'action'">
                        <div class="text-nowrap">
                            <RouterLink :to="{ path: `/artists/${record.id}/musics` }">
                                <EyeOutlined class="text-blue-700 cursor-pointer me-2" />
                            </RouterLink>
        
                            <RouterLink :to="{ path: `/artists/edit/${record.id}` }">
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
import { onMounted, ref } from 'vue';

import { DashboardLayout } from '@/layouts';
import { artistTableHeader as columns } from '@/constants/tableHeaders';
import { artistStore } from '@/services/pinia/store/artist';
import { PlusCircleOutlined , DeleteOutlined , ImportOutlined, EditOutlined, ExportOutlined, EyeOutlined } from '@ant-design/icons-vue';
import { DeleteModal } from '@/components';


const loading = ref(false)
const dataSource  = ref([])
const meta = ref({})
const open = ref(false)
const selectedId = ref(null)

const store = artistStore()

const queryData =  async (page = 1) => {
   const { artists , pagination } = await store.getArtists(page, loading)
   dataSource.value = artists
   meta.value = pagination
}

const handleOk = async () => {
    const { artists , pagination } = await store.deleteArtist(selectedId.value, loading)
    dataSource.value = artists
    meta.value = pagination
    open.value = false
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
   await queryData(1, loading)
})
   
</script>

<style></style>

