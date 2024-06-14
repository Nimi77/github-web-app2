<script setup>
import NavBar from './components/NavBar.vue';
import SideBar from './components/SideBar.vue';
import ErrorBoundary from './views/ErrorBoundary.vue';
</script>

<template>
  <div>
    <NavBar />
    <div class="main">
      <SideBar />
      <ErrorBoundary>
        <router-view />
      </ErrorBoundary>
    </div>
  </div>
</template>
