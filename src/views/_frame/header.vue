<template>
  <div>
    <div class="the-header-box bg-card border-bottom">
      <div class="container d-flex py-3">
        <router-link to="/" class="logo d-flex">
          <img src="/static/img/site_logo_hifi.png" class="vam mr-2" style="width: 110px;height: 35px;">
          <!-- <span class="text-dark">
            {{$store.state.site_name}}  
          </span> -->
        </router-link>

        <div v-if="!status_hidden_right_search" class="ml-auto">
          <headerSearch/>
        </div>
      </div>
    </div>

    <div v-if="status_hidden_right_search" class="container pt-4">
      <headerSearch class="big-bar"  style="margin-top: 15px;"/>
    </div>
  </div>
</template>

<script>
import headerSearch from './header_search.vue'

export default {
  name: 'frameHeader',
  components: {
    headerSearch,
  },
  props: [],
  data() {
    return {
      
    }
  },
  computed: {
    status_hidden_right_search(){
      let mark = false
      if(this.$route.path === '/' || document.body.clientWidth < 788){
        mark = true
      }
      return mark
    },
  },
  watch: {},
  methods: {
    
  },
  created() {
    
  },
  //mounted() {},
  //beforeDestroy() {},
  //update() {},
  //activited() {},
  //beforeRouteUpdate() {},
  //filters: {},
};
</script>

<style lang="scss" scoped>
.the-header-box{
  border-radius: 0 !important;
  .logo{
    font-size: 24px;;
    color: inherit;
    font-family: times;
    &:hover{
      text-decoration: none;
    }
  }
}
</style>