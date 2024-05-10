<template>
  <div class="fixed left-0 w-full bottom-0 " :class="{ 'expanded bg-white': isExpanded }">

    <div v-if="isExpanded" class="bg-white">

      <h3 class="flex font-bold text-2xl md:text-3xl content-start m-4 md:ml-10"> Choose a ride</h3>


      <carousel :items-to-show="1" ref="getIndex">
        <slide v-for="(ride, index) in rides" :key="index">
          <div class="flex flex-col">
            <div>
              <img :src="ride.car_image" width="400px" height="400px"
                class="max-w-[250px] w-full md:max-w-[300px] lg:max-w-[350px]">
            </div>
            <div class="flex flex-row justify-between">
              <span class="text-lg md:text-xl font-bold">{{ ride.car }}</span>
              <span class="text-lg  md:text-xl font-medium">{{ ride.price }}</span>
            </div>
            <div class="flex flex-row gap-2">
              <span class="inline-flex items-center text-base md:text-lg gap-[2px]">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6.99984 10.0742L10.6048 12.25L9.64817 8.14916L12.8332 5.38999L8.639 5.03416L6.99984 1.16666L5.36067 5.03416L1.1665 5.38999L4.3515 8.14916L3.39484 12.25L6.99984 10.0742Z"
                    fill="#FFD233" />
                </svg>
                {{ ride.star }}
              </span>
              <span v-if="ride.verified" class="inline-flex items-center text-base md:text-lg gap-[2px]">
                <svg width="16" height="16" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_76_1017)">
                    <path
                      d="M5.01683 13.125L3.9085 11.2583L1.8085 10.7917L2.01266 8.63333L0.583496 7L2.01266 5.36667L1.8085 3.20833L3.9085 2.74167L5.01683 0.875L7.00016 1.72083L8.9835 0.875L10.0918 2.74167L12.1918 3.20833L11.9877 5.36667L13.4168 7L11.9877 8.63333L12.1918 10.7917L10.0918 11.2583L8.9835 13.125L7.00016 12.2792L5.01683 13.125ZM6.38766 9.07083L9.6835 5.775L8.86683 4.92917L6.38766 7.40833L5.1335 6.18333L4.31683 7L6.38766 9.07083Z"
                      fill="#39B3C0" />
                  </g>
                  <defs>
                    <clipPath id="clip0_76_1017">
                      <rect width="14" height="14" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                Verified

              </span>
              <span class="inline-flex items-center text-base md:text-lg gap-[2px]">
                <svg width="16" height="16" viewBox="0 0 12 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4.22885 8.14502C4.22885 9.09424 4.71664 9.59082 5.66147 9.59082H10.346C11.2909 9.59082 11.7787 9.09424 11.7787 8.14502V1.51807C11.7787 0.564453 11.2909 0.0678711 10.346 0.0678711H5.66147C4.71664 0.0678711 4.22885 0.564453 4.22885 1.51807V8.14502ZM5.10336 8.08789V1.5708C5.10336 1.1665 5.3143 0.946777 5.74057 0.946777H10.2669C10.6932 0.946777 10.9041 1.1665 10.9041 1.5708V8.08789C10.9041 8.49219 10.6932 8.71191 10.2669 8.71191H5.74057C5.3143 8.71191 5.10336 8.49219 5.10336 8.08789ZM8.00375 4.67773C8.61899 4.68213 9.11557 4.15479 9.11557 3.46045C9.11557 2.81006 8.61899 2.26953 8.00375 2.26953C7.38852 2.26953 6.89194 2.81006 6.89194 3.46045C6.89194 4.15479 7.38852 4.67334 8.00375 4.67773ZM0.335295 4.13721C0.0979905 4.40527 0.251799 4.76562 0.603362 4.76562H1.35483V6.56738C1.35483 6.7959 1.535 6.96289 1.76352 6.96289C1.98764 6.96289 2.16781 6.7959 2.16781 6.56738V4.76562H2.9061C3.27963 4.76562 3.41586 4.39648 3.18295 4.13721L2.02719 2.82324C1.86899 2.64746 1.64487 2.64746 1.49106 2.82324L0.335295 4.13721ZM6.06576 7.02441H9.94174C10.1351 7.02441 10.2318 6.89258 10.2318 6.7168C10.2318 6.24219 9.52865 5.02051 8.00375 5.02051C6.47885 5.02051 5.77572 6.24219 5.77572 6.7168C5.77572 6.89258 5.8724 7.02441 6.06576 7.02441Z"
                    fill="#1C1C1E" />
                </svg>
                {{ ride.seats }} seats
              </span>
            </div>
          </div>


        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>

      </carousel>


    </div>
    <button @click.prevent="handleSelectLocation" type="button"
      class="inline w-full md:w-10/12 lg:w-6/12 md:rounded-md justify-center  border border-transparent bg-light-green py-4 px-4 text-base md:text-lg lg:text-xl font-medium text-white shadow-sm  focus:outline-none"
      :class="{ 'hidden': !isExpanded }">
      Request a Ride
    </button>
    <button @click.prevent="toggleExpand" type="button"
      class="inline w-full md:w-10/12 lg:w-6/12 md:rounded-md justify-center  border border-transparent bg-light-green py-4 px-4 text-base md:text-lg lg:text-xl font-medium text-white shadow-sm  focus:outline-none"
      :class="{ 'hidden': isExpanded }">
      {{ isExpanded ? '' : 'Choose a ride ' }}
    </button>
    <button v-if="isExpanded" class="absolute top-0 right-0 m-4 md:mr-10" @click="toggleExpand">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</template>

<script setup>

import 'vue3-carousel/dist/carousel.css'
import { useRouter } from 'vue-router'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import { ref } from "vue";

const router = useRouter()

const isExpanded = ref(false);

const data = defineProps({
  destination: String
})

const rides = ref([
  {
    driver_id: 1,
    car: "Mercedes S Class",
    car_image: "/src/assets/images/driver-car/sclass.png",
    price: "10$/hr",
    star: "5",
    seats: "2",
    verified: true
  },
  {
    driver_id: 2,
    car: "BMW 7 Series ",
    car_image: "/src/assets/images/driver-car/bmw7.png",
    price: "6$/hr",
    star: "3.5",
    seats: "4",
    verified: true
  },
  {
    driver_id: 3,
    car: "Audi A8 Long",
    car_image: "/src/assets/images/driver-car/a8.png",
    price: "4$/hr",
    star: "3",
    seats: "4",
    verified: false
  },
]);



const handleSelectLocation = () => {
  if (data.destination !== '') {
    router.push({
      name: 'map'
    })
  }
}


const toggleExpand = () => {
  isExpanded.value = !isExpanded.value
}



</script>

<style scoped>
.expanded {
  height: auto;

}
</style>
