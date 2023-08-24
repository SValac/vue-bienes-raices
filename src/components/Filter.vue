<script setup>
import usePropiedades from '../composables/usePropiedades';



const {alberca, filterItems } = usePropiedades();
const group = null
const items= [
        {
          title: 'Foo',
          value: 'foo',
        },
        {
          title: 'Bar',
          value: 'bar',
        },
        {
          title: 'Fizz',
          value: 'fizz',
        },
        {
          title: 'Buzz',
          value: 'buzz',
        },
      ];
</script>

<template>
    <v-navigation-drawer v-model="drawer" location="end" temporary>
        <v-list :items="items"></v-list>
    </v-navigation-drawer>
</template>

<style>

</style>