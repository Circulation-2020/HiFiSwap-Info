<template>
  <div>

    <table class="table main-table w-100 text-right">
      <tr class="t-gray">
        <td class="text-left" style="width: 170px;">
          Token Name
        </td>
        <td class="mb-none" style="width: 100px;">
          Symbol
        </td>
        <td style="width: 170px;">
          <!-- Liquidity -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Liquidity',data: data, by_key: 'Liquidity', auto_run: true}"/>
        </td>
        <td style="width: 170px;">
          <!-- Volume(24h) -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Volume(24h)',data: data, by_key: 'Volume_24h'}"/>
        </td>
        <td class="mb-none" style="width: 170px;">
          <!-- Price -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Price',data: data, by_key: 'Price'}"/>
        </td>
        <td class="mb-none" style="width: 170px;">
          <!-- Price Change(24h) -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Price Change(24h)',data: data, by_key: 'Price_change'}"/>
        </td>
      </tr>
      <tr v-for="item of data_on_show" :key="item.id">
        <td class="text-left">
          <router-link :to="`/token/${item.address}`">
            {{item.name}}
          </router-link>
        </td>
        <td class="mb-none">
          {{item.symbol}}
        </td>
        <td>
          ${{item.Liquidity | tofixed0 | qfw}}
        </td>
        <td>
          ${{item.Volume_24h | tofixed0 | qfw}}
        </td>
        <td class="mb-none">
          ${{item.Price | tofixed2 | qfw}}
        </td>
        <td class="mb-none">
          <changeRate :val="item.Price_change" />
        </td>
      </tr>
    </table>

    <pagination :config="cfg_pagination" :arr_data="data" @reloadList="getList()"/>
  </div>
</template>

<script>
import changeRate from '@/views/_comp_busi/change_rate.vue'
import btnSortArr from '@/views/_comp_base/btn_sort_arr.vue'
import pagination from '@/views/_comp_base/pagination.vue'

export default {
  name: 'tableToken',
  components: {
    changeRate,
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

      data_on_show: [],
    }
  },
  computed: {},
  watch: {},
  methods: {
    getList(){
      let v = this

      let i_start = v.cfg_pagination.page_size * (v.cfg_pagination.page_current - 1)
      let i_end = i_start + v.cfg_pagination.page_size

      v.data_on_show = v.data.slice(i_start, i_end)
    },
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