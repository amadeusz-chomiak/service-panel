import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { defineAsyncComponent } from "vue"
import Login from '@/views/Login.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: defineAsyncComponent(() => import("@/views/Main.vue")),
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
