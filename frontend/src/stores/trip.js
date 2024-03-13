import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTripStore = defineStore('trip', () => {
    const id = ref(null)
    const user_id = ref(null)

    const locationDefaults = {
        lat: null,
        lng: null
    }

    const tripDefaults = {
        distance: null,
        duration: null,
        price: null,
   
    }


    const origin = reactive({ ...locationDefaults })
    const destination = reactive({ ...locationDefaults })
    const driver_location = reactive({ ...locationDefaults })
    const trip_info = reactive({ ...tripDefaults })

    const driver = reactive({
        id: null,
        year: null,
        make: null,
        model: null,
        license_plate: null,
        user: {
            name: null,
        }
    })

    const { name: driverName } = driver.user

    const is_started = ref(false)
    const is_complete = ref(false)

    const reset = () => {
        id.value = null
        user_id.value = null

        Object.assign(origin, { ...locationDefaults })
        Object.assign(destination, { ...locationDefaults })
        Object.assign(driver_location, { ...locationDefaults })
        Object.assign(trip_info, { ...tripDefaults })

        Object.keys(driver).forEach(key => {
            if (key !== 'user') {
                driver[key] = null
            }
        })

        driverName.value = null

        is_started.value = false
        is_complete.value = false
    }

    return { id, user_id, origin, destination, driver_location,trip_info, driverName, is_started, is_complete, reset }
})
