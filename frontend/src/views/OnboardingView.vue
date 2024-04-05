<template>
  <div class="container mx-auto py-16 px-10">
    <div class="flex flex-row justify-between">
      <div>
        logo
      </div>
      <div>
      <span
          v-for="(item, index) in slider"
          :key="index"
          @click="goToSlide(index)"
          :class="{ active: index === sliderActive }"
          class="page-dot"
      ></span>

      </div>

    </div>
    <div

        class="mt-24"
        v-show="sliderActive===index"
        v-for="(slide,index) in slider" key=" index">
      <div
          class="slider"
          :class="{'slide-in': sliderActive === index && index !== 0, 'slide-out': sliderActive !== index }"
      >
        <div><img
            class="mx-auto mb-20 h-full max-h-[800px]"
            :src="slide.path"></div>
        <div>
          <h2 class="text-2xl lg:text-3xl xl:text-4xl font-bold my-4">{{ slide.title }}</h2>
          <p class="text-base lg:text-lg xl:text-xl text-gray-500">{{ slide.paragraph }}</p>
        </div>
      </div>
    </div>

    <PrimaryButton
        class="mt-10"
        @click="nextSlider()"
    >
      Next
    </PrimaryButton>

  </div>
</template>

<script setup>
import Onboarding1 from "../assets/onboarding_1.svg";
import Onboarding2 from "../assets/onboarding_2.svg";
import Onboarding3 from "../assets/onboarding_3.svg";
import {ref} from 'vue'
import PrimaryButton from "../components/PrimaryButton.vue";
import router from "../router";

const sliderActive = ref(0);
const slider = ref([
  {
    title: "Welcome to trident taxi ride share service",
    paragraph: "By comparing all the major ride options in one free app",
    path: Onboarding1,
  },
  {
    title: "Get rides to great ride without the hassle",
    paragraph: "By comparing all the major ride options in one free app",
    path: Onboarding2,
  },
  {
    title: "Save time, save money and safe ride",
    paragraph: "By comparing all the major ride options in one free app",
    path: Onboarding3,
  }

])

function nextSlider() {
  if (sliderActive.value < slider.value.length - 1) {
    sliderActive.value++
  } else {
    router.push('/login');
  }
}

function goToSlide(index) {
  sliderActive.value = index;
}


</script>

<style scoped>

.slide-in {
  animation: slideIn 0.5s ease forwards;
}

.slide-out {
  animation: slideOut 0.5s ease forwards;
}

@keyframes slideIn {
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOut {
  0% {
    opacity: 1;
    transform: translateX(0);
  }
  100% {
    opacity: 0;
    transform: translateX(100%);
  }
}


.page-dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: gray;
  margin: 0 5px;
  cursor: pointer;
}

.page-dot.active {
  background-color: #3C8F7C;
  width: 30px;
  border-radius: 10px;

}


</style>