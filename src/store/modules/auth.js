export default {
  namespaced: true,
  state: {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    error: null,
  },
  mutations: {
    SET_AUTH(state, status) {
      state.isAuthenticated = status;
      localStorage.setItem("isAuthenticated", status);
    },
    SET_ERROR(state, error) {
      state.error = error;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },
  actions: {
    login({ commit }, { email, password }) {
      // Credenciales fijas en el código
      const validEmail = "admin@genpromax.com";
      const validPassword = "m5HRcuhl4u@";

      commit("CLEAR_ERROR");

      return new Promise((resolve, reject) => {
        // Simular un pequeño retraso como en una API real
        setTimeout(() => {
          if (email === validEmail && password === validPassword) {
            commit("SET_AUTH", true);
            resolve(true);
          } else {
            commit("SET_ERROR", "Credenciales incorrectas");
            reject(new Error("Credenciales incorrectas"));
          }
        }, 500);
      });
    },
    logout({ commit }) {
      commit("SET_AUTH", false);
    },
  },
  getters: {
    isAuthenticated: (state) => state.isAuthenticated,
    error: (state) => state.error,
  },
};
