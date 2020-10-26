<template>
  <div class="pb-5">

    <div v-if="!data" class="ui-loading">
      Loading...
    </div>
    
    <div v-else class="container pt-3">

      <!-- 信息块 -->
      <div class="row mt-4">

        <div class="col-md-3 mb-2">
          <div class="bg-card px-4 py-3">
            <div>
              ETH Price
            </div>
            <div class="mt-3 d-flex">
              <h4>
                ${{data.eth_price | tofixed2 | qfw}}
              </h4>
            </div>
          </div>
        </div>
        
        <div class="col-md-3 mb-2">
          <div class="bg-card px-4 py-3">
            <div>
              Total Liquidity
            </div>
            <div class="mt-3 d-flex">
              <h4>
                ${{data.Liquidity | tofixed0 | qfw}}
              </h4>

              <changeRate class="ml-auto mt-2" :val="data.Liquidity_change"/>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-2">
          <div class="bg-card px-4 py-3">
            <div>
              Volume(24h)
            </div>
            <div class="mt-3 d-flex">
              <h4>
                ${{data.Volume | tofixed0 | qfw}}
              </h4>

              <changeRate class="ml-auto mt-2" :val="data.Volume_change"/>
            </div>
          </div>
        </div>

        <div class="col-md-3 mb-2">
          <div class="bg-card px-4 py-3">
            <div>
              Transactions(24h)
            </div>
            <div class="mt-3 d-flex">
              <h4>
                {{data.Transaction}}
              </h4>

              <changeRate class="ml-auto mt-2" :val="data.Transaction_change"/>
            </div>
          </div>
        </div>
      </div>

      <!-- chart -->
      <div class="row mt-4">
        <div class="col-md-6 mb-2">
          <div class="bg-card px-4 py-3">
            <div class="pb-3">Liquidity</div>
            <div style="height: 230px;">
              <chartLine v-if="data_chart_liquidity" :data="{one_data: data_chart_liquidity}" />
            </div>
          </div>
        </div>
        <div class="col-md-6 mb-2">
          <div class="bg-card px-4 py-3">
            <div class="pb-3">Volume</div>
            <div style="height: 230px;">
              <chartBar v-if="data_chart_volume" :data="{one_data: data_chart_volume}" />
            </div>
          </div>
        </div>
      </div>

      <!-- pairs & tokens -->
      <div class="sec-title">
        <div class="tabset mt-4">
          <span @click="on_tab = 'Pairs'" :class="['tab',{'on': on_tab == 'Pairs'}]">
            Pairs
          </span>
          <span @click="on_tab = 'Tokens'" :class="['tab',{'on': on_tab == 'Tokens'}]">
            Tokens
          </span>
        </div>
      </div>
      <div class="mt-3">
        
        <div v-show="on_tab == 'Pairs'" class="bg-card px-4 py-3">
          <tablePair :data="data.Pairs"/>
        </div>

        <div v-show="on_tab == 'Tokens'" class="bg-card px-4 py-3">
          <tableToken :data="data.Tokens"/>
        </div>
      </div>

      <!-- transactions -->
      <div class="sec-title mt-4">
        Transactions
      </div>
      <div class="mt-3">

        <div class="bg-card px-4 py-3">
          <tableTransaction :data="data.Transactions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import changeRate from '../_comp_busi/change_rate.vue'

import tablePair from '@/views/_comp_busi/table_pair.vue'
import tableToken from '@/views/_comp_busi/table_token.vue'
import tableTransaction from '@/views/_comp_busi/table_transaction.vue'

import chartLine from '@/views/_comp_busi/chart_line.vue'
import chartBar from '@/views/_comp_busi/chart_bar.vue'

export default {
  name: 'indexHome',
  components: {

    changeRate,
    tablePair,
    tableToken,
    tableTransaction,

    chartLine,
    chartBar,
  },
  props: [],
  data() {
    return {
      data: null,
      on_tab: 'Pairs',

      data_chart_liquidity: null,
      data_chart_volume: null,
    }
  },
  computed: {},
  watch: {},
  methods: {
    getData(){
      let v = this
      v.api('home').then(function(res){
        if(res.code == 0 ){
          v.data = res.data

          v.calcChartData()
        }
      })
    },

    calcChartData: function() {
      var t = this
        , data_liquidity = {}
        , data_volume = {}
        , s = (new Date).getFullYear() + "-";
      for (var n in t.data.chart) {
          var i = t.data.chart[n]
            , r = i.from_timestamp_value.replace(s, "");

          data_liquidity[r] = i.liquidity,
          data_volume[r] = i.volume || i.volumn
      }
      t.data_chart_liquidity = t.util.sortJsonByDate(data_liquidity),
      t.data_chart_volume = t.util.sortJsonByDate(data_volume)
    },
  },
  created() {
    this.getData()
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