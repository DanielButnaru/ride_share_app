<template>
  <Box class=" max-w-[900px]  py-14 relative top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3">
    <h1 class="text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 tracking-normal">Andrewber</h1>

    <p class="text-gray-500 font-normal tracking-wide ">Choose your category!</p>

    <div class=" mt-14 flex flex-col h-[140px] md:h-full justify-between md:flex-row w-1/2 mx-auto ">
      <PrimaryButton
          class="flex-shrink-0 overflow-hidden"
          @click="handleStartDriving"
      >
        Start&nbsp;Driving
      </PrimaryButton>
      <PrimaryButton
          @click="handleFindARide"
      >
        Find&nbsp;A&nbsp;Ride
      </PrimaryButton>
    </div>


  </Box>
</template>
<script setup>
import {useRouter} from 'vue-router'
import http from '@/helpers/http'
import Box from "../components/Box.vue";
import PrimaryButton from "../components/PrimaryButton.vue";

const router = useRouter()
const handleStartDriving = () => {
  http().get('/api/driver')
      .then((response) => {
        if (response.data.driver) {
          router.push({
            name: 'standby'
          })
        } else {
          router.push({
            name: 'driver'
          })
        }
      })
      .catch((error) => {
        console.error(error)
      })
}
const handleFindARide = () => {
  router.push({
    name: 'location'
  })
}

//TODO: de remediat designul
</script>