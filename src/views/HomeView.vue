<script setup>
import { computed, reactive, ref, watch } from "vue";
import usePropiedades from "../composables/usePropiedades";
import Propiedades from "../components/Propiedades.vue";
import { propiedadPrecio } from "../helpers/";

const { propiedadesCollection } = usePropiedades();

const drawer = ref(false);
const rangoPrecio = ref([400000, 5000000]);
console.log(rangoPrecio.value[0], rangoPrecio.value[1]);

const hasfilter = ref(false);
const filterValues = reactive({
    //precio: range(rangoPrecio.value[0], rangoPrecio.value[1]+1),
    sala: [],
    comedor: [],
    cocinaIntegral: [],
    alberca: [],
});

const filtrarPorPrecio = computed( () => {

    return  propiedadesCollection.value.filter(
        propiedad => {
            const fPrecio =  propiedad.precio >= rangoPrecio.value[0] &&
                    propiedad.precio <= rangoPrecio.value[1]
            return fPrecio 
        }
    )
} );

// ignores case-sensitive
const getValue = (value) =>
    typeof value === "string" ? value.toUpperCase() : value;

// Range form values
function range(start, end) {
    start = parseFloat(start);
    end = parseFloat(end);
    return new Float32Array(end - start).fill().map((d, i) => i + start);
}

/**
 * Filters an array of objects (one level-depth) with multiple criteria.
 *
 * @param  {Array}  array: the array to filter
 * @param  {Object} filters: an object with the filter criteria
 * @return {Array}
 */
function filterPlainArray(array, filters) {
    const filterKeys = Object.keys(filters);
    return array.filter((item) => {
        // validates all filter criteria
        return filterKeys.every((key) => {
            // ignores an empty filter
            if (!filters[key].length) return true;
            return filters[key].find(
                (filter) => getValue(filter) === getValue(item[key])
            );
        });
    });
}

function filtrarPropiedades() {

    //console.log(hasfilter.value)
    const listaPripiedades = [];

    if (!hasfilter) {
        return filtrarPorPrecio;
    }

    for (let index = 0; index < filtrarPorPrecio.value.length; index++) {
        listaPripiedades.push(filtrarPorPrecio.value[index]);
    }

    // console.log(listaPripiedades);
    // console.log(filterPlainArray(listaPripiedades, filterValues));
    return filterPlainArray(listaPripiedades, filterValues);
}

const filtro = computed(() => filtrarPropiedades());

watch(
    filterValues,
    () => {
        
        console.log(Object.values(filterValues))
        console.log(Object.values(filterValues).some( item => item.length > 0))
        hasfilter.value = Object.values(filterValues).some( item => item.length > 0);
    
    },
    { deep: true }
);
</script>

<template>
    <h1 class="text-center">Life & Home</h1>

    <v-card class="py-10">
        <template v-slot:prepend>
            <v-card-title class="text-h5">
                Busqueda
                <v-checkbox label="Alberca" v-model="filterValues.alberca" />
            </v-card-title>
        </template>
        <template v-slot:append>
            <v-btn
                variant="text"
                icon="mdi-filter"
                @click="drawer = !drawer"
            ></v-btn>
        </template>

        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
            width="500"
            class="py-16"
        >
            Filtrp
            <v-list density="compact" nav>
                <v-range-slider
                    v-model="rangoPrecio"
                    min="400000"
                    max="5000000"
                    step="50000"
                    class="mt-10"
                >
                    <template v-slot:prepend>
                        <v-list-item
                            v-model="rangoPrecio[0]"
                            :title="propiedadPrecio(rangoPrecio[0])"
                        >
                        </v-list-item>
                    </template>
                    <template v-slot:append>
                        <v-list-item
                            v-model="rangoPrecio[1]"
                            :title="propiedadPrecio(rangoPrecio[1])"
                        >
                        </v-list-item>
                    </template>
                </v-range-slider>
                <v-checkbox
                    label="Sala"
                    v-model="filterValues.sala[0]"
                    @update:modelValue="filterValues.sala[0]?'':filterValues.sala=[]"
                />
                <v-checkbox
                    label="Comedor"
                    v-model="filterValues.comedor[0]"
                    @update:modelValue="filterValues.comedor[0]?'':filterValues.comedor=[]"
                />
                <v-checkbox
                    label="Cocina Integral"
                    v-model="filterValues.cocinaIntegral[0]"
                    @update:modelValue="filterValues.cocinaIntegral[0]?'':filterValues.cocinaIntegral=[]"
                />
                <v-checkbox
                    label="Alberca"
                    v-model="filterValues.alberca[0]"
                    @update:modelValue="filterValues.alberca[0]?'':filterValues.alberca=[]"
                />
            </v-list>
        </v-navigation-drawer>

        <v-row>
            <Propiedades
                v-for="porpiedad in filtro"
                :key="porpiedad.id"
                :porpiedad="porpiedad"
                :precio="propiedadPrecio"
            />
        </v-row>
    </v-card>
</template>
