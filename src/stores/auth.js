import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFirebaseAuth } from 'vuefire'
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {

    const auth = useFirebaseAuth()
    const authUser = ref(null)

    const router = useRouter()

    const errorMsg = ref('')
    const errorCodes = {
        'auth/user-not-found': 'Usuario no encontrado',
        'auth/wrong-password': 'usuario o password incorrecto'
    }
    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                authUser.value = user
            }
        })
    })

    async function login ({email, password}) {
        try {
            const  {user}  = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            authUser.value = user
            router.push({name: 'admin-propiedades'})
        } catch (error) {
            errorMsg.value  = errorCodes[error.code]
        } finally {
            console.log('afet auth')
        }
    }

    async function logout() {
        console.log('cerrando session...')
        try {
            await signOut(authUser)
        } catch (error) {
            errorMsg.value  = errorCodes[error.code]
        }finally{
            console.log('after logoout')
            authUser.value = null
            router.push({name: 'login'})
        }
    }

    function authenticateUser(){
        const auth = useFirebaseAuth()
        return new Promise((resolve, reject) => {
          const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe()
            if (user){
              resolve(user)
            }else{
              reject()
            }
          })
        })
      }

    const hasError = computed(() => {
        return errorMsg.value
    })

    const isAuth = computed(() => {
        return authUser.value
    })

    return{
        isAuth,
        hasError,
        errorMsg,
        login,
        logout,
        authenticateUser,
    }
})