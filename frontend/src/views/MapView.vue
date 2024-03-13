<template>
    <div class="pt-16">
        <h1 class="text-3xl font-semibold mb-4">Here's your trip</h1>
        <div>
            <div class="overflow-hidden shadow sm:rounded-md max-w-xl mx-auto text-left">
                <div class="bg-white px-4 py-5 sm:p-6">
                    <div>
                        <GMapMap v-if="location.destination.name !== ''" :zoom="11" :center="location.destination.geometry"
                            ref="gMap" style="width: 100%; height: 256px;">
                        </GMapMap>
                    </div>
                    <div class="mt-2">
                        <p class="text-xl">Going to <strong>{{ location.destination.name }}</strong></p>
                        <div class="mt-2">
                            <p class="text-sm text-gray-500">Distance: {{ location.distance }} km</p>
                            <p class="text-sm text-gray-500">Estimated time: {{ location.duration }} min</p>
                            <p class="text-sm text-gray-500">Price: {{ location.price }} RON</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button @click="handleConfirmTrip"
                        class="inline-flex justify-center rounded-md border border-transparent bg-black py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-gray-600 focus:outline-none">
                        Let's Go!</button>
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