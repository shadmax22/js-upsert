function h(e) {
  return e.replace(/[\[\]'"]/g, "").split(".");
}
const c = (e, t) => {
  let r = Math.floor(Math.random() * 1e6), o = typeof t == "string" ? h(t) : t;
  return {
    ["$$@@@@__upsert_hook_" + r]: {
      value: e,
      index: o ?? null,
      isFunction: typeof e == "function"
    }
  };
};
c.at = (...e) => {
  const t = e, r = t.pop();
  return c(r, t);
};
function y(e, t, r, o = !1, n, l = []) {
  const u = t;
  if (t.length <= 1) {
    if (t.length > 0)
      try {
        return e[t[0]] = o ? r(e[t[0] ?? t]) : r, e;
      } catch {
        throw `Setting Failed at index ${t[0]} of [${l.join(
          " => "
        )}] due to the type ${typeof e}, Only array or object is assignable`;
      }
    if (e === null || typeof e != "object")
      throw Error(
        "Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED"
      );
    let f = o ? r(e) : r;
    if (n.returnType == "array")
      return e.push(f), e;
    if (typeof f != "object")
      throw `Object or array can be setted only as a default value. Type of value is ${typeof f}.`;
    for (const s of Object.keys(f))
      e[s] = f[s];
    return e;
  }
  let i = (e ?? [])[t[0]] ?? !1;
  if (!i) {
    let f = p(t, r, o);
    try {
      e[t[0]] = f;
    } catch {
      throw `Setting Failed at index ${t[0]} of [${l.join(
        " => "
      )}] due to the type ${typeof e}, Only array or object is assignable`;
    }
    return e;
  }
  return t.shift(), y(i, t, r, o, n, [
    ...l,
    u[0]
  ]);
}
function p(e, t, r = !1) {
  let o = [...e], n;
  return o.length == 1 ? n = r ? t(null) : t : (n = {}, o.shift(), n[o[0]] = p(o, t, r)), n;
}
function a({ obj: e }, t, r = [], o = !1) {
  let n = [];
  for (let l in e) {
    let u = e[l];
    if (l.includes(t) && (u ?? !1))
      n.push({
        index: [...r, ...u.index ?? []],
        value: u.value,
        isFunction: u.isFunction
      });
    else if (typeof u == "object") {
      const i = a(
        { obj: u },
        t,
        [...r, l],
        !0
      );
      n = n.concat(i.obj);
    }
  }
  return o ? { obj: n } : {
    result: n
  };
}
function _(e, t, r = { returnType: "object" }) {
  let { result: o } = a({ obj: t }, "$$@@@@__upsert_hook");
  for (let n = 0; n < o.length; n++) {
    let l = o[n];
    y(
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
  const o = Array.isArray(e);
  o && (r.returnType = "array");
  for (let n of t)
    _(e, n, r);
  try {
    return new Proxy(e, {
      get(n, l, u) {
        return n = o ? [...e] : { ...e }, l === "get" ? () => u : l === "at" ? (...i) => {
          if (i.length <= 1)
            throw "keys.length is less than 2, need atleast 2 values to differentiate index and value";
          const f = i[i.length - 1], s = i;
          return s.pop(), y(
            e,
            s,
            f,
            typeof f == "function",
            r
          ), u;
        } : Reflect.get(n, l, u);
      }
    });
  } catch {
    throw Error(
      `Cannot return value as returnType '${r.returnType}'. Please try '${r.returnType == "array" ? "OBJECT" : "ARRAY"}' returnType, ERROR: RETURN_ERROR.`
    );
  }
}
export {
  c as set,
  b as upsert
};
