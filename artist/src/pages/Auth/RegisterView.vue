
<template>
    <section class="flex w-[100vw]">
      <div class="w-[50%] flex items-center">
         <div class="w-[60%] mx-auto">
           <!-- <img src="/logo.png" alt="" height="100" /> -->
           <h1 class="mb-5 text-center text-xl">Login to your account</h1>
           <a-form
             :model="formState"
             name="normal_login"
             class="login-form"
             layout="vertical"
             @finish="onFinish"
             @finishFailed="onFinishFailed"
           >
            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item
                  label="First Name"
                  name="first_name"
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
                  label="Last Name"
                  name="last_name"
                  :rules="[{ required: true, message: 'Please input your email!' }]"
                >
                  <a-input v-model:value="formState.email" placeholder="example@gmail.com">
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
                    name="last_name"
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
                    name="last_name"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
                  >
                    <a-input v-model:value="formState.email" placeholder="example@gmail.com">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>

            <a-row>
              <a-col :md="24">
                <a-form-item
                    label="Address"
                    name="last_name"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
                  >
                    <a-input v-model:value="formState.email" placeholder="example@gmail.com">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :md="12">
                <a-form-item label="Dob" name="dob">
                  <a-date-picker class="w-[100%]" />
                </a-form-item>
              </a-col>

              <a-col :md="12">
                <a-form-item
                    label="Gender"
                    name="gender"
                    :rules="[{ required: true, message: 'Please input your email!' }]"
                  >
                  <a-select v-model:value="formState.region" placeholder="Gender">
                    <a-select-option value="shanghai">Male</a-select-option>
                    <a-select-option value="beijing">Female</a-select-option>
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
                  :rules="[{ required: true, message: 'Please input your password!' }]"
                >
                  <a-input-password v-model:value="formState.password" placeholder="password">
                    <template #prefix>
                      <LockOutlined class="site-form-item-icon" />
                    </template>
                  </a-input-password>
                </a-form-item>
              </a-col>
            </a-row>
         
             <a-form-item>
               <a-button 
                  :disabled="disabled" 
                  block 
                  type="primary" 
                  html-type="submit" 
                  class="login-form-button"
                >
                 Sign Up
               </a-button>
             </a-form-item>
           </a-form>
         </div>
      </div>
      <div class="register-background w-[50%] h-[100vh]">
      </div>
    </section>
  </template>
  
  <script setup>
  import { reactive, ref, computed } from 'vue';
  
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

  const gutter = ref([16, 16])
  </script>
  
  
  <style scoped>
    .register-background {
      background-image: url('@/assets/register-background.jpg');
      background-size: cover;
      background-position: center;
      background-origin: content-box;
    }
  </style>
        
  
  