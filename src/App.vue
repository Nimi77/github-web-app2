<script setup>
   import NavBar from './components/NavBar.vue';
   import SideBar from './components/SideBar.vue'
</script>

<template>
  <div>
    <NavBar/>
    <div class="main mt-3" id="main-content">
      <SideBar/>
      <router-view/>
    </div>
  </div>
</template>

<style scoped>

</style>