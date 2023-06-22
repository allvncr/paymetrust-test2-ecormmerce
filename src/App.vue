<template>
  <div id="body">
    <nav-bar v-if="showNavBar"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import navBar from './components/navbar.vue'
export default {
  components: { navBar },
  data() {
    return {}
  },
  computed: {
    showNavBar() {
      return this.$route.meta.navbar
    }
  }
}
</script>

<style lang="scss">
#body {
  background-color: $white;
  min-height: 100vh;
  min-width: 275px;
  transition: color 0.5s, background-color 0.5s;
  line-height: 1.6;
  font-family: 'Oxanium', cursive;
  font-size: 14px;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
