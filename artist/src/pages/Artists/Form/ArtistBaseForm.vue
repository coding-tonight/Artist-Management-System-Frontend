
<template>
    <section>
      <div class="">
         <div class="">
           <a-form
             :model="formState"
             name="normal_login"
             class="login-form"
             layout="vertical"
             @finish="props.onFinish"
             @finishFailed="onFinishFailed"
           >
            <a-row :gutter="gutter">
              <a-col :lg="8" :md="6" :sm="24" :xs="24">
                <a-form-item
                  label="Name"
                  name="name"
                  :rules="[{ required: true, message: 'Please input your first name!' }]"
                >
                  <a-input v-model:value="formState.name" placeholder="John">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item
                    label="Address"
                    name="address"
                    :rules="[{ required: true, message: 'Please input your address!' }]"
                  >
                    <a-input v-model:value="formState.address" placeholder="Address">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>
            
            <a-row :gutter="gutter">
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                  <a-form-item
                      label="Gender"
                      name="gender"
                      :rules="[{ required: true, message: 'Please input your Gender!' }]"
                    >
                    <a-select v-model:value="formState.gender" placeholder="Gender">
                      <a-select-option value="male">Male</a-select-option>
                      <a-select-option value="female">Female</a-select-option>
                      <a-select-option value="other">Others</a-select-option>
                    </a-select>
                    </a-form-item>
              </a-col>
            </a-row>


            <a-row :gutter="gutter">
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item 
                  label="Dob" 
                  name="dob"
                  :rules="[{ required: true, validator: dateOfBirthValidation }]"
                >
                  <a-date-picker class="w-[100%]" v-model:value="formState.dob" />
                </a-form-item>
              </a-col>
            </a-row>
            
            <a-row :gutter="gutter">
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item
                label="First Release Year"
                name="first_release_year"
                :rules="[{ required: true, message: 'Please input your first release year!' }]"
              >
                <a-date-picker class="w-[100%]" v-model:value="formState.first_release_year" />
              </a-form-item>
              </a-col>
            </a-row>
            
            <a-row>
              <a-col :lg="8" :md="12" :sm="24" :xs="24">
                <a-form-item
                  label="No of albums released"
                  name="no_of_albums_released"
                  :rules="[{ required: true,  message: 'Please enter the no of albums released'}]"
                >
                 <a-input v-model:value="formState.no_of_albums_released" placeholder="No of album released">
                 </a-input>
                </a-form-item>
              </a-col>
            </a-row>
            

            <div class="flex justify-start">
                <a-form-item>
                  <a-button 
                     :disabled="loading" 
                     :loading="loading"
                     type="primary" 
                     html-type="submit" 
                     :class="{'artist-btn': loading }"
                   >
                    {{ route.params && route.params.id ? 'Update': 'Create'}}
                  </a-button>
                  <RouterLink to="/artists">
                    <a-button
                      class="ms-2"
                     >
                      Back
                    </a-button>
                  </RouterLink>
                </a-form-item>
            </div>
           </a-form>
         </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { reactive, ref , watch } from 'vue';
  import { useRoute } from 'vue-router';
  import dayjs from 'dayjs';

  import { dateOfBirthValidation } from '@/helpers/validations';

  const props = defineProps({
    onFinish: Function,
    data: Object
  })

  const formState = reactive({
    name: '',
    genre: '',
    address: '',
    gender: '',
    dob: '',
    first_release_year: '',
    no_of_albums_released: ''
  })

  const gutter = ref([16, 16])
  const loading = ref(false)
  const route = useRoute()


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  watch(() => {
     formState.name = props.data?.name ?? ''
     formState.genre = props.data?.genre ?? ''
     formState.address = props.data?.address ?? ''
     formState.first_release_year = props.data?.first_release_year ? dayjs(props.data?.first_release_year): ''
     formState.no_of_albums_released = props.data?.no_of_albums_released ?? ''
     formState.gender = props.data?.gender ?? ''
     formState.dob = props.data?.dob ? dayjs(props.data?.dob) : ''
  })

  </script>

  
  <style scoped>

  </style>
        
  
  