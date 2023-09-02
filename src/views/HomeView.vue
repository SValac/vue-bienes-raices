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
    plantas: [],
    wc: [],
    habitaciones: [],
    estacionamiento: [],
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

const limpiarFiltros = () => {

    rangoPrecio.value = [400000, 5000000]

    Object.assign(filterValues, {
        plantas: [],
        wc: [],
        habitaciones: [],
        estacionamiento: [],
        sala: [],
        comedor: [],
        cocinaIntegral: [],
        alberca: [],
    })
}

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
    <h4 class="text-center">Nuestas Propiedades</h4>

    <v-card class="pb-10 mt-5">
        <template v-slot:append>
            <v-btn
                variant="text"
                prepend-icon="mdi-filter"
                stacked
                @click="drawer = !drawer"
            >Filtros</v-btn>
        </template>

        <v-navigation-drawer
            v-model="drawer"
            location="right"
            temporary
            width="500"
            class="py-16 pb-0"
            
        >
            <v-list >
                <v-list-item
                title="Selecciona Filtros"
                >
                    <template v-slot:append>
                            <v-btn
                            variant="text"
                            prepend-icon="mdi-chevron-left"
                            @click.stop="drawer = !drawer"
                            stacked
                            size=""
                            class="text-none"
                            >Volver</v-btn>
                    </template>
                </v-list-item>

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

                <v-container>
                    <v-row>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-select
                                v-model="filterValues.plantas[0]"
                                @update:modelValue="filterValues.plantas[0]?'':filterValues.plantas=[]"
                                clearable
                                hide-details="true"
                                :items="[1,2]"
                                density="compact"
                                label="Plantas"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-select
                                v-model="filterValues.wc[0]"
                                @update:modelValue="filterValues.wc[0]?'':filterValues.wc=[]"
                                clearable
                                hide-details="true"
                                :items="[1,2]"
                                density="compact"
                                label="Baños"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-select
                                v-model="filterValues.habitaciones[0]"
                                @update:modelValue="filterValues.habitaciones[0]?'':filterValues.habitaciones=[]"
                                clearable
                                hide-details="true"
                                :items="[1,2]"
                                density="compact"
                                label="Habitaciones"
                            ></v-select>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                        >
                            <v-select
                                v-model="filterValues.estacionamiento[0]"
                                @update:modelValue="filterValues.estacionamiento[0]?'':filterValues.estacionamiento=[]"
                                clearable
                                hide-details="true"
                                :items="[1,2]"
                                density="compact"
                                label="Estacionamiento"
                            ></v-select>
                        </v-col>

                    </v-row>
                    <div class="d-flex flex-wrap mt-10">
                        <v-checkbox-btn
                            label="Sala"
                            v-model="filterValues.sala[0]"
                            @update:modelValue="filterValues.sala[0]?'':filterValues.sala=[]"
                            class="flex-fill"
                        />
                        <v-checkbox-btn
                            label="Comedor"
                            v-model="filterValues.comedor[0]"
                            @update:modelValue="filterValues.comedor[0]?'':filterValues.comedor=[]"
                            class="flex-fill"
                        />
                        <v-checkbox-btn
                            label="Cocina Integral"
                            v-model="filterValues.cocinaIntegral[0]"
                            @update:modelValue="filterValues.cocinaIntegral[0]?'':filterValues.cocinaIntegral=[]"
                            class="flex-fill"
                        />
                        <v-checkbox-btn
                            label="Alberca"
                            v-model="filterValues.alberca[0]"
                            @update:modelValue="filterValues.alberca[0]?'':filterValues.alberca=[]"
                            class="flex-fill"
                        />
                    </div>
                </v-container>
                
            </v-list>
            <template v-slot:append>
                <v-btn
                    prepend-icon="mdi-trash-can-outline"
                    @click.stop="limpiarFiltros"
                    size="large"
                    color="var(--verde)"
                    block
                    class="text-none font-weight-bold"
                >Limpiar Filtros</v-btn>
            </template>
        </v-navigation-drawer>

        <v-row 
            v-if="filtro.length>0" 
            :class="[filtro.length<3? 'justify-center': 'papanicolao']"
        >
            <Propiedades
                v-for="porpiedad in filtro"
                :key="porpiedad.id"
                :porpiedad="porpiedad"
                :precio="propiedadPrecio"
            />
        </v-row>
        <v-sheet
            v-else
            class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
            elevation="4"
            height="250"
            rounded
            max-width="800"
            width="100%"
        >
            <div>
                <h2 class="text-h4 font-weight-black text-orange">Lo sentimos!</h2>

                <div class="text-h5 font-weight-medium mb-2">
                    Por el momento no tenemos propiedades con esas caracteristicas.
                </div>

                <p class="text-body-2 mb-4">
                    Si gustas mas informacion favor de contactarnos
                </p>

                <v-btn variant="text" color="orange">Contacto</v-btn>
            </div>
        </v-sheet>
    </v-card>
</template>
