<template>
  <div class="card product-card h-100" @click="goToGenerator">
    <img :src="product.imageUrl" class="card-img-top" :alt="product.name" />
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text">{{ product.description }}</p>
      <button class="btn btn-primary" :disabled="!product.active">
        Generar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToGenerator() {
      if (this.product.active) {
        this.$router.push(`/generator/${this.product.id}`);
      }
    },
  },
};
</script>

<style scoped lang="scss">
.product-card {
  transition: transform 0.3s;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:not([data-active="true"]) {
    opacity: 0.7;
  }

  // Estilos llamativos para niños
  border-radius: 15px;
  border: 3px solid #ff9800;

  .card-title {
    color: #3f51b5;
    font-weight: bold;
  }

  .btn-primary {
    background-color: #ff5722;
    border-color: #ff5722;

    &:hover {
      background-color: #e64a19;
      border-color: #e64a19;
    }
  }
}
</style>
