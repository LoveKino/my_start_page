!function(e){var t=window.webpackHotUpdate;window.webpackHotUpdate=function(e,r){!function(e,t){if(!v[e]||!y[e])return;for(var r in y[e]=!1,t)Object.prototype.hasOwnProperty.call(t,r)&&(h[r]=t[r]);0==--b&&0===m&&S()}(e,r),t&&t(e,r)};var r,o=!0,n="7ecbffcf48e45021113f",i=1e4,a={},l=[],s=[];function p(e){var t=k[e];if(!t)return j;var o=function(o){return t.hot.active?(k[o]?-1===k[o].parents.indexOf(e)&&k[o].parents.push(e):(l=[e],r=o),-1===t.children.indexOf(o)&&t.children.push(o)):(console.warn("[HMR] unexpected require("+o+") from disposed module "+e),l=[]),j(o)},n=function(e){return{configurable:!0,enumerable:!0,get:function(){return j[e]},set:function(t){j[e]=t}}};for(var i in j)Object.prototype.hasOwnProperty.call(j,i)&&"e"!==i&&"t"!==i&&Object.defineProperty(o,i,n(i));return o.e=function(e){return"ready"===d&&u("prepare"),m++,j.e(e).then(t,function(e){throw t(),e});function t(){m--,"prepare"===d&&(x[e]||E(e),0===m&&0===b&&S())}},o.t=function(e,t){return 1&t&&(e=o(e)),j.t(e,-2&t)},o}var c=[],d="idle";function u(e){d=e;for(var t=0;t<c.length;t++)c[t].call(null,e)}var f,h,g,b=0,m=0,x={},y={},v={};function w(e){return+e+""===e?+e:e}function N(e){if("idle"!==d)throw new Error("check() is only allowed in idle status");return o=e,u("check"),function(e){return e=e||1e4,new Promise(function(t,r){if("undefined"==typeof XMLHttpRequest)return r(new Error("No browser support"));try{var o=new XMLHttpRequest,i=j.p+""+n+".hot-update.json";o.open("GET",i,!0),o.timeout=e,o.send(null)}catch(e){return r(e)}o.onreadystatechange=function(){if(4===o.readyState)if(0===o.status)r(new Error("Manifest request to "+i+" timed out."));else if(404===o.status)t();else if(200!==o.status&&304!==o.status)r(new Error("Manifest request to "+i+" failed."));else{try{var e=JSON.parse(o.responseText)}catch(e){return void r(e)}t(e)}}})}(i).then(function(e){if(!e)return u("idle"),null;y={},x={},v=e.c,g=e.h,u("prepare");var t=new Promise(function(e,t){f={resolve:e,reject:t}});h={};return E(0),"prepare"===d&&0===m&&0===b&&S(),t})}function E(e){v[e]?(y[e]=!0,b++,function(e){var t=document.getElementsByTagName("head")[0],r=document.createElement("script");r.charset="utf-8",r.src=j.p+""+e+"."+n+".hot-update.js",t.appendChild(r)}(e)):x[e]=!0}function S(){u("ready");var e=f;if(f=null,e)if(o)Promise.resolve().then(function(){return T(o)}).then(function(t){e.resolve(t)},function(t){e.reject(t)});else{var t=[];for(var r in h)Object.prototype.hasOwnProperty.call(h,r)&&t.push(w(r));e.resolve(t)}}function T(t){if("ready"!==d)throw new Error("apply() is only allowed in ready status");var r,o,i,s,p;function c(e){for(var t=[e],r={},o=t.slice().map(function(e){return{chain:[e],id:e}});o.length>0;){var n=o.pop(),i=n.id,a=n.chain;if((s=k[i])&&!s.hot._selfAccepted){if(s.hot._selfDeclined)return{type:"self-declined",chain:a,moduleId:i};if(s.hot._main)return{type:"unaccepted",chain:a,moduleId:i};for(var l=0;l<s.parents.length;l++){var p=s.parents[l],c=k[p];if(c){if(c.hot._declinedDependencies[i])return{type:"declined",chain:a.concat([p]),moduleId:i,parentId:p};-1===t.indexOf(p)&&(c.hot._acceptedDependencies[i]?(r[p]||(r[p]=[]),f(r[p],[i])):(delete r[p],t.push(p),o.push({chain:a.concat([p]),id:p})))}}}}return{type:"accepted",moduleId:e,outdatedModules:t,outdatedDependencies:r}}function f(e,t){for(var r=0;r<t.length;r++){var o=t[r];-1===e.indexOf(o)&&e.push(o)}}t=t||{};var b={},m=[],x={},y=function(){console.warn("[HMR] unexpected require("+E.moduleId+") to disposed module")};for(var N in h)if(Object.prototype.hasOwnProperty.call(h,N)){var E;p=w(N);var S=!1,T=!1,C=!1,O="";switch((E=h[N]?c(p):{type:"disposed",moduleId:N}).chain&&(O="\nUpdate propagation: "+E.chain.join(" -> ")),E.type){case"self-declined":t.onDeclined&&t.onDeclined(E),t.ignoreDeclined||(S=new Error("Aborted because of self decline: "+E.moduleId+O));break;case"declined":t.onDeclined&&t.onDeclined(E),t.ignoreDeclined||(S=new Error("Aborted because of declined dependency: "+E.moduleId+" in "+E.parentId+O));break;case"unaccepted":t.onUnaccepted&&t.onUnaccepted(E),t.ignoreUnaccepted||(S=new Error("Aborted because "+p+" is not accepted"+O));break;case"accepted":t.onAccepted&&t.onAccepted(E),T=!0;break;case"disposed":t.onDisposed&&t.onDisposed(E),C=!0;break;default:throw new Error("Unexception type "+E.type)}if(S)return u("abort"),Promise.reject(S);if(T)for(p in x[p]=h[p],f(m,E.outdatedModules),E.outdatedDependencies)Object.prototype.hasOwnProperty.call(E.outdatedDependencies,p)&&(b[p]||(b[p]=[]),f(b[p],E.outdatedDependencies[p]));C&&(f(m,[E.moduleId]),x[p]=y)}var P,A=[];for(o=0;o<m.length;o++)p=m[o],k[p]&&k[p].hot._selfAccepted&&A.push({module:p,errorHandler:k[p].hot._selfAccepted});u("dispose"),Object.keys(v).forEach(function(e){!1===v[e]&&function(e){delete installedChunks[e]}(e)});for(var _,M,D=m.slice();D.length>0;)if(p=D.pop(),s=k[p]){var H={},z=s.hot._disposeHandlers;for(i=0;i<z.length;i++)(r=z[i])(H);for(a[p]=H,s.hot.active=!1,delete k[p],delete b[p],i=0;i<s.children.length;i++){var $=k[s.children[i]];$&&((P=$.parents.indexOf(p))>=0&&$.parents.splice(P,1))}}for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(s=k[p]))for(M=b[p],i=0;i<M.length;i++)_=M[i],(P=s.children.indexOf(_))>=0&&s.children.splice(P,1);for(p in u("apply"),n=g,x)Object.prototype.hasOwnProperty.call(x,p)&&(e[p]=x[p]);var R=null;for(p in b)if(Object.prototype.hasOwnProperty.call(b,p)&&(s=k[p])){M=b[p];var B=[];for(o=0;o<M.length;o++)if(_=M[o],r=s.hot._acceptedDependencies[_]){if(-1!==B.indexOf(r))continue;B.push(r)}for(o=0;o<B.length;o++){r=B[o];try{r(M)}catch(e){t.onErrored&&t.onErrored({type:"accept-errored",moduleId:p,dependencyId:M[o],error:e}),t.ignoreErrored||R||(R=e)}}}for(o=0;o<A.length;o++){var I=A[o];p=I.module,l=[p];try{j(p)}catch(e){if("function"==typeof I.errorHandler)try{I.errorHandler(e)}catch(r){t.onErrored&&t.onErrored({type:"self-accept-error-handler-errored",moduleId:p,error:r,originalError:e}),t.ignoreErrored||R||(R=r),R||(R=e)}else t.onErrored&&t.onErrored({type:"self-accept-errored",moduleId:p,error:e}),t.ignoreErrored||R||(R=e)}}return R?(u("fail"),Promise.reject(R)):(u("idle"),new Promise(function(e){e(m)}))}var k={};function j(t){if(k[t])return k[t].exports;var o=k[t]={i:t,l:!1,exports:{},hot:function(e){var t={_acceptedDependencies:{},_declinedDependencies:{},_selfAccepted:!1,_selfDeclined:!1,_disposeHandlers:[],_main:r!==e,active:!0,accept:function(e,r){if(void 0===e)t._selfAccepted=!0;else if("function"==typeof e)t._selfAccepted=e;else if("object"==typeof e)for(var o=0;o<e.length;o++)t._acceptedDependencies[e[o]]=r||function(){};else t._acceptedDependencies[e]=r||function(){}},decline:function(e){if(void 0===e)t._selfDeclined=!0;else if("object"==typeof e)for(var r=0;r<e.length;r++)t._declinedDependencies[e[r]]=!0;else t._declinedDependencies[e]=!0},dispose:function(e){t._disposeHandlers.push(e)},addDisposeHandler:function(e){t._disposeHandlers.push(e)},removeDisposeHandler:function(e){var r=t._disposeHandlers.indexOf(e);r>=0&&t._disposeHandlers.splice(r,1)},check:N,apply:T,status:function(e){if(!e)return d;c.push(e)},addStatusHandler:function(e){c.push(e)},removeStatusHandler:function(e){var t=c.indexOf(e);t>=0&&c.splice(t,1)},data:a[e]};return r=void 0,t}(t),parents:(s=l,l=[],s),children:[]};return e[t].call(o.exports,o,o.exports,p(t)),o.l=!0,o.exports}j.m=e,j.c=k,j.d=function(e,t,r){j.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},j.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},j.t=function(e,t){if(1&t&&(e=j(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(j.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)j.d(r,o,function(t){return e[t]}.bind(null,o));return r},j.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return j.d(t,"a",t),t},j.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},j.p="/assets",j.h=function(){return n},p(13)(j.s=13)}([function(e,t,r){"use strict";const o=e=>"object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName,n=e=>e&&"object"==typeof e,i=e=>"number"==typeof e,a=(e,t,r)=>{for(let r in t){const o=t[r];e.setAttribute(r,o)}for(let t=0;t<r.length;t++){const n=r[t];o(n)?e.appendChild(n):e.textContent=n+""}},l=(e=[])=>{const t={};for(let r=0;r<e.length;r++){const{name:o,value:n}=e[r];t[o]=n}return t};e.exports={toArray:e=>Array.prototype.slice.call(e),isNode:o,isObject:n,likeArray:e=>n(e)&&i(e.length)&&e.length>=0,bind:(e,t)=>(...r)=>e.apply(t,r),isString:e=>"string"==typeof e,isNumber:i,isBool:e=>"boolean"==typeof e,isFunction:e=>"function"==typeof e,set:(e,t="",r)=>{let o=(t=t.trim())?t.split("."):[],i=e;if(n(i)&&o.length){for(let e=0;e<o.length-1;e++){let t=o[e],r=i[t];n(r)||(r={},i[t]=r),i=r}return i[o[o.length-1]]=r,e}},createElement:(e,t,r)=>{const o=document.createElement(e);return a(o,t,r),o},createSvgElement:(e,t,r)=>{const o=document.createElementNS("http://www.w3.org/2000/svg",e);return a(o,t,r),o},getAttributeMap:l,removeNode:e=>{let t=e.parentNode;t&&t.removeChild(e)},hasOwnProperty:(e,t)=>{if(e.hasOwnProperty)return e.hasOwnProperty(t);for(const r in e)if(r===t)return!0;return!1},emptyChildren:e=>{const t=e.childNodes;for(let r=0,o=t.length;r<o;r++)e.removeChild(t[r])},getTagName:e=>e.tagName.toUpperCase(),getAttrMap:e=>o(e)?l(e.attributes):e.attrMap,getTextAreaTextContent:e=>o(e)?e.textContent:e.childNodes.length&&e.childNodes[0]||"",getAttributeValue:(e,t)=>o(e)?e.getAttribute(t):e.attrMap[t]}},function(e,t,r){const{view:o,parseArgs:n,n:i}=r(7),a=r(11),{get:l,set:s,isObject:p}=r(12),c=r(26)(),d=()=>{},u=(e,t)=>{for(let r in t)null!==t[r]&&void 0!==t[r]&&(null===e[r]||void 0===e[r]?e[r]=t[r]:"object"==typeof e[r]&&"object"==typeof t[r]&&(e[r]=u(e[r],t[r])));return e};e.exports=((e,{id:t=a(),defaultProps:r}={})=>{if("function"!=typeof e)throw new Error(`Expect function for glare view render, but got ${e}`);return o((o,a)=>(o.onChange=o.onChange||d,o.onEvent=o.onEvent||d,o.theme=o.theme||c,u(o.props,r),u(o.props,{style:o.theme[t]}),o.n=((...e)=>{const{tagName:t,attributes:r,childs:o}=n(e);return"function"==typeof t?t({props:r.props||{},onChange:r.onChange,onEvent:r.onEvent,theme:r.theme,children:o}):i(t,r,o)}),o.bn=((e,{propsPath:t,onChildChange:r,onChildEvent:n,doUpdate:i=!1},c)=>{let d=l(o.props,t);return p(d)||(d={},s(o.props,t,d)),e({props:d,onChange:(e,n)=>{s(o.props,t,e),r&&r(e,n),i&&a.update(),o.onChange(o.props,n)},onEvent:e=>{n&&n(e),o.onEvent(e)},theme:o.theme,children:c})}),e(o,a)))})},function(e,t,r){const{isObject:o,isNode:n}=r(0),i=r(17),a=r(8),l=e=>o(e)&&"kabanery_node"===e.type,s=e=>(...t)=>p(e,t),p=(e,t)=>{let{tagName:r,attributes:o,childs:a}=i(t);(l(o)||n(o))&&(a=[o],o={});const{attrMap:s,eventMap:p}=c(o);return{tagName:r,attrMap:s,eventMap:p,elementType:e,type:"kabanery_node",childNodes:a}},c=e=>{const t={},r={};for(const o in e){const n=e[o];0===o.indexOf("on")?r[o.substring(2)]=n:t[o]=n}return{attrMap:t,eventMap:r}};e.exports={n:s("html"),svgn:s("svg"),knodeCreator:s,isKabaneryNode:l,parseArgs:i,parseStyle:a}},function(e,t,r){"use strict";let o=e=>!!(e&&"object"==typeof e&&"number"==typeof e.length&&e.length>=0),n=e=>!(!e||"object"!=typeof e),i=e=>"function"==typeof e,a=(e,t)=>{if(!o(e))throw new TypeError(l(e,"list"));if(!i(t))throw new TypeError(l(t,"function"));for(let r=0;r<e.length;r++)if(!t(e[r]))return!1;return!0},l=(e,t)=>`Expect ${t} type, but got type ${typeof e}, and value is ${e}`;e.exports={isArray:e=>Array.isArray(e),likeArray:o,isString:e=>"string"==typeof e,isObject:n,isFunction:i,isNumber:e=>"number"==typeof e&&!isNaN(e),isBool:e=>"boolean"==typeof e,isNode:e=>"object"==typeof Node?e instanceof Node:e&&"object"==typeof e&&"number"==typeof e.nodeType&&"string"==typeof e.nodeName,isPromise:e=>e&&"object"==typeof e&&"function"==typeof e.then&&"function"==typeof e.catch,isNull:e=>null===e,isUndefined:e=>void 0===e,isFalsy:e=>!e,isRegExp:e=>e instanceof RegExp,isReadableStream:e=>n(e)&&i(e.on)&&i(e.pipe),isWritableStream:e=>n(e)&&i(e.on)&&i(e.write),funType:(e,t=[])=>{if(!i(e))throw new TypeError(l(e,"function"));if(!o(t))throw new TypeError(l(t,"array"));for(let e=0;e<t.length;e++){let r=t[e];if(r&&!i(r))throw new TypeError(l(r,"function"))}return function(){for(let r=0;r<t.length;r++){let o=t[r],n=arguments[r];if(o&&!o(n))throw new TypeError(`Argument type error. Arguments order ${r}. Argument is ${n}. function is ${e}, args are ${arguments}.`)}return e.apply(this,arguments)}},any:a,exist:(e,t)=>{if(!o(e))throw new TypeError(l(e,"array"));if(!i(t))throw new TypeError(l(t,"function"));for(let r=0;r<e.length;r++)if(t(e[r]))return!0;return!1},and:(...e)=>{if(!a(e,i))throw new TypeError("The argument of and must be function.");return t=>{for(let r=0;r<e.length;r++)if(!(0,e[r])(t))return!1;return!0}},or:(...e)=>{if(!a(e,i))throw new TypeError("The argument of and must be function.");return t=>{for(let r=0;r<e.length;r++)if((0,e[r])(t))return!0;return!1}},not:e=>{if(!i(e))throw new TypeError("The argument of and must be function.");return t=>!e(t)},mapType:e=>{if(!n(e))throw new TypeError(l(e,"obj"));for(let t in e){let r=e[t];if(!i(r))throw new TypeError(l(r,"function"))}return t=>{if(!n(t))return!1;for(let r in e)if(!(0,e[r])(t[r]))return!1;return!0}},listType:e=>{if(!i(e))throw new TypeError(l(e,"function"));return t=>a(t,e)},truth:()=>!0}},function(e,t,r){"use strict";let{isObject:o,funType:n,or:i,isString:a,isFalsy:l,likeArray:s}=r(3),p=r(9),{map:c,reduce:d,find:u,findIndex:f,forEach:h,filter:g,any:b,exist:m,compact:x}=r(19),y=(e,t,r)=>-1!==f(e,t,r),v=(e,t,r)=>(e[r]=t,e),w=(e,t,r=[])=>d(e,(e,r)=>(y(e,r,t)||e.push(r),e),r),N=n((e,t="")=>{let r=(t=t.trim())?t.split("."):[];return d(r,E,e,S)},[o,i(a,l)]),E=(e,t)=>e[t],S=e=>!e,T=e=>s(e)&&!a(e)?d(e,(e,t)=>e=e.concat(T(t)),[]):[e];e.exports={flat:T,contain:y,difference:(e,t,r)=>d(e,(e,o)=>(y(t,o,r)||y(e,o,r)||e.push(o),e),[]),union:(e,t,r)=>w(t,r,w(e,r)),interset:(e,t,r)=>d(e,(e,o)=>(y(t,o,r)&&e.push(o),e),[]),map:c,reduce:d,iterate:p,find:u,findIndex:f,deRepeat:w,forEach:h,filter:g,any:b,exist:m,get:N,delay:e=>new Promise(t=>{setTimeout(t,e)}),mergeMap:(e={},t={})=>d(t,v,d(e,v,{})),compact:x}},function(e,t,r){const{isNode:o,createElement:n,createSvgElement:i}=r(0),{isKabaneryNode:a}=r(2),{bindEvents:l,attachDocument:s}=r(10),{flat:p,forEach:c,map:d}=r(4),u=e=>{if(o(e))return e.outerHTML;if(a(e)){const{tagName:t,attrMap:r,childNodes:o}=e;let n=[];for(const e in r){const t=r[e];n.push(`${e}="${t}"`)}let i=n.join(" ");i=i?" "+i:"";let a=[];for(let e=0,t=o.length;e<t;e++)a.push(u(o[e]));return`<${t}${i}>${a.join("")}</${t}>`}return e+""},f=e=>{if(a(e)){let t=null;return t="html"===e.elementType?n(e.tagName,e.attrMap,d(e.childNodes,f)):i(e.tagName,e.attrMap,d(e.childNodes,f)),e.ctx&&e.ctx.bindNativeNode(t),l(t,e.eventMap),t}return o(e)?e:document.createTextNode(e.toString())},h=e=>{for(;e.parentNode;)e=e.parentNode;return e};e.exports={toDomNode:f,toHTML:u,mount:(e,t)=>{e=p(e),c(e,e=>{e=f(e),o(e)&&t.appendChild(e)}),s(h(t))}}},function(e,t,r){"use strict";const o=r(11)();e.exports={eventMapHook:`__eventMap_${o}`,globalEventTypePrefix:`__event_type_id_${o}_`,stopPropagationFlag:"__stopPropagation"}},function(e,t,r){"use strict";e.exports=r(16)},function(e,t,r){"use strict";const{isString:o,isObject:n}=r(0);e.exports=((e="",{keyWrapper:t,valueWrapper:r}={})=>{if(o(e))return e;if(!n(e))throw new TypeError(`Expect object for style object, but got ${e}`);const l=[];for(let o in e){let n=e[o];o=i(o),n=a(n,o),t&&(o=t(o,n)),r&&(n=r(n,o)),l.push(`${o}: ${n};`)}return l.join("")});const i=e=>e.replace(/[A-Z]/,e=>`-${e.toLowerCase()}`),a=(e,t)=>{if("number"==typeof e&&"z-index"!==t)return e+"px";if("padding"===t||"margin"===t){let t=e.split(" ");for(let e=0;e<t.length;e++){let r=t[e];isNaN(Number(r))||(t[e]=r+"px")}e=t.join(" ")}return e}},function(e,t,r){"use strict";let{likeArray:o,isObject:n,funType:i,isFunction:a,isUndefined:l,or:s,isNumber:p,isFalsy:c,mapType:d}=r(3),u=i((e=[],t={})=>{let{predicate:r,transfer:i,output:a,limit:l,def:s}=t;t.predicate=r||b,t.transfer=i||x,t.output=a||g,void 0===l&&(l=e&&e.length),l=t.limit=h(l);let p=s,c=0;if(o(e))for(let r=0;r<e.length;r++){let o=f(e,r,c,p,t);if(p=o.rets,c=o.count,o.stop)return p}else if(n(e))for(let r in e){let o=f(e,r,c,p,t);if(p=o.rets,c=o.count,o.stop)return p}return p},[s(n,a,c),s(l,d({predicate:s(a,c),transfer:s(a,c),output:s(a,c),limit:s(l,p,a)}))]),f=(e,t,r,o,{predicate:n,transfer:i,output:a,limit:l})=>{let s=e[t];return l(o,s,t,e,r)?{stop:!0,count:r,rets:o}:(n(s)&&(o=a(o,i(s,t,e,o),t,e),r++),{stop:!1,count:r,rets:o})},h=e=>l(e)?m:p(e)?(t,r,o,n,i)=>i>=e:e,g=(e,t)=>(e.push(t),e),b=()=>!0,m=()=>!1,x=e=>e;e.exports=u},function(e,t,r){"use strict";let o=r(23),{eventMapHook:n}=r(6),{listenEventType:i,clearEvents:a,attachDocument:l,dispatchEvent:s}=o();e.exports={bindEvents:(e,t)=>{e[n]=t;for(let e in t)i(e)},attachDocument:l,dispatchEvent:s,clearEvents:a}},function(e,t,r){var o=r(24),n=r(25);e.exports=function(e,t,r){var i=t&&r||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var a=(e=e||{}).random||(e.rng||o)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t)for(var l=0;l<16;++l)t[i+l]=a[l];return t||n(a)}},function(e,t){const r=(e,t)=>{if(null===e||void 0===e)return t;if(null===t||void 0===t)return e;if("object"==typeof e&&"object"==typeof t){const o=Object.assign({},e);for(let e in t)o[e]=r(o[e],t[e]);return o}return t},o=e=>e&&"object"==typeof e;e.exports={mergeDeep:r,set:(e,t="",r)=>{const n=(t=t.trim())?t.split("."):[];let i=e;if(o(i)&&n.length){for(let e=0;e<n.length-1;e++){let t=n[e],r=i[t];o(r)||(r={},i[t]=r),i=r}return i[n[n.length-1]]=r,e}},get:(e,t="")=>{let r=(t=t.trim())?t.split("."):[],n=e;for(let e=0;e<r.length;e++){if(!o(n))return;n=n[r[e]]}return n},isObject:o}},function(e,t,r){"use strict";var o=r(14).glareView,n=r(27),i=r(29).ToolBar,a=r(28),l=r(7).mount,s=o(function(e){var t=e.props;return(0,e.n)("iframe",{src:t.url,allow:t.allow,style:t.style})},{defaultProps:{url:"",allow:"encrypted-media;camera;microphone;fullscreen;",style:{margin:0,padding:0,border:"1px solid #999999",width:"100%",height:"100%"}}}),p=o(function(e,t){var r=e.props,o=e.n,l=e.bn;return o("div",{style:{margin:0,padding:0,width:"100%",height:"100%"}},[l(i,{propsPath:"appTitle"},[]),o("div",{style:{padding:8,height:"100%"}},[o("form",{style:{},onsubmit:function(e){e.preventDefault(),d(c(r.consoleText.value,r),t)}},[o(a,">"),l(n,{propsPath:"consoleText"})]),"activeFrame"===r.action.type?l(s,{propsPath:"action.data"}):null])])},{defaultProps:{}}),c=function(e,t){if((e=e.trim()).startsWith(":"))return{type:"activeFrame",data:t.toolsites[e.substring(1)]}},d=function(e,t){var r=t.update;e&&"activeFrame"===e.type&&r("props.activeFrame",e.data)};l(p({props:{appTitle:{title:"My Start Page"},consoleText:{value:"",placeholder:"console",style:{box:{width:600}}},action:{type:"activeFrame",data:{name:"youtube",url:"https://www.youtube.com/"}},toolsites:[{name:"youtube",url:"https://www.youtube.com/"},{name:"netflix",url:"https://www.netflix.com/browse"},{name:"facebook messager",url:"https://www.messenger.com/t/kinolee97"},{name:"translator",url:"https://translate.google.com/"},{name:"scala api",url:"https://www.scala-lang.org/files/archive/api/current/"},{name:"nodejs doc",url:"https://nodejs.org/dist/latest-v10.x/docs/api/"},{name:"MDN",url:"https://developer.mozilla.org/en-US/"},{name:"js console",url:"https://jsconsole.com/"},{name:"skype",url:"https://web.skype.com/en/"},{name:"leetcode",url:"https://leetcode.com/problemset/all/"}]}}),document.body)},function(e,t,r){e.exports=r(15)},function(e,t,r){const o=r(1);e.exports={glareView:o}},function(e,t,r){"use strict";const{n:o,svgn:n,parseArgs:i,isKabaneryNode:a,parseStyle:l}=r(2),{view:s}=r(20),{dispatchEvent:p,clearEvents:c}=r(10),{toHTML:d,mount:u}=r(5);e.exports={n:o,isKabaneryNode:a,svgn:n,view:s,mount:u,toHTML:d,parseArgs:i,parseStyle:l,dispatchEvent:p,clearEvents:c}},function(e,t,r){"use strict";const o=r(18),{isString:n,isObject:i,isNode:a,likeArray:l,isNumber:s,isBool:p}=r(0);let c=(e="")=>{if("string"!=typeof e)return[e];let t=e.split(" ")[0],r=e.substring(t.length);return r=r&&r.trim(),t=t.toLowerCase().trim(),r?[t,r]:[t]};const d=e=>{let t=[];if(a(e))t.push(e);else if(l(e))for(let r=0;r<e.length;r++){let o=e[r];t=t.concat(d(o))}else e&&t.push(e);return t};e.exports=((e,{doParseStyle:t=!0}={})=>{let r,u={},f=[],h=e.shift(),g=c(h);g.length>1?(r=g[0],u=g[1]):r=h;let b=e.shift(),m={};return l(b)||n(b)||a(b)||s(b)||p(b)?f=b:i(b)&&(m=b,f=e.shift()||[]),{tagName:r,attributes:u=o(u,m,{doParseStyle:t}),childs:d(f)}})},function(e,t,r){"use strict";let{isString:o}=r(3),n=r(8),{mergeMap:i}=r(4);const a=/([\w-]+)\s*=\s*(([\w-]+)|('.*?')|(".*?"))/;e.exports=((e,t,{doParseStyle:r})=>{if(o(e)){let t=e.trim(),r=[],o=!1;for(;!o;){let e=t.replace(a,(e,t,o)=>(r.push([t,o]),"")).trim();e===t&&(o=!0),t=e}e={};for(let t=0;t<r.length;t++){let[o,n]=r[t];("'"===n[0]&&"'"===n[n.length-1]||'"'===n[0]&&'"'===n[n.length-1])&&(n=n.substring(1,n.length-1)),e[o]=n}}return(e=i(e,t)).style&&r&&(e.style=n(e.style)),e})},function(e,t,r){"use strict";let o=r(9),n={eq:(e,t)=>e===t},i=(e,t,r,n)=>o(e,{output:t,def:r,limit:n}),a=(e,t,r={})=>{((e,t)=>{for(let r in t)e[r]=e[r]||t[r]})(r,n);let{eq:i}=r,a=o(e,{transfer:l,limit:s,predicate:e=>i(t,e),def:[]});return a.length?a[0]:-1},l=(e,t)=>t,s=(e,t,r,o,n)=>n>=1,p=e=>!e,c=e=>!!e;e.exports={map:(e,t,r)=>o(e,{transfer:t,def:[],limit:r}),forEach:(e,t)=>o(e,{limit:e=>!0===e,transfer:t,output:(e,t)=>t,def:!1}),reduce:i,find:(e,t,r)=>{let o=a(e,t,r);if(-1!==o)return e[o]},findIndex:a,filter:(e,t,r)=>i(e,(e,r,o,n)=>(t&&t(r,o,n)&&e.push(r),e),[],r),any:(e,t)=>i(e,(e,r,o,n)=>{let i=t&&t(r,o,n);return e&&c(i)},!0,p),exist:(e,t)=>i(e,(e,r,o,n)=>{let i=t&&t(r,o,n);return e||c(i)},!1,c),compact:e=>i(e,(e,t)=>(t&&e.push(t),e),[])}},function(e,t,r){const{isFunction:o}=r(0),n=r(21),i=r(22),{mount:a}=r(5),l=function(e,t){this.nativeNode=null,this.data=t,this.render=e,this.kNode=null};l.prototype={construct:l,update:function(...e){return n(this.data,e),this.renderNativeView()},appendView:function(e){this.nativeNode&&a(e,this.nativeNode)},renderNativeView:function(){const e=this.getKabaneryNode();return this.nativeNode=i(this.nativeNode,e,this.kNode),this.kNode=e,this.nativeNode},renderKabaneryNode:function(){return this.kNode=this.getKabaneryNode(),this.kNode},getKabaneryNode:function(){const e=this.render(this.data,this.getContext());return o(e)?(this.render=e,this.getKabaneryNode(this.data,this.getContext())):(e.ctx=this.getContext(),e)},getKNode:function(){return this.kNode},getNativeNode:function(){return this.nativeNode},getData:function(){return this.data},getContext:function(){return this._ctx},bindNativeNode:function(e){this.nativeNode=e}};e.exports={view:e=>t=>{return((e,t)=>{const r={},o=new l(e,t);o._ctx=r;for(const e in l.prototype)"construct"!==e&&(r[e]=((...t)=>o[e].apply(o,t)));return r})(e,t).renderKabaneryNode()}}},function(e,t,r){const{set:o,isFunction:n,likeArray:i}=r(0);e.exports=((e,t)=>{if(1===t.length&&i(t[0])){let r=t[0];for(let t=0,n=r.length;t<n;t++){const n=r[t];o(e,n[0],n[1])}}else{let[r,i]=t;n(i)&&(i=i(e)),o(e,r,i)}})},function(e,t,r){"use strict";const{toDomNode:o}=r(5),{removeNode:n,getTagName:i,getTextAreaTextContent:a,getAttributeValue:l,getAttrMap:s,hasOwnProperty:p}=r(0),{eventMapHook:c}=r(6),{isKabaneryNode:d}=r(2),u=(e,t,r)=>{((e,t,r)=>{const o=s(r),n=s(t);for(const t in o){const r=o[t];if(p(n,t)){let o=n[t];o!==r&&e.setAttribute(t,o)}else e.removeAttribute(t)}for(const t in n){const r=n[t];p(o,t)||e.setAttribute(t,r)}})(e,t,r),"TEXTAREA"===i(e)&&(e.value=a(t)),"INPUT"===i(e)&&(e.value=l(t,"value")),e[c]=t.eventMap||{},f(t.childNodes,r.childNodes,e)},f=(e,t,r)=>{const i=r.childNodes,a=t.length,l=e.length;for(let e=l;e<a;e++)i[e]&&n(i[e]);for(let r=0,o=Math.min(l,a);r<o;r++)h(i[r],e[r],t[r]);for(let t=a;t<l;t++)r.appendChild(o(e[t]))},h=(e,t,r)=>d(t)&&d(r)?i(r)!==i(t)?g(e,t):(u(e,t,r),t.ctx&&t.ctx.bindNativeNode(e),e):g(e,t),g=(e,t)=>{const r=e.parentNode,n=o(t);return r.replaceChild(n,e),n};e.exports=((e,t,r)=>e?t?h(e,t,r):(n(e),null):o(t))},function(e,t,r){"use strict";let{contain:o}=r(4),{eventMapHook:n,globalEventTypePrefix:i,stopPropagationFlag:a}=r(6);e.exports=(()=>{let e=[],t={},r={},i=t=>{e.length||e.push(document);for(let r=0;r<e.length;r++){let o=e[r];p(o,t)}},p=(e,t)=>{let o=null;r[t]?o=r[t]:(o=d(t),r[t]=o),e.addEventListener(t,o)},c=o=>{let n=r[o];if(n){for(let t=0;t<e.length;t++){e[t].removeEventListener(o,n)}delete r[o],delete t[o]}},d=e=>(function(t){let r=this,o=t.target,n=t.stopPropagation;t.stopPropagation=function(...e){return t[a]=!0,n&&n.apply(this,e)};let i=l(o);for(let o=0;o<i.length;o++){let n=i[o];u(t,e,n,r)}}),u=(e,t,r,o)=>{if(e.__stopPropagation)return!0;let n=f(t,r);return n&&n.apply(o,[e])},f=(e,t)=>{let r=t&&t[n];return r&&r[e]};return{listenEventType:e=>{t[e]||i(e),t[e]=!0},clearEvents:()=>{for(let e in t)c(e)},removeListenerType:c,getDocs:()=>e.slice(0),attachDocument:(r=document)=>{if(!o(e,r)){for(let e in t){let t=s(e);r[t]||(p(r,e),r[t]=!0)}e.push(r)}},dispatchEvent:(e,t)=>{let o=r[e];o&&o(t)}}});let l=e=>{let t=[];for(;e;)t.push(e),e=e.parentNode;return t},s=e=>`${i}${e}`},function(e,t){var r="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(r){var o=new Uint8Array(16);e.exports=function(){return r(o),o}}else{var n=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),n[t]=e>>>((3&t)<<3)&255;return n}}},function(e,t){for(var r=[],o=0;o<256;++o)r[o]=(o+256).toString(16).substr(1);e.exports=function(e,t){var o=t||0,n=r;return[n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],"-",n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]],n[e[o++]]].join("")}},function(e,t,r){const{mergeDeep:o}=r(12);e.exports=((e={box:{margin:0},font:{size:{normal:"1rem",small:"0.75rem"},color:{placeholder:"rgba(0, 0, 0, 0.54)",normal:"rgba(0, 0, 0, 0.87)"}},line:{color:{normal:"rgba(0, 0, 0, 0.42)",hover:"rgb(31,31,31)",light:"#1976d2"}}})=>{const t={normal:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",outline:0},hover:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",textDecoration:"none",outline:0},active:{border:0,margin:e.box.margin,boxSizing:"border-box",padding:"8px 16px",minWidth:64,minHeight:36,fontSize:"0.875rem",cursor:"pointer",letterSpacing:"0.02857em",fontWeight:"500",borderRadius:4,textTransform:"uppercase",lineHeight:"1.5",textDecoration:"none",outline:0}},r={width:22,height:22,top:-11,right:-11,display:"flex",zIndex:1,position:"absolute",flexWrap:"wrap",fontSize:"0.75rem",alignItems:"center",borderRadius:"50%",alignContent:"center",flexDirection:"row",justifyContent:"center"},n={margin:"0 12px 0 0",padding:0,width:18,height:"100%",borderRadius:2,position:"relative",boxSizing:"border-box"};return{TextField:{box:{display:"inline-flex",position:"relative",width:200,height:48,cursor:"text",margin:e.box.margin,padding:0,boxSizing:"border-box"},placeholder:{place:{position:"absolute",left:0,fontSize:e.font.size.normal,color:e.font.color.placeholder,cursor:"text",transform:"translate(0, 24px) scale(1)",transition:"color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},active:{position:"absolute",top:0,left:0,fontSize:e.font.size.normal,color:e.line.color.light,transform:"translate(0, 1.5px) scale(0.75)",transition:"color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},placeContent:{position:"absolute",top:0,left:0,transform:"translate(0, 1.5px) scale(0.75)",fontSize:e.font.size.normal,color:e.font.color.placeholder,cursor:"text"}},input:{width:"100%",height:30,position:"absolute",bottom:0,left:0,margin:0,padding:"0 6px 0 6px",border:"none",borderBottom:`1px solid ${e.line.color.normal}`,fontSize:e.font.size.normal,outline:"none",boxSizing:"border-box"},hover:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.hover}`},focus:{active:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.light}`,transition:"transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"},unactive:{position:"absolute",bottom:0,left:0,right:0,borderBottom:`2px solid ${e.line.color.light}`,transform:"scaleX(0)",transition:"transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms"}}},Button:{box:{text:{default:o(t,{normal:{color:e.font.color.normal,backgroundColor:"transparent"},hover:{color:e.font.color.normal,backgroundColor:"rgba(0, 0, 0, 0.08)"},active:{color:e.font.color.normal,backgroundColor:"rgba(0, 0, 0, 0.3)"}}),primary:o(t,{normal:{color:"#2196f3",backgroundColor:"transparent"},hover:{color:"#2196f3",backgroundColor:"rgba(33, 150, 243, 0.08)"},active:{color:"#2196f3",backgroundColor:"rgba(33, 150, 243, 0.3)"}}),secondary:o(t,{normal:{color:"rgb(225, 0, 80)"},hover:{color:"rgb(225, 0, 80)",backgroundColor:"rgba(225, 0, 80, 0.08)"},active:{color:"rgb(225, 0, 80)",backgroundColor:"rgba(225, 0, 80, 0.3)"}})},contained:{default:o(t,{normal:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#e0e0e0"},hover:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#d5d5d5"},active:{border:0,color:e.font.color.normal,boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#e0e0e0"}}),primary:o(t,{normal:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#2196f3"},hover:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#1976d2"},active:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"#2196f3"}}),secondary:o(t,{normal:{border:0,color:"#fff",backgroundColor:"rgb(225, 0, 80)",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"},hover:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"rgb(157, 0, 56)"},active:{border:0,color:"#fff",boxShadow:"0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",backgroundColor:"rgb(225, 0, 80)"}})}}},Divider:{height:1,margin:0,padding:0,border:"none",flexShrink:0,backgroundColor:"rgba(0, 0, 0, 0.12)"},Badge:{box:{display:"inline-flex",position:"relative",verticalAlign:"middle"},badge:{primary:Object.assign({color:"#fff",backgroundColor:"#2196f3"},r),secondary:Object.assign({color:"#fff",backgroundColor:"rgb(225, 0, 80)"},r)}},Checkbox:{box:{margin:0,padding:0,position:"relative",display:"inline-flex",cursor:"pointer",alignItems:"center",verticalAlign:"middle",height:18,lineHeight:18},checkbox:{default:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid rgba(0, 0, 0, 0)",backgroundColor:"rgba(0, 0, 0, 0.54)"},n)},primary:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid #2196f3",backgroundColor:"#2196f3"},n)},secondary:{unchecked:Object.assign({border:"2px solid rgba(0, 0, 0, 0.54)"},n),checked:Object.assign({border:"2px solid rgb(225, 0, 80)",backgroundColor:"rgb(225, 0, 80)"},n)}},label:{color:e.font.color.normal,fontSize:"0.875rem",fontWeight:"400",lineHeight:"1.5",letterSpacing:"0.01071em"}},Text:{default:{color:e.font.color.normal},h2:{color:e.font.color.normal,fontSize:"2.125rem",fontWeight:"400",lineHeight:"1.17",letterSpacing:"0.00735em",margin:0,padding:"32px 0 24px",display:"inline-flex"}},Br:{},ToolBar:{box:{boxShadow:"0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)",minHeight:64,boxSizing:"border-box",paddingLeft:24,paddingRight:24,display:"flex",alignItems:"center"},toolBar:{primary:{backgroundColor:"#2196f3",color:"white"},default:{backgroundColor:"#f5f5f5",color:"rgba(0, 0, 0, 0.87)"}},title:{flexGrow:"1",fontSize:"1.25rem",fontWeight:"500",lineHeight:1.6,letterSpacing:"0.0075em"}},ToolBarLeft:{primary:{marginRight:12},default:{marginRight:12}},ToolBarRight:{primary:{marginLeft:12},default:{marginLeft:12}}}})},function(e,t,r){const o=r(1);e.exports=o(({props:e,onChange:t,onEvent:r,n:o},n)=>o("div",{style:e.style.box,onclick:e=>{r({type:"click",sourceEvent:e}),n.update("props.activeStatus","focused")},onfocusin:e=>{r({type:"focusin",sourceEvent:e}),n.update("props.activeStatus","focused")},onfocusout:e=>{r({type:"focusout",sourceEvent:e}),n.update("props.activeStatus","unfocused")},onmouseover:t=>{r({type:"mouseover",sourceEvent:t}),"unfocused"===e.activeStatus&&n.update("props.activeStatus","hover")},onmouseout:t=>{r({type:"mouseout",sourceEvent:t}),"hover"===e.activeStatus&&n.update("props.activeStatus","unfocused")}},[o("input",{style:e.style.input,value:e.value,type:e.type,oninput:o=>{o.target.value!==e.value&&(e.value=o.target.value,t(e,n,o)),r({type:"input",sourceEvent:o})}}),o("label",{style:"focused"===e.activeStatus?e.style.placeholder.active:""!==e.value?e.style.placeholder.placeContent:e.style.placeholder.place},`${e.placeholder}`),o("div",{style:"hover"===e.activeStatus?e.style.hover:""}),o("div",{style:"focused"===e.activeStatus?e.style.focus.active:e.style.focus.unactive})]),{id:"TextField",defaultProps:{placeholder:"",value:"",type:"text",activeStatus:"unfocused"}})},function(e,t,r){const o=r(1);e.exports=o(({props:e,n:t,children:r})=>{if("default"===e.type)return t("span",{style:e.style[e.type]},r);if("h2"===e.type)return t("h2",{style:e.style[e.type]},r);throw new Error(`unexpect Text type ${e.type}`)},{id:"Text",defaultProps:{type:"default"}})},function(e,t,r){const o=r(1),n=o(({props:e,n:t,children:r})=>t("div",{style:Object.assign({},e.style.box,e.style.toolBar[e.color])},[r[0],t("span",{style:e.style.title},e.title),r[1]]),{id:"ToolBar",defaultProps:{color:"default",title:""}}),i=o(({props:e,n:t,children:r})=>t("span",{style:e.style[e.color]},r),{id:"ToolBarLeft",defaultProps:{color:"default"}}),a=o(({props:e,n:t,children:r})=>t("span",{style:e.style[e.color]},r),{id:"ToolBarRight",defaultProps:{color:"default"}});e.exports={ToolBar:n,ToolBarLeft:i,ToolBarRight:a}}]);
//# sourceMappingURL=app.js.map