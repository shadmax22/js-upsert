(function(s,i){typeof exports=="object"&&typeof module<"u"?i(exports):typeof define=="function"&&define.amd?define(["exports"],i):(s=typeof globalThis<"u"?globalThis:s||self,i(s["js-upsert"]={}))})(this,function(s){"use strict";function i(e,t=null){let r=Math.floor(Math.random()*100),o=typeof t=="string"?R(t):t;return{["$$@@@@__upsert_hook_"+r]:{value:e,index:o,isFunction:typeof e=="function"}}}function R(e){return e.replace(/[\[\]'"]/g,"").split(".")}function y({obj:e},t,r=[],o=!1){let n=[];for(let l in e){let u=e[l];if(l.includes(t)&&(u??!1))n.push({index:[...r,...u.index??[]],value:u.value,isFunction:u.isFunction});else if(typeof u=="object"){const f=y({obj:u},t,[...r,l],!0);n=n.concat(f.obj)}}return o?{obj:n}:{result:n}}function p(e,t,r,o=!1,n){if(t.length<=1){if(t.length>0)try{return e[t[0]]=o?r(e[t[0]??t]):r,e}catch{throw`Unable to set value at index [${t}], ERROR: SETTER_FAILED`}if(e===null||typeof e!="object")throw Error("Initial value is not a object, ERROR: INITITAL_VALUE_PARSE_FAILED");let u=o?r(e):r;if(n.returnType=="array")return e.push(u),e;if(typeof u!="object")throw`Only object or array can be setted as a default value. Value given ${u}.`;for(const f of Object.keys(u))e[f]=u[f];return e}let l=(e??[])[t[0]]??!1;if(!l){let u=E(t,r,o);try{e[t[0]]=u}catch{throw`Unable to set value at index [${t}], ERROR: SETTER_FAILED`}return e}return t.shift(),p(l,t,r,o,n)}function E(e,t,r=!1){let o=[...e],n;return o.length==1?n=r?t(null):t:(n={},o.shift(),n[o[0]]=E(o,t,r)),n}function c(e,t,r={returnType:"object"}){Array.isArray(e)&&(r.returnType="array");let{result:o}=y({obj:t},"$$@@@@__upsert_hook");for(let n=0;n<o.length;n++){let l=o[n];p(e,l.index,l.value,l.isFunction,r)}try{return((r==null?void 0:r.returnType)??"object")=="object"?{...e}:[...e]}catch{throw Error(`Cannot return value as returnType '${r.returnType}'. Please try '${r.returnType=="array"?"OBJECT":"ARRAY"}' returnType, ERROR: RETURN_ERROR.`)}}s.set=i,s.upsert=c,Object.defineProperty(s,Symbol.toStringTag,{value:"Module"})});
