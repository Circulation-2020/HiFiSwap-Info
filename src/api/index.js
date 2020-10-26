// update: 2019 09 26
// copy: 2020 06 22 from coucouv3

// 说明：
// 使用方法：
// this.apiv2('apiFuncionName', form, cfgj).then(function1(data), function2(res), funcion3(res))

// cfgj: {
//  vue: myvue/self, 基础的请必传
//  key_data: 'xxx_list', 赋值的key
//  key_data_filter: 'key_name from res.data', 从后端数据中筛选数据的key（如分页接口都会用这个）
//  key_data_mixin: {'key_name': 'key_value'}, 对赋值的数据赋值前，先混入其他数据，支持arr和json
//  key_ajaxing: 'status_loading', ajaxing状态的key
//  key_ajaxing_ok_istiptime: 'status_loading_ok_tiptime', 一般用于按钮，提示结果(如saved)几秒钟
//  done_reset_keys: {'some_key': ''}, ajax完成后重置值的key
//  done_run_function: ['func_name'], ajax完成后调用的方法名（无法传参）
//  done_msg: '', ajax完成后提示信息
//  no_err_msg: true, 强制不显示报错消息
//
//  axios_baseUrl: '/', 该参数覆盖默认的baseUrl
// }

// node：待完善功能：
// 1. 请求失败时的操作

// import bus from "../bus.js";

let tool = {
  dataMixin: function(data, new_data) {
    let temp_data = data;

    if (Object.prototype.toString.call(temp_data) === "[object Array]") {
      temp_data.map( function(item) {
        let temp = Object.assign(item, new_data);
        item = temp
      });
    } else if (
      Object.prototype.toString.call(temp_data) === "[object Object]"
    ) {
      temp_data = Object.assign(temp_data, new_data);
    }

    return temp_data;
  },
};

import axios from "axios";

// axios 配置
// axios.defaults.timeout = 7000 // 文件上传可能会很慢，所以取消了timeout配置
axios.defaults.baseURL = "/api/"
// axios.defaults.withCredentials = true

import api_url_conf from "./api_url_cfg.js";

// uni axios
export function fetch(url, params, cfg_json) {
  // return
  if (url.indexOf("@return:") >= 0) {
    console.log("returned request.");
    return { then: function() {} };
  }

  // 全局过滤 验证危险脚本(包含 <script 关键字的)
  let params_str = params;
  if (typeof params === "object") {
    params_str = JSON.stringify(params);
  }
  if (
    params_str.indexOf("<script") >= 0 ||
    params_str.indexOf("script>") >= 0
  ) {
    alert("Err.");
    return { then: function() {} };
  }

  return new Promise((resolve, reject) => {
    let cfgj = cfg_json;

    // 校验 cfgj 可用性
    // if (cfgj && !cfgj.vue) {
    //   cfgj = null
    // }

    if (cfgj && cfgj.key_ajaxing) {
      if (cfgj.vue[cfgj.key_ajaxing]) {
        return;
      } else {
        cfgj.vue[cfgj.key_ajaxing] = true;
      }
    }

    // 记录当前url
    let url_before_ajax = window.location.href;

    // 配置默认 baseUrl
    let append_base_url = "";
    if (cfgj && cfgj.axios_baseUrl) {
      append_base_url = cfgj.axios_baseUrl;
    }

    // 处理 get 或者 post
    let api_url = append_base_url + url;
    let api_method = "post";
    if (api_url.indexOf("@get:") >= 0) {
      api_url = api_url.replace("@get:", "");
      api_method = "get";
    }
    //
    let axios_json = {
      method: api_method,
      url: api_url,
    };
    if (api_method === "post") {
      axios_json.data = {"data":params};
    }
    if (api_method === "get") {
      let append_str = "";

      for (let key in params) {
        append_str += `&${key}=${params[key]}`;
      }
      append_str = append_str.replace("&", "?");
      api_url += append_str;
      axios_json.url = api_url;
    }

    axios(axios_json).then(
      (res) => {
        // 按钮等 提示时间
        let mark_tiptime = 1500;

        // 取消ajaxing状态
        if (cfgj && cfgj.key_ajaxing) {
          if (cfgj.key_ajaxing_ok_istiptime) {
            // 如果有状态提示，延迟2s
            setTimeout(function() {
              cfgj.vue[cfgj.key_ajaxing] = false;
            }, mark_tiptime);
          } else {
            cfgj.vue[cfgj.key_ajaxing] = false;
          }
        }

        if (res.data.errcode === 0 || res.data.errcode === undefined) {
          // 数据赋值
          if (cfgj && cfgj.key_data) {
            let res_data = cfgj.key_data_filter
              ? res.data.data[cfgj.key_data_filter]
              : res.data.data;

            if (cfgj.key_data_mixin) {
              res_data = tool.dataMixin(res_data, cfgj.key_data_mixin);
            }
            cfgj.vue[cfgj.key_data] = res_data;
          }

          // 清空表单
          if (cfgj && cfgj.done_reset_keys) {
            for (let key in cfgj.done_reset_keys) {
              // console.log(key)
              cfgj.vue[key] = cfgj.done_reset_keys[key];
            }
          }

          // 执行function
          if (cfgj && cfgj.done_run_function) {
            if (typeof cfgj.done_run_function === "string") {
              cfgj.done_run_function = [cfgj.done_run_function];
            }
            for (let index in cfgj.done_run_function) {
              let func_name = cfgj.done_run_function[index];
              cfgj.vue[func_name]();
            }
          }

          // 针对按钮等 的状态提示，一两秒钟左右
          if (cfgj && cfgj.key_ajaxing_ok_istiptime) {
            cfgj.vue[cfgj.key_ajaxing_ok_istiptime] = true;
            setTimeout(function() {
              cfgj.vue[cfgj.key_ajaxing_ok_istiptime] = false;
            }, mark_tiptime);
          }

          // 消息提示
          if (cfgj && cfgj.done_msg) {
            console.log('xxxx api err~')
          }
        } else {
          if (cfgj && cfgj.no_err_msg) {
            // ...
          }

          // 报错
          else {
            // todo...
          }
        }
        resolve(res.data);
      },
      (err) => {
        // 非 200 header 情况下的报错
        // 报错(仅当url没切换时，页面换过就不再报错了)
        let url_after_ajax = window.location.href;
        if (url_before_ajax === url_after_ajax) {
          let err_code = err.request.status;
          let err_msg = err.request.statusText || "network error";
          let words = err_code + " - " + err_msg;
          
          console.log(words);
        }

        // 取消 ajaxing
        if (cfgj && cfgj.key_ajaxing) {
          cfgj.vue[cfgj.key_ajaxing] = false;
        }

        reject(err);
      }
    );
    // .catch((error) => {
    //   reject(error)
    // })
  });
}

export default function(name, params, cfgj) {
  return fetch(api_url_conf[name] || name, params || {}, cfgj);
}
