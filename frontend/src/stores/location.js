import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

export const useLocationStore = defineStore('location', () => {
    const destination = reactive({
        name: '',
        address: '',
        geometry: {
            lat: null,
            lng: null
        }
    })

    const current = reactive({
        geometry: {
            lat: null,
            lng: null
        }
    })

    const updateCurrentLocation = async () => {
        try {
            const userLocation = await getUserLocation()
            current.geometry = {
                lat: userLocation.coords.latitude,
                lng: userLocation.coords.longitude
            }
        } catch (error) {
            console.error(error)
            // Poți gestiona aici erorile legate de obținerea locației curente
        }
    }

    const reset = () => {
        Object.keys(destination).forEach(key => {
            if (typeof destination[key] === 'object') {
                Object.keys(destination[key]).forEach(innerKey => {
                    destination[key][innerKey] = null
                })
            } else {
                destination[key] = ''
            }
        })

        Object.keys(current.geometry).forEach(key => {
            current.geometry[key] = null
        })
    }
    
    return { destination, current, updateCurrentLocation, reset }
})
