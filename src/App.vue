<template>
  <div id="app">
    <frameHeader/>
    
    <keep-alive>
      <router-view v-if="$route.meta && $route.meta.keep_alive"/>
    </keep-alive>
    <router-view v-if="!($route.meta && $route.meta.keep_alive)"/>

  </div>
</template>

<script>
import frameHeader from './views/_frame/header.vue'
export default {
  name: 'appRoot',
  components: {
    frameHeader,
  },
}
</script>

<style lang="scss">
  @import '@/assets/css/main.scss';
</style>
