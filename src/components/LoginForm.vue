<template>
  <div class="login-container">
    <div class="card login-card">
      <div class="card-header bg-primary text-white">
        <h3 class="mb-0">Iniciar Sesión</h3>
      </div>
      <div class="card-body">
        <form @submit.prevent="handleLogin">
          <div class="alert alert-danger" v-if="error">
            {{ error }}
          </div>

          <div class="form-group mb-3">
            <label for="email">Correo Electrónico</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-envelope"></i>
              </span>
              <input
                type="email"
                id="email"
                v-model="email"
                class="form-control"
                required
                placeholder="correo@ejemplo.com"
                autocomplete="username"
              />
            </div>
          </div>

          <div class="form-group mb-4">
            <label for="password">Contraseña</label>
            <div class="input-group">
              <span class="input-group-text">
                <i class="bi bi-lock"></i>
              </span>
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                class="form-control"
                required
                autocomplete="current-password"
                minlength="8"
              />
              <button
                type="button"
                class="btn btn-outline-secondary"
                @click="showPassword = !showPassword"
              >
                <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
              </button>
            </div>
            <small class="form-text text-muted">
              La contraseña debe tener al menos 8 caracteres
            </small>
          </div>

          <div class="d-grid gap-2">
            <button
              type="submit"
              class="btn btn-primary btn-lg"
              :disabled="isLoading"
            >
              <span
                v-if="isLoading"
                class="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              {{ isLoading ? "Iniciando sesión..." : "Iniciar Sesión" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "LoginForm",
  data() {
    return {
      email: "",
      password: "",
      showPassword: false,
      isLoading: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["error"]),
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async handleLogin() {
      try {
        this.isLoading = true;
        await this.login({
          email: this.email,
          password: this.password,
        });
        this.$router.push("/admin");
      } catch (error) {
        // El error ya se maneja en el store
        console.error("Error de inicio de sesión:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 20px;
}

.login-card {
  width: 100%;
  max-width: 450px;
  box-shadow: 0 15px 25px rgba(0, 0, 0, 0.1);
  border-radius: 15px;
  overflow: hidden;
  border: none;

  .card-header {
    background: linear-gradient(45deg, #8e24aa, #3f51b5);
    padding: 20px;

    h3 {
      font-weight: 600;
    }
  }

  .card-body {
    padding: 30px;
  }

  .btn-primary {
    background: linear-gradient(45deg, #ff5722, #ff9800);
    border: none;
    padding: 12px;
    font-weight: 600;

    &:hover {
      background: linear-gradient(45deg, #e64a19, #f57c00);
    }
  }
}

// Estilos responsivos para móviles
@media (max-width: 576px) {
  .login-card {
    .card-body {
      padding: 20px;
    }
  }
}
</style>
