import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import AdminView from "@/views/AdminView.vue";
import GeneratorView from "@/views/GeneratorView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: LoginView,
  },
  {
    path: "/gen",
    name: "gen",
    component: HomeView,
  },
  {
    path: "/admin",
    name: "Admin",
    component: AdminView,
    meta: { requiresAuth: true },
  },
  {
    path: "/generator/:id",
    name: "Generador",
    component: GeneratorView,
  },
];

const router = createRouter({
  // Cambié a import.meta.env.BASE_URL para corregir posibles problemas con Vite
  history: createWebHashHistory(),
  routes,
});

// Protección de rutas
router.beforeEach((to, from, next) => {
  // Verifica si el usuario está autenticado en el localStorage
  const isAuthenticated = !!localStorage.getItem("isAuthenticated");

  // Si la ruta requiere autenticación y el usuario no está autenticado, redirige al login
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login");
  } else {
    next();
  }
});

export default router;
