(function(l,u){typeof exports=="object"&&typeof module<"u"?u(exports):typeof define=="function"&&define.amd?define(["exports"],u):(l=typeof globalThis<"u"?globalThis:l||self,u(l["js-upsert"]={}))})(this,function(l){"use strict";function u(t,e=null){return{["$$@@@@__upsert_hook_"+Math.floor(Math.random()*100)]:{value:t,index:e,isFunction:typeof t=="function"}}}function i({obj:t},e,o=[],r=!1){let n=[];for(let f in t){let s=t[f];if(f.includes(e)&&(s??!1))n.push({index:[...o,...s.index??[]],value:s.value,isFunction:s.isFunction});else if(typeof s=="object"){const b=i({obj:s},e,[...o,f],!0);n=n.concat(b.obj)}}return r?{obj:n}:{result:n}}function p(t,e,o,r=!1){if(e.length<=1){if(e.length>0)t[e[0]]=r?o(t[e[0]??e]):o;else{let f=r?o(t):o;for(const s of Object.keys(f))t[s]=f[s]}return t}let n=(t??[])[e[0]]??!1;if(!n){let f=c(e,o,r);return t[e[0]]=f,t}return e.shift(),p(n,e,o,r)}function c(t,e,o=!1){let r=[...t],n;return r.length==1?n=o?e({}):e:(n={},r.shift(),n[r[0]]=c(r,e)),n}function h(t,e,o={returnType:"object"}){let{result:r}=i({obj:e},"$$@@@@__upsert_hook");for(let n=0;n<r.length;n++){let f=r[n];p(t,f.index,f.value,f.isFunction)}return((o==null?void 0:o.returnType)??"object")=="object"?{...t}:[...t]}l.set=u,l.upsert=h,Object.defineProperty(l,Symbol.toStringTag,{value:"Module"})});
