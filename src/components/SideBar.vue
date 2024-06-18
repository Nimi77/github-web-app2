<template>
  <div class="sidebar border-r-2 border-gray-200 h-[87vh]" id="sideBar">
    <div class="sidebar-container pl-8 pt-4">
      <div v-if="!loading"
        class="relative h-48 w-48 flex items-center justify-center border-1 border-gray-200 rounded-full">
        <img :src="githubUser.avatar_url" alt="User Avatar" class="rounded-full border-2 border-gray-200" />
      </div>
      <!-- image skeleton -->
      <div v-else class="h-48 w-48 flex items-center justify-center border-1 border-gray-200 rounded-full skeleton">
        <img class="rounded-full" />
      </div>
      <!-- user profile -->
      <div v-if="!loading" class="user-profile border-b-2 border-gray-200 my-6">
        <div class="flex flex-col">
          <h2 class="font-semibold">{{ githubUser.name }}</h2>
          <span class="text-sm text-gray-400">{{ githubUser.login }}</span>
        </div>
        <p class="my-2 text-sm pr-2">
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
            <EmailIcon/>
            <a :href="'mailto:abimbolaoladejo4@gmail.com'" class="flex items-center" aria-label="Email: abimbolaoladejo4@gmail.com">abimbolaoladejo4@gmail.com</a>
          </li>
          <li class="flex items-center">
            <TwitterIcon/>
            <a :href="'https://twitter.com/' + githubUser.twitter_username">{{ githubUser.twitter_username}}</a>
          </li>
          <li class="flex items-center">
            <LinkedInIcon/>
            <a :href="'https://linkedin.com/' + githubUser.linkedin_username ">Abimbola Oladejo</a>
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
import EmailIcon from './icons/EmailIcon.vue'
import TwitterIcon from './icons/TwitterIcon.vue';
import LinkedInIcon from './icons/LinkedInIcon.vue';

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
