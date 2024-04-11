function _(e, t = null) {
  return {
    ["$$@@@@__upsert_hook_" + Math.floor(Math.random() * 100)]: {
      value: e,
      index: t,
      isFunction: typeof e == "function"
    }
  };
}
function s({ obj: e }, t, l = [], n = !1) {
  let r = [];
  for (let o in e) {
    let u = e[o];
    if (o.includes(t) && (u ?? !1))
      r.push({
        index: [...l, ...u.index ?? []],
        value: u.value,
        isFunction: u.isFunction
      });
    else if (typeof u == "object") {
      const p = s(
        { obj: u },
        t,
        [...l, o],
        !0
      );
      r = r.concat(p.obj);
    }
  }
  return n ? { obj: r } : {
    result: r
  };
}
function f(e, t, l, n = !1) {
  if (t.length <= 1)
    return t[0] ?? !1 ? e[t[0]] = n ? l(e[t[0] ?? t]) : l : e = n ? l(e) : l, e;
  let r = (e ?? [])[t[0]] ?? !1;
  if (!r) {
    let o = i(t, l, n);
    return e[t[0]] = o, e;
  }
  return t.shift(), f(r, t, l, n);
}
function i(e, t, l = !1) {
  let n = [...e], r;
  return n.length == 1 ? r = l ? t({}) : t : (r = {}, n.shift(), r[n[0]] = i(n, t)), r;
}
function c(e, t, l = { returnType: "object" }) {
  let { result: n } = s({ obj: t }, "$$@@@@__upsert_hook");
  for (let r = 0; r < n.length; r++) {
    let o = n[r];
    o.index.length == 0 ? e = f(
      e,
      o.index,
      o.value,
      o.isFunction
    ) : f(e, o.index, o.value, o.isFunction);
  }
  return ((l == null ? void 0 : l.returnType) ?? "object") == "object" ? { ...e } : [...e];
}
export {
  _ as set,
  c as upsert
};
