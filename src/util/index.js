// 全局工具方法

export default {

  // 把json根据日期排序
  sortJsonByDate: function(t) {
    var a, e, s, n, i, r, c, o;
    for (s in ((a = {}), (n = []), (i = []), t))
      (r = {}), (r[s] = t[s]), n.push(s);
    for (i = n.sort(), c = 0, o = i.length; c < o; c++)
      (e = i[c]), (a[e] = t[e]);
    return a;
  },
};