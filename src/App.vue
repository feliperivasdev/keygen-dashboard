<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
// Importar Bootstrap
@import "bootstrap/dist/css/bootstrap.min.css";
@import "bootstrap-icons/font/bootstrap-icons.css";

// Variables globales para colores (atractivos para niños)
:root {
  --primary-color: #3f51b5;
  --secondary-color: #ff5722;
  --accent-color: #ff9800;
  --light-accent: #ffca28;
  --success-color: #4caf50;
  --info-color: #2196f3;
  --warning-color: #ff9800;
  --danger-color: #f44336;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: var(--primary-color);
    }
  }
}
</style>
