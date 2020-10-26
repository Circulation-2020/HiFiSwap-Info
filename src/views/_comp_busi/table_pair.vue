<template>

  <div>

    <table class="table main-table w-100 tar">
      <tr class="t-gray">
        <td class="tal" style="width: 200px;">
          Pairs Name
        </td>
        <td style="width: 170px;">
          <!-- Liquidity -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Liquidity',data: data, by_key: 'Liquidity',auto_run: true}"/>
        </td>
        <td style="width: 170px;">
          <!-- Volume(24h) -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Volume(24h)',data: data, by_key: 'Volume'}"/>
        </td>
        <td class="mb-none" style="width: 170px;">
          <!-- Volume(7d) -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Volume(7d)',data: data, by_key: 'Volume_24h'}"/>
        </td>
        <td class="mb-none" style="width: 170px;">
          <!-- Fees(24h) -->
          <btnSortArr @done_run_fn="getList()" :cfg="{name:'Fees(24h)',data: data, by_key: 'Fees'}"/>
        </td>
        <td class="mb-none">

        </td>
      </tr>
      <tr v-for="(item,index) of data_on_show" :key="index">
        <td class="tal">
          <router-link :to="`/pair/${item.pair}`">
            {{`${item.token0.symbol}-${item.token1.symbol}`}}
          </router-link>
        </td>
        <td>
          ${{item.Liquidity | tofixed0 | qfw}}
        </td>
        <td>
          ${{item.Volume | tofixed0 | qfw}}
        </td>
        <td class="mb-none">
          ${{item.Volume_24h | tofixed0 | qfw}}
        </td>
        <td class="mb-none">
          ${{item.Fees | tofixed2 | qfw}}
        </td>
        <td class="mb-none">
          <a class="btn btn-outline-primary" :href="`${$store.state.swap_app_url}/#/add/${item.token0.address}/${item.token1.address}`" target="_blank">
            + Add Liquidity
          </a>

          <a class="btn btn-primary ml-2" :href="`${$store.state.swap_app_url}/#/swap?inputCurrency=${item.token0.address}&outputCurrency=${item.token1.address}`" target="_blank">
            Trade
          </a>
        </td>
      </tr>
    </table>

    <pagination :config="cfg_pagination" :arr_data="data" @reloadList="getList()"/>
  </div>
</template>

<script>
import btnSortArr from '@/views/_comp_base/btn_sort_arr.vue'
import pagination from '@/views/_comp_base/pagination.vue'

export default {
  name: 'tablePair',
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
      
      data_onshow: [],
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
    this.getList()
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