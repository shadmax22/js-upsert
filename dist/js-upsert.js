function c(t, e = null) {
  return {
    "$$@@@@__upsert_hook": {
      value: t,
      index: e,
      isFunction: typeof t == "function"
    }
  };
}
function s({ obj: t }, e, n = [], l = !1) {
  let r = [];
  for (let u in t) {
    let o = t[u];
    if (u === e && (o ?? !1))
      r.push({
        index: [...n, ...o.index ?? []],
        value: o.value,
        isFunction: o.isFunction
      });
    else if (typeof o == "object") {
      const p = s(
        { obj: o },
        e,
        [...n, u],
        !0
      );
      r = r.concat(p.obj);
    }
  }
  return l ? { obj: r } : {
    result: r
  };
}
function f(t, e, n, l = !1) {
  if (e.length == 1)
    return t[e[0]] = l ? n(t[e[0]]) : n, t;
  let r = (t ?? [])[e[0]] ?? !1;
  if (!r) {
    let u = i(e, n, l);
    return t[e[0]] = u, t;
  }
  return e.shift(), f(r, e, n, l);
}
function i(t, e, n = !1) {
  let l = [...t], r;
  return l.length == 1 ? r = n ? e({}) : e : (r = {}, l.shift(), r[l[0]] = i(l, e)), r;
}
function _(t, e, n = { returnType: "object" }) {
  let { result: l } = s({ obj: e }, "$$@@@@__upsert_hook");
  for (let r = 0; r < l.length; r++) {
    let u = l[r];
    f(t, u.index, u.value, u.isFunction);
  }
  return ((n == null ? void 0 : n.returnType) ?? "object") == "object" ? { ...t } : [...t];
}
export {
  c as set,
  _ as upsert
};
