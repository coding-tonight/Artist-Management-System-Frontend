
<template>
    <DashboardLayout>
        <section class="flex justify-end mt-2 mb-4">
           <a-breadcrumb>
               <a-breadcrumb-item>Dashboard</a-breadcrumb-item>
               <a-breadcrumb-item><RouterLink href="/artists">Artists</RouterLink></a-breadcrumb-item>
               <a-breadcrumb-item>Uploads</a-breadcrumb-item>
           </a-breadcrumb>
       </section>

        <a-card>
           <section>
                <a-row class="">
                    <a-col :lg="12" :sm="24">
                        <a-upload-dragger v-model:file="formState.file" name="files" :beforeUpload="file => console.log(file)">
                            <p class="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p class="ant-upload-text">Click or drag csv file to this area to upload</p>
                            <!-- <p class="ant-upload-hint">Support for a single or bulk upload.</p> -->
                        </a-upload-dragger>
                    </a-col>       
                </a-row>

                <div class="flex justify-end mt-5">
                    <RouterLink to="/artists">
                    <a-button
                        class="ms-2"
                        >
                        Back
                    </a-button>
                    </RouterLink>
                </div>
         </section>
        </a-card>
    </DashboardLayout>
  </template>
  
  <script setup>
  import { reactive, ref , watch } from 'vue';
  import { useRoute } from 'vue-router';
  import { DashboardLayout } from '@/layouts';


  const formState = reactive({
    file: ''
  })

  console.log(formState)

  const loading = ref(false)
  const route = useRoute()

  const onFinish = async values => {  
    console.log(values)
    // await store.createMusic(values, loading)
  };    
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  </script>

  
  <style scoped>

  </style>
        
  
  