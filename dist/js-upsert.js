function h(t, e = null) {
  return {
    "$$@@@@__upsert_hook": {
      value: t,
      index: e,
      isFunction: typeof t == "function"
    }
  };
}
function s({ obj: t }, e, o = [], l = !1) {
  let n = [];
  for (let f in t) {
    let r = t[f];
    if (f === e && (r ?? !1))
      n.push({
        index: [...o, ...r.index ?? []],
        value: r.value,
        isFunction: r.isFunction
      });
    else if (typeof r == "object") {
      const c = s(
        { obj: r },
        e,
        [...o, f],
        !0
      );
      n = n.concat(c.obj);
    }
  }
  return l ? { obj: n } : {
    result: n
  };
}
function u(t, e, o, l = !1) {
  if (e.length == 1)
    return t[e[0]] = l ? o(t[e[0]]) : o, t;
  let n = (t ?? [])[e[0]] ?? !1;
  if (!n) {
    let f = i(e, o, l);
    return t[e[0]] = f, t;
  }
  return e.shift(), u(n, e, o, l);
}
function i(t, e, o = !1) {
  let l = [...t], n;
  return l.length == 1 ? n = o ? e({}) : e : (n = {}, l.shift(), n[l[0]] = i(l, e)), n;
}
function p(t, e) {
  let { result: o } = s({ obj: e }, "$$@@@@__upsert_hook");
  for (let l = 0; l < o.length; l++) {
    let n = o[l];
    u(t, n.index, n.value, n.isFunction);
  }
  return t;
}
export {
  h as set,
  p as upsert
};
