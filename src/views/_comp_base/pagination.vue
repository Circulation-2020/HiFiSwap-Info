<template>
  <div
    :class="['my-pagination d-flex justify-content-center',mix_class?mix_class:'']">
    <span 
      @click="setPage(cfg.page_current-1<=0?1:cfg.page_current-1)" 
      :class="['tab-item mr-2',{'op5': cfg.page_current <= 1}]"> 
        ← 
    </span>

    <span>
      Page {{cfg.page_current}} of {{cfg.count_pages}}
    </span>

    <span 
      @click="setPage(cfg.page_current+1>cfg.count_pages?cfg.count_pages:cfg.page_current+1)" 
      :class="['tab-item ml-2',{'op5': cfg.page_current >= cfg.count_pages}]">
        → 
    </span>
  </div>
</template>

<script>

export default {
  name: "paginationSp",
  props: ["mix_class", "config","arr_data"],
  data: function() {
    return {
      pages_available: [],
    }
  },
  computed: {
    cfg: function() {
      var t = Object.assign({
        page_size: 10,
        page_current: 1,
        count_items: 1,
        count_pages: 1,
        btn_num: 5
      }, (this.config || {}));
      return t
    }
  },
  watch: {
  },
  methods: {
    setPage: function(t) {
      
      if(t !== this.config.page_current){
        this.config.page_current = t
        this.$emit('reloadList')
      }
    }
  },
  created: function() {
  }
};
</script>

<style lang="scss" scoped>
  .my-pagination{
    .tab-item{
      display: block;
      min-width: 30px;
      text-align: center;
      cursor: pointer;
      user-select: none;
    }
  }
</style>