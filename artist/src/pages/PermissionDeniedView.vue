<template>
  <DashboardLayout>
    <a-result status="403" title="403" sub-title="Sorry, you have permission to access this page.">
      <template #extra>
        <router-link to="/">
          <a-button type="primary">Back Home</a-button>
        </router-link>
      </template>
    </a-result>
  </DashboardLayout>    
  </template>
  
  <script setup>
  import { DashboardLayout } from '@/layouts';
  </script>
  