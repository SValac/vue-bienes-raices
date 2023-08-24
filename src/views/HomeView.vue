<script setup>
import {ref} from 'vue'
import usePropiedades from '../composables/usePropiedades';
import Propiedades from '../components/Propiedades.vue' ;
import Filter from '../components/Filter.vue'
import { propiedadPrecio } from '../helpers/';

const {alberca, filterItems } = usePropiedades();
const drawer = ref( false);


</script>

<template>
    <Filter 
        :drawer="drawer"
    />

    <h1 class="text-center">Life & Home</h1>

    <v-card
        class="py-10"
    >
        <template v-slot:prepend>
            <v-card-title class="text-h5">
            Busqueda
                <v-checkbox label="Alberca" v-model="alberca" />
            </v-card-title>
        </template>
        <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-filter"
            ></v-btn>
        </template>
            
            

        <v-row>
            <Propiedades 
                v-for="porpiedad in filterItems"
                :key="porpiedad.id"
                :porpiedad="porpiedad"
                :precio="propiedadPrecio"
            />
        </v-row>

    </v-card>
</template>
