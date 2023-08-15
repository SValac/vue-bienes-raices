<script setup>

defineProps({
    porpiedad:{
        type: Object,
        required: true,
    },
    precio:{
        type: Function,
        required: true,
    },
});

</script>

<template>
    <v-col
        cols="12"
        md="6"
        lg="4"
    >
        <v-card>
            <v-img
                :width="400"
                aspect-ratio="4/3"
                cover
                height="300"
                :src="porpiedad.imagen"
                alt="imagen propiedad"
            />
            <v-card-title
                class="font-weight-bold"
            >
                {{ porpiedad.titulo }}
            </v-card-title>
            <v-card-text
                class="text-truncate"
            >
                {{ porpiedad.descripcion }}
            </v-card-text>
            <v-card-text
                class="text-h5 font-weight-bold"
            >
                Precio: {{ precio(porpiedad.precio) }}
            </v-card-text>

            <template v-slot:actions>
                <v-btn 
                    :to="{name: 'propiedad', params:{id: porpiedad.id}}" 
                    color="var(--naranja)"
                    block
                    variant="flat"
                >Ver Informacion</v-btn>
            </template>
        </v-card>

    </v-col>
</template>

<style>

</style>