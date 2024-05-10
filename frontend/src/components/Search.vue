<template>
    <div class="absolute  top-10 z-40 left-1/2 -translate-x-1/2 w-full bg-transparent">
        <form action="#" @submit.prevent="" class="w-full">
            <div
                class="flex justify-center items-center space-x-2 overflow-hidden  sm:rounded-md w-3/4 mx-auto text-left">
                <div class="py-1 w-full ">
                    <div
                        class="relative gap-1 mt-1 flex w-full px-3 py-3 bg-white rounded-md border border-gray-300 shadow-sm focus-within:border-black focus-within:outline-none">
                        
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9998 22.95C11.7165 22.95 11.4788 22.8543 11.2868 22.663C11.0948 22.4717 10.9991 22.234 10.9998 21.95V20.95C8.91647 20.7167 7.1288 19.8543 5.6368 18.363C4.1448 16.8717 3.28247 15.084 3.0498 13H2.0498C1.76647 13 1.52914 12.904 1.3378 12.712C1.14647 12.52 1.05047 12.2827 1.0498 12C1.0498 11.7167 1.1458 11.479 1.3378 11.287C1.5298 11.095 1.76714 10.9993 2.0498 11H3.0498C3.28314 8.91667 4.1458 7.129 5.6378 5.637C7.12981 4.145 8.91714 3.28267 10.9998 3.05V2.05C10.9998 1.76667 11.0958 1.52934 11.2878 1.338C11.4798 1.14667 11.7171 1.05067 11.9998 1.05C12.2831 1.05 12.5208 1.146 12.7128 1.338C12.9048 1.53 13.0005 1.76734 12.9998 2.05V3.05C15.0831 3.28334 16.8708 4.146 18.3628 5.638C19.8548 7.13 20.7171 8.91734 20.9498 11H21.9498C22.2331 11 22.4708 11.096 22.6628 11.288C22.8548 11.48 22.9505 11.7173 22.9498 12C22.9498 12.2833 22.8541 12.521 22.6628 12.713C22.4715 12.905 22.2338 13.0007 21.9498 13H20.9498C20.7165 15.0833 19.8541 16.871 18.3628 18.363C16.8715 19.855 15.0838 20.7173 12.9998 20.95V21.95C12.9998 22.2333 12.9038 22.471 12.7118 22.663C12.5198 22.855 12.2825 22.9507 11.9998 22.95ZM11.9998 19C13.9331 19 15.5831 18.3167 16.9498 16.95C18.3165 15.5833 18.9998 13.9333 18.9998 12C18.9998 10.0667 18.3165 8.41667 16.9498 7.05C15.5831 5.68334 13.9331 5 11.9998 5C10.0665 5 8.41647 5.68334 7.0498 7.05C5.68314 8.41667 4.9998 10.0667 4.9998 12C4.9998 13.9333 5.68314 15.5833 7.0498 16.95C8.41647 18.3167 10.0665 19 11.9998 19ZM11.9998 16C10.8998 16 9.95814 15.6083 9.1748 14.825C8.39147 14.0417 7.9998 13.1 7.9998 12C7.9998 10.9 8.39147 9.95834 9.1748 9.175C9.95814 8.39167 10.8998 8 11.9998 8C13.0998 8 14.0415 8.39167 14.8248 9.175C15.6081 9.95834 15.9998 10.9 15.9998 12C15.9998 13.1 15.6081 14.0417 14.8248 14.825C14.0415 15.6083 13.0998 16 11.9998 16Z"
                                fill="black" />
                        </svg>

       
                        <GMapAutocomplete placeholder="My destination" @place_changed="handleLocationChanged"
                            ref="autocomplete" :options="{ types: ['address'] }" id="autocomplete"
                            class="block w-full bg-transparent focus:outline-none">
                        </GMapAutocomplete>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location'
import { onMounted, ref } from 'vue';
// import { ref } from 'vue';



// Variabile reactive
const location = useLocationStore() // Store-ul pentru locații
const currentLocation = ref(null);


// Funcție pentru gestionarea schimbării locației selectate
const handleLocationChanged = (e) => {
    console.log('handleLocationChanged', e)
    location.$patch({
        destination: {
            name: e.name,
            address: e.formatted_address,
            geometry: {
                lat: e.geometry.location.lat(),
                lng: e.geometry.location.lng()
            }
        }
    })
}





</script>