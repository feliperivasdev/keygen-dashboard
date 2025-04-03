<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Generador</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Admin</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="container mt-4">
      <div class="jumbotron p-4 bg-light rounded">
        <h1 class="display-4">¡Bienvenido al Generador!</h1>
        <p class="lead">
          Selecciona uno de nuestros productos para generar tu premio
          personalizado.
        </p>
      </div>

      <product-grid />
    </div>
  </div>
</template>

<script>
import ProductGrid from "@/components/ProductGrid.vue";

export default {
  name: "HomeView",
  components: {
    ProductGrid,
  },
};
</script>
