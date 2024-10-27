<template>
  <section>
     <a-config-provider  
       :theme="{ 
         token: { colorPrimary: '#72BF78', borderRadius: `none` },
         components: {
           Table: {
            tableHeaderBg: '#72BF78'
           }
         }
       }",
      >
       <RouterView />
     </a-config-provider>
  </section>
</template>

<script setup>
import { RouterView } from 'vue-router';

</script>
<style>
   *, *::after, *::before {
     margin: 0;
     padding: 0;
   }
</style>
