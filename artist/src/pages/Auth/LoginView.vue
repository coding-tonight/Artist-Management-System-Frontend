
<template>
  <section class="flex w-[100vw] h-[100vh]">
    <img src="/logo.png" alt="" height="300" width="100" class="absolute top-2 left-2" />
    <div class="w-[100%] sm:w-[50%] flex items-center">
       <div class="sm:w-[60%] mx-auto">
         <h1 class="mb-5 text-center text-xl">Login to your account</h1>
         <a-form
           :model="formState"
           name="normal_login"
           class="login-form"
           layout="vertical"
           @finish="onFinish"
           @finishFailed="onFinishFailed"
         >
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
       
           <a-form-item>
             <a-button 
                :disabled="loading" 
                :loading="loading"
                block 
                type="primary" 
                html-type="submit" 
                class="login-form-button"
              >
               Log in
             </a-button>
           </a-form-item>
         </a-form>

         <a-divider> or sign up</a-divider>

         <a-button block>
            <RouterLink to="/register">
              Register
            </RouterLink>
         </a-button>

         <p class="text-gray-600 text-xs text-center mt-6">&copy; 2024 AMS. All Rights Reserved.</p>
       </div>
    </div>
    <div class="login-background w-[50%] hidden sm:block h-[100vh]">
    </div>
  </section>
</template>

<script setup>
import { reactive, ref } from 'vue';

import { authStore } from '@/services/pinia/store/auth';

const formState = reactive({
  email: '',
  password: ''
})
const loading = ref(false)
const store = authStore()

const onFinish = async values => {  
    await store.signIn(values, loading)
};

const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

</script>


<style scoped>
  .login-background {
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-origin: content-box;
  }
</style>
      

