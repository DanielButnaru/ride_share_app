<template>
  <div>
    <Search />
  </div>
  <div class=" fixed left-0 w-full h-auto ">
    <GMapMap :zoom="14" :center="currentLocation" ref="gMap" style="width:100%; height: 100vh;" @click="handleMapClick">
      <GMapMarker :position="currentLocation" :icon="currentIcon" />
      <GMapMarker v-if="selectedDestinatination" :position="selectedDestinatination.geometry" :icon="destinationIcon" />
    </GMapMap>
  </div>

  <div>
    <RideCategory :destination="location.destination.name" />
  </div>
</template>
<script setup>
import { useLocationStore } from '@/stores/location' // Importăm magazinul de locații pentru a gestiona locațiile
import { useRouter } from 'vue-router' // Importăm router-ul Vue pentru a gestiona navigarea
import { onMounted, ref, nextTick } from 'vue' // Importăm funcții Vue pentru gestionarea ciclului de viață al componentei
import { Loader } from '@googlemaps/js-api-loader' // Importăm încărcătorul pentru API-ul Google Maps
import RideCategory from "../components/RideCategory.vue";
import Search from '../components/Search.vue'







// Variabile reactive
const location = useLocationStore() // Store-ul pentru locații
const router = useRouter() // Router-ul Vue
const gMap = ref(null) // Referință către obiectul Google Map
const mapObject = ref(null) // Referință către obiectul hărții
const selectedDestinatination = ref(null) // Locația selectată
const currentLocation = ref({ // Locația curentă
  lat: 0,
  lng: 0
})

// Icone pentru marcatori
const currentIcon = {
  url: 'https://openmoji.org/data/color/svg/E0A9.svg', // Icon pentru locația curentă
  scaledSize: { width: 35, height: 35 }
}

const destinationIcon = {
  url: 'https://openmoji.org/data/color/svg/1F3C1.svg', // Icon pentru destinație
  scaledSize: { width: 35, height: 35 }
}

// Funcție pentru gestionarea schimbării locației selectate
// const handleLocationChanged = (e) => {
//   console.log('handleLocationChanged', e)
//   location.$patch({
//     destination: {
//       name: e.name,
//       address: e.formatted_address,
//       geometry: {
//         lat: e.geometry.location.lat(),
//         lng: e.geometry.location.lng()
//       }
//     }
//   })
// }

// Funcție pentru gestionarea selectării unei locații
const handleSelectLocation = () => {
  if (location.destination.name !== '') {
    router.push({
      name: 'map'
    })
  }
}

// Funcție care se activează la montarea componentei
onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentLocation.value = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    }, (error) => {

      console.error(error)
    }, (error) => {
      console.error(error)
    })
    console.error('navigator.geolocation is not supported')
  }
})

// Funcție pentru gestionarea clicului pe hartă
const handleMapClick = (e) => {
  const lat = e.latLng.lat();
  const lng = e.latLng.lng();

  const loader = new Loader({
    apiKey: 'YOUR_API_KEY', // Cheia API Google Maps
    version: 'weekly',
  });

  loader.load().then(() => {
    const geocoder = new google.maps.Geocoder();

    const latlng = {
      lat: lat,
      lng: lng,
    };

    geocoder.geocode({ location: latlng }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          const address = results[0].formatted_address;
          // Actualizăm locația selectată cu adresa
          selectedDestinatination.value = {
            name: address,
            address: address,
            geometry: {
              lat: lat,
              lng: lng
            }
          };
          location.$patch({
            destination: selectedDestinatination.value
          });
          const input = document.getElementById('autocomplete');
          input.value = address;
          // Actualizăm locația curentă
          location.destination = {
            name: address,
            address: address,
            geometry: {
              lat: lat,
              lng: lng
            }
          }
        } else {
          console.log('Nicio adresă găsită pentru aceste coordonate.');
        }
      } else {
        console.log('Geocodare nereușită din cauza:', status);
      }
    });
  });
};


</script>


<style>
.gm-style button {
  display: none !important;
}

.gmnoprint {
  display: none !important;
}
</style>
