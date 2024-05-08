<template>
    <button type="button" @click="toggle"
        id="sidebar-toggle"
        class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:text-white  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
        <span class="sr-only">Open sidebar</span>
        <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path clip-rule="evenodd" fill-rule="evenodd"
                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
            </path>
        </svg>
    </button>

     <aside :class="{ 'translate-x-0': is_expanded, '-translate-x-full': !is_expanded }" 
        id="sidebar"
        class=" fixed top-0 left-0 z-40 w-64 h-full transition-transform duration-300 ease-in-out transform bg-white  "
        aria-label="Sidebar">
        <div class=" bg-gray-200 ">
            <div class="bg-white  py-10 px-4 rounded-b ">
                <ul class=space-y-2>
                    <li class="text-start">
                        <div class="flex flex-row items-center h-8">
                            <img class="w-auto h-6" src="https://img.icons8.com/color/48/000000/vue-js.png" />
                            <div class="flex flex-col">
                                <span class="ms-4 text-sm font-semibold text-gray-500">{{ user.name  }}</span>
                                <span class="text-xs ms-4 text-green-500"> View Profile</span>
                            </div>
                      
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bg-white py-10 px-4 rounded-t  mt-2  overflow-hidden ">
                <ul class="space-y-2 font-medium">
                    <li>
                        <a href="#"
                            class="flex items-center p-2 text-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 group">
                            <Icon icon="ph:wallet-light" />
                            <span class="ms-4 text-sm font-normal">Payment Methods</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center p-2 text-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 group">
                            <Icon icon="ant-design:tag-outlined" />
                            <span class="ms-4 text-sm font-normal">Promotions</span>
                        </a>
                    </li>
                    <li>
                        <RouterLink to="ridehistory"
                            class="flex items-center p-2 text-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 group">
                            <Icon icon="ph:clock" />
                            <span class="ms-4 text-sm font-normal">My Rides</span>
                        </RouterLink>
                    
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center p-2 text-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 group">
                            <Icon icon="material-symbols:help-outline" />
                            <span class="ms-4 text-sm font-normal">Assistance</span>
                        </a>
                    </li>
                    <li>
                        <a href="#"
                            class="flex items-center p-2 text-gray-600 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-200 group">
                            <Icon icon="material-symbols:info-outline" />
                            <span class="ms-4 text-sm font-normal">About Us</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </aside>
</template>
<script setup>


import { onMounted ,ref } from 'vue'
import { Icon } from '@iconify/vue'
import http from '@/helpers/http'




const is_expanded = ref(localStorage.getItem('is_expanded') === 'true')

const toggle = () => {
    is_expanded.value = !is_expanded.value
    localStorage.setItem(' translate-x-0', is_expanded.value)
}

// daca se face click in afara meniului se inchide dar facem  exceptie de la butonul de toggle

window.addEventListener('click', (e) => {
    if (!e.target.closest('#sidebar') && !e.target.closest('#sidebar-toggle')) {
        is_expanded.value = false
    }
})


// vom face o cerere de tip get catre server pentru a prelua numele utilizatorului

const user = ref({})
onMounted(async () => {
    try {
        const response = await http().get('/api/user')
        user.value = response.data
    } catch (error) {
        console.error(error)
    }
})

</script>

<style scoped></style>