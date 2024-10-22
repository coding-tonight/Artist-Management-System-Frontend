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
               <a-breadcrumb-item><RouterLink href="/users">Users</RouterLink></a-breadcrumb-item>
           </a-breadcrumb>
       </section>

       <a-card>
            <div class="flex justify-start my-2">
                <RouterLink to="/users/create">
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
                <template #bodyCell="{ column, record }">
                   <template v-if="column.dataIndex === 'action'">
                    <RouterLink :to="{ path: `/users/edit/${record.id}` }">
                        <EditOutlined class="text-green-700 cursor-pointer me-2" />
                    </RouterLink>
                      <DeleteOutlined class="text-red-700 cursor-pointer" @click="() => showModal(record.id)" />
                   </template>
                </template>
            </a-table>
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';

import { PlusCircleOutlined , DeleteOutlined , EditOutlined } from '@ant-design/icons-vue';

import { DashboardLayout } from '@/layouts';
import { userTableHeader as columns } from '@/constants/tableHeaders';
import { DeleteModal } from '@/components';
import { userStore } from '@/services/pinia/store/user';

const loading = ref(false)
const dataSource  = ref([])
const meta = ref({})
const open = ref(false)
const selectedId = ref(null)

const store = userStore()

const queryData =  async (page = 1) => {
    const { users, pagination } = await store.getUsers(page, loading)
    dataSource.value = users
    meta.value = pagination
}

// handle delete
const handleOk = async () => {
    const { users, pagination } = await store.deleteUser(selectedId.value, loading)
    dataSource.value = users
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

