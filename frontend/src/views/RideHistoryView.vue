<template>

    <div class="flex min-h-screen items-center justify-center">
        <div class="overflow-x-auto">
            <table class="min-w-full bg-white shadow-md rounded-xl">
                <thead>
                    <tr class="bg-blue-gray-100 text-gray-700">
                        <th class="py-3 px-4 ">Origin</th>
                        <th class="py-3 px-4 ">Destination</th>
                        <th class="py-3 px-4 ">Status</th>
                        <th class="py-3 px-4 ">Date</th>
                        <th class="py-3 px-4 ">Price</th>
                    </tr>
                </thead>
                <tbody v-for="trip in trips" :key="trip.id" class="text-blue-gray-900">
                    <tr class="border-b border-blue-gray-200">
                        <td class="py-3 px-4">{{ trip.originAddress }}</td>
                        <td class="py-3 px-4">{{ extractStreetName(trip.destination_name) }}</td>
                        <td class="py-3 px-4">
                            <p v-if="trip.is_complete == 1" class="ms-4 text-sm font-semibold text-green-500">Completed</p>
                            <p v-else class=" ms-4 text-sm font-semibold text-red-500">Canceled</p>
                        </td>
                        <td class="py-3 px-4">{{ formatDate(trip.created_at) }}</td>
                        <td class="py-3 px-4">
                            <a href="#" class="font-medium text-blue-600 hover:text-blue-800">Edit</a>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import http from '@/helpers/http'
import { Icon } from '@iconify/vue';
import { Loader } from '@googlemaps/js-api-loader'

const trips = ref([])
const tripId = ref(null);

onMounted(async () => {
    try {
        const response = await http().get(`/api/trip/${tripId}/index`)
        trips.value = response.data
        await formatAddressesForTrips(); // Apelează funcția pentru formatarea adreselor
    } catch (error) {
        console.error(error)
    }
})

// Funcția pentru formatarea adreselor pentru toate călătoriile
const formatAddressesForTrips = async () => {
    const formattedTripsPromises = trips.value.map(async (trip) => {
        try {
            const originAddress = await formatAddress(trip.origin);
            return {
                ...trip,
                originAddress
            };
        } catch (error) {
            console.error(error);
            return trip;
        }
    });

    try {
        const formattedTrips = await Promise.all(formattedTripsPromises);
        trips.value = formattedTrips; // Actualizează lista cu călătoriile formatate
    } catch (error) {
        console.error(error);
    }
};

const formatDate = (dateString) => {
    const date = new Date(dateString)
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const formatAddress = ({ lat, lng }) => {
    return new Promise((resolve, reject) => {
        const loader = new Loader({
            apiKey: 'AIzaSyCAqdwRPpTtDGc6lWZKlSO0EPgkAKRo-8o',
            version: "weekly",
        });

        loader.load().then(() => {
            const geocoder = new google.maps.Geocoder();
            const latlng = new google.maps.LatLng(lat, lng);

            geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        const addressComponents = results[0].address_components;
                        const streetName = addressComponents
                            .find(component => component.types.includes('route'))?.long_name || 'N/A';

                        resolve(streetName);
                    } else {
                        reject('Nu s-a găsit nicio adresă.');
                    }
                } else {
                    reject('Geocodificarea a eșuat din cauza: ' + status);
                }
            });
        });
    });
};

const extractStreetName = (destinationName) => {
    const parts = destinationName.split(',');
    return parts.length > 0 ? parts[0] : 'N/A';
};



</script>
