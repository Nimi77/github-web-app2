<script setup>
import { ref, onMounted } from 'vue'
import GithubIcon from './icons/GithubIcon.vue'

const loading = ref(true)
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<template>
  <header role="banner">
    <div class="header-wrapper relative">
      <div><a href="#main-content" class="px-3 text-black focus-shown">Skip to Content</a></div>
      <div
        class="nav-container w-full px-4 py-4 lg:py-3.5 lg:px-8 bg-gray-100 border-b-2 border-gray-200"
      >
        <nav class="flex justify-between items-center">
          <div v-if="!loading" class="flex items-center justify-center gap-2">
            <!-- if the page is not loading then display content -->
            <GithubIcon />
            <h3 class="text-sm lg:text-md font-semibold">Nimi77</h3>
          </div>
          <!--otherwise do not display content -- skeleton -->
          <div v-else class="flex items-center justify-center gap-2">
            <div class="rounded-full skeleton w-8 h-8"></div>
            <div class="skeleton lg:w-[60px] lg:h-5 w-0 h-0"></div>
          </div>
          <ul v-if="!loading" class="flex justify-center lg:space-x-5 space-x-3 text-sm">
            <li
              class="hover:bg-gray-200 rounded-md lg:px-3 lg:py-2 py-2 px-1 transition duration-300 ease"
            >
              <router-link to="/">Repositories</router-link>
            </li>
            <li
              class="hover:bg-gray-200 rounded-md lg:px-3 lg:py-2 py-2 px-1transition duration-300 ease"
            >
              <router-link to="/404Page">Overview</router-link>
            </li>
            <li
              class="hover:bg-gray-200 rounded-md lg:px-3 lg:py-2 py-2 px-1 transition duration-300 ease"
            >
              <router-link to="/error-boundary">Actions</router-link>
            </li>
          </ul>
          <!-- skeleton s-->
          <ul v-else class="flex justify-center lg:space-x-5 space-x-1">
            <li class="rounded-md lg:px-3 lg:py-2 py-2 px-1 skeleton lg:w-28 lg:h-8 w-20 h-5"></li>
            <li class="rounded-md lg:px-3 lg:py-2 py-2 px-1 skeleton lg:w-28 lg:h-8 w-20 h-5"></li>
            <li class="rounded-md lg:px-3 lg:py-2 py-2 px-1 skeleton lg:w-28 lg:h-8 w-20 h-5"></li>
          </ul>
          <!-- skeleton e -->
          <button
            v-if="!loading"
            class="lg:px-5 lg:py-3 px-3 py-2 bg-gray-900 text-white rounded-lg text-sm"
          >
            Create New
          </button>
          <div
            v-else
            class="lg:px-6 lg:py-3 px-2 py-2 lg:w-28 lg:h-10 w-20 h-6 rounded-lg skeleton"
          ></div>
        </nav>
      </div>
    </div>
  </header>
</template>
