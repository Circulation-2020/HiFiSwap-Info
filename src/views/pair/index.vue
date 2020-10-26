<template>
  <div class="container py-5">
    <div v-if="!data" class="ui-loading">
      Loading...
    </div>
    <div v-else>
      
      <!-- title -->
      <div class="d-flex flex-wrap">
        <div class="d-flex mb-2">
          <h2>{{data.token0.symbol}}-{{data.token1.symbol}} Pair</h2>
        </div>

        <div class="pc-ml-auto">
          <a class="btn btn-outline-primary" :href="`${$store.state.swap_app_url}/#/add/${data.token0.address}/${data.token1.address}`" target="_blank">
            + Add Liquidity
          </a>

          <a class="btn btn-primary ml-2" :href="`${$store.state.swap_app_url}/#/swap?inputCurrency=${data.token0.address}&outputCurrency=${data.token1.address}`" target="_blank">
            Trade
          </a>
        </div>
      </div>

      <!-- price -->
      <div class="mt-4">
        <router-link :to="`/token/${data.token0.address}`" class="el-card-link mb-2 mr-3">
          1 {{data.token0.symbol}} 
          =
          {{data.token0.price/data.token1.price | qfw}} {{data.token1.symbol}}
          (${{data.token0.price | tofixed2}})
        </router-link>

        <router-link :to="`/token/${data.token1.address}`" class="el-card-link mb-2">
          1 {{data.token1.symbol}} 
          =
          {{data.token1.price/data.token0.price | qfw}} {{data.token0.symbol}}
          (${{data.token1.price | tofixed4}})
        </router-link>
      </div>

      <!-- Token Stats -->
      <div class="mt-5">

        <div class="sec-title">
          Token Stats
        </div>

        <div class="row mt-3">
          
          <div class="col-md-4 mb-2">

            <!--  -->
            <div class="mb-2 bg-card px-4 pt-3 pb-2">
              <div>Total Liquidity</div>
              <div class="mt-3 d-flex">
                <h3>
                  ${{data.Liquidity | tofixed0 | qfw}}
                </h3>
                <changeRate :val="data.Liquidity_change" class="ml-auto mt-2"/>
              </div>
            </div>

            <!--  -->
            <div class="mb-2 bg-card px-4 pt-3 pb-2">
              <div>Volume (24hrs)</div>
              <div class="mt-3 d-flex">
                <h3>
                  ${{data.Volume | tofixed0 | qfw}}
                </h3>
                <changeRate :val="data.Volume_change" class="ml-auto mt-2"/>
              </div>
            </div>

            <!--  -->
            <div class="mb-2 bg-card px-4 pt-3 pb-2">
              <div>Fees</div>
              <div class="mt-3 d-flex">
                <h3>
                  ${{data.Fees | tofixed0 | qfw}}
                </h3>
                <changeRate :val="data.Fees_change" class="ml-auto mt-2"/>
              </div>
            </div>

            <!--  -->
            <div class="mb-2 bg-card px-4 pt-3 pb-2">
              <div>Transactions (24hrs)</div>
              <div class="mt-3 d-flex">
                <h3>
                  {{data.Transaction | tofixed0 | qfw}}
                </h3>
                <changeRate :val="data.Transaction_change" class="ml-auto mt-2"/>
              </div>
            </div>

            <!--  -->
            <div class="bg-card px-4 pt-3 pb-2">
              <div>Pooled Tokens</div>
              <div class="mt-3">
                <h5>
                  {{data.reserve0 | tofixed4 | qfw}}
                  {{data.token0.symbol}}
                </h5>
                <h5>
                  {{data.reserve1 | tofixed0 | qfw}}
                  {{data.token1.symbol}}
                </h5>
              </div>
            </div>

          </div>

          <div class="col-md-8 mb-2">

            <div class="bg-card px-4 py-3 h-100 mb-2 rel" style="padding-top: 80px !important;">

              <!-- tabs -->
              <tabset v-model="ontab_for_chart" :cfg="{tabs: tabs_for_chart}" class="pb-4 abs" style="left: 20px; top: 20px;"/>

              <div class="rel" style="height: 100%;">

                <div v-if="data_chart_liquidity && ontab_for_chart == 'Liquidity'" style="height: 100%;">
                  <chartLine :data="{one_data: data_chart_liquidity}" key="token-Liquidity"/>
                </div>

                <div v-if="data_chart_volume && ontab_for_chart == 'Volume'" style="height: 100%;">
                  <chartBar :data="{one_data: data_chart_volume}" key="token-Volume"/>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>

      <!-- Transactions -->
      <div class="mt-5">
        <div class="sec-title">
          Transactions
        </div>
        <div class="bg-card px-4 py-3 mt-3">
          <tableTransaction :data="data.Transactions"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import changeRate from '../_comp_busi/change_rate.vue'

import tabset from '../_comp_base/tabset.vue'

import chartLine from '@/views/_comp_busi/chart_line.vue'
import chartBar from '@/views/_comp_busi/chart_bar.vue'

import tableTransaction from '@/views/_comp_busi/table_transaction.vue'

export default {
  name: 'pair',
  components: {
    changeRate,

    tabset,
    chartLine,
    chartBar,

    tableTransaction,
  },
  props: [],
  data() {
    
    let ui_chart_div_height = document.body.clientWidth > 788? '480px': '230px'

    return {
      ontab_for_chart: "Liquidity",
      tabs_for_chart: ["Liquidity", "Volume"],
      data: null,
      data_chart_liquidity: null,
      data_chart_volume: null,
      ui_chart_div_height: ui_chart_div_height,
    }
  },
  computed: {

  },
  watch: {
    "$route.params.id": function() {
        this.data = null,
        this.getData()
    },
  },
  methods: {
    getData: function() {
      var t = this
        , a = {
          address: t.$route.params.id
      };
      t.api("pair", a, {
        vue: t,
        key_data: "data"
      }).then((function(a) {
        console.log(a),
        t.calcChartData()
      }
      ))
    },
    calcChartData: function() {
      var t = this
        , a = {}
        , e = {}
        , s = (new Date).getFullYear() + "-";
      for (var n in t.data.chart) {
        var i = t.data.chart[n]
          , r = i.from_timestamp_value.replace(s, "");
        a[r] = i.liquidity,
        e[r] = i.volume || i.volumn
      }
      t.data_chart_liquidity = t.util.sortJsonByDate(a),
      t.data_chart_volume = t.util.sortJsonByDate(e)
    }
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