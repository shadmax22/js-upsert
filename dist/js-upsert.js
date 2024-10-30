function R(e, t = null) {
  let r = Math.floor(Math.random() * 100), n = typeof t == "string" ? p(t) : t;
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: e,
      index: n,
      isFunction: typeof e == "function"
    }
  };
}
function p(e) {
  return e.replace(/[\[\]'"]/g, "").split(".");
}
function y({ obj: e }, t, r = [], n = !1) {
  let l = [];
  for (let u in e) {
    let o = e[u];
    if (u.includes(t) && (o ?? !1))
      l.push({
        index: [...r, ...o.index ?? []],
        value: o.value,
        isFunction: o.isFunction
      });
    else if (typeof o == "object") {
      const s = y(
        { obj: o },
        t,
        [...r, u],
        !0
      );
      l = l.concat(s.obj);
    }
  }
  return n ? { obj: l } : {
    result: l
  };
}
function f(e, t, r, n = !1, l) {
  if (t.length <= 1) {
    if (t.length > 0)
      try {
        return e[t[0]] = n ? r(e[t[0] ?? t]) : r, e;
      } catch {
        throw `Unable to set value at index [${t}], ERROR: SETTER_FAILED`;
      }
    if (e === null || typeof e != "object")
      throw Error(
        "Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED"
      );
    let o = n ? r(e) : r;
    if (l.returnType == "array")
      return e.push(o), e;
    if (typeof o != "object")
      throw `Only object or array can be setted as a default value. Value given ${o}.`;
    for (const s of Object.keys(o))
      e[s] = o[s];
    return e;
  }
  let u = (e ?? [])[t[0]] ?? !1;
  if (!u) {
    let o = E(t, r, n);
    try {
      e[t[0]] = o;
    } catch {
      throw `Unable to set value at index [${t}], ERROR: SETTER_FAILED`;
    }
    return e;
  }
  return t.shift(), f(u, t, r, n, l);
}
function E(e, t, r = !1) {
  let n = [...e], l;
  return n.length == 1 ? l = r ? t(null) : t : (l = {}, n.shift(), l[n[0]] = E(n, t, r)), l;
}
function h(e, t, r = { returnType: "object" }) {
  Array.isArray(e) && (r.returnType = "array");
  let { result: n } = y({ obj: t }, "$$@@@@__upsert_hook");
  for (let l = 0; l < n.length; l++) {
    let u = n[l];
    f(
      e,
      u.index,
      u.value,
      u.isFunction,
      r
    );
  }
  try {
    return ((r == null ? void 0 : r.returnType) ?? "object") == "object" ? { ...e } : [...e];
  } catch {
    throw Error(
      `Cannot return value as returnType '${r.returnType}'. Please try '${r.returnType == "array" ? "OBJECT" : "ARRAY"}' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
export {
  R as set,
  h as upsert
};
