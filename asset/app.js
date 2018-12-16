!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,r){!function(e,t){if(!v[e]||!y[e])return;for(var r in y[e]=!1,t)Object.prototype.hasOwnProperty.call(t,r)&&(h[r]=t[r]);0==--b&&0===m&&T()}(e,r),t&&t(e,r)};var r,o=!0,n="f25ad5f609a800f54875",i=1e4,a={},s=[],l=[];function p(e){var t=S[e];if(!t)return j;var o=function(o){return t.hot.active?(S[o]?-1===S[o].parents.indexOf(e)&&S[o].parents.push(e):(s=[e],r=o),-1===t.children.indexOf(o)&&t.children.push(o)):(console.warn("[HMR] unexpected require("+o+") from disposed module "+e),s=[]),j(o)},n=function(e){return{configurable:!0,enumerable:!0,get:function(){return j[e]},set:function(t){j[e]=t}}};for(var i in j)Object.prototype.hasOwnProperty.call(j,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(o,i,n(i));return o.e=function(e){return"ready"===u&&d("prepare"),m++,j.e(e).then(t,function(e){throw t(),e});function t(){m--,"prepare"===u&&(x[e]||N(e),0===m&&0===b&&T())}},o.t=function(e,t){return 1&t&&(e=o(e)),j.t(e,-2&t)},o}var c=[],u="idle";function d(e){u=e;for(var t=0;t<c.length;t++)c[t].call(null,e)}var f,h,g,b=0,m=0,x={},y={},v={};function w(e){return+e+""===e?+e:e}function E(e){if("idle"!==u)throw new Error("check() is only allowed in idle status");return o=e,d("check"),function(e){return e=e||1e4,new Promise(function(t,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var o=new XMLHttpRequest,i=j.p+""+n+".hot-update.json";o.open("GET",i,!0),o.timeout=e,o.send(null)}catch(e){return r(e)}o.onreadystatechange=function(){if(4===o.readyState)if(0===o.status)r(new Error("Manifest request to "+i+" timed out."));else if(404===o.status)t();else if(200!==o.status&&304!==o.status)r(new Error("Manifest request to "+i+" failed."));else{try{var e=JSON.parse(o.responseText)}catch(e){return void r(e)}t(e)}}})}(i).then(function(e){if(!e)return d("idle"),null;y={},x={},v=e.c,g=e.h,d("prepare");var t=new Promise(function(e,t){f={resolve:e,reject:t}});h={};return N(0),"prepare"===u&&0===m&&0===b&&T(),t})}function N(e){v[e]?(y[e]=!0,b++,function(e){var t=document.getElementsByTagName("head")[0],r=document.createElement("script");r.charset="utf-8",r.src=j.p+""+e+"."+n+".hot-update.js",t.appendChild(r)}(e)):x[e]=!0}function T(){d("ready");var e=f;if(f=null,e)if(o)Promise.resolve().then(function(){return k(o)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var r in h)Object.prototype.hasOwnProperty.call(h,r)&&t.push(w(r));e.resolve(t)}}function k(t){if("ready"!==u)throw new Error("apply() is only allowed in ready status");var r,o,i,l,p;function c(e){for(var t=[e],r={},o=t.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var n=o.pop(),i=n.id,a=n.chain;if((l=S[i])&&!l.hot._selfAccepted){if(l.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(l.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var s=0;s<l.parents.length;s++){var p=l.parents[s],c=S[p];if(c){if(c.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([p]),moduleId:i,parentId:p};-1===t.indexOf(p)&&(c.hot._acceptedDependencies[i]?(r[p]||(r[p]=[]),f(r[p],[i])):(delete r[p],t.push(p),o.push({chain:a.concat([p]),id:p})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function f(e,t){for(var r=0;r<t.length;r++){var o=t[r];-1===e.indexOf(o)&&e.push(o)}}t=t||{};var b={},m=[],x={},y=function(){console.warn("[HMR] unexpected require("+N.moduleId+") to disposed module")};for(var E in h)if(Object.prototype.hasOwnProperty.call(h,E)){var N;p=w(E);var T=!1,k=!1,C=!1,_="";switch((N=h[E]?c(p):{type:"disposed",moduleId:E}).chain&&(_="\nUpdate propagation: "+N.chain.join(" -> ")),N.type){case"self-declined":t.onDeclined&&t.onDeclined(N),t.ignoreDeclined||(T=new Error("Aborted because of self decline: "+N.moduleId+_));break;case"declined":t.onDeclined&&t.onDeclined(N),t.ignoreDeclined||(T=new Error("Aborted because of declined dependency: "+N.moduleId+" in "+N.parentId+_));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(N),t.ignoreUnaccepted||(T=new Error("Aborted because "+p+" is not accepted"+_));break;case"accepted":t.onAccepted&&t.onAccepted(N),k=!0;break;case"disposed":t.onDisposed&&t.onDisposed(N),C=!0;break;default:throw new Error("Unexception type "+N.type)}if(T)return d("abort"),Promise.reject(T);if(k)for(p in x[p]=h[p],f(m,N.outdatedModules),N.outdatedDependencies)Object.prototype.hasOwnProperty.call(N.outdatedDependencies,p)&&(b[p]||(b[p]=[]),f(b[p],N.outdatedDependencies[p]));C&&(f(m,[N.moduleId]),x[p]=y)}var O,A=[];for(o=0;o<m.length;o++)p=m[o],S[p]&&S[p].hot._selfAccepted&&A.push({module:p,errorHandler:S[p].hot._selfAccepted});d("dispose"),Object.keys(v).forEach(function(e){!1===v[e]&&function(e){delete installedChunks[e]}(e)});for(var P,D,M=m.slice();M.length>0;)if(p=M.pop(),l=S[p]){var H={},z=l.hot._disposeHandlers;for(i=0;i<z.length;i++)(r=z[i])(H);for(a[p]=H,l.hot.active=!1,delete S[p],delete b[p],i=0;i<l.children.length;i++){var $=S[l.children[i]];$&&((O=$.parents.indexOf(p))>=0&&$.parents.splice(O,1))}}for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(l=S[p]))for(D=b[p],i=0;i<D.length;i++)P=D[i],(O=l.children.indexOf(P))>=0&&l.children.splice(O,1);for(p in d("apply"),n=g,x)Object.prototype.hasOwnProperty.call(x,p)&&(e[p]=x[p]);var I=null;for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(l=S[p])){D=b[p];var R=[];for(o=0;o<D.length;o++)if(P=D[o],r=l.hot._acceptedDependencies[P]){if(-1!==R.indexOf(r))continue;R.push(r)}for(o=0;o<R.length;o++){r=R[o];try{r(D)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:p,dependencyId:D[o],error:e}),t.ignoreErrored||I||(I=e)}}}for(o=0;o<A.length;o++){var B=A[o];p=B.module,s=[p];try{j(p)}catch(e){if("function"==typeof B.errorHandler)try{B.errorHandler(e)}catch(r){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:p,error:r,originalError:e}),t.ignoreErrored||I||(I=r),I||(I=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:p,error:e}),t.ignoreErrored||I||(I=e)}}return I?(d("fail"),Promise.reject(I)):(d("idle"),new Promise(function(e){e(m)}))}var S={};function j(t){if(S[t])return S[t].exports;var o=S[t]={i:t,l:!1,exports:{},hot:function(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:r!==e,active:!0,accept:function(e,r){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var o=0;o<e.length;o++)t._acceptedDependencies[e[o]]=r||function(){};else t._acceptedDependencies[e]=r||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._declinedDependencies[e[r]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=t._disposeHandlers.indexOf(e);r>=0&&t._disposeHandlers.splice(r,1)},check:E,apply:k,status:function(e){if(!e)return u;c.push(e)},addStatusHandler:function(e){c.push(e)},removeStatusHandler:function(e){var t=c.indexOf(e);t>=0&&c.splice(t,1)},data:a[e]};return r=void 0,t}(t),parents:(l=s,s=[],l),children:[]};return e[t].call(o.exports,o,o.exports,p(t)),o.l=!0,o.exports}j.m=e,j.c=S,j.d=function(e,t,r){j.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},j.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},j.t=function(e,t){if(1&t&&(e=j(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(j.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)j.d(r,o,function(t){return e[t]}.bind(null,o));return r},j.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return j.d(t,"a",t),t},j.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},j.p="/assets",j.h=function(){return n},p(14)(j.s=14)}([function(e,t,r){"use strict";const o=e=>"object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName,n=e=>e&&"object"==typeof e,i=e=>"number"==typeof e,a=(e,t,r)=>{for(let r in t){const o=t[r];e.setAttribute(r,o)}for(let t=0;t<r.length;t++){const n=r[t];o(n)?e.appendChild(n):e.textContent=n+""}},s=(e=[])=>{const t={};for(let r=0;r<e.length;r++){const{name:o,value:n}=e[r];t[o]=n}return t};e.exports={toArray:e=>Array.prototype.slice.call(e),isNode:o,isObject:n,likeArray:e=>n(e)&&i(e.length)&&e.length>=0,bind:(e,t)=>(...r)=>e.apply(t,r),isString:e=>"string"==typeof e,isNumber:i,isBool:e=>"boolean"==typeof e,isFunction:e=>"function"==typeof e,set:(e,t="",r)=>{let o=(t=t.trim())?t.split("."):[],i=e;if(n(i)&&o.length){for(let e=0;e<o.length-1;e++){let t=o[e],r=i[t];n(r)||(r={},i[t]=r),i=r}return i[o[o.length-1]]=r,e}},createElement:(e,t,r)=>{const o=document.createElement(e);return a(o,t,r),o},createSvgElement:(e,t,r)=>{const o=document.createElementNS("http://www.w3.org/2000/svg",e);return a(o,t,r),o},getAttributeMap:s,removeNode:e=>{let t=e.parentNode;t&&t.removeChild(e)},hasOwnProperty:(e,t)=>{if(e.hasOwnProperty)return e.hasOwnProperty(t);for(const r in e)if(r===t)return!0;return!1},emptyChildren:e=>{const t=e.childNodes;for(let r=0,o=t.length;r<o;r++)e.removeChild(t[r])},getTagName:e=>e.tagName.toUpperCase(),getAttrMap:e=>o(e)?s(e.attributes):e.attrMap,getTextAreaTextContent:e=>o(e)?e.textContent:e.childNodes.length&&e.childNodes[0]||"",getAttributeValue:(e,t)=>o(e)?e.getAttribute(t):e.attrMap[t]}},function(e,t,r){const{view:o,parseArgs:n,n:i}=r(8),a=r(12),{get:s,set:l,isObject:p}=r(13),c=r(26)(),u=()=>{},d=(e,t)=>{for(let r in t)null!==t[r]&&void 0!==t[r]&&(null===e[r]||void 0===e[r]?e[r]=t[r]:"object"==typeof e[r]&&"object"==typeof t[r]&&(e[r]=d(e[r],t[r])));return e};e.exports=((e,{id:t=a(),defaultProps:r}={})=>{if("function"!=typeof e)throw new Error(`Expect function for glare view render, but got ${e}`);return o((o,a)=>(o.onChange=o.onChange||u,o.onEvent=o.onEvent||u,o.theme=o.theme||c,d(o.props,r),d(o.props,{style:o.theme[t]}),o.n=((...e)=>{const{tagName:t,attributes:r,childs:o}=n(e);return"function"==typeof t?t({props:r.props||{},onChange:r.onChange,onEvent:r.onEvent,theme:r.theme,children:o}):i(t,r,o)}),o.bn=((e,{propsPath:t,onChildChange:r,onChildEvent:n,doUpdate:i=!1},c)=>{let u=s(o.props,t);return p(u)||(u={},l(o.props,t,u)),e({props:u,onChange:(e,n)=>{l(o.props,t,e),r&&r(e,n),i&&a.update(),o.onChange(o.props,n)},onEvent:e=>{n&&n(e),o.onEvent(e)},theme:o.theme,children:c})}),e(o,a)))})},function(e,t,r){const{isObject:o,isNode:n}=r(0),i=r(17),a=r(9),s=e=>o(e)&&"kabanery_node"===e.type,l=e=>(...t)=>p(e,t),p=(e,t)=>{let{tagName:r,attributes:o,childs:a}=i(t);(s(o)||n(o))&&(a=[o],o={});const{attrMap:l,eventMap:p}=c(o);return{tagName:r,attrMap:l,eventMap:p,elementType:e,type:"kabanery_node",childNodes:a}},c=e=>{const t={},r={};for(const o in e){const n=e[o];0===o.indexOf("on")?r[o.substring(2)]=n:t[o]=n}return{attrMap:t,eventMap:r}};e.exports={n:l("html"),svgn:l("svg"),knodeCreator:l,isKabaneryNode:s,parseArgs:i,parseStyle:a}},function(e,t,r){"use strict";let o=e=>!!(e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0),n=e=>!(!e||"object"!=typeof e),i=e=>"function"==typeof e,a=(e,t)=>{if(!o(e))throw new TypeError(s(e,"list"));if(!i(t))throw new TypeError(s(t,"function"));for(let r=0;r<e.length;r++)if(!t(e[r]))return!1;return!0},s=(e,t)=>`Expect ${t} type, but got type ${typeof e}, and value is ${e}`;e.exports={isArray:e=>Array.isArray(e),likeArray:o,isString:e=>"string"==typeof e,isObject:n,isFunction:i,isNumber:e=>"number"==typeof e&&!isNaN(e),isBool:e=>"boolean"==typeof e,isNode:e=>"object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName,isPromise:e=>e&&"object"==typeof e&&"function"==typeof e.then&&"function"==typeof e.catch,isNull:e=>null===e,isUndefined:e=>void 0===e,isFalsy:e=>!e,isRegExp:e=>e instanceof RegExp,isReadableStream:e=>n(e)&&i(e.on)&&i(e.pipe),isWritableStream:e=>n(e)&&i(e.on)&&i(e.write),funType:(e,t=[])=>{if(!i(e))throw new TypeError(s(e,"function"));if(!o(t))throw new TypeError(s(t,"array"));for(let e=0;e<t.length;e++){let r=t[e];if(r&&!i(r))throw new TypeError(s(r,"function"))}return function(){for(let r=0;r<t.length;r++){let o=t[r],n=arguments[r];if(o&&!o(n))throw new TypeError(`Argument type error. Arguments order ${r}. Argument is ${n}. function is ${e}, args are ${arguments}.`)}return e.apply(this,arguments)}},any:a,exist:(e,t)=>{if(!o(e))throw new TypeError(s(e,"array"));if(!i(t))throw new TypeError(s(t,"function"));for(let r=0;r<e.length;r++)if(t(e[r]))return!0;return!1},and:(...e)=>{if(!a(e,i))throw new TypeError("The argument of and must be function.");return t=>{for(let r=0;r<e.length;r++)if(!(0,e[r])(t))return!1;return!0}},or:(...e)=>{if(!a(e,i))throw new TypeError("The argument of and must be function.");return t=>{for(let r=0;r<e.length;r++)if((0,e[r])(t))return!0;return!1}},not:e=>{if(!i(e))throw new TypeError("The argument of and must be function.");return t=>!e(t)},mapType:e=>{if(!n(e))throw new TypeError(s(e,"obj"));for(let t in e){let r=e[t];if(!i(r))throw new TypeError(s(r,"function"))}return t=>{if(!n(t))return!1;for(let r in e)if(!(0,e[r])(t[r]))return!1;return!0}},listType:e=>{if(!i(e))throw new TypeError(s(e,"function"));return t=>a(t,e)},truth:()=>!0}},function(e,t,r){"use strict";let{isObject:o,funType:n,or:i,isString:a,isFalsy:s,likeArray:l}=r(3),p=r(10),{map:c,reduce:u,find:d,findIndex:f,forEach:h,filter:g,any:b,exist:m,compact:x}=r(19),y=(e,t,r)=>-1!==f(e,t,r),v=(e,t,r)=>(e[r]=t,e),w=(e,t,r=[])=>u(e,(e,r)=>(y(e,r,t)||e.push(r),e),r),E=n((e,t="")=>{let r=(t=t.trim())?t.split("."):[];return u(r,N,e,T)},[o,i(a,s)]),N=(e,t)=>e[t],T=e=>!e,k=e=>l(e)&&!a(e)?u(e,(e,t)=>e=e.concat(k(t)),[]):[e];e.exports={flat:k,contain:y,difference:(e,t,r)=>u(e,(e,o)=>(y(t,o,r)||y(e,o,r)||e.push(o),e),[]),union:(e,t,r)=>w(t,r,w(e,r)),interset:(e,t,r)=>u(e,(e,o)=>(y(t,o,r)&&e.push(o),e),[]),map:c,reduce:u,iterate:p,find:d,findIndex:f,deRepeat:w,forEach:h,filter:g,any:b,exist:m,get:E,delay:e=>new Promise(t=>{setTimeout(t,e)}),mergeMap:(e={},t={})=>u(t,v,u(e,v,{})),compact:x}},function(e,t,r){const{isNode:o,createElement:n,createSvgElement:i}=r(0),{isKabaneryNode:a}=r(2),{bindEvents:s,attachDocument:l}=r(11),{flat:p,forEach:c,map:u}=r(4),d=e=>{if(o(e))return e.outerHTML;if(a(e)){const{tagName:t,attrMap:r,childNodes:o}=e;let n=[];for(const e in r){const t=r[e];n.push(`${e}="${t}"`)}let i=n.join(" ");i=i?" "+i:"";let a=[];for(let e=0,t=o.length;e<t;e++)a.push(d(o[e]));return`<${t}${i}>${a.join("")}</${t}>`}return e+""},f=e=>{if(a(e)){let t=null;return t="html"===e.elementType?n(e.tagName,e.attrMap,u(e.childNodes,f)):i(e.tagName,e.attrMap,u(e.childNodes,f)),e.ctx&&e.ctx.bindNativeNode(t),s(t,e.eventMap),t}return o(e)?e:document.createTextNode(e.toString())},h=e=>{for(;e.parentNode;)e=e.parentNode;return e};e.exports={toDomNode:f,toHTML:d,mount:(e,t)=>{e=p(e),c(e,e=>{e=f(e),o(e)&&t.appendChild(e)}),l(h(t))}}},function(e,t,r){"use strict";const o=r(12)();e.exports={eventMapHook:`__eventMap_${o}`,globalEventTypePrefix:`__event_type_id_${o}_`,stopPropagationFlag:"__stopPropagation"}},function(e,t,r){e.exports=r(15)},function(e,t,r){"use strict";e.exports=r(16)},function(e,t,r){"use strict";const{isString:o,isObject:n}=r(0);e.exports=((e="",{keyWrapper:t,valueWrapper:r}={})=>{if(o(e))return e;if(!n(e))throw new TypeError(`Expect object for style object, but got ${e}`);const s=[];for(let o in e){let n=e[o];o=i(o),n=a(n,o),t&&(o=t(o,n)),r&&(n=r(n,o)),s.push(`${o}: ${n};`)}return s.join("")});const i=e=>e.replace(/[A-Z]/,e=>`-${e.toLowerCase()}`),a=(e,t)=>{if("number"==typeof e&&"z-index"!==t)return e+"px";if("padding"===t||"margin"===t){let t=e.split(" ");for(let e=0;e<t.length;e++){let r=t[e];isNaN(Number(r))||(t[e]=r+"px")}e=t.join(" ")}return e}},function(e,t,r){"use strict";let{likeArray:o,isObject:n,funType:i,isFunction:a,isUndefined:s,or:l,isNumber:p,isFalsy:c,mapType:u}=r(3),d=i((e=[],t={})=>{let{predicate:r,transfer:i,output:a,limit:s,def:l}=t;t.predicate=r||b,t.transfer=i||x,t.output=a||g,void 0===s&&(s=e&&e.length),s=t.limit=h(s);let p=l,c=0;if(o(e))for(let r=0;r<e.length;r++){let o=f(e,r,c,p,t);if(p=o.rets,c=o.count,o.stop)return p}else if(n(e))for(let r in e){let o=f(e,r,c,p,t);if(p=o.rets,c=o.count,o.stop)return p}return p},[l(n,a,c),l(s,u({predicate:l(a,c),transfer:l(a,c),output:l(a,c),limit:l(s,p,a)}))]),f=(e,t,r,o,{predicate:n,transfer:i,output:a,limit:s})=>{let l=e[t];return s(o,l,t,e,r)?{stop:!0,count:r,rets:o}:(n(l)&&(o=a(o,i(l,t,e,o),t,e),r++),{stop:!1,count:r,rets:o})},h=e=>s(e)?m:p(e)?(t,r,o,n,i)=>i>=e:e,g=(e,t)=>(e.push(t),e),b=()=>!0,m=()=>!1,x=e=>e;e.exports=d},function(e,t,r){"use strict";let o=r(23),{eventMapHook:n}=r(6),{listenEventType:i,clearEvents:a,attachDocument:s,dispatchEvent:l}=o();e.exports={bindEvents:(e,t)=>{e[n]=t;for(let e in t)i(e)},attachDocument:s,dispatchEvent:l,clearEvents:a}},function(e,t,r){var o=r(24),n=r(25);e.exports=function(e,t,r){var i=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||o)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var s=0;s<16;++s)t[i+s]=a[s];return t||n(a)}},function(e,t){const r=(e,t)=>{if(null===e||void 0===e)return t;if(null===t||void 0===t)return e;if("object"==typeof e&&"object"==typeof t){const o=Object.assign({},e);for(let e in t)o[e]=r(o[e],t[e]);return o}return t},o=e=>e&&"object"==typeof e;e.exports={mergeDeep:r,set:(e,t="",r)=>{const n=(t=t.trim())?t.split("."):[];let i=e;if(o(i)&&n.length){for(let e=0;e<n.length-1;e++){let t=n[e],r=i[t];o(r)||(r={},i[t]=r),i=r}return i[n[n.length-1]]=r,e}},get:(e,t="")=>{let r=(t=t.trim())?t.split("."):[],n=e;for(let e=0;e<r.length;e++){if(!o(n))return;n=n[r[e]]}return n},isObject:o}},function(e,t,r){"use strict";var o=r(7).glareView,n=r(27),i=r(28).ToolBar,a=r(29),s=r(33),l=r(8).mount,p=r(30).parseConsoleText,c=r(32)(),u=o(function(e,t){var r=e.props,o=e.n,l=e.bn,u=function(e){r.logs.logs.push(e),t.update()},d=function(e){r.logs.logs.push({type:"error",text:e}),t.update()};return o("div",{style:{margin:0,padding:"64 0 0 0",width:"100%",height:"100%"}},[o("div",{style:{position:"fixed",left:0,top:0,width:"100%",zIndex:"100000"}},[l(i,{propsPath:"appTitle"},[])]),o("div",{style:{padding:8,height:"100%"}},[r.showConsole?[o("form",{style:{display:"inline-flex",position:"fixed",width:"100%",height:"100%",backgroundColor:"rgb(255,255,255,0.9)"},onsubmit:function(e){e.preventDefault(),p(r.consoleText.value,c,{printLog:u,printErr:d,props:r,bn:l,ctx:t})}},[o("div",[o(a,">"),l(n,{propsPath:"consoleText"}),l(s,{propsPath:"logs"})])])]:o("span"),r.action&&r.action.actionView?l(r.action.actionView,{propsPath:"action.actionData"}):null])])},{defaultProps:{}})({props:{appTitle:{title:"My Start Page",color:"primary"},showConsole:!0,consoleText:{value:"",placeholder:"start by typing help",style:{box:{width:600}}},action:null,logs:{logs:["hello, welcome!","You can try to type help to see all commands."]}}}),d=function(){u.ctx.update("props.showConsole",!u.ctx.getData().props.showConsole)};document.addEventListener("keypress",function(e){"a"===e.key&&e.ctrlKey&&d()},!0),l(u,document.body)},function(e,t,r){const o=r(1);e.exports={glareView:o}},function(e,t,r){"use strict";const{n:o,svgn:n,parseArgs:i,isKabaneryNode:a,parseStyle:s}=r(2),{view:l}=r(20),{dispatchEvent:p,clearEvents:c}=r(11),{toHTML:u,mount:d}=r(5);e.exports={n:o,isKabaneryNode:a,svgn:n,view:l,mount:d,toHTML:u,parseArgs:i,parseStyle:s,dispatchEvent:p,clearEvents:c}},function(e,t,r){"use strict";const o=r(18),{isString:n,isObject:i,isNode:a,likeArray:s,isNumber:l,isBool:p}=r(0);let c=(e="")=>{if("string"!=typeof e)return[e];let t=e.split(" ")[0],r=e.substring(t.length);return r=r&&r.trim(),t=t.toLowerCase().trim(),r?[t,r]:[t]};const u=e=>{let t=[];if(a(e))t.push(e);else if(s(e))for(let r=0;r<e.length;r++){let o=e[r];t=t.concat(u(o))}else e&&t.push(e);return t};e.exports=((e,{doParseStyle:t=!0}={})=>{let r,d={},f=[],h=e.shift(),g=c(h);g.length>1?(r=g[0],d=g[1]):r=h;let b=e.shift(),m={};return s(b)||n(b)||a(b)||l(b)||p(b)?f=b:i(b)&&(m=b,f=e.shift()||[]),{tagName:r,attributes:d=o(d,m,{doParseStyle:t}),childs:u(f)}})},function(e,t,r){"use strict";let{isString:o}=r(3),n=r(9),{mergeMap:i}=r(4);const a=/([\w-]+)\s*=\s*(([\w-]+)|('.*?')|(".*?"))/;e.exports=((e,t,{doParseStyle:r})=>{if(o(e)){let t=e.trim(),r=[],o=!1;for(;!o;){let e=t.replace(a,(e,t,o)=>(r.push([t,o]),"")).trim();e===t&&(o=!0),t=e}e={};for(let t=0;t<r.length;t++){let[o,n]=r[t];("'"===n[0]&&"'"===n[n.length-1]||'"'===n[0]&&'"'===n[n.length-1])&&(n=n.substring(1,n.length-1)),e[o]=n}}return(e=i(e,t)).style&&r&&(e.style=n(e.style)),e})},function(e,t,r){"use strict";let o=r(10),n={eq:(e,t)=>e===t},i=(e,t,r,n)=>o(e,{output:t,def:r,limit:n}),a=(e,t,r={})=>{((e,t)=>{for(let r in t)e[r]=e[r]||t[r]})(r,n);let{eq:i}=r,a=o(e,{transfer:s,limit:l,predicate:e=>i(t,e),def:[]});return a.length?a[0]:-1},s=(e,t)=>t,l=(e,t,r,o,n)=>n>=1,p=e=>!e,c=e=>!!e;e.exports={map:(e,t,r)=>o(e,{transfer:t,def:[],limit:r}),forEach:(e,t)=>o(e,{limit:e=>!0===e,transfer:t,output:(e,t)=>t,def:!1}),reduce:i,find:(e,t,r)=>{let o=a(e,t,r);if(-1!==o)return e[o]},findIndex:a,filter:(e,t,r)=>i(e,(e,r,o,n)=>(t&&t(r,o,n)&&e.push(r),e),[],r),any:(e,t)=>i(e,(e,r,o,n)=>{let i=t&&t(r,o,n);return e&&c(i)},!0,p),exist:(e,t)=>i(e,(e,r,o,n)=>{let i=t&&t(r,o,n);return e||c(i)},!1,c),compact:e=>i(e,(e,t)=>(t&&e.push(t),e),[])}},function(e,t,r){const{isFunction:o}=r(0),n=r(21),i=r(22),{mount:a}=r(5),s=function(e,t){this.nativeNode=null,this.data=t,this.render=e,this.kNode=null};s.prototype={construct:s,update:function(...e){return n(this.data,e),this.renderNativeView()},appendView:function(e){this.nativeNode&&a(e,this.nativeNode)},renderNativeView:function(){const e=this.getKabaneryNode();return this.nativeNode=i(this.nativeNode,e,this.kNode),this.kNode=e,this.nativeNode},renderKabaneryNode:function(){return this.kNode=this.getKabaneryNode(),this.kNode},getKabaneryNode:function(){const e=this.render(this.data,this.getContext());return o(e)?(this.render=e,this.getKabaneryNode(this.data,this.getContext())):(e.ctx=this.getContext(),e)},getKNode:function(){return this.kNode},getNativeNode:function(){return this.nativeNode},getData:function(){return this.data},getContext:function(){return this._ctx},bindNativeNode:function(e){this.nativeNode=e}};e.exports={view:e=>t=>{return((e,t)=>{const r={},o=new s(e,t);o._ctx=r;for(const e in s.prototype)"construct"!==e&&(r[e]=((...t)=>o[e].apply(o,t)));return r})(e,t).renderKabaneryNode()}}},function(e,t,r){const{set:o,isFunction:n,likeArray:i}=r(0);e.exports=((e,t)=>{if(1===t.length&&i(t[0])){let r=t[0];for(let t=0,n=r.length;t<n;t++){const n=r[t];o(e,n[0],n[1])}}else{let[r,i]=t;n(i)&&(i=i(e)),o(e,r,i)}})},function(e,t,r){"use strict";const{toDomNode:o}=r(5),{removeNode:n,getTagName:i,getTextAreaTextContent:a,getAttributeValue:s,getAttrMap:l,hasOwnProperty:p}=r(0),{eventMapHook:c}=r(6),{isKabaneryNode:u}=r(2),d=(e,t,r)=>{((e,t,r)=>{const o=l(r),n=l(t);for(const t in o){const r=o[t];if(p(n,t)){let o=n[t];o!==r&&e.setAttribute(t,o)}else e.removeAttribute(t)}for(const t in n){const r=n[t];p(o,t)||e.setAttribute(t,r)}})(e,t,r),"TEXTAREA"===i(e)&&(e.value=a(t)),"INPUT"===i(e)&&(e.value=s(t,"value")),e[c]=t.eventMap||{},f(t.childNodes,r.childNodes,e)},f=(e,t,r)=>{const i=r.childNodes,a=t.length,s=e.length;for(let e=s;e<a;e++)i[e]&&n(i[e]);for(let r=0,o=Math.min(s,a);r<o;r++)h(i[r],e[r],t[r]);for(let t=a;t<s;t++)r.appendChild(o(e[t]))},h=(e,t,r)=>u(t)&&u(r)?i(r)!==i(t)?g(e,t):(d(e,t,r),t.ctx&&t.ctx.bindNativeNode(e),e):g(e,t),g=(e,t)=>{const r=e.parentNode,n=o(t);return r.replaceChild(n,e),n};e.exports=((e,t,r)=>e?t?h(e,t,r):(n(e),null):o(t))},function(e,t,r){"use strict";let{contain:o}=r(4),{eventMapHook:n,globalEventTypePrefix:i,stopPropagationFlag:a}=r(6);e.exports=(()=>{let e=[],t={},r={},i=t=>{e.length||e.push(document);for(let r=0;r<e.length;r++){let o=e[r];p(o,t)}},p=(e,t)=>{let o=null;r[t]?o=r[t]:(o=u(t),r[t]=o),e.addEventListener(t,o)},c=o=>{let n=r[o];if(n){for(let t=0;t<e.length;t++){e[t].removeEventListener(o,n)}delete r[o],delete t[o]}},u=e=>(function(t){let r=this,o=t.target,n=t.stopPropagation;t.stopPropagation=function(...e){return t[a]=!0,n&&n.apply(this,e)};let i=s(o);for(let o=0;o<i.length;o++){let n=i[o];d(t,e,n,r)}}),d=(e,t,r,o)=>{if(e.__stopPropagation)return!0;let n=f(t,r);return n&&n.apply(o,[e])},f=(e,t)=>{let r=t&&t[n];return r&&r[e]};return{listenEventType:e=>{t[e]||i(e),t[e]=!0},clearEvents:()=>{for(let e in t)c(e)},removeListenerType:c,getDocs:()=>e.slice(0),attachDocument:(r=document)=>{if(!o(e,r)){for(let e in t){let t=l(e);r[t]||(p(r,e),r[t]=!0)}e.push(r)}},dispatchEvent:(e,t)=>{let o=r[e];o&&o(t)}}});let s=e=>{let t=[];for(;e;)t.push(e),e=e.parentNode;return t},l=e=>`${i}${e}`},function(e,t){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var o=new Uint8Array(16);e.exports=function(){return r(o),o}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},function(e,t){for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);e.exports=function(e,t){var o=t||0,n=r;return[n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]]].join("")}},function(e,t,r){const{mergeDeep:o}=r(13);e.exports=((e={box:{margin:0},font:{size:{normal:"1rem",small:"0.75rem"},color:{placeholder:"rgba(0, 0, 0, 0.54)",normal:"rgba(0, 0, 0, 0.87)"}},line:{color:{normal:"rgba(0, 0, 0, 0.42)",hover:"rgb(31,31,31)",light:"#1976d2"}}})=>{const t={normal:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",outline:0},hover:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",textDecoration:"none",outline:0},active:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",textDecoration:"none",outline:0}},r={width:22,height:22,top:-11,right:-11,display:"flex",zIndex:1,position:"absolute",flexWrap:"wrap",fontSize:"0.75rem",alignItems:"center",borderRadius:"50%",alignContent:"center",flexDirection:"row",justifyContent:"center"},n={margin:"0 12px 0 0",padding:0,width:18,height:"100%",borderRadius:2,position:"relative",boxSizing:"border-box"};return{TextField:{box:{display:"inline-flex",position:"relative",width:200,height:48,cursor:"text",margin:e.box.margin,padding:0,boxSizing:"border-box"},placeholder:{place:{position:"absolute",left:0,fontSize:e.font.size.normal,color:e.font.color.placeholder,cursor:"text",transform:"translate(0, 24px) scale(1)",transition:"color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},active:{position:"absolute",top:0,left:0,fontSize:e.font.size.normal,color:e.line.color.light,transform:"translate(0, 1.5px) scale(0.75)",transition:"color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},placeContent:{position:"absolute",top:0,left:0,transform:"translate(0, 1.5px) scale(0.75)",fontSize:e.font.size.normal,color:e.font.color.placeholder,cursor:"text"}},input:{width:"100%",height:30,position:"absolute",bottom:0,left:0,margin:0,padding:"0 6px 0 6px",border:"none",borderBottom:`1px solid ${e.line.color.normal}`,fontSize:e.font.size.normal,outline:"none",boxSizing:"border-box"},hover:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.hover}`},focus:{active:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.light}`,transition:"transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},unactive:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.light}`,transform:"scaleX(0)",transition:"transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"}}},Button:{box:{text:{default:o(t,{normal:{color:e.font.color.normal,backgroundColor:"transparent"},hover:{color:e.font.color.normal,backgroundColor:"rgba(0, 0, 0, 0.08)"},active:{color:e.font.color.normal,backgroundColor:"rgba(0, 0, 0, 0.3)"}}),primary:o(t,{normal:{color:"#2196f3",backgroundColor:"transparent"},hover:{color:"#2196f3",backgroundColor:"rgba(33, 150, 243, 0.08)"},active:{color:"#2196f3",backgroundColor:"rgba(33, 150, 243, 0.3)"}}),secondary:o(t,{normal:{color:"rgb(225, 0, 80)"},hover:{color:"rgb(225, 0, 80)",backgroundColor:"rgba(225, 0, 80, 0.08)"},active:{color:"rgb(225, 0, 80)",backgroundColor:"rgba(225, 0, 80, 0.3)"}})},contained:{default:o(t,{normal:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#e0e0e0"},hover:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#d5d5d5"},active:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#e0e0e0"}}),primary:o(t,{normal:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#2196f3"},hover:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#1976d2"},active:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#2196f3"}}),secondary:o(t,{normal:{border:0,color:"#fff",backgroundColor:"rgb(225, 0, 80)",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"},hover:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"rgb(157, 0, 56)"},active:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"rgb(225, 0, 80)"}})}}},Divider:{height:1,margin:0,padding:0,border:"none",flexShrink:0,backgroundColor:"rgba(0, 0, 0, 0.12)"},Badge:{box:{display:"inline-flex",position:"relative",verticalAlign:"middle"},badge:{primary:Object.assign({color:"#fff",backgroundColor:"#2196f3"},r),secondary:Object.assign({color:"#fff",backgroundColor:"rgb(225, 0, 80)"},r)}},Checkbox:{box:{margin:0,padding:0,position:"relative",display:"inline-flex",cursor:"pointer",alignItems:"center",verticalAlign:"middle",height:18,lineHeight:18},checkbox:{default:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid rgba(0, 0, 0, 0)",backgroundColor:"rgba(0, 0, 0, 0.54)"},n)},primary:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid #2196f3",backgroundColor:"#2196f3"},n)},secondary:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid rgb(225, 0, 80)",backgroundColor:"rgb(225, 0, 80)"},n)}},label:{color:e.font.color.normal,fontSize:"0.875rem",fontWeight:"400",lineHeight:"1.5",letterSpacing:"0.01071em"}},Text:{default:{color:e.font.color.normal},h2:{color:e.font.color.normal,fontSize:"2.125rem",fontWeight:"400",lineHeight:"1.17",letterSpacing:"0.00735em",margin:0,padding:"32px 0 24px",display:"inline-flex"}},Br:{},ToolBar:{box:{boxShadow:"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",minHeight:64,boxSizing:"border-box",paddingLeft:24,paddingRight:24,display:"flex",alignItems:"center"},toolBar:{primary:{backgroundColor:"#2196f3",color:"white"},default:{backgroundColor:"#f5f5f5",color:"rgba(0, 0, 0, 0.87)"}},title:{flexGrow:"1",fontSize:"1.25rem",fontWeight:"500",lineHeight:1.6,letterSpacing:"0.0075em"}},ToolBarLeft:{primary:{marginRight:12},default:{marginRight:12}},ToolBarRight:{primary:{marginLeft:12},default:{marginLeft:12}}}})},function(e,t,r){const o=r(1);e.exports=o(({props:e,onChange:t,onEvent:r,n:o},n)=>o("div",{style:e.style.box,onclick:e=>{r({type:"click",sourceEvent:e}),n.update("props.activeStatus","focused")},onfocusin:e=>{r({type:"focusin",sourceEvent:e}),n.update("props.activeStatus","focused")},onfocusout:e=>{r({type:"focusout",sourceEvent:e}),n.update("props.activeStatus","unfocused")},onmouseover:t=>{r({type:"mouseover",sourceEvent:t}),"unfocused"===e.activeStatus&&n.update("props.activeStatus","hover")},onmouseout:t=>{r({type:"mouseout",sourceEvent:t}),"hover"===e.activeStatus&&n.update("props.activeStatus","unfocused")}},[o("input",{style:e.style.input,value:e.value,type:e.type,oninput:o=>{o.target.value!==e.value&&(e.value=o.target.value,t(e,n,o)),r({type:"input",sourceEvent:o})}}),o("label",{style:"focused"===e.activeStatus?e.style.placeholder.active:""!==e.value?e.style.placeholder.placeContent:e.style.placeholder.place},`${e.placeholder}`),o("div",{style:"hover"===e.activeStatus?e.style.hover:""}),o("div",{style:"focused"===e.activeStatus?e.style.focus.active:e.style.focus.unactive})]),{id:"TextField",defaultProps:{placeholder:"",value:"",type:"text",activeStatus:"unfocused"}})},function(e,t,r){const o=r(1),n=o(({props:e,n:t,children:r})=>t("div",{style:Object.assign({},e.style.box,e.style.toolBar[e.color])},[r[0],t("span",{style:e.style.title},e.title),r[1]]),{id:"ToolBar",defaultProps:{color:"default",title:""}}),i=o(({props:e,n:t,children:r})=>t("span",{style:e.style[e.color]},r),{id:"ToolBarLeft",defaultProps:{color:"default"}}),a=o(({props:e,n:t,children:r})=>t("span",{style:e.style[e.color]},r),{id:"ToolBarRight",defaultProps:{color:"default"}});e.exports={ToolBar:n,ToolBarLeft:i,ToolBarRight:a}},function(e,t,r){const o=r(1);e.exports=o(({props:e,n:t,children:r})=>{if("default"===e.type)return t("span",{style:e.style[e.type]},r);if("h2"===e.type)return t("h2",{style:e.style[e.type]},r);throw new Error(`unexpect Text type ${e.type}`)},{id:"Text",defaultProps:{type:"default"}})},function(e,t,r){"use strict";var o=function(e){for(var t=[],r="",o=!1,n=!1,i=0;i<e.length;i++){var a=e[i];n?(r+=a,n=!1):"\\"===a?n=!0:'"'===a?(o&&(r.length&&t.push(r),r=""),o=!o):!o&&/\s/.test(a)?(r.length&&t.push(r),r=""):r+=a}return r.length&&t.push(r),t};e.exports={parseConsoleText:function(e,t,r){e=e.trim();var n=o(e),i=n[0],a=n.slice(1);if(r.printLog("> command "+i),t.hasOwnProperty(i)){r.ctx.update("props.consoleText.value","");try{var s,l=(s=t[i]).fn.apply(s,[r].concat(function(e){if(Array.isArray(e)){for(var t=0,r=Array(e.length);t<e.length;t++)r[t]=e[t];return r}return Array.from(e)}(a)));r.ctx.update("props.action",l)}catch(e){r.printErr("Fail to execute command "+i+", error message is '"+e.message+"'.")}}else r.printErr("Can't find command "+i)},textToArgs:o}},function(e,t,r){"use strict";var o=r(7).glareView;e.exports=o(function(e){var t=e.props;return(0,e.n)("iframe",{src:t.url,allow:t.allow,style:t.style})},{defaultProps:{url:"",allow:"encrypted-media;camera;microphone;fullscreen;",style:{margin:0,padding:0,border:"1px solid #999999",width:"100%",height:"100%"}}})},function(module,exports,__webpack_require__){"use strict";var Frame=__webpack_require__(31),toolsites=[{name:"youtube",url:"https://www.youtube.com/"},{name:"netflix",url:"https://www.netflix.com/browse"},{name:"facebook messager",url:"https://www.messenger.com/t/kinolee97"},{name:"translator",url:"https://translate.google.com/"},{name:"scala api",url:"https://www.scala-lang.org/files/archive/api/current/"},{name:"nodejs doc",url:"https://nodejs.org/dist/latest-v10.x/docs/api/"},{name:"MDN",url:"https://developer.mozilla.org/en-US/"},{name:"js console",url:"https://jsconsole.com/"},{name:"skype",url:"https://web.skype.com/en/"},{name:"leetcode",url:"https://leetcode.com/problemset/all/"}];module.exports=function(){var sandbox={toolsites:{helpText:"fast forward to shortcuts of some web sites",fn:function(e,t){return{actionView:Frame,actionData:{url:toolsites[t].url}}}},js:{helpText:"run js code on this page",fn:function fn(env){for(var _len=arguments.length,args=Array(_len>1?_len-1:0),_key=1;_key<_len;_key++)args[_key-1]=arguments[_key];env.printLog(eval(args.join(" "))+"")}},url:{helpText:"navigate to a page",fn:function(e,t){return{actionView:Frame,actionData:{url:t}}}},help:{helpText:"show usages of all commands",fn:function(e,t){var r=[];for(var o in sandbox)t!==o&&t||r.push(o+": "+sandbox[o].helpText);e.printLog(r.join("\n"))}}};return sandbox}},function(e,t,r){"use strict";var o=r(7).glareView;e.exports=o(function(e){var t=e.props,r=e.n;return r("ul",{style:t.style.box},t.logs.map(function(e){return"string"==typeof e?r("pre",{style:t.style.item},[e]):e&&"error"===e.type?r("pre",{style:t.style.errorItem},[e.text]):void 0}))},{defaultProps:{logs:[],style:{box:{margin:0,padding:8,"list-style-type":"none"},item:{margin:0,padding:0},errorItem:{margin:0,padding:0,color:"red"}}}})}]);
//# sourceMappingURL=app.js.map