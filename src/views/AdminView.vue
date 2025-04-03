<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container">
        <a class="navbar-brand" href="#">Panel de Administración</a>
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
              <router-link class="nav-link" to="/">Ver Tienda</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <dashboard />
  </div>
</template>

<script>
import Dashboard from "@/components/Dashboard.vue";

export default {
  name: "AdminView",
  components: {
    Dashboard,
  },
};
</script>
