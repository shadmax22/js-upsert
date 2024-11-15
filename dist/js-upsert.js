function h(e) {
  return e.replace(/[\[\]'"]/g, "").split(".");
}
const y = (e, t) => {
  let r = Math.floor(Math.random() * 1e6), n = typeof t == "string" ? h(t) : t;
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: e,
      index: n ?? null,
      isFunction: typeof e == "function"
    }
  };
};
y.at = (...e) => {
  const t = e, r = t.pop();
  return y(r, t);
};
function c(e, t, r, n = !1, o, l = []) {
  const f = t;
  if (t.length <= 1) {
    if (t.length > 0)
      try {
        return e[t[0]] = n ? r(e[t[0] ?? t]) : r, e;
      } catch {
        throw `Setting Failed at index ${t[0]} of [${l.join(
          " => "
        )}] due to the type ${typeof e}, Only array or object is assignable`;
      }
    if (e === null || typeof e != "object")
      throw Error(
        "Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED"
      );
    let s = n ? r(e) : r;
    if (o.returnType == "array")
      return e.push(s), e;
    if (typeof s != "object")
      throw `Object or array can be setted only as a default value. Type of value is ${typeof s}.`;
    for (const i of Object.keys(s))
      e[i] = s[i];
    return e;
  }
  let u = (e ?? [])[t[0]] ?? !1;
  if (!u) {
    let s = p(t, r, n);
    try {
      e[t[0]] = s;
    } catch {
      throw `Setting Failed at index ${t[0]} of [${l.join(
        " => "
      )}] due to the type ${typeof e}, Only array or object is assignable`;
    }
    return e;
  }
  return t.shift(), c(u, t, r, n, o, [
    ...l,
    f[0]
  ]);
}
function p(e, t, r = !1) {
  let n = [...e], o;
  return n.length == 1 ? o = r ? t(null) : t : (o = {}, n.shift(), o[n[0]] = p(n, t, r)), o;
}
function a({ obj: e }, t, r = [], n = !1) {
  let o = [];
  for (let l in e) {
    let f = e[l];
    if (l.includes(t) && (f ?? !1))
      o.push({
        index: [...r, ...f.index ?? []],
        value: f.value,
        isFunction: f.isFunction
      });
    else if (typeof f == "object") {
      const u = a(
        { obj: f },
        t,
        [...r, l],
        !0
      );
      o = o.concat(u.obj);
    }
  }
  return n ? { obj: o } : {
    result: o
  };
}
function _(e, t, r = { returnType: "object" }) {
  let { result: n } = a({ obj: t }, "$$@@@@__upsert_hook");
  for (let o = 0; o < n.length; o++) {
    let l = n[o];
    c(
      e,
      l.index,
      l.value,
      l.isFunction,
      r
    );
  }
}
function b(e, ...t) {
  let r = {
    returnType: "object"
  };
  const n = Array.isArray(e);
  n && (r.returnType = "array");
  for (let o of t)
    _(e, o, r);
  try {
    return n ? [...e] : { ...e };
  } catch {
    throw Error(
      `Cannot return value as returnType '${r.returnType}'. Please try '${r.returnType == "array" ? "OBJECT" : "ARRAY"}' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
export {
  y as set,
  b as upsert
};
