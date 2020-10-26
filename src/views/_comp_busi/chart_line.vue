<template>
  <div style="height: 95%;">
    <canvas ref="chart"></canvas>
  </div>
</template>

<script>

export default {
  name: 'chartLine',
  components: {},
  props: [
    'data',
  ],
  data() {
    return {
      
    }
  },
  computed: {},
  watch: {},
  methods: {
    run: function() {
      var v = this
      let config = {
          type: "line",
          data: {
              labels: ["January", "February", "March", "April", "May", "June", "July"],
              datasets: [{
                  label: "",
                  data: [15e4, 44e4, 43e4, 42e4, 42e4, 43e4, 45e4, 46e4, 47e4, 47e4, 46e4],
                  borderColor: v.$store.state.theme_color,
                  backgroundColor: "#456",
                  fill: !1,
                  cubicInterpolationMode: "monotone"
              }]
          },
          options: {
              responsive: 1,
              maintainAspectRatio: 0,
              legend: {
                  display: 0
              },
              title: {
                  display: 0,
                  text: "title"
              },
              tooltips: {
                  mode: "index",
                  intersect: 0
              },
              scales: {
                  xAxes: [{
                      gridLines: {
                          display: 0
                      }
                  }],
                  yAxes: [{
                      position: "right",
                      gridLines: {},
                      ticks: {
                          beginAtZero: !0,
                          callback: function(t) {
                              return t = parseFloat(parseFloat(t).toFixed(4)),
                              t >= 1e6 ? t / 1e6 + "M" : t
                          }
                      }
                  }]
              }
          }
      };

      // 混入传入数据
      if (v.data && v.data.one_data) {
          var e = []
              , s = [];
          for (var n in v.data.one_data) {
              e.push(n);
              var i = v.data.one_data[n];
              s.push(i)
          }
          config.data.labels = e,
          config.data.datasets[0].data = s
      }
      
      let ctx = v.$refs["chart"].getContext("2d");
      window.myLine = new window.Chart(ctx,config)
    },
  },
  created() {
    
  },
  mounted() {
    this.run()
  },

  //beforeDestroy() {},
  //update() {},
  //activited() {},
  //beforeRouteUpdate() {},
  //filters: {},
};
</script>

<style lang="scss" scoped>
  
</style>