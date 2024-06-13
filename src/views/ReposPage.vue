<script setup>
import { ref, onMounted, computed } from 'vue'
import { Octokit } from '@octokit/core'

const repositories = ref([])
const searchQuery = ref('')
const filterLanguage = ref('')
const loading = ref(true)
const currentPage = ref(1)
const repoPerPage = 4

const octokit = new Octokit()

const fetchRepo = async () => {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: 'Nimi77'
    })
    repositories.value = response.data.sort((a,b) => new Date(b.created_at) - new Date(a.created_at))
    console.log(response.data)
  } catch (error) {
    console.log('Error fetching repositories', error)
  } finally {
    loading.value = false
  }
}
onMounted(fetchRepo)

const handleSearch = (event) => {
  searchQuery.value = event.target.value
  currentPage.value = 1
}
// eslint-disable-next-line no-unused-vars
const handleFilterChange = (event) => {
  filterLanguage.value = event.target.value
  currentPage.value = 1
}
const filteredRepos = computed(() => {
  return repositories.value.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterLanguage.value === '' || repo.language === filterLanguage.value)
    )
  })
})
console.log(filteredRepos)

const indexOfLastRepo = computed(() => currentPage.value * repoPerPage)
const indexOfFirstRepo = computed(() => indexOfLastRepo.value - repoPerPage)
const currentRepos = computed(() =>
  filteredRepos.value.slice(indexOfFirstRepo.value, indexOfLastRepo.value)
)
console.log(currentRepos)

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value -= 1
  }
}
const nextPage = () => {
  if (currentPage.value < Math.ceil(filteredRepos.value.length / repoPerPage.valueOf())) {
    currentPage.value += 1
  }
}
</script>

<template>
  <div class="repository mt-[-2%]">
    <div class="r-content flex flex-col justify-center ">
      <!-- search -->
      <div class="searchFilter flex justify-center ">
        <div id="search">
          <div pointerEvents="none" class="py-4"></div>
          <input
            placeholder="Search Repositories.."
            :value="searchQuery"
            @input="handleSearch"
            class="input-box border-b-2 w-2xl bg-transparent border-black focus:outline-none focus:border-gray-500 py-2 pl-4"
          />
        </div>
        <!-- filter icon -->
        <!-- <select aria-placeholder="Language" @onchange="handleFilterChange" class="">
          <option value="">All Language</option>
          <option value="JavaScript">JavaScript</option>
          <option value="JavaScript">JavaScript</option>
        </select> -->
      </div>

      <div class="repoList-box" v-if="filteredRepos.length > 0">
        <!-- repositories list -->
        <div
          role="list"
          aria-label="RepoList"
          class="repo-list-containerflex flex-col justify-start mr-8"
        >
          <div
            v-for="repo in currentRepos"
            :key="repo.id"
            class="user-repo flex flex-col justify-center mb-2 pt-3 pb-2 px-3 w-full border-b-2 border-solid border-gray-400 bg-transparent hover:shadow-lg transition duration-300 ease-in-out"
          > 
            <div>
              <router-link :to="`/repository/${repo.id}`">
                <h3 class="text-sm font-semibold">{{ repo.name }}</h3>
              </router-link>
            </div>
            <div class="my-2 font-normal">
              <p class="text-sm">{{repo.description}}</p>
              <span class="pt-2 text-xs">{{repo.language}}</span>
            </div>
          </div>
        </div>

        <!-- pagination button -->
        <div
          v-if="filteredRepos.length > repoPerPage"
          class="flex justify-center item-center"
          aria-label="Pagination"
        >
          <button
            @click="prevPage"
            aria-label="Previous Page"
            mt="4"
            :disabled="currentPage === 1"
            class="pag-btn bg-black text-white px-2 py-2 rounded-full mr-2 w-1/6 hover:bg-gray-900 hover:text-white focus:bg-transparent focus:text-black font-medium"
          >
            Prev
          </button>
          <button
            @click="nextPage"
            aria-label="Next Page"
            mt="4"
            class="pag-btn bg-black text-white px-2 py-2 rounded-full mr-2 w-1/6 hover:bg-gray-900 hover:text-white focus:bg-transparent focus:text-black font-medium"
          >
            Next
          </button>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center h-max mt-9">
        <p class="text-2xl mb-4">No repositories found.</p>
        <p class="text-md">You can try checking your internet connection...</p>
      </div>
    </div>
  </div>
</template>

