<template>
  <section class="h-[100vh] flex items-center justify-center">
    <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
      <template #extra>
        <router-link to="/">
          <a-button type="primary">Back Home</a-button>
        </router-link>
      </template>
    </a-result>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>