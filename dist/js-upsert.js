function h(t, e = null) {
  return {
    ["$$@@@@__upsert_hook_" + Math.floor(Math.random() * 100)]: {
      value: t,
      index: e,
      isFunction: typeof t == "function"
    }
  };
}
function f({ obj: t }, e, l = [], o = !1) {
  let r = [];
  for (let n in t) {
    let s = t[n];
    if (n.includes(e) && (s ?? !1))
      r.push({
        index: [...l, ...s.index ?? []],
        value: s.value,
        isFunction: s.isFunction
      });
    else if (typeof s == "object") {
      const _ = f(
        { obj: s },
        e,
        [...l, n],
        !0
      );
      r = r.concat(_.obj);
    }
  }
  return o ? { obj: r } : {
    result: r
  };
}
function u(t, e, l, o = !1) {
  if (e.length <= 1) {
    if (e.length > 0)
      t[e[0]] = o ? l(t[e[0] ?? e]) : l;
    else {
      let n = o ? l(t) : l;
      for (const s of Object.keys(n))
        t[s] = n[s];
    }
    return t;
  }
  let r = (t ?? [])[e[0]] ?? !1;
  if (!r) {
    let n = c(e, l, o);
    return t[e[0]] = n, t;
  }
  return e.shift(), u(r, e, l, o);
}
function c(t, e, l = !1) {
  let o = [...t], r;
  return o.length == 1 ? r = l ? e({}) : e : (r = {}, o.shift(), r[o[0]] = c(o, e)), r;
}
function i(t, e, l = { returnType: "object" }) {
  let { result: o } = f({ obj: e }, "$$@@@@__upsert_hook");
  for (let r = 0; r < o.length; r++) {
    let n = o[r];
    u(t, n.index, n.value, n.isFunction);
  }
  return ((l == null ? void 0 : l.returnType) ?? "object") == "object" ? { ...t } : [...t];
}
export {
  h as set,
  i as upsert
};
