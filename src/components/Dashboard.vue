<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            <h3 class="mb-0">Panel de Administración</h3>
            <button @click="logout" class="btn btn-light btn-sm">
              Cerrar Sesión
            </button>
          </div>
          <div class="card-body">
            <h4>Administración de Productos</h4>
            <div class="table-responsive">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in allProducts" :key="product.id">
                    <td>
                      <img
                        :src="product.imageUrl"
                        alt="product"
                        class="img-thumbnail"
                        width="50"
                      />
                    </td>
                    <td>{{ product.name }}</td>
                    <td>{{ product.description }}</td>
                    <td>
                      <span
                        :class="
                          product.active
                            ? 'badge bg-success'
                            : 'badge bg-danger'
                        "
                      >
                        {{ product.active ? "Activo" : "Inactivo" }}
                      </span>
                    </td>
                    <td>
                      <button
                        @click="toggleStatus(product)"
                        class="btn btn-sm"
                        :class="product.active ? 'btn-danger' : 'btn-success'"
                      >
                        {{ product.active ? "Desactivar" : "Activar" }}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "AdminDashboard",
  computed: {
    ...mapGetters("products", ["allProducts"]),
  },
  methods: {
    ...mapActions("products", ["fetchProducts", "toggleProductStatus"]),
    ...mapActions("auth", ["logout"]),

    async toggleStatus(product) {
      try {
        await this.toggleProductStatus({
          productId: product.id,
          active: !product.active,
        });

        this.$swal({
          icon: "success",
          title: "Actualizado",
          text: `El producto "${product.name}" ha sido ${
            !product.active ? "activado" : "desactivado"
          }.`,
          timer: 1500,
        });
      } catch (error) {
        this.$swal({
          icon: "error",
          title: "Error",
          text: "No se pudo actualizar el estado del producto.",
        });
      }
    },

    async handleLogout() {
      await this.logout();
      this.$router.push("/login");
    },
  },
  created() {
    this.fetchProducts();
  },
};
</script>
