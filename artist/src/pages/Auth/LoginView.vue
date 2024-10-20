
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
                :disabled="disabled" 
                block 
                type="primary" 
                html-type="submit" 
                class="login-form-button"
              >
               Log in
             </a-button>
           </a-form-item>
         </a-form>
       </div>
    </div>
    <div class="login-background w-[50%] h-[100vh]">
    </div>
  </section>
</template>

<script setup>
import { reactive, computed } from 'vue';

const formState = reactive({
  email: '',
  password: ''
})

const onFinish = values => {  
  console.log('Success:', values);
};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};

const disabled = computed(() => {
  return !(formState.email && formState.password);
});
</script>


<style scoped>
  .login-background {
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-origin: content-box;
  }
</style>
      

