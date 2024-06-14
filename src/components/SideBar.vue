<template>
  <div class="sidebar border-r-2 border-gray-200 h-[87vh]" id="sideBar">
    <div class="sidebar-container pl-8 pt-4">
      <div v-if="!loading"
        class="relative h-48 w-48 flex items-center justify-center border-2 border-gray-200 rounded-full">
        <img :src="githubUser.avatar_url" alt="User Avatar" class="rounded-full border-2 border-gray-200" />
      </div>
      <!-- image skeleton -->
      <div v-else class="h-48 w-48 flex items-center justify-center border-2 border-gray-200 rounded-full skeleton">
        <img class="rounded-full" />
      </div>
      <!-- user profile -->
      <div v-if="!loading" class="user-profile border-b-2 border-gray-200 my-6">
        <div class="flex flex-col">
          <h2 class="font-semibold">{{ githubUser.name }}</h2>
          <span class="text-sm text-gray-400">{{ githubUser.login }}</span>
        </div>
        <p class="my-4 text-sm">
          {{ githubUser.bio }}
        </p>
      </div>
      <!-- user profile skeleton -->
      <div v-else class="user-profile border-b-2 border-gray-200 my-6">
        <div class="flex flex-col gap-1">
          <h2 class="font-semibold skeleton h-6 w-40"></h2>
          <span class="skeleton w-12 h-4"></span>
        </div>
        <p class="my-4 skeleton w-48 h-12"></p>
      </div>

      <div class="socials-links">
        <ul v-if="!loading" class="space-y-3 text-sm">
          <li class="flex items-center">
            <svg width="20" height="20" fill="black" class="mr-2" viewBox="0 0 24 24">
              <path
                d="M23.05 2.57c.12-.27 0-.59-.28-.69-.11-.04-.22-.06-.34-.06h-5.86L12.33 9.2 6.58 1.82H.91c-.31 0-.56.25-.56.56 0 .12.04.24.11.34l7.7 10.15-8.23 9.5c-.2.22-.18.56.05.75.1.09.23.14.36.14h5.87l8.29-9.68 8.48 9.67h5.59c.3 0 .56-.25.56-.56 0-.13-.05-.26-.13-.36l-8.56-9.75 7.8-9.01zm-5.42-.31h4.27L13.8 12.53 10.27 8.03 17.63 2.26zM7.52 2.26l6.16 7.7-3.47 4.01L4.2 2.25h3.32zM.91 2.26h4.32l4.06 5.08-.02.02L4.78 13.3 1.19 2.26zM.92 21.74L9.9 12.25l3.7 4.53-4.47 5.22H.92zm17.18 0l-6.16-7.03 3.38-3.9 8.06 9.19h-5.28z" />
            </svg>
            <a :href="'https://twitter.com/' + githubUser.twitter_username">{{
              githubUser.twitter_username
            }}</a>
          </li>
          <li class="flex items-center">
            <svg width="20" height="20" fill="black" class="mr-2" viewBox="0 0 24 24">
              <path
                d="M20.45 20.45h-3.64V15.3c0-1.23-.02-2.82-1.72-2.82-1.73 0-2 1.35-2 2.74v5.22H9.45V9h3.5v1.56h.05c.49-.93 1.69-1.9 3.47-1.9 3.7 0 4.38 2.43 4.38 5.6v6.19h-.01zm-15.91-11H1.91V9h2.63v11.45H1.91V9h2.63v11.45h2.62V9zm-.02-4.91a1.55 1.55 0 110-3.1 1.55 1.55 0 010 3.1zm3.51 15.91V9H5.91v11.45H9.45zM21.91 0H2.09A2.09 2.09 0 000 2.09v19.82A2.09 2.09 0 002.09 24h19.82A2.09 2.09 0 0024 21.91V2.09A2.09 2.09 0 0021.91 0z" />
            </svg>
            <a :href="'https://linkedin.com/in/abimbola-oladejo-58372a285/'">Abimbola Oladejo</a>
          </li>
          <li class="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" class="mr-2">
              <path d="M12 13.5L1.5 6V18c0 .825.675 1.5 1.5 1.5h18c.825 0 1.5-.675 1.5-1.5V6L12 13.5z" fill="none"
                stroke="black" stroke-width="2" />
              <path d="M12 13.5L1.5 6h21L12 13.5z" fill="none" stroke="black" stroke-width="2" />
            </svg>
            <a :href="'mailto:'" class="flex items-center">abimbolaoladejo4@gmail.com</a>
          </li>
        </ul>
        <!-- skeleton -->
        <ul v-else class="space-y-3 text-sm">
          <li class="flex items-center">
            <div class="mr-2 skeleton w-5 h-5"></div>
            <div class="h-5 w-20 skeleton"></div>
          </li>
          <li class="flex items-center">
            <div class="mr-2 skeleton w-5 h-5"></div>
            <div class="h-5 w-36 skeleton"></div>
          </li>
          <li class="flex items-center">
            <div class="mr-2 skeleton w-5 h-5"></div>
            <div class="h-5 w-44 skeleton"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Octokit } from '@octokit/core'

const githubUser = ref({})
const loading = ref(true)

const fetchUser = async () => {
  try {
    const octokit = new Octokit()
    const response = await octokit.request('GET /users/{username}', {
      username: 'Nimi77'
    })
    githubUser.value = response.data
  } catch (error) {
    console.log('Error fetching user data', error)
  }
}
onMounted(fetchUser)

// skeleton
onMounted(() => {
  setTimeout(() => {
    loading.value = false
  }, 2000)
})
</script>

<style scoped>
.image-placeholder {
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
