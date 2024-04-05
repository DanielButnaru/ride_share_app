import { createRouter, createWebHistory } from "vue-router";
import axios from "axios";
import { isEqual } from 'fast-deep-equal';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "onboarding",
      component:() => import("../views/OnboardingView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component:() => import("../views/LoginView.vue"),
    },
    {
      path: "/landing",
      name: "landing",
      component:() => import("../views/LandingView.vue"),
    },
    {
      path: "/location",
      name: "location",
      component: () => import("../views/LocationView.vue"),
    },
    {
      path: "/map",
      name: "map",
      component:() => import("../views/MapView.vue"),
    },
    {
      path: "/trip",
      name: "trip",
      component:() => import("../views/TripView.vue"),
    },
    {
      path: "/driver",
      name: "driver",
      component:()=> import("../views/DriverView.vue"),
    },
    {
      path: "/standby",
      name: "standby",
      component: () => import("../views/StandByView.vue"),
    },
    {
      path:"/driving",
      name:"driving",
      component:() => import("../views/DrivingView.vue"),
    },
    {
      path:"/ridehistory",
      name:"ridehistory",
      component: () => import("../views/RideHistoryView.vue"),
    }
  ],
});

// middleware pentru protectia rutelor

// TODO: de sters comentariile dupa ce rezolv problema cu autentificarea

router.beforeEach((to, from) => {
  if (to.name === 'login') {
    return true
  }

  if (!localStorage.getItem('token')) {
    return {
      name: 'login'
    }
  }

  checkTokenAuthenticity()
})

const checkTokenAuthenticity = () => {
  axios.get('http://127.0.0.1:8000/api/user', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then((response) => {})
    .catch((error) => {
      localStorage.removeItem('token')
      router.push({
        name: 'login'
      })
    })
}

export default router;
