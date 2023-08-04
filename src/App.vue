<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { storeToRefs } from 'pinia'
import { useAuthStore } from './stores/auth';

const auth = useAuthStore();
// desctructuon auth pero mantiene la reactividad gracias a storeToRef
const {isAuth} = storeToRefs(auth)


</script>

<template>
	<v-card
		elevation="3"
		max-width="90%"
		class="mx-auto"
	>
		<v-layout row wrap>
			<v-app-bar
				color="grey-darken-4"
			>
				<template v-slot:prepend>
					<v-btn
						:to="{name: 'home'}" 
					>Life & Home</v-btn>
				</template>

				<template v-slot:append>
					<div v-if="isAuth">
						<v-btn
							:to="{name: 'admin-propiedades'}"
						>Admin</v-btn>
						<v-btn
							@click="auth.logout"
						>Logout</v-btn>
					</div>
					<div v-else>
						<v-btn
							:to="{name: 'home'}"
						>Inicio</v-btn>
						<v-btn
							:to="{name: 'login'}"
						>Login</v-btn>
					</div>
				</template>

			</v-app-bar>
			<VMain>
				<v-container grid-list-xs>
					<RouterView />
					
				</v-container>
			</VMain>
		</v-layout>
	</v-card>
</template>

<style scoped>

</style>
