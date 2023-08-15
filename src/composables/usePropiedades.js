import { computed, ref } from 'vue'
import { collection, doc, deleteDoc } from 'firebase/firestore'
import { ref as storageRef, deleteObject } from 'firebase/storage'
import { useFirestore, useCollection, useFirebaseStorage } from 'vuefire'

export default function usePropiedades() {

    const alberca = ref(false)

    const storage = useFirebaseStorage()
    const db = useFirestore()
    const propiedadesCollection = useCollection(collection(db, 'propiedades'))


    async function deleteItem( id, urlImage ){
        if(confirm('Seguro que quieres eliminar la pripiedad?')){
            const docRef = doc(db, 'propiedades', id)
            const imageRef = storageRef(storage, urlImage)

            await Promise.all([
                deleteDoc(docRef),
                deleteObject(imageRef)
            ])

        }
    }

/* 
    Scamos este metodo porque aunque solo vamos a utiliar este unicamente, se ejecuta todo
    el codigo el  JS, lo cual hace una llamada incesaria a la BD, para evitarlo esta funcion la llevamos a un helper para solo ejecutarla sin ahcer la query a la BD


 */
    const filterItems = computed(() => {
        return alberca.value ?
            propiedadesCollection.value.filter(propiedad => propiedad.alberca):
            propiedadesCollection.value
    })

    return {
        alberca,
        filterItems,
        propiedadesCollection,
        deleteItem,
        //propiedadPrecio,

    }
}