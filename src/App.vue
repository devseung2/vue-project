<template>
  <div id="app" class="no-drag">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  margin: 0 0;
}
@media (min-width:481px) {
  .only-mobile{
    display:none!important
  }
}
@media (max-width:480px) {
  .only-pc{
    display:none!important
  }
}
.no-drag {
  -ms-user-select: none;
  -moz-user-select: -moz-none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  user-select:none;
}
</style>
