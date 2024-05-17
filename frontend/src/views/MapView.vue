<template>
    <div class="pt-16 max-w-2xl mx-auto">
        <h3 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 flex items-start">Booked Details</h3>
        <div>
            <div class="w-full bg-white rounded-lg shadow-lg py-4 mb-2">
                <div class=" flex">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M12 12C12.55 12 13.021 11.804 13.413 11.412C13.805 11.02 14.0007 10.5493 14 10C14 9.45 13.804 8.979 13.412 8.587C13.02 8.195 12.5493 7.99933 12 8C11.45 8 10.979 8.196 10.587 8.588C10.195 8.98 9.99933 9.45067 10 10C10 10.55 10.196 11.021 10.588 11.413C10.98 11.805 11.4507 12.0007 12 12ZM12 22C9.31667 19.7167 7.31267 17.596 5.988 15.638C4.66333 13.68 4.00067 11.8673 4 10.2C4 7.7 4.80433 5.70833 6.413 4.225C8.02167 2.74167 9.884 2 12 2C14.1167 2 15.9793 2.74167 17.588 4.225C19.1967 5.70833 20.0007 7.7 20 10.2C20 11.8667 19.3373 13.6793 18.012 15.638C16.6867 17.5967 14.6827 19.7173 12 22Z"
                                fill="black" />
                        </svg>
                    </span>
                    <span>{{ location.current.address }}</span>
                </div>
                <div class=" flex">
                    <span>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.9998 22.95C11.7165 22.95 11.4788 22.8543 11.2868 22.663C11.0948 22.4717 10.9991 22.234 10.9998 21.95V20.95C8.91647 20.7167 7.1288 19.8543 5.6368 18.363C4.1448 16.8717 3.28247 15.084 3.0498 13H2.0498C1.76647 13 1.52914 12.904 1.3378 12.712C1.14647 12.52 1.05047 12.2827 1.0498 12C1.0498 11.7167 1.1458 11.479 1.3378 11.287C1.5298 11.095 1.76714 10.9993 2.0498 11H3.0498C3.28314 8.91667 4.1458 7.129 5.6378 5.637C7.12981 4.145 8.91714 3.28267 10.9998 3.05V2.05C10.9998 1.76667 11.0958 1.52934 11.2878 1.338C11.4798 1.14667 11.7171 1.05067 11.9998 1.05C12.2831 1.05 12.5208 1.146 12.7128 1.338C12.9048 1.53 13.0005 1.76734 12.9998 2.05V3.05C15.0831 3.28334 16.8708 4.146 18.3628 5.638C19.8548 7.13 20.7171 8.91734 20.9498 11H21.9498C22.2331 11 22.4708 11.096 22.6628 11.288C22.8548 11.48 22.9505 11.7173 22.9498 12C22.9498 12.2833 22.8541 12.521 22.6628 12.713C22.4715 12.905 22.2338 13.0007 21.9498 13H20.9498C20.7165 15.0833 19.8541 16.871 18.3628 18.363C16.8715 19.855 15.0838 20.7173 12.9998 20.95V21.95C12.9998 22.2333 12.9038 22.471 12.7118 22.663C12.5198 22.855 12.2825 22.9507 11.9998 22.95ZM11.9998 19C13.9331 19 15.5831 18.3167 16.9498 16.95C18.3165 15.5833 18.9998 13.9333 18.9998 12C18.9998 10.0667 18.3165 8.41667 16.9498 7.05C15.5831 5.68334 13.9331 5 11.9998 5C10.0665 5 8.41647 5.68334 7.0498 7.05C5.68314 8.41667 4.9998 10.0667 4.9998 12C4.9998 13.9333 5.68314 15.5833 7.0498 16.95C8.41647 18.3167 10.0665 19 11.9998 19ZM11.9998 16C10.8998 16 9.95814 15.6083 9.1748 14.825C8.39147 14.0417 7.9998 13.1 7.9998 12C7.9998 10.9 8.39147 9.95834 9.1748 9.175C9.95814 8.39167 10.8998 8 11.9998 8C13.0998 8 14.0415 8.39167 14.8248 9.175C15.6081 9.95834 15.9998 10.9 15.9998 12C15.9998 13.1 15.6081 14.0417 14.8248 14.825C14.0415 15.6083 13.0998 16 11.9998 16Z"
                                fill="black" />
                        </svg>
                    </span>
                    <span>{{ location.destination.name }}</span>
                </div>

            </div>

            <div>
                <h4 class="text-xl md:text-2xl lg:text-3xl font-bold flex items-start mb-2 ">Track on map</h4>
                <GMapMap v-if="location.destination.name !== ''" :zoom="11" :center="location.destination.geometry"
                    ref="gMap" style="width: 100%; height: 256px;" class="rounded-lg">
                </GMapMap>
            </div>



            <div class="overflow-hidden sm:rounded-md  mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <h4 class="text-xl md:text-2xl lg:text-3xl font-bold flex items-start mb-2 ">Driver Details</h4>

                    <div class="mt-2">

                        <div class="flex flex-row items-center">
                            <img src="../assets/user.jpg" class="w-16 h-16">
                            <div>
                                <span class=" text-base md:text-lg font-bold">Driver Name</span>
                                <span class="flex flex-row items-center">
                                    <svg width="16" height="16" viewBox="0 0 14 14" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M6.99984 10.0742L10.6048 12.25L9.64817 8.14916L12.8332 5.38999L8.639 5.03416L6.99984 1.16666L5.36067 5.03416L1.1665 5.38999L4.3515 8.14916L3.39484 12.25L6.99984 10.0742Z"
                                            fill="#FFD233" />
                                    </svg>
                                    5.0 (342 ratings)
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50  py-3 text-right ">


                    <button @click="handleConfirmTrip" type="button"
                        class="inline w-full   rounded-md justify-center  border border-transparent bg-light-green py-4 text-base md:text-lg lg:text-xl font-medium text-white shadow-sm  focus:outline-none">
                        Let's Go!
                    </button>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location'
import { useTripStore } from '@/stores/trip'
import http from '@/helpers/http'
import axios from 'axios';
import { onMounted, ref, nextTick } from 'vue';
import { useRouter } from 'vue-router'

const location = useLocationStore()
const trip = useTripStore()
const router = useRouter()
const gMap = ref(null)

const handleConfirmTrip = async () => {
    try {
        const response = await http().post('/api/trip', {
            origin: location.current.geometry,
            destination: location.destination.geometry,
            destination_name: location.destination.name,
        })


        trip.$patch(response.data)
        // salvam distanta, durata si pretul in store/trip.js
        router.push({ name: 'trip' })
    } catch (error) {
        console.error(error)
    }
}

onMounted(async () => {
    // Redirecționează către pagina 'location' dacă destinația nu este setată
    if (location.destination.name === '') {
        router.push({ name: 'location' })
    }

    // Actualizează locația curentă
    await location.updateCurrentLocation()

    // Așteaptă finalizarea randării componente
    await nextTick()

    // Verifică dacă există o hartă și traseul pentru afișare
    if (gMap.value) {
        gMap.value.$mapPromise.then((mapObject) => {
            const currentPoint = new google.maps.LatLng(location.current.geometry)
            const destinationPoint = new google.maps.LatLng(location.destination.geometry)
            const directionsService = new google.maps.DirectionsService()
            const directionsDisplay = new google.maps.DirectionsRenderer({ map: mapObject })

            // Calculează și afișează traseul pe hartă
            directionsService.route({
                origin: currentPoint,
                destination: destinationPoint,
                avoidTolls: false,
                avoidHighways: false,
                travelMode: google.maps.TravelMode.DRIVING
            }, (res, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(res)

                    // Calculează distanța dintre cele două puncte in km si rotunjește la 2 zecimale
                    const distance = (res.routes[0].legs[0].distance.value / 1000).toFixed(2)
                    location.distance = distance

                    // Calculează durata călătoriei in minute și rotunjește la întreg
                    const duration = Math.round(res.routes[0].legs[0].duration.value / 60)
                    location.duration = duration

                    // calculeaza pretul

                    let basePricePerKm = 1.5;
                    const cityExitFee = basePricePerKm + 1;
                    const distanceThreshold = 50;
                    // verificam daca soferul trebuie sa iasa din oras si daca da fixam pretul la 3.5
                    if (distance > distanceThreshold) {
                        location.price = (distance * cityExitFee).toFixed(2);
                    } else {
                        location.price = (distance * basePricePerKm).toFixed(2);
                    }

                    // salvam distanta, durata si pretul in store/trip.js
                    trip.$patch({
                        distance,
                        duration,
                        price: location.price
                    })

                } else {
                    console.error(status)
                }
            })
        })
    }

    // ok, acum trimtem distanta, durata si pretul la in store/trip.js







})


</script>

<style>
.vue-map {
    border-radius: 20px;
}
</style>