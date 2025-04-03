<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card license-generator">
          <div class="card-header bg-primary text-white">
            <h3>Generador - {{ product.name }}</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="generateLicense">
              <div class="mb-3">
                <label for="clientId" class="form-label">ID Usuario</label>
                <input
                  type="text"
                  class="form-control"
                  id="clientId"
                  v-model="clientId"
                  required
                  placeholder="Ingresa el ID del cliente"
                />
              </div>

              <div class="mb-3">
                <h5>Regalos</h5>
                <div class="row">
                  <div
                    v-for="feature in product.features"
                    :key="feature.id"
                    class="col-md-6"
                  >
                    <div class="form-check mb-2">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        :id="'feature_' + feature.id"
                        v-model="selectedFeatures"
                        :value="feature.id"
                        :disabled="
                          selectedFeatures.length >= 5 &&
                          !selectedFeatures.includes(feature.id)
                        "
                      />
                      <label
                        class="form-check-label"
                        :for="'feature_' + feature.id"
                      >
                        {{ feature.name }}
                      </label>
                      <!-- Renderizar la imagen si existe -->
                      <img
                        v-if="feature.imageUrl"
                        :src="feature.imageUrl"
                        alt="Feature Image"
                        class="img-fluid mt-2"
                        style="max-height: 100px; border-radius: 5px"
                      />
                    </div>
                  </div>
                </div>
                <small class="text-muted">Selecciona máximo 5 regalos</small>
              </div>

              <div class="d-grid gap-2">
                <button
                  type="submit"
                  class="btn btn-success"
                  :disabled="
                    selectedFeatures.length === 0 || !clientId || isLoading
                  "
                >
                  Generar
                </button>
              </div>
            </form>

            <!-- Loading State -->
            <div v-if="isLoading" class="mt-4 text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Cargando...</span>
              </div>
              <p class="mt-2">{{ loadingMessage }}</p>
            </div>

            <div v-if="generatedLicense && !isLoading" class="mt-4">
              <div class="alert alert-success">
                <h5>¡Generada con éxito!</h5>
                <h5>Enviado a tu cuenta...</h5>
                <p>Cliente ID: {{ clientId }}</p>
                <div class="license-key border p-2 bg-light">
                  {{ generatedLicense }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import CryptoJS from "crypto-js";

export default {
  name: "LicenseGenerator",
  data() {
    return {
      clientId: "",
      selectedFeatures: [],
      generatedLicense: "",
      product: null,
      isLoading: false,
      loadingMessage: "",
    };
  },
  computed: {
    ...mapGetters("products", ["allProducts"]),
  },
  methods: {
    async generateLicense() {
      this.isLoading = true;

      // Simulate loading steps
      this.loadingMessage = "Conectando con el servidor...";
      await this.delay(1000);

      this.loadingMessage = "Validando identidad...";
      await this.delay(1000);

      this.loadingMessage = "Generando regalos...";
      await this.delay(1000);

      // Creamos un objeto con los datos para la licencia
      const licenseData = {
        clientId: this.clientId,
        productId: this.product.id,
        features: this.selectedFeatures,
        createdAt: new Date().getTime(),
        expiresAt: new Date().setFullYear(new Date().getFullYear() + 1), // 1 año de validez
      };

      // Convertimos a JSON y ciframos con una clave secreta
      const licenseString = JSON.stringify(licenseData);
      const encryptedLicense = CryptoJS.AES.encrypt(
        licenseString,
        "tu_clave_secreta_muy_segura"
      ).toString();

      // Generamos un hash para verificación
      const licenseHash = CryptoJS.SHA256(encryptedLicense).toString();

      // Combinamos la licencia cifrada con el hash (primeros 8 caracteres)
      this.generatedLicense = `${encryptedLicense}.${licenseHash.substring(
        0,
        8
      )}`;

      this.isLoading = false;

      // Aquí podrías guardar un registro de la licencia generada en la base de datos
    },
    delay(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    copyLicense() {
      navigator.clipboard.writeText(this.generatedLicense);
      this.$swal({
        icon: "success",
        title: "¡Copiado!",
        text: "La licencia ha sido copiada al portapapeles",
        timer: 1500,
      });
    },
  },
  created() {
    // Obtener el producto desde la store usando el ID en la URL
    const productId = this.$route.params.id;
    const product = this.allProducts.find((p) => p.id === productId);

    if (!product) {
      this.$router.push("/");
      return;
    }

    this.product = product;

    // Si el producto no está activo, redirigir a home
    if (!product.active) {
      this.$router.push("/");
    }
  },
};
</script>

<style scoped lang="scss">
.license-generator {
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);

  .card-header {
    background: linear-gradient(45deg, #3f51b5, #2196f3);
  }

  .form-check-input:checked {
    background-color: #4caf50;
    border-color: #4caf50;
  }

  .license-key {
    font-family: monospace;
    word-break: break-all;
    border-radius: 5px;
    padding: 10px;
  }
}
</style>
