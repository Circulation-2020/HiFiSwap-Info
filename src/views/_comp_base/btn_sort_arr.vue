<template>
  <span class="sort-btn" @click="clicked()">
    <span>{{cfg.name}}</span>
    <span v-if="status == 'up'">↑</span>
    <span v-if="status == 'down'">↓</span>
  </span>
</template>

<script>
// cfg: {auto_run: true, data: arr, by_key: 'str'}
export default {
  name: "btnSortArr",
  components: {},
  props: ["cfg"],
  data: function() {
    return {
      // 组件标记
      mark_comp_btn_sort_arr: true,

      status: ""
    }
  },
  computed: {},
  watch: {},
  methods: {
    clicked: function() {
      var v = this
    
      if(!v.cfg || !v.cfg.data || !v.cfg.by_key){ 
        console.log('need params.')
        return 
      }

      // 清除同层级的筛选器
      v.$parent.$children.forEach(function(comp){
        if(comp != v && comp.mark_comp_btn_sort_arr){
          comp.status = ''
        }
      })

      // 初始化
      if(v.status === ''){
        v.status = 'up'
      }

      if(v.status === 'up'){
        v.status = 'down'
      }else{
        v.status = 'up'
      }

      v.cfg.data = v.cfg.data.sort(function(a,b){
        let val_a = a[v.cfg.by_key]
        let val_b = b[v.cfg.by_key]

        if(v.status === 'down'){
          return val_b - val_a
        }else{
          return val_a - val_b
        }
        
      })

      v.$emit('done_run_fn')
    }
  },
  created: function() {
    this.cfg && this.cfg.auto_run && this.clicked()
  }
};
</script>

<style lang="scss" scoped>
  .sort-btn{
    user-select: none;
    cursor: pointer;
  }
</style>