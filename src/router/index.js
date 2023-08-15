import { createRouter, createWebHistory } from 'vue-router'
import { onAuthStateChanged } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { useAuthStore } from '../stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAuth: true},
      children:[
        {
          path: '/admin/propiedades',
          name: 'admin-propiedades',
          component: () => import('../views/admin/AdminView.vue')
        },
        {
          path: '/admin/nueva',
          name: 'nueva-propiedad',
          component: () => import('../views/admin/NuevaPropiedadView.vue')
        },
        {
          path: '/admin/editar/:id',
          name: 'editar-propiedad',
          component: () => import('../views/admin/EditarPropiedadView.vue')
        },
      ]
    },
    {
      path: '/propiedad/:id',
      name: 'propiedad',
      component: () => import('../views/PropiedadView.vue')
    }
  ]
})

// Navigation Guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth)
  if(requiresAuth){
    // comprobar si el usuario esta authenticado
    try {
      await authStore.authenticateUser()
      next()
    } catch (error) {
      console.log(error)
      next({name: 'login'})
    }
  } else {
    //no esta protegido, mostramos vista
    next() 
  }
})



export default router
