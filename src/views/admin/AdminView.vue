<script setup>
import usePropiedades from '@/composables/usePropiedades';
import { propiedadPrecio } from '@/helpers/';


const { propiedadesCollection, deleteItem} = usePropiedades();

console.log(propiedadesCollection)
</script>

<template>
    <h2 class="text-center text-h3 my-5 font-weight-bold">Panel de Administracion</h2>

    <v-btn 
        color="var(--naranja)"
        :to="{name: 'nueva-propiedad'}"
    >Nueva Propiedad</v-btn>

    <v-card
        class="mx-auto mt-10"
    >
        <v-list>
            <v-list-item
                v-for="propiedad in propiedadesCollection"
                :key="propiedad.id"
            >
                <template v-slot:prepend>
                    <v-list-item-media :start="true">
                        <img 
                            :src="propiedad.imagen" 
                            alt="imagen de propiedad"
                            width="200"
                            max-height="200"
                            overflow="hidden"
                        />
                    </v-list-item-media>
                </template>

                <v-list-item-title>{{propiedad.titulo}}</v-list-item-title>
                <v-list-item-subtitle>{{propiedadPrecio(propiedad.precio)}}</v-list-item-subtitle>

                <template v-slot:append>
                    <v-btn 
                        color="var(--verde)" 
                        class="mr-2"
                        :to="{name: 'editar-propiedad', params: {id: propiedad.id}}"
                    >Editar</v-btn>
                    <v-btn 
                        color="error"
                        @click="deleteItem(propiedad.id, propiedad.imagen)"
                    >Eliminar</v-btn>
                </template>

            </v-list-item>
        </v-list>
        
    </v-card>


</template>

<style>

</style>