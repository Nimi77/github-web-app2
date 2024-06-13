<template>
  <div class="sidebar" id="sideBar">
    <div class="sidebar-container px-8" v-if="githubUser">
      <div class="user-img relative" v-if="imageLoading">
        <img :src="githubUser.avatar_url" alt="User Avatar"  @load="onImageLoad" @error="onImageError" class="image-placeholder rounded-full border-2 border-gray-200" />
      </div>
      <div class="user-profile border-b-2 border-gray-200 my-6">
        <h2 class="font-semibold">{{ githubUser.name }}</h2>
        <span class="text-sm text-gray-400">{{ githubUser.login }}</span>
        <p class="my-4">
          Impact-driven Developer💪.. I'm passionate about learning new things and solving problems
          using technology.
        </p>
      </div>
      <div class="socials-links">
        <ul>
          <li>
            <a :href="'https://twitter.com/_nimistarr' + githubUser.twitter_username">@{{ githubUser.twitter_username }}</a>
          </li>
          <li>
            <a :href="'https://linkedin.com/in/' + githubUser.linkedin_username">@{{ githubUser.linkedin_username }}</a>
          </li>
        </ul>
      </div>
      <div class="contact">
        <span>Email</span>
      </div>
    </div>
    <div v-else>
      Loading...
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Octokit } from '@octokit/core'

const githubUser = ref({})
const imageLoading = ref(true)

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
onMounted(fetchUser);

const onImageLoad = () =>{
  imageLoading.value = false
}
const onImageError =() => {
  imageLoading.value = false
}
</script>

<style scoped>
.image-placeholder {
  width: 230px; 
  height: 200px; 
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
}
</style>