function c(e, t = null) {
  return { "$$@@@@__upsert_hook": { value: e, index: t } };
}
function f({ obj: e }, t, r = [], l = !1) {
  let n = [];
  for (let u in e)
    if (u === t && (e[u] ?? !1))
      n.push({
        index: [...r, ...e[u].index ?? []],
        value: e[u].value
      });
    else if (typeof e[u] == "object") {
      const i = f(
        { obj: e[u] },
        t,
        [...r, u],
        !0
      );
      n = n.concat(i.obj);
    }
  return l ? { obj: n } : {
    result: n
  };
}
function s(e, t, r) {
  if (t.length == 1)
    return e[t[0]] = r, e;
  let l = (e ?? [])[t[0]] ?? !1;
  if (!l) {
    let n = o(t, r);
    return e[t[0]] = n, e;
  }
  return t.shift(), s(l, t, r);
}
function o(e, t) {
  let r = [...e], l;
  return r.length == 1 ? l = t : (l = {}, r.shift(), l[r[0]] = o(r, t)), l;
}
function _(e, t) {
  let { result: r } = f({ obj: t }, "$$@@@@__upsert_hook");
  for (let l = 0; l < r.length; l++) {
    let n = r[l];
    s(e, n.index, n.value);
  }
  return e;
}
export {
  c as set,
  _ as upsert
};
