<template>
  <div class="search-box">
    <div class="header-search">
      <input @keyup="search()" type="text" v-model="search_input" placeholder="Search Pairs and Tokens ...">

      <div v-show="search_input && (arr_pair || arr_token)" class="sp-res-box">
        <div class="sp-res-card py-3">

          <!--  -->
          <div>
            <div class="text-muted px-3 py-1">
              Pairs
            </div>
            <div v-if="arr_pair && arr_pair.length === 0" class="px-3 py-1">
              No Result
            </div>
            <div v-for="(item,index) of arr_pair" :key="index">
              <router-link :to="`/pair/${item.pair}`" class="px-3 py-2">
                {{item.token0.symbol}}
                -
                {{item.token1.symbol}}
              </router-link>
            </div>
          </div>

          <!--  -->
          <div>
            <div class="text-muted px-3 py-1">
              Tokens
            </div>
            <div v-if="arr_token && arr_token.length === 0" class="px-3 py-1">
              No Result
            </div>
            <div v-for="(item,index) of arr_token" :key="index">
              <router-link :to="`/token/${item.address}`" class="px-3 py-2">
                {{item.symbol}}
              </router-link>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "headerSearch",
  components: {},
  props: [],
  data: function() {
    return {
      status_ajaxing: false,
      search_input: "",
      arr_token: null,
      arr_pair: null
    }
  },
  computed: {
  },
  watch: {
    "$route.path": function() {
      this.search_input = ""
    },
    search_input: function(t) {
      var a = this;
      t || (a.arr_token = null,
      a.arr_pair = null)
    }
  },
  methods: {
    search: function() {
      console.log('-----')
      var t = this
        , a = {
          search_key: t.search_input
      };
      a.search_key && setTimeout((function() {

        t.search_input === a.search_key && t.api("search", a, {
            vue: t,
            key_ajaxing: 'status_ajaxing',
        }).then((function(a) {
            a.data.Tokens && a.data.Tokens.length ? t.arr_token = a.data.Tokens : t.arr_token = [],
            a.data.Pairs && a.data.Pairs.length ? t.arr_pair = a.data.Pairs : t.arr_pair = []
        }
        ))
      }
      ), 600)
    }
  },
  created: function() {}
};
</script>

<style lang="scss" scoped>
  .search-box{

    &.big-bar{
      .header-search{
        height: 50px;
        background-color: rgba(255,255,255,0.5);
      }
    }

    .header-search{
      border-radius: 25px;
      background-image: url('/static/img/icon_search.svg');
      background-position: 12px;
      background-repeat: no-repeat;
      background-size: 18px;
      height: 35px;
      min-width: 230px;
      position: relative;
      border: 1px solid #ddd;

      input{
        border: none;
        background-color: transparent;
        height: 100%;
        padding-left: 35px;
        outline: none;
        width: 100%;

        &:focus{
          &~.sp-res-box{
            display: block;
          }
        }
      }

      .sp-res-box{
        position: absolute;
        top: 34px;
        left: 0;
        right: 0;
        padding-top: 5px;
        z-index: 9;
        display: none;
        &:hover{
          display: block;
        }

        .sp-res-card{
          margin: 0 5px;
          border-radius: 15px;
          background-color: #fff;
          box-shadow: 0 1px 3px rgba(0,0,0,.1);

          a{
            display: block;
            text-decoration: none;
            &:hover{
              background-color: rgba(0,0,0,.03);
            }
          }
        }
      }
    }
  }
</style>