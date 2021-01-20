<template>
  <div id="app">
    <Header></Header>
    <router-view/>
    <Footer></Footer>
  </div>
</template>

<script>
import Footer from './components/Footer.vue'
import Header from './components/Header.vue'
export default {
  components: { Header, Footer },
  name: 'App'
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.link{
  text-decoration: none;
  color: #405C58;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
