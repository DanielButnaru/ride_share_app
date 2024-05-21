<template>
    <header>
        <Nav />
    </header>
    <main class=" relative container mx-auto h-screen text-center antialiased">
        <RouterView />
    </main>

</template>
<script setup>
import { RouterView } from 'vue-router';
import Nav from '../components/Nav.vue'
</script>