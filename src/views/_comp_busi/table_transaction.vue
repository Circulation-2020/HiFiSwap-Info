<template>
  <div>
    <table class="table main-table w-100 text-right">
      <tr class="t-gray">
        <td class="text-left" style="width: 250px;">
          <div class="tabset">
            <span 
              v-for="(item) in all_tabs" 
              :key="item"
              :class="['tab',{'on': on_tab == item}]"
              @click="setTab(item)"
              >
              {{item}}
            </span>
          </div>
        </td>
        <td style="width: 160px;">
          <!-- Total Value -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Total Value',data: data_filtered, by_key: 'value'}"/>
        </td>
        <td class="mb-none" style="width: 200px;">
          <!-- Token Amount -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Token Amount',data: data_filtered, by_key: 'reserve0'}"/>
        </td>
        <td class="mb-none" style="width: 160px;">
          <!-- Token Amount -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Token Amount',data: data_filtered, by_key: 'reserve1'}"/>
        </td>
        <td class="mb-none" style="width: 160px;">
          Account
        </td>
        <td style="width: 160px;">
          <!-- Time -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Time',data: data_filtered, by_key: 'timestamp', auto_run: true}"/>
        </td>
      </tr>
      <tr v-for="(item,index) of data_on_show" :key="index">
        <td class="text-left">
          <a :href="`${$store.state.scan_view_url}/tx/${item.tx}`">
            {{item.event_str}}
          </a>
        </td>
        <td>
          ${{item.value | tofixed2 | qfw}}
        </td>
        <td class="mb-none">
          {{item.reserve0 | tofixed5 | qfw}}
          {{item.token0_symbol}}
        </td>
        <td class="mb-none">
          {{item.reserve1| tofixed0 | qfw}}
          {{item.token1_symbol}}
        </td>
        <td class="mb-none">
          <a :href="`${$store.state.scan_view_url}/address/${item.account}`">
            {{item.account | shortAddress}}
          </a>
        </td>
        <td>
          {{item.timestamp | stToDateTime}}
        </td>
      </tr>
    </table>

    <pagination :config="cfg_pagination" :arr_data="data_filtered" @reloadList="getList()" />
  </div>
</template>

<script>
import btnSortArr from '@/views/_comp_base/btn_sort_arr.vue'
import pagination from '@/views/_comp_base/pagination.vue'

export default {
  name: 'tableTransaction',
  components: {
    btnSortArr,
    pagination,
  },
  props: [
    'data',
  ],
  data() {
    return {
      cfg_pagination: {
				page_size: 10,
				page_current: 1,
				count_items: 1,
				count_pages: 1,
				btn_num: 5
			},

      all_tabs: [
        'All',
        'Swaps',
        'Adds',
        'Removes',
      ],
      on_tab: 'All',

      data_filtered: [],
      data_on_show: [],
    }
  },
  computed: {
  },
  watch: {
  },
  methods: {

    setTab(str){
      let v = this
      v.on_tab = str

      v.cfg_pagination.page_current = 1

      v.data_filtered = v.data[v.on_tab] || []
      v.cfg_pagination.count_pages = Math.ceil(v.data_filtered.length / v.cfg_pagination.page_size)
      this.getList()
    },

    getList(){
      let v = this

      let i_start = v.cfg_pagination.page_size * (v.cfg_pagination.page_current - 1)
      let i_end = i_start + v.cfg_pagination.page_size

      // console.log('start end')
      // console.log(i_start)
      // console.log(i_end)
      v.data_on_show = v.data_filtered.slice(i_start, i_end)
    },
  },
  created() {
    this.setTab('All')
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