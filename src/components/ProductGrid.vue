<template>
  <div class="container mt-4">
    <div class="row row-cols-1 row-cols-md-3 row-cols-lg-5 g-4">
      <div v-for="product in products" :key="product.id" class="col">
        <product-card :product="product" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductCard from "./ProductCard.vue";

export default {
  name: "ProductGrid",
  components: {
    ProductCard,
  },
  computed: {
    ...mapGetters("products", ["activeProducts"]),
    products() {
      return this.activeProducts;
    },
  },
  methods: {
    ...mapActions("products", ["fetchProducts"]),
  },
  created() {
    this.fetchProducts();
  },
};
</script>
