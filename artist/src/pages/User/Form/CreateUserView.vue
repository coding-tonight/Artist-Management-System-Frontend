<template>
    <DashboardLayout>
       <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/users">Users</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Create</a-breadcrumb-item>
           </a-breadcrumb>
       </section>
       <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="Create User"
        />
        <a-card>
          <UserBaseForm :onFinish="onFinish" />
        </a-card>
    </DashboardLayout>
</template>
    
<script setup>
import { onMounted, ref } from 'vue';

import { DashboardLayout } from '@/layouts';

import { userStore } from '@/services/pinia/store/user';
import UserBaseForm from './UserBaseForm.vue';
import { mapDate } from '@/helpers/common';
import { Form } from 'ant-design-vue';

const loading = ref(false)
const dataSource  = ref([])
const meta = ref({})
const form = Form.useForm()

const store = userStore()

const onFinish = async values => {  
    await store.createUser({...values , dob: mapDate(values.dob)}, loading, form)
  };

const queryData =  async (page = 1) => {
    const { users, pagination } = await store.getUsers(page, loading)
    dataSource.value = users
    meta.value = pagination
}

onMounted(async() => {
    await queryData(1, loading)
})
    
</script>

<style></style>

