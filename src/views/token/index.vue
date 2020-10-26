<template>
  <div class="container py-5">
    <div v-if="!data" class="ui-loading">
      Loading...
    </div>
    <div v-else>
      
      <!-- title -->
      <div class="d-flex flex-wrap">
        <div class="d-flex mb-2">
          <h2>
            {{data.name}}
            ({{data.symbol}})
            ${{data.price | qfw}}
          </h2>
          <changeRate :val="data.Price_change" class="mt-2 ml-3" />
        </div>

        <div class="pc-ml-auto">
          <a class="btn btn-outline-primary" :href="`${$store.state.swap_app_url}/#/add/${data.address}`" target="_blank">
            + Add Liquidity
          </a>

          <a class="btn btn-primary ml-2" :href="`${$store.state.swap_app_url}/#/swap?inputCurrency=${data.address}`" target="_blank">
            Trade
          </a>
        </div>
      </div>

      <!-- Token Stats -->
      <div class="mt-4">

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

            <div class="bg-card px-4 pt-3 pb-2">
              <div>Transactions (24hrs)</div>
              <div class="mt-3 d-flex">
                <h3>
                  {{data.Transaction | tofixed0 | qfw}}
                </h3>
                <changeRate :val="data.Transaction_change" class="ml-auto mt-2"/>
              </div>
            </div>

          </div>

          <div class="col-md-8 mb-2">

            <div class="bg-card px-4 py-3 h-100 mb-2 rel" style="padding-top: 80px !important;">

              <!-- tabs -->
              <tabset v-model="ontab_for_chart" :cfg="{tabs: tabs_for_chart}" class="pb-4 abs" style="top: 20px; left: 20px;"/>

              <div class="rel" style="height: 100%;">

                <div v-if="data_chart_liquidity && ontab_for_chart == 'Liquidity'" style="height: 100%;">
                  <chartLine :data="{one_data: data_chart_liquidity}" key="token-Liquidity"/>
                </div>

                <div v-if="data_chart_volume && ontab_for_chart == 'Volume'" style="height: 100%;">
                  <chartBar :data="{one_data: data_chart_volume}" key="token-Volume"/>
                </div>

                <div v-if="data_chart_price && ontab_for_chart == 'Price'" style="height: 100%;">
                  <chartLine :data="{one_data: data_chart_price}" key="token-Price"/>
                </div>
              </div>

            </div>
            
          </div>
        </div>
      </div>

      <!-- Top Pairs -->
      <div class="mt-5">
        <div class="sec-title">
          Top Pairs
        </div>
        <div class="bg-card px-4 py-3 mt-3">
          <tablePair :data="data.Pairs"/>
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

      <!-- token Information -->
      <div class="mt-5">
        <div class="sec-title">
          token Information
        </div>
        <div class="bg-card px-4 py-3 mt-3 d-flex flex-wrap">
          <div class="mr-5">
            <div>Symbol</div>
            <h5>
              {{data.symbol}}
            </h5>
          </div>
          <div class="mr-5">
            <div>Name</div>
            <h5>
              {{data.name}}
            </h5>
          </div>
          <div class="mr-5">
            <div>Address</div>
            <h5 class="d-flex align-items-center">
              {{data.address | shortAddress}}

              <copyBtn :text="data.address" class="ml-3"/>
            </h5>
          </div>

          <div class="mt-3">
            <a :href="`${$store.state.scan_view_url}/address/${data.address}`" target="_blank">
              View on Etherscan ↗
            </a>
          </div>

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

import tablePair from '@/views/_comp_busi/table_pair.vue'
import tableTransaction from '@/views/_comp_busi/table_transaction.vue'

import copyBtn from '@/views/_comp_base/copy_btn.vue'

export default {
  name: 'token',
  components: {
    changeRate,

    tabset,
    chartLine,
    chartBar,

    tablePair,
    tableTransaction,

    copyBtn,
  },
  props: [],
  data() {
    return {
      ontab_for_chart: "Liquidity",
      tabs_for_chart: ["Liquidity", "Volume", "Price"],
      data: null,
      data_chart_liquidity: null,
      data_chart_volume: null,
      data_chart_price: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    getData: function() {
      var t = this
        , a = {
          address: t.$route.params.id
      };
      t.api("token", a, {
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
        , s = {}
        , n = (new Date).getFullYear() + "-";
      for (var i in t.data.chart) {
          var r = t.data.chart[i]
            , c = r.from_timestamp_value.replace(n, "");
          a[c] = r.liquidity,
          e[c] = r.volume || r.volumn,
          s[c] = r.price
      }
      t.data_chart_liquidity = t.util.sortJsonByDate(a),
      t.data_chart_volume = t.util.sortJsonByDate(e),
      t.data_chart_price = t.util.sortJsonByDate(s)
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