import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupUser from '@/components/SignupUser.vue'
import LoginUser from '@/components/LoginUser.vue'
import AdminDashboard from '@/components/AdminDashboard.vue'
import FileUpload from '@/components/FileUpload.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/fileupload',
    name: 'File Upload',
    component: FileUpload
  },
  {
    path: '/admin-dashboard',
    name: 'Admin',
    component: AdminDashboard
  },
  {
    path: '/login',
    name: 'login',
    component: LoginUser
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupUser
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
