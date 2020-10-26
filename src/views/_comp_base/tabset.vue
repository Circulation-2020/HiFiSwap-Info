<template>
  <div class="tabset">
    <span 
      v-for="(item,index) of tabs"
      :key="index"
      @click="setTab(item)" 
      :class="['tab',{'on': on_tab == item}]
      ">
      {{item}}
    </span>
  </div>
</template>

<script>

export default {
name: "tabset",
components: {},
props: ["cfg","value"],
data: function() {
  return {
    tabs: [],
    on_tab: ""
  }
},
computed: {},
watch: {},
methods: {
  setTab: function(t) {
    let a = this;
    a.on_tab = t,
    a.$emit("input", t)
  }
},
created: function() {
  let t = this;
  t.tabs = t.cfg.tabs
  t.value ? t.on_tab = t.value : t.on_tab = t.cfg.tabs[0]
}
};
</script>

<style lang="scss" scoped>
  
</style>