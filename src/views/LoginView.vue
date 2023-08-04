<script setup>
import { useForm, useField } from 'vee-validate'
import { loginSchema as validationSchema } from '../validation/loginSchema'
import { useAuthStore } from '../stores/auth'

//const { handleSubmit } = useForm({validationSchema : LoginScema});
//                      como los 2 tienen el mismo se toma por default
const { handleSubmit } = useForm({validationSchema});

// authenticacion de firebase
const auth = useAuthStore();

const email = useField('email');
const password = useField('password');

const submit = handleSubmit((values) => {
    auth.login(values)
});

</script>

<template>
    <v-card
        flat
        max-width="50%"
        class="mx-auto my-10"
    >
        <v-card-title 
            primary-title
            class="text-h4 font-weight-bold"    
        >
            Iniciar Session
        </v-card-title>
        <v-card-subtitle
            class="text-h5"
        >
            con tu cuenta
        </v-card-subtitle>

        <v-alert
            v-if="auth.hasError"
            closable
            title="Error"
            :text="auth.errorMsg"
            type="error"
            class="my-5"
        ></v-alert>


        <v-form 
            class="mt-5"    
        >
            <v-text-field
                name="email"
                label="Email"
                id="email"
                bg-color="light-green-lighten-5"
                class="mb-3"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
            />
            <v-text-field
                name="password"
                label="Password"
                id="password"
                bg-color="light-green-lighten-5"
                class="mb-3"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
            />
            
            <v-btn 
                block 
                color="#FFCA00"
                class="font-weight-bold py-5"
                @click="submit"
            >Iniciar Session</v-btn>
            
        </v-form>
    </v-card>
</template>

<style>

</style>