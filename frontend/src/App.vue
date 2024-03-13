<script setup>
import { RouterView } from 'vue-router'
import  Nav  from './components/Nav.vue'
</script>



<template>
  <div class=" absolute z-50">
    <Nav />
  </div>


  <div class="min-h-screen bg-gray-100 text-center antialiased">
    <RouterView />
  </div>
  
</template>

