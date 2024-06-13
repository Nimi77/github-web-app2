import { createRouter, createWebHistory } from 'vue-router'
import ReposPage from '../views/ReposPage.vue'
import RepoDetailsPage from '@/views/RepoDetailsPage.vue'
import NotFoundPage from '@/views/NotFoundPage.vue'
import ErrorBoundary from '@/views/ErrorBoundary.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name:'RepositoryPage',
      component: ReposPage,
      meta:{
        title: 'Repository Page',
        description:'This shows the user list of repositories'
      }
    },
    {
      path: '/repo/:id',
      name:'RepositoryDetailsPage',
      component: RepoDetailsPage,
      meta:{
        title: 'Repository Details Page',
        description:'This shows the details of a single repository'
      }
    },
    {
      path: '/404',
      name: 'not-found',
      component: NotFoundPage,
      meta:{
        title:'Not Found',
        description:'This is the 404 page'
      }

    },
    {
      path: '/error-boundary',
      name: 'error-boundary',
      component: ErrorBoundary,
      meta:{
        title:'Error Boundary',
        description:'This tests for errors in the page'
      }
    }
  ]
})

export default router
