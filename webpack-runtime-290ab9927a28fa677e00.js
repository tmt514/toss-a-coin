!function(){"use strict";var e,t,n,r,o,a,c,i={},u={};function s(e){var t=u[e];if(void 0!==t)return t.exports;var n=u[e]={exports:{}};return i[e](n,n.exports,s),n.exports}s.m=i,e=[],s.O=function(t,n,r,o){if(!n){var a=1/0;for(f=0;f<e.length;f++){n=e[f][0],r=e[f][1],o=e[f][2];for(var c=!0,i=0;i<n.length;i++)(!1&o||a>=o)&&Object.keys(s.O).every((function(e){return s.O[e](n[i])}))?n.splice(i--,1):(c=!1,o<a&&(a=o));if(c){e.splice(f--,1);var u=r();void 0!==u&&(t=u)}}return t}o=o||0;for(var f=e.length;f>0&&e[f-1][2]>o;f--)e[f]=e[f-1];e[f]=[n,r,o]},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,{a:t}),t},n=Object.getPrototypeOf?function(e){return Object.getPrototypeOf(e)}:function(e){return e.__proto__},s.t=function(e,r){if(1&r&&(e=this(e)),8&r)return e;if("object"==typeof e&&e){if(4&r&&e.__esModule)return e;if(16&r&&"function"==typeof e.then)return e}var o=Object.create(null);s.r(o);var a={};t=t||[null,n({}),n([]),n(n)];for(var c=2&r&&e;"object"==typeof c&&!~t.indexOf(c);c=n(c))Object.getOwnPropertyNames(c).forEach((function(t){a[t]=function(){return e[t]}}));return a.default=function(){return e},s.d(o,a),o},s.d=function(e,t){for(var n in t)s.o(t,n)&&!s.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},s.f={},s.e=function(e){return Promise.all(Object.keys(s.f).reduce((function(t,n){return s.f[n](e,t),t}),[]))},s.u=function(e){return({55:"component---src-pages-markov-js",173:"component---src-pages-lis-3-js",196:"ee8b1517",279:"component---src-pages-lis-js",410:"ebac9dc944522975f3e216b85cd73cbfb7db637d",476:"component---src-pages-using-ssr-js",532:"styles",617:"component---src-pages-page-2-js",678:"component---src-pages-index-js",713:"component---src-templates-using-dsg-js",767:"component---src-pages-lis-2-js",824:"component---src-pages-oldindex-js",883:"component---src-pages-404-js",970:"component---src-pages-using-typescript-tsx",976:"c16184b3"}[e]||e)+"-"+{55:"05df6d9d349999b3e873",173:"8c805ab2336bad9a1ed8",196:"b1562980ebd78ade52f7",223:"c6726477057a648e5a28",279:"5762e0d977dec6d6cd43",410:"aef8fb463e91fcc8cee2",476:"922f3e82d63a3222c19c",532:"9a44b0c96edc28263ac1",617:"ff1221ef02e14520ccca",678:"ec73af26d43b4817fc48",713:"d3c14eabe403e1a156a9",767:"61bd166c2ed0751acc98",824:"598c18f48931b0a6d2ec",843:"4d22e4d87d98fa226c97",883:"b6c590340c6254b479ad",970:"d877c7a281a04c2dec14",976:"a7bb0936ed8154507e10"}[e]+".js"},s.miniCssF=function(e){return"styles.1f82edceaac7d0e65136.css"},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r={},o="gatsby-starter-default:",s.l=function(e,t,n,a){if(r[e])r[e].push(t);else{var c,i;if(void 0!==n)for(var u=document.getElementsByTagName("script"),f=0;f<u.length;f++){var d=u[f];if(d.getAttribute("src")==e||d.getAttribute("data-webpack")==o+n){c=d;break}}c||(i=!0,(c=document.createElement("script")).charset="utf-8",c.timeout=120,s.nc&&c.setAttribute("nonce",s.nc),c.setAttribute("data-webpack",o+n),c.src=e),r[e]=[t];var l=function(t,n){c.onerror=c.onload=null,clearTimeout(p);var o=r[e];if(delete r[e],c.parentNode&&c.parentNode.removeChild(c),o&&o.forEach((function(e){return e(n)})),t)return t(n)},p=setTimeout(l.bind(null,void 0,{type:"timeout",target:c}),12e4);c.onerror=l.bind(null,c.onerror),c.onload=l.bind(null,c.onload),i&&document.head.appendChild(c)}},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="/toss-a-coin/",a=function(e){return new Promise((function(t,n){var r=s.miniCssF(e),o=s.p+r;if(function(e,t){for(var n=document.getElementsByTagName("link"),r=0;r<n.length;r++){var o=(c=n[r]).getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(o===e||o===t))return c}var a=document.getElementsByTagName("style");for(r=0;r<a.length;r++){var c;if((o=(c=a[r]).getAttribute("data-href"))===e||o===t)return c}}(r,o))return t();!function(e,t,n,r){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css",o.onerror=o.onload=function(a){if(o.onerror=o.onload=null,"load"===a.type)n();else{var c=a&&("load"===a.type?"missing":a.type),i=a&&a.target&&a.target.href||t,u=new Error("Loading CSS chunk "+e+" failed.\n("+i+")");u.code="CSS_CHUNK_LOAD_FAILED",u.type=c,u.request=i,o.parentNode.removeChild(o),r(u)}},o.href=t,document.head.appendChild(o)}(e,o,t,n)}))},c={658:0},s.f.miniCss=function(e,t){c[e]?t.push(c[e]):0!==c[e]&&{532:1}[e]&&t.push(c[e]=a(e).then((function(){c[e]=0}),(function(t){throw delete c[e],t})))},function(){var e={658:0};s.f.j=function(t,n){var r=s.o(e,t)?e[t]:void 0;if(0!==r)if(r)n.push(r[2]);else if(/^(532|658)$/.test(t))e[t]=0;else{var o=new Promise((function(n,o){r=e[t]=[n,o]}));n.push(r[2]=o);var a=s.p+s.u(t),c=new Error;s.l(a,(function(n){if(s.o(e,t)&&(0!==(r=e[t])&&(e[t]=void 0),r)){var o=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;c.message="Loading chunk "+t+" failed.\n("+o+": "+a+")",c.name="ChunkLoadError",c.type=o,c.request=a,r[1](c)}}),"chunk-"+t,t)}},s.O.j=function(t){return 0===e[t]};var t=function(t,n){var r,o,a=n[0],c=n[1],i=n[2],u=0;if(a.some((function(t){return 0!==e[t]}))){for(r in c)s.o(c,r)&&(s.m[r]=c[r]);if(i)var f=i(s)}for(t&&t(n);u<a.length;u++)o=a[u],s.o(e,o)&&e[o]&&e[o][0](),e[o]=0;return s.O(f)},n=self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))}()}();
//# sourceMappingURL=webpack-runtime-290ab9927a28fa677e00.js.map