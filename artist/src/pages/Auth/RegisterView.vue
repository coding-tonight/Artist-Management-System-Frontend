
<template>
    <section class="flex w-[100vw]">
      <img src="/logo.png" alt="logo" height="300" width="100" class="absolute top-2 left-2" />
      <div class="w-[100%] sm:w-[50%] flex items-center mt-[60px] sm:mt-[0px]">
         <div class="w-[80%] sm:w-[60%] mx-auto">
           <!-- <img src="/logo.png" alt="" height="100" /> -->
           <h1 class="mb-5 text-center text-xl">Register Account</h1>
           <a-form
             :model="formState"
             name="normal_login"
             class="login-form"
             layout="vertical"
             @finish="onFinish"
             @finishFailed="onFinishFailed"
           >
            <a-row :gutter="gutter">
              <a-col :xs="24" :md="12">
                <a-form-item
                  label="First Name"
                  name="first_name"
                  :rules="[{ required: true, message: 'Please input your email!' }]"
                >
                  <a-input v-model:value="formState.first_name" placeholder="First Name">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :xs="24" :md="12">
                <a-form-item
                  label="Last Name"
                  name="last_name"
                  :rules="[{ required: true, message: 'Please input your last name!' }]"
                >
                  <a-input v-model:value="formState.last_name" placeholder="Last Name">
                    <template #prefix>
                      <UserOutlined class="site-form-item-icon" />
                    </template>
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :xs="24" :md="12">
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
              <a-col :xs="24" :md="12">
                <a-form-item
                    label="Phone"
                    name="phone"
                    :rules="[{ required: true, validator: phoneValidation }]"
                  >
                    <a-input v-model:value="formState.phone" placeholder="98XXXXXXXX" maxLength="10">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :xs="24" :md="24">
                <a-form-item
                    label="Address"
                    name="address"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
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
              <a-col :xs="24" :md="12">
                <a-form-item 
                   label="Dob" 
                   name="dob" 
                  :rules="[{ required: true, validator: dateOfBirthValidation }]">
                  <a-date-picker class="w-[100%]" v-model:value="formState.dob" />
                </a-form-item>
              </a-col>

              <a-col :xs="24" :md="12">
                <a-form-item
                    label="Gender"
                    name="gender"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
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
              <a-col :xs="24" :md="12">
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
              <a-col :xs="24" :md="12">
                <a-form-item
                  label="Confirm Password"
                  name="confirmation_password"
                  :rules="[{ required: true,  validator: confirmPasswordValidator , trigger: 'change'}]"
                >
                  <a-input-password 
                    v-model:value="formState.confirmation_password" 
                    placeholder="Confirmation Password">
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
            </a-row>
         
             <a-form-item>
               <a-button 
                  :disabled="loading" 
                  :loading="loading"
                  block 
                  type="primary" 
                  html-type="submit" 
                  :class="{'artist-btn': loading }"
                >
                 Sign Up
               </a-button>
             </a-form-item>
           </a-form>
         </div>
      </div>
      <div class="register-background w-[50%] h-[100vh] hidden sm:block">
      </div>
    </section>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';

  import { authStore } from '@/services/pinia/store/auth';
  import { phoneValidation, dateOfBirthValidation } from '@/helpers/validations';
  
  const formState = reactive({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    gender: '',
    dob: '',
    password: '',
    confirmation_password: ''
  })

  const store = authStore()

  const gutter = ref([16, 16])
  const loading = ref(false)

  const onFinish = async values => {  
    await store.register(values, loading)
  };

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

  </script>
  
  
  <style scoped>
    .register-background {
      background-image: url('@/assets/register-background.jpg');
      background-size: cover;
      background-position: center;
      background-origin: content-box;
    }
  </style>
        
  
  