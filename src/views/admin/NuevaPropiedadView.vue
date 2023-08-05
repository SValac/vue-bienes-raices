<script setup>
import { useForm, useField } from 'vee-validate';
import { validationSchema, imageSchema } from '@/validation/propiedadSchema';
import { collection, addDoc } from "firebase/firestore"; 
import { useFirestore } from 'vuefire';
import { useRouter } from 'vue-router';
import useImage from '@/composables/useImage'
import useLocationMap from '@/composables/useLocationMap'
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";

const {zoom, center, pin} = useLocationMap()
const items = [1,2,3,4,5];


const router = useRouter();
const {url, uploadImage, image } = useImage();



const db = useFirestore();

const { handleSubmit } = useForm({
    validationSchema: {
        ...validationSchema,
        ...imageSchema,
    }
});


const titulo = useField('titulo')
const imagen = useField('imagen')
const precio = useField('precio')
const habitaciones = useField('habitaciones')
const wc = useField('wc')
const estacionamiento = useField('estacionamiento')
const descripcion = useField('descripcion')
const alberca = useField('alberca', null, {
    initialValue: false
})


const submit = handleSubmit(async (values) => {

    const {imagen, ...propiedad} = values

    const docRef = await addDoc(collection(db, "propiedades"), {
        ...propiedad,
        imagen: url.value,
        ubicacion: center.value,
    });
    if(docRef.id){
        router.push({name: 'admin-propiedades'})
    }

});

</script>

<template>
    <v-card
        max-width="80%"
        class="mx-auto my-10"
        flat
    >
        <v-card-title 
            primary-title
            class="text-h4 font-weight-bold"    
        >
            Nueva Propiedad
        </v-card-title>
        <v-card-subtitle
            class="text-h5 py-2"
        >
            Llena el siguiente formulario
        </v-card-subtitle>

        <v-form class="mt-10">
            <v-text-field
                name="titulo"
                label="Titulo Propiedad"
                id="titulo"
                class="mb-5"
                v-model="titulo.value.value"
                :error-messages="titulo.errorMessage.value"
            />
            <v-file-input 
                accept="image/jpeg"
                label="Fotografia"
                prepend-icon="mdi-camera"
                v-model="imagen.value.value"
                :error-messages="imagen.errorMessage.value"
                @change="uploadImage"
            />

            <div
                v-if="image"
                class="my-5"
            >
                <p class="font-weight-bold">Imagen Propiedad</p>
                <img 
                    :src="image" 
                    alt="imagen propiedad"
                    class="w-50"
                />
            </div>
    
            <v-text-field
                name="precio"
                label="Precio"
                id="precio"
                class="mb-5"
                v-model="precio.value.value"
                :error-messages="precio.errorMessage.value"
            />
            <v-row>
                <v-col
                    cols="12"
                    sm="4"
                >
                    <v-select
                    :items="items"
                    label="Habitaciones"
                    class=""
                    v-model="habitaciones.value.value"
                    :error-messages="habitaciones.errorMessage.value"
                    ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    sm="4"
                >
                    <v-select
                    :items="items"
                    label="Baños"
                    class=""
                    v-model="wc.value.value"
                    :error-messages="wc.errorMessage.value"
                    ></v-select>
                </v-col>
                <v-col
                    cols="12"
                    sm="4"
                >
                    <v-select
                        :items="items"
                        label="Estacionamiento"
                        class=""
                        v-model="estacionamiento.value.value"
                        :error-messages="estacionamiento.errorMessage.value"
                    ></v-select>
                </v-col>
            </v-row>
    
            <v-textarea
                label="Descripcion"
                name="descripcion"
                v-model="descripcion.value.value"
                :error-messages="descripcion.errorMessage.value"
            />

            <v-checkbox 
                label="Alberca"
                v-model="alberca.value.value"
            />

            <h2 class="font-weight-bold text-center my-5">Ubicación</h2>
            <div class="pb-10">
                <div style="height:600px;">
                    <LMap 
                        v-model:zoom="zoom" 
                        :center="center"
                        :use-global-leaflet="false"   
                    >
                        <LMarker 
                            :lat-lng="center"
                            draggable
                            @moveend="pin"
                        />
                        <LTileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        ></LTileLayer>
                    </LMap>
                </div>
            </div>

            <v-btn
                color="var(--verde)"
                block
                class="font-weight-bold py-6"
                @click="submit"
               >Agregar Propiedad</v-btn>

        </v-form>
    </v-card>
</template>

<style>

</style>