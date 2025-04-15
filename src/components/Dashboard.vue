<template>
  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div
            class="card-header bg-primary text-white d-flex justify-content-between align-items-center"
          >
            <h3 class="mb-0">Panel de Administración</h3>
            <button @click="handleLogout" class="btn btn-light btn-sm">
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
                        @click="triggerFileInput(product.id)"
                        class="btn btn-sm btn-primary"
                      >
                        Cambiar Imagen
                      </button>
                      <input
                        type="file"
                        :id="'file-input-' + product.id"
                        class="d-none"
                        @change="handleImageChange($event, product)"
                      />
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
import axios from "axios";

export default {
  name: "AdminDashboard",
  computed: {
    ...mapGetters("products", ["allProducts"]),
  },
  methods: {
    ...mapActions("products", ["fetchProducts", "toggleProductStatus"]),
    ...mapActions("auth", ["logout"]),

    async handleLogout() {
      try {
        await this.logout();
        this.$router.push("/");
      } catch (error) {
        alert("Error al cerrar sesión.");
      }
    },

    triggerFileInput(productId) {
      const fileInput = document.getElementById(`file-input-${productId}`);
      if (fileInput) {
        fileInput.click();
      }
    },

    async handleImageChange(event, product) {
      const file = event.target.files[0];
      if (!file) return;

      const formData = new FormData();
      formData.append("image", file);
      formData.append("productId", product.id.replace("product-", "")); // Enviar solo el número del ID

      try {
        // Enviar la imagen al backend PHP
        const response = await axios.post(
          "https://generadorespromax.com.bospley.com//upload.php",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Actualizar la URL de la imagen en el producto
        product.imageUrl = response.data.imageUrl;

        alert(`La imagen del producto "${product.name}" ha sido actualizada.`);
      } catch (error) {
        alert("Error al actualizar la imagen del producto.");
      }
    },
  },
  created() {
    // Cargar productos desde localStorage si existen
    const storedProducts = JSON.parse(localStorage.getItem("products"));
    if (storedProducts) {
      this.allProducts = storedProducts;
    } else {
      this.fetchProducts();
    }
  },
};
</script>
