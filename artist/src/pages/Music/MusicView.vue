<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/musics">Musics</RouterLink></a-breadcrumb-item>
           </a-breadcrumb>
       </section>

        <a-card>
            <div class="flex justify-start my-2">
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
                <template #bodyCell="{ column, text }">
                <template v-if="column.dataIndex === 'name'">{{ text.first_name }} {{ text.last_name }}</template>
                </template>
            </a-table>
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';

import { DashboardLayout } from '@/layouts';
import { musicTableHeader as columns } from '@/constants/tableHeaders';
import { musicStore  } from '@/services/pinia/store/music';

const loading = ref(false)
const dataSource  = ref([])
const meta = ref({})

const store = musicStore()


const queryData =  async (page = 1) => {
    const { musics , pagination } = await store.getMusics(page, loading)
    dataSource.value = musics
    meta.value = pagination
}

onMounted(async() => {
    await queryData(1, loading)
})
    
</script>

<style></style>

