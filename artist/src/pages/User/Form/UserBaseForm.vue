
<template>
    <section class="w-[80%]">
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
              <a-col :md="12">
                <a-form-item
                  label="First Name"
                  name="first_name"
                  :rules="[{ required: true, message: 'Please input your first name!' }]"
                >
                  <a-input v-model:value="formState.first_name" placeholder="John">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :md="12">
                <a-form-item
                  label="Last Name"
                  name="last_name"
                  :rules="[{ required: true, message: 'Please input your last name!' }]"
                >
                  <a-input v-model:value="formState.last_name" placeholder="Doe">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item
                    label="Email"
                    name="email"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
                  >
                    <a-input v-model:value="formState.email" placeholder="example@gmail.com">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
              <a-col :md="12">
                <a-form-item
                    label="Phone"
                    name="phone"
                    :rules="[{ required: true, message: 'Please input your phone!' }]"
                  >
                    <a-input v-model:value="formState.phone" placeholder="98XXXXXXXX">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item
                    label="Address"
                    name="address"
                    :rules="[{ required: true, message: 'Please input your address!' }]"
                  >
                    <a-input v-model:value="formState.address" placeholder="address">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>

              <a-col :md="12">
                <a-form-item
                    label="Role"
                    name="role"
                    :rules="[{ required: true, message: 'Please input your Role!' }]"
                  >
                  <a-select v-model:value="formState.role" placeholder="Role">
                    <a-select-option value="artist">Artist</a-select-option>
                    <a-select-option value="artist_manager">Artist Manager</a-select-option>
                    <a-select-option value="super_admin">Super Admin</a-select-option>
                  </a-select>
                  </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item label="Dob" name="dob">
                  <a-date-picker class="w-[100%]" v-model:value="formState.dob" />
                </a-form-item>
              </a-col>

              <a-col :md="12">
                <a-form-item
                    label="Gender"
                    name="gender"
                    :rules="[{ required: true, message: 'Please input your Gender!' }]"
                  >
                  <a-select v-model:value="formState.gender" placeholder="Gender">
                    <a-select-option value="male">Male</a-select-option>
                    <a-select-option value="female">Female</a-select-option>
                    <a-select-option value="female">Others</a-select-option>
                  </a-select>
                  </a-form-item>
              </a-col>
            </a-row>
            
            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item
               label="Password"
               name="password"
               :rules="[{ required: true, message: 'Please input your password!' }]"
             >
               <a-input-password v-model:value="formState.password" placeholder="password">
                 <template #prefix>
                   <LockOutlined class="site-form-item-icon" />
                 </template>
               </a-input-password>
             </a-form-item>
              </a-col>

              <a-col :md="12">
                <a-form-item
                  label="Confirm Password"
                  name="confirmation_password"
                  :rules="[{ required: true,  validator: confirmPasswordValidator , trigger: 'change'}]"
                >
                  <a-input-password v-model:value="formState.confirmation_password" placeholder="password">
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
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
                    Create
                  </a-button>
                  <RouterLink to="/users">
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
  import dayjs from 'dayjs';

  const props = defineProps({
    onFinish: Function,
    data: Object
  })

  const formState = reactive({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
    role:'',
    password: '',
    confirmation_password: ''
  })

  const gutter = ref([16, 16])
  const loading = ref(false)


  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  const confirmPasswordValidator = async (_rule, value) => {
    if (value === '') {
      return Promise.reject('Please input the password again');
    } else if (value !== formState.password) {
      return Promise.reject("Two inputs don't match!");
    } else {
      return Promise.resolve();
    }
  };


  watch(() => {
     formState.first_name = props.data?.first_name ?? ''
     formState.last_name = props.data?.last_name ?? ''
     formState.email = props.data?.email ?? ''
     formState.phone = props.data?.phone ?? ''
     formState.address = props.data?.address ?? ''
     formState.role = props.data?.role ?? ''
     formState.gender = props.data?.gender ?? ''
     formState.dob = dayjs(props.data?.dob) ?? ''
  })

  </script>

  
  <style scoped>

  </style>
        
  
  