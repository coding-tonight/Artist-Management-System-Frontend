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
             <a-col :lg="8" :md="8" :sm="24" :xs="24">
                  <a-form-item
                      label="Artists"
                      name="singer_id"
                      :rules="[{ required: true, message: 'Please select your artist !' }]"
                    >
                    <a-select 
                        v-model:value="formState.singer_id" 
                        placeholder="Select artist" 
                        :filter-option="filterOption"
                        show-search
                        :disabled="me.role == 'artist'"
                    >
                      <a-select-option 
                      v-for="artist in artists.artists" :value="artist.id" :key="artist.name">{{ artist.name  }}</a-select-option>
                    </a-select>
                    </a-form-item>
              </a-col>
            </a-row>
            <a-row :gutter="gutter">
              <a-col :lg="8" :md="6" :sm="24" :xs="24">
                <a-form-item
                  label="Title"
                  name="title"
                  :rules="[{ required: true, message: 'Please input your title!' }]"
                >
                  <a-input v-model:value="formState.title" placeholder="Title">
                  </a-input>
                </a-form-item>
              </a-col>
            </a-row>

            <a-row :gutter="gutter">
              <a-col :md="8">
                <a-form-item
                    label="Album Name"
                    name="album_name"
                    :rules="[{ required: true, message: 'Please input  album name!' }]"
                  >
                    <a-input v-model:value="formState.album_name" placeholder="album name">
                      <template #prefix>
                        <UserOutlined class="site-form-item-icon" />
                      </template>
                    </a-input>
                  </a-form-item>
              </a-col>
            </a-row>
            
            <a-row :gutter="gutter">
              <a-col :md="8">
                  <a-form-item
                      label="Genre"
                      name="genre"
                      :rules="[{ required: true, message: 'Please input your genre!' }]"
                    >
                    <a-select v-model:value="formState.genre" placeholder="genre">
                      <a-select-option value="jazz">Jazz</a-select-option>
                      <a-select-option value="rnb">RNB</a-select-option>
                      <a-select-option value="country">Country</a-select-option>
                      <a-select-option value="classic">Classic</a-select-option>
                      <a-select-option value="rock">Rock</a-select-option>
                    </a-select>
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
                  <RouterLink to="/musics">
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
  import { artistStore } from '@/services/pinia/store/artist';
  import { authStore } from '@/services/pinia/store/auth';
import { storeToRefs } from 'pinia';
  import { reactive, ref , watch } from 'vue';
  import { useRoute } from 'vue-router';

  const props = defineProps({
    onFinish: Function,
    data: Object
  })
  const gutter = ref([16, 16])
  const loading = ref(false)
  const route = useRoute()
  const artists = ref([])
  const store = artistStore()
  const auth = authStore()
  const { me } = storeToRefs(auth)

  const formState = reactive({
    title: '',
    album_name: '',
    genre: '',
    singer_id: '',
  })



  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  
  // search function
  const filterOption = (input, option) => {
    return option.key.toLowerCase().includes(input.toLowerCase())
  }


  watch(() => {
     formState.title = props.data?.title ?? ''
     formState.album_name = props.data?.album_name ?? ''
     formState.genre = props.data?.genre ?? ''
     formState.singer_id = props.data?.singer_id ?? ''
  })

  watch(async () => {
   artists.value =  await store.getArtistsWithoutPagination()
  })

  watch(() => {
     formState.singer_id = me.value?.artist_id ?? ''
  })

  </script>

  
  <style scoped>

  </style>
        
  
  