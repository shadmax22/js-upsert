(function(s,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(s=typeof globalThis<"u"?globalThis:s||self,i(s["js-upsert"]={}))})(this,function(s){"use strict";function i(e){return e.replace(/[\[\]'"]/g,"").split(".")}const c=(e,t)=>{let r=Math.floor(Math.random()*1e6),o=typeof t=="string"?i(t):t;return{["$$@@@@__upsert_hook_"+r]:{value:e,index:o??null,isFunction:typeof e=="function"}}};c.at=(...e)=>{const t=e,r=t.pop();return c(r,t)};function h(e,t,r,o=!1,n,f=[]){const l=t;if(t.length<=1){if(t.length>0)try{return e[t[0]]=o?r(e[t[0]??t]):r,e}catch{throw`Setting Failed at index ${t[0]} of [${f.join(" => ")}] due to the type ${typeof e}, Only array or object is assignable`}if(e===null||typeof e!="object")throw Error("Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED");let u=o?r(e):r;if(n.returnType=="array")return e.push(u),e;if(typeof u!="object")throw`Object or array can be setted only as a default value. Type of value is ${typeof u}.`;for(const p of Object.keys(u))e[p]=u[p];return e}let y=(e??[])[t[0]]??!1;if(!y){let u=a(t,r,o);try{e[t[0]]=u}catch{throw`Setting Failed at index ${t[0]} of [${f.join(" => ")}] due to the type ${typeof e}, Only array or object is assignable`}return e}return t.shift(),h(y,t,r,o,n,[...f,l[0]])}function a(e,t,r=!1){let o=[...e],n;return o.length==1?n=r?t(null):t:(n={},o.shift(),n[o[0]]=a(o,t,r)),n}function b({obj:e},t,r=[],o=!1){let n=[];for(let f in e){let l=e[f];if(f.includes(t)&&(l??!1))n.push({index:[...r,...l.index??[]],value:l.value,isFunction:l.isFunction});else if(typeof l=="object"){const y=b({obj:l},t,[...r,f],!0);n=n.concat(y.obj)}}return o?{obj:n}:{result:n}}function j(e,t,r={returnType:"object"}){let{result:o}=b({obj:t},"$$@@@@__upsert_hook");for(let n=0;n<o.length;n++){let f=o[n];h(e,f.index,f.value,f.isFunction,r)}}function T(e,...t){let r={returnType:"object"};const o=Array.isArray(e);o&&(r.returnType="array");for(let n of t)j(e,n,r);try{return o?[...e]:{...e}}catch{throw Error(`Cannot return value as returnType '${r.returnType}'. Please try '${r.returnType=="array"?"OBJECT":"ARRAY"}' returnType, ERROR: RETURN_ERROR.`)}}s.set=c,s.upsert=T,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
