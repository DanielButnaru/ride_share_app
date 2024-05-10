import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'



// Funcția care obține locația utilizatorului folosind navigator.geolocation.getCurrentPosition
const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}





// Definirea magazinului de stări pentru gestionarea locației utilizatorului
export const useLocationStore = defineStore('location', () => {
    // Definirea obiectului reactive pentru destinație
    const destination = reactive({
        name: '', // Numele destinației
        address: '', // Adresa destinației
        geometry: {
            lat: null, // Latitudinea destinației
            lng: null // Longitudinea destinației
        }
    })

    const addressName = ref('')

    // Definirea obiectului reactive pentru locația curentă a utilizatorului
    const current = reactive({
        geometry: {
            lat: null, // Latitudinea locației curente
            lng: null // Longitudinea locației curente
        }
    })

   

    // Acțiunea pentru actualizarea locației curente a utilizatorului
    const updateCurrentLocation = async () => {
        try {
            // Obținerea locației utilizatorului
            const userLocation = await getUserLocation();

            current.geometry = {
                lat: userLocation.coords.latitude, // Latitudinea
                lng: userLocation.coords.longitude // Longitudinea
            }
    
            // Crearea unui obiect google.maps.Geocoder
            const geocoder = new google.maps.Geocoder();
            const latlng = {
                lat: userLocation.coords.latitude,
                lng: userLocation.coords.longitude
            };
    
            // Promisiune pentru a obține adresa corespunzătoare coordonatelor
            const getAddress = () => {
                return new Promise((resolve, reject) => {
                    geocoder.geocode({ location: latlng }, (results, status) => {
                        if (status === 'OK') {
                            if (results[0]) {
                                const address = results[0].formatted_address;
                                resolve(address);
                            } else {
                                reject(new Error('Nicio adresă găsită pentru aceste coordonate.'));
                            }
                        } else {
                            reject(new Error('Geocodare nereușită din cauza:' + status));
                        }
                    });
                });
            };
    
            // Așteptăm rezultatul promisiunii pentru a obține adresa
            const address = await getAddress();
    
            // Actualizăm locația curentă cu adresa
            current.address = address;
            addressName.value= address;
    
            console.log('Locația curentă:', current);
        } catch (error) {
            console.error(error)
            // Poți gestiona aici erorile legate de obținerea locației curente
        }
    };

 
    

    // Funcția pentru resetarea stării
    const reset = () => {
        // Resetarea destinației
        Object.keys(destination).forEach(key => {
            if (typeof destination[key] === 'object') {
                Object.keys(destination[key]).forEach(innerKey => {
                    destination[key][innerKey] = null
                })
            } else {
                destination[key] = ''
            }
        })

        // Resetarea locației curente
        Object.keys(current.geometry).forEach(key => {
            current.geometry[key] = null
        })
    }
    
    // Returnarea obiectelor și funcțiilor pentru a fi accesate în componentele Vue
    return { destination, current, addressName, updateCurrentLocation, reset }
})
