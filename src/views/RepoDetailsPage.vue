<script setup>
import { ref, onMounted, watch } from 'vue'
import { Octokit } from '@octokit/core'
import { useRoute } from 'vue-router'

const route = useRoute()
const repoId = route.params.id 

const repository = ref(null)
const loading = ref(true)

const fetchRepoDetails = async () => {
  loading.value = true
  try {
    const octokit = new Octokit()
    const response = await octokit.request('GET /repositories/{repository_id}', {
      repository_id: repoId
    })
    repository.value = response.data
    console.log(response.data)
  } catch (error) {
    console.log('error fetching', error)
  }
  loading.value = false
}
onMounted(fetchRepoDetails)

//Re-fetch repo details if repoId changes
watch(() => route.params.id, fetchRepoDetails)

const formatDate = (dateTimeString) => {
  const date = new Date(dateTimeString);
  return date.toLocaleDateString();
};
</script>

<template>
  <div className="inter flex flex-col items-center justify-center ">
    <div v-if="!loading"
      className="w-full max-w-xl mx-auto md:max-w-30rem bg-white text-black shadow-lg rounded-lg p-10 mt-8"
    >
      <p className="font-bold mb-2 capitalize pb-1 ">{{repository.name}}</p>
      <p className="repo-info text-sm">
        Description: {{repository.description || "No Description Provided"}}
      </p>

      <div
        className="repo-info text-sm flex flex-row justify-between items-center mt-8 border-b-2 border-gray-200 pb-2"
      >
        <p>Stars: {{repository.stargazers_count}}</p>
        <p>Forks: {{repository.forks_count}}</p>
        <p className="text-blue">Language: {{repository.language || "Unable to specify language"}}</p>
      </div>
      <div className="my-8">
        <p className="mb-4 text-sm">Created at: {{formatDate(repository.created_at)}}</p>
        <p className="text-sm">Updated at: {{formatDate(repository.updated_at)}}</p>
      </div>
    </div>
    <div v-else >Repository not found!</div>
  </div>
</template>

