!function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);function r(e,t,n){return e.replace(/./g,(e,r)=>t==r?n:e)}function i(e){let{id:t}=e.target,n=t[t.length-1];if("*"==d.field[n]){let t="p1"==d.playersTurn?"x":"o";e.target.textContent=t;let i=d.field;i=r(i,n,t),d.field=i,d.playersTurn="p1"==d.playersTurn?"p2":"p1"}}let o={field:"",players:["p1","p2"],playersTurn:"p1",init:function(){this.field=new Array(9).fill("*").join(""),this.playersTurn="p1"},printfield(){for(let e of this.field)console.log(e)},get getField(){return this.field}};function c(){let e=Array.from(arguments[0]);return e.every(t=>t==e[0])}function l(){let e=Array.from(arguments[0]);return!e.some(e=>"*"==e)}function a(){let e=Array.from(arguments);return c(e)&&l(e)}function s(e){return function(e){let t=e;return!!(a(t[0],t[1],t[2])||a(t[3],t[4],t[5])||a(t[6],t[7],t[8]))||(!!(a(t[0],t[3],t[6])||a(t[1],t[4],t[7])||a(t[2],t[5],t[8]))||!(!a(t[0],t[4],t[8])&&!a(t[2],t[4],t[6])))}(e)?1:0}let u=Object.create({init:function(e,t){this.info=e,this.children=t||[]}});u.init=function(e,t,n,r,i){this.field=e,this.score=r,this.player=t,this.isHead=n,this.children=[],this.parent=i},u.setChildren=function(){let e=0;for(;e<this.field.length;){if("*"==this.field[e]){let t=this.field;t=r(t,e,"p1"==this.player?"x":"o");let n=Object.create(u),i="p1"==this.player?"p2":"p1";n.init(t,i,!1,void 0,this),this.children.push(n)}e++}};let f={init:function(e,t){this.playersTurn=t,this.field=e,this.decisionTree=Object.create(u),u.init(e,t,!0,void 0,null),this.decisionTree.score=s(this.field)},buildRootTree:function(){this.decisionTree.setChildren();for(let e=0;e<this.decisionTree.children.length;e++);},buildDepth:function(){let e=[];for(e[0]=this.decisionTree.children.map(e=>e);e.length<6;){e[e.length]=[];for(let t=0;t<e[e.length-2].length;t++){1!=e[e.length-2][t].score&&e[e.length-2][t].setChildren();let n=e[e.length-2][t].children;n.forEach(e=>e.score=s(e.field)),e[e.length-1]=e[e.length-1].concat(n)}e[e.length-1].filter(e=>1==e.score).forEach(e=>console.log(e))}}},d=Object.create(o);d.init();let h=Object.create(f);h.init(d.field,d.playersTurn,!0,void 0),h.buildRootTree(),h.buildDepth(),function(e){let t=document.getElementById("game__field");for(let n=0;n<e.length;n++){let r=document.createElement("div");r.classList.add("game__square"),r.textContent=e[n],r.id="square-"+n,r.addEventListener("click",i),t.appendChild(r)}}(d.field)},function(e,t,n){var r=n(2),i=n(3);"string"==typeof(i=i.__esModule?i.default:i)&&(i=[[e.i,i,""]]);var o={insert:"head",singleton:!1};r(i,o);e.exports=i.locals||{}},function(e,t,n){"use strict";var r,i=function(){return void 0===r&&(r=Boolean(window&&document&&document.all&&!window.atob)),r},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),c=[];function l(e){for(var t=-1,n=0;n<c.length;n++)if(c[n].identifier===e){t=n;break}return t}function a(e,t){for(var n={},r=[],i=0;i<e.length;i++){var o=e[i],a=t.base?o[0]+t.base:o[0],s=n[a]||0,u="".concat(a," ").concat(s);n[a]=s+1;var f=l(u),d={css:o[1],media:o[2],sourceMap:o[3]};-1!==f?(c[f].references++,c[f].updater(d)):c.push({identifier:u,updater:v(d,t),references:1}),r.push(u)}return r}function s(e){var t=document.createElement("style"),r=e.attributes||{};if(void 0===r.nonce){var i=n.nc;i&&(r.nonce=i)}if(Object.keys(r).forEach((function(e){t.setAttribute(e,r[e])})),"function"==typeof e.insert)e.insert(t);else{var c=o(e.insert||"head");if(!c)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");c.appendChild(t)}return t}var u,f=(u=[],function(e,t){return u[e]=t,u.filter(Boolean).join("\n")});function d(e,t,n,r){var i=n?"":r.media?"@media ".concat(r.media," {").concat(r.css,"}"):r.css;if(e.styleSheet)e.styleSheet.cssText=f(t,i);else{var o=document.createTextNode(i),c=e.childNodes;c[t]&&e.removeChild(c[t]),c.length?e.insertBefore(o,c[t]):e.appendChild(o)}}function h(e,t,n){var r=n.css,i=n.media,o=n.sourceMap;if(i?e.setAttribute("media",i):e.removeAttribute("media"),o&&btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=r;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(r))}}var p=null,g=0;function v(e,t){var n,r,i;if(t.singleton){var o=g++;n=p||(p=s(t)),r=d.bind(null,n,o,!1),i=d.bind(null,n,o,!0)}else n=s(t),r=h.bind(null,n,t),i=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return r(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;r(e=t)}else i()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=i());var n=a(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var r=0;r<n.length;r++){var i=l(n[r]);c[i].references--}for(var o=a(e,t),s=0;s<n.length;s++){var u=l(n[s]);0===c[u].references&&(c[u].updater(),c.splice(u,1))}n=o}}}},function(e,t,n){(t=n(4)(!1)).push([e.i,"* {\n    margin: 0;\n    padding: 0;\n    box-sizing: border-box;\n}\n\n.game__window {\n    background-color: #000;\n    height: 100vh;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n}\n\n.game__field {\n    background-color: #fff;\n    width: 30vw;\n    height: 30vh;\n    display: flex;\n    flex-flow: row wrap;\n}\n\n.game__square {\n    height: 10vh;\n    width: 10vw;\n    border: 1px solid #000;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n}",""]),e.exports=t},function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",r=e[3];if(!r)return n;if(t&&"function"==typeof btoa){var i=(c=r,l=btoa(unescape(encodeURIComponent(JSON.stringify(c)))),a="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(l),"/*# ".concat(a," */")),o=r.sources.map((function(e){return"/*# sourceURL=".concat(r.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([i]).join("\n")}var c,l,a;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,r){"string"==typeof e&&(e=[[null,e,""]]);var i={};if(r)for(var o=0;o<this.length;o++){var c=this[o][0];null!=c&&(i[c]=!0)}for(var l=0;l<e.length;l++){var a=[].concat(e[l]);r&&i[a[0]]||(n&&(a[2]?a[2]="".concat(n," and ").concat(a[2]):a[2]=n),t.push(a))}},t}}]);