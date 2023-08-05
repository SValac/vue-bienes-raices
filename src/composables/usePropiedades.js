import { collection } from 'firebase/firestore'
import { computed } from 'vue'
import { useFirestore, useCollection } from 'vuefire'

export default function usePropiedades() {

    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))


    const propiedadPrecio = computed(() => {

        return (precio) => 
            Number(precio).toLocaleString('es-MX',{
                style: 'currency',
                currency: 'MXN'
            })
    })

    return {

        propiedadesCollection,
        propiedadPrecio,

    }
}