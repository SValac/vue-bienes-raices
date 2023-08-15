<script setup>
import usePropiedades from '../composables/usePropiedades';
import Propiedades from '../components/Propiedades.vue' ;
import { propiedadPrecio } from '../helpers/';

const {alberca, filterItems } = usePropiedades();

</script>

<template>
    <h1 class="text-center">Life & Home</h1>

    <v-card
        class="py-10"
    >
        <v-card-title class="text-h5">
            Busqueda
            <v-checkbox label="Alberca" v-model="alberca" />
        </v-card-title>
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
