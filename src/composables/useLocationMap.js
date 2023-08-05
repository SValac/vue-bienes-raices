import { ref } from 'vue';


export default function useLocationMap() {

    const zoom = ref(14);
    const center = ref([19.2474138, -103.7257197])

    function pin(event) {
        const marker = event.target.getLatLng()
        center.value = [marker.lat, marker.lng]
        console.log(center.value)
    }

    return {
        zoom,
        center,
        pin,
    }
}