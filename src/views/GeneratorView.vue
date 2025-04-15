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
              <router-link class="nav-link" to="/gen"
                >Volver a Productos</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <generator />
  </div>
</template>

<script>
import Generator from "@/components/Generator.vue";

export default {
  name: "LicenseGeneratorView",
  components: {
    Generator,
  },
};
</script>
