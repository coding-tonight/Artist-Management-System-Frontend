
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
               <Spin :spinning="loading">
                <a-row class="">
                      <a-col :md="24" :lg="24" :sm="24">
                            <a-upload-dragger v-model:file="formState.file" 
                              name="files"
                             :customRequest="onFinish" 
                             :beforeUpload="beforeUpload"
                             :preview="false"
                             :progress="percent"
                             :showUploadList="false"
                            >
                                <p class="ant-upload-drag-icon">
                                    <InboxOutlined />
                                </p>
                                <p class="ant-upload-text">Click or drag file to this area to upload</p>
                                <p class="ant-upload-hint">Support for only cvs file.</p>
                            </a-upload-dragger>
                      </a-col>       
                    </a-row>
                </Spin>

                <div class="flex justify-end mt-[40px]">
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
  import { reactive, ref } from 'vue';
  import { message, Spin } from 'ant-design-vue';
  import { DashboardLayout } from '@/layouts';

  import { artistStore } from '@/services/pinia/store/artist';


  const formState = reactive({
    file: ''
  })
  
  const loading = ref(false)
  const store = artistStore()

  const onFinish = async file => {  
    await store.import(file.file, loading)
  };    

  const beforeUpload = (file) => {
      const isCSV = file.type === 'text/csv'

      if (!isCSV) {
        message.error('You can only upload JPG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('File size must smaller than 2MB!');
      }
      return isCSV && isLt2M;
    };

  </script>

  
  <style scoped>

  </style>
        
  
  