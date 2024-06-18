<script setup>
import { ref, onMounted, computed } from 'vue'
import { Octokit } from '@octokit/core'

const repositories = ref([])
const searchQuery = ref('')
const filterLanguage = ref('')
const loading = ref(true)
const currentPage = ref(1)
const repoPerPage = 4
const pageLimit = ref(6)
const isDropdownOpen = ref(false)
const sLoading = ref(true)

const octokit = new Octokit()

const fetchRepo = async () => {
  try {
    const response = await octokit.request('GET /users/{username}/repos', {
      username: 'Nimi77'
    })
    repositories.value = response.data.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    )
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

// filter section
const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}
const selectLanguage = (language) => {
  filterLanguage.value = language
  isDropdownOpen.value = false
  currentPage.value = 1
}

// filteredRepos base on language and searchquery
const filteredRepos = computed(() => {
  return repositories.value.filter((repo) => {
    return (
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) &&
      (filterLanguage.value === '' || repo.language === filterLanguage.value)
    )
  })
})

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
// disable next when the last page is shown
const isNextEnabled = computed(() => {
  return currentPage.value < pageLimit.value
})

// skeleton
onMounted(() => {
  setTimeout(() => {
    sLoading.value = false
  }, 2000)
})
</script>

<template>
  <div class="repository">
    <div class="r-content flex flex-col justify-center lg:pt-5 lg:pb-6 pb-8" id="main-content">
      <!-- search and filter-->
      <div v-if="!sLoading" class="searchFilter flex justify-center gap-3">
        <div id="search">
          <input placeholder="Search Repositories.." :value="searchQuery" @input="handleSearch"
            class="input-box w-2xl bg-white border-gray-300 border rounded-lg shadow-md py-2 pl-4 focus:outline-none focus:border-gray-400 focus:border-2 text-sm" />
        </div>
        <!-- filter -->
        <div class="filter relative">
          <button @click="toggleDropdown"
            class="cursor-pointer bg-white border border-gray-300 rounded-md px-2 py-2 flex items-center justify-between w-32 text-sm focus:outline-none focus:border-gray-400 focus:border-2">
            <span>Language</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          <!-- filter dropdown -->
          <div v-if="isDropdownOpen" class="absolute mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-48">
            <ul>
              <li @click="selectLanguage('Javascript')" class="cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm">
                JavaScript
              </li>
              <li @click="selectLanguage('C#')" class="cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm">
                C#
              </li>
              <li @click="selectLanguage('Vue')" class="cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm">
                Vue
              </li>
              <li @click="selectLanguage('HTML')" class="cursor-pointer px-4 py-2 hover:bg-gray-200 text-sm">
                HTML
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- search and filter skeleton -->
      <div v-else class="searchFilter flex justify-center gap-3">
        <div id="search">
          <input class="input-box w-2xl h-10 rounded-lg py-2 pl-4 skeleton" />
        </div>
        <div class="filter relative">
          <button class="rounded-md px-2 py-2 flex items-center justify-between w-32 h-10 skeleton"></button>
        </div>
      </div>

      <!-- search,filter, repo, pagination -->
      <div v-if="filteredRepos.length > 0">
        <!-- repositories list -->
        <div role="list" aria-label="RepoList" class="repo-list flex flex-col justify-center my-4">
          <div v-for="repo in currentRepos" :key="repo.id" class="user-repo mb-2">
            <!-- each repo -->
            <div v-if="!sLoading"
              class="user-repo-container flex flex-col justify-center pt-3 pb-2 pl-12 w-full border-b-2 border-solid border-gray-300 bg-transparent hover:shadow-lg transition duration-300 ease-in-out">
              <div>
                <router-link :to="`/repository/${repo.id}`">
                  <h3 class="text-sm font-semibold">{{ repo.name }}</h3>
                </router-link>
              </div>
              <div class="font-normal">
                <p class="text-sm pb-2 pt-1">{{ repo.description }}</p>
                <span class="text-xs">{{ repo.language }}</span>
              </div>
            </div>
            <!-- skeleton for each repo displayed -->
            <div v-else class="flex flex-col justify-center pl-12 ">
              <div>
                <h3 class="h-5 w-40 skeleton"></h3>
              </div>
              <div class="flex flex-col gap-2">
                <p class="h-12 w-[80%] skeleton"></p>
                <span class="h-4 w-10 skeleton"></span>
              </div>
            </div>
          </div>
        </div>
        <!-- pagination button -->
        <div v-if="!sLoading && filteredRepos.length > repoPerPage" class="flex justify-center item-center"
          aria-label="Pagination">
          <!-- Previous Button -->
          <button @click="prevPage" aria-label="Previous Page" :disabled="currentPage === 1"
            class="pag-btn bg-black text-white px-2 py-2 rounded-full mr-2 w-1/6 hover:bg-gray-900 hover:text-white focus:outline-none focus:bg-transparent focus:text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            Prev
          </button>

          <!-- Next Button -->
          <button @click="nextPage" aria-label="Next Page" :disabled="!isNextEnabled"
            class="pag-btn bg-black px-2 py-2 rounded-full mr-2 w-1/6 hover:bg-gray-900 hover:text-white focus:outline-none focus:bg-transparent focus:text-black font-medium disabled:opacity-50 disabled:cursor-not-allowed">
            Next
          </button>
        </div>
        <!-- button skeleton -->
        <div v-else class="flex justify-center items-center mb-4">
          <button class="skeleton w-1/6 h-10 rounded-full mr-2"></button>
          <button class="skeleton w-1/6 h-10 rounded-full"></button>
        </div>
      </div>
      <div v-else class="flex flex-col justify-center items-center h-max mt-9">
        <p class="text-2xl mb-4">No repositories found.</p>
        <p class="text-md">You can try checking your internet connection...</p>
      </div>
    </div>
  </div>
</template>
