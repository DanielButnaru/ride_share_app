<template>

    <header class="container mx-auto w-full ">
        <div class="fixed top-5">
            <BackHomeButton />
        </div>
    </header>
    <main class=" top-10 relative container mx-auto h-screen text-center antialiased">
        <RouterView />
    </main>

</template>
<script setup>
import { RouterView } from 'vue-router';
import BackHomeButton from '../components/BackHomeButton.vue';

</script>