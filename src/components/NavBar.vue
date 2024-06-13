<script setup>
  import {ref, onMounted} from 'vue'
 
  const loading = ref(true);
  onMounted(()=> {
    setTimeout(() => {
      loading.value = false;
    }, 2000);
  })

</script>

<template>
  <header role="banner">
    <div class="header-wrapper relative">
      <div><a href="#main" class="p-3 bg-focus text-white focus-shown">Skip to Content</a></div>
      <div class="nav-container w-full py-4 px-8 bg-gray-100 border-b-2 border-gray-200">
        <nav class="flex justify-between items-center">
          <div class="flex items-center justify-center gap-2 text-sm">
            <svg width="30" height="30" viewBox="0 0 16 16" version="1.1" class="github-icon" :class="{skeleton:loading}">
              <path
                d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"
              ></path>
            </svg>
            <h3 :class="{skeleton:loading}">Nimi77</h3>
          </div>
          <ul class="flex justify-center space-x-5 text-sm">
            <li class="hover:bg-gray-200 rounded-md px-3 py-2 transition duration-300 ease" :class="{skeleton:loading}">
              <router-link to="/">Repositories</router-link>
            </li>
            <li class="hover:bg-gray-200 rounded-md px-3 py-2 transition duration-300 ease" :class="{skeleton:loading}">
              <router-link to="/notFoundPage">Overview</router-link>
            </li>
            <li class="hover:bg-gray-200 rounded-md px-3 py-2 transition duration-300 ease" :class="{skeleton:loading}">
              <router-link to="/error-boundary">Actions</router-link>
            </li>
          </ul>
          <button class="px-4 py-3 bg-gray-900 text-white rounded-lg text-sm" :class="{skeleton:loading}">Create New</button>
        </nav>
      </div>
    </div>
  </header>
</template>

