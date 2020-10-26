<template>
  <span :class="val>=0?'text-success':'text-danger'">
    {{val | bfh}}
  </span>
</template>

<script>

export default {
  name: 'changeRate',
  components: {},
  props: [
    'val'
  ],
  data() {
    return {
      
    }
  },
  computed: {},
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
  
</style>