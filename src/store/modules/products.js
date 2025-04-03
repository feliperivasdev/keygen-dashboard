import { initialProducts } from "@/utils/products";

// Cargar productos desde localStorage si existen, sino usar los iniciales
const getSavedProducts = () => {
  const savedProducts = localStorage.getItem("products");
  return savedProducts ? JSON.parse(savedProducts) : initialProducts;
};

export default {
  namespaced: true,
  state: {
    products: getSavedProducts(),
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
      localStorage.setItem("products", JSON.stringify(products));
    },
    UPDATE_PRODUCT(state, updatedProduct) {
      const index = state.products.findIndex((p) => p.id === updatedProduct.id);
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...updatedProduct };
        localStorage.setItem("products", JSON.stringify(state.products));
      }
    },
  },
  actions: {
    fetchProducts({ state }) {
      return Promise.resolve(state.products);
    },
    toggleProductStatus({ commit, state }, { productId, active }) {
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        const updatedProduct = { ...product, active };
        commit("UPDATE_PRODUCT", updatedProduct);
        return Promise.resolve(updatedProduct);
      }
      return Promise.reject(new Error("Producto no encontrado"));
    },
  },
  getters: {
    allProducts: (state) => state.products,
    activeProducts: (state) => state.products.filter((p) => p.active),
    getProductById: (state) => (id) => state.products.find((p) => p.id === id),
  },
};
