<template>
   <div>
    <a-modal 
      v-model:open="props.open" 
      :title="props.title" 
      :confirm-loading="loading" 
      @ok="handleOk"
      @cancel="handleCancel"
      :okType="'danger'"
      :okText="'Delete'"
    >
      <p>Are you sure you want to remove this? It will be deleted permanently.</p>
    </a-modal>
  </div>
</template>

<script setup>
    const props = defineProps({
        open: Boolean,
        title: String,
        handleOk: Function,
        handleCancel: Function,
        loading: Boolean,
    })
</script>

<style>
</style>