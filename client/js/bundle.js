!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=26)}([function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.__esModule=!0,e.extend=s,e.indexOf=function(t,e){for(var n=0,r=t.length;n<r;n++)if(t[n]===e)return n;return-1},e.escapeExpression=function(t){if("string"!=typeof t){if(t&&t.toHTML)return t.toHTML();if(null==t)return"";if(!t)return t+"";t=""+t}if(!a.test(t))return t;return t.replace(o,l)},e.isEmpty=function(t){return!t&&0!==t||!(!d(t)||0!==t.length)},e.createFrame=function(t){var e=s({},t);return e._parent=t,e},e.blockParams=function(t,e){return t.path=e,t},e.appendContextPath=function(t,e){return(t?t+".":"")+e};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;","=":"&#x3D;"},o=/[&<>"'`=]/g,a=/[&<>"'`=]/;function l(t){return i[t]}function s(t){for(var e=1;e<arguments.length;e++)for(var n in arguments[e])Object.prototype.hasOwnProperty.call(arguments[e],n)&&(t[n]=arguments[e][n]);return t}var u=Object.prototype.toString;e.toString=u;var c=function(t){return"function"==typeof t};c(/x/)&&(e.isFunction=c=function(t){return"function"==typeof t&&"[object Function]"===u.call(t)}),e.isFunction=c;var d=Array.isArray||function(t){return!(!t||"object"!==(void 0===t?"undefined":r(t)))&&"[object Array]"===u.call(t)};e.isArray=d},function(t,e,n){"use strict";e.__esModule=!0;var r=["description","fileName","lineNumber","message","name","number","stack"];function i(t,e){var n=e&&e.loc,o=void 0,a=void 0;n&&(t+=" - "+(o=n.start.line)+":"+(a=n.start.column));for(var l=Error.prototype.constructor.call(this,t),s=0;s<r.length;s++)this[r[s]]=l[r[s]];Error.captureStackTrace&&Error.captureStackTrace(this,i);try{n&&(this.lineNumber=o,Object.defineProperty?Object.defineProperty(this,"column",{value:a,enumerable:!0}):this.column=a)}catch(t){}}i.prototype=new Error,e.default=i,t.exports=e.default},function(t,e,n){"use strict";t.exports=n(23).default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.HandlebarsEnvironment=u;var i=n(0),o=r(n(1)),a=n(22),l=n(14),s=r(n(12));e.VERSION="4.0.11";e.COMPILER_REVISION=7;e.REVISION_CHANGES={1:"<= 1.0.rc.2",2:"== 1.0.0-rc.3",3:"== 1.0.0-rc.4",4:"== 1.x.x",5:"== 2.0.0-alpha.x",6:">= 2.0.0-beta.1",7:">= 4.0.0"};function u(t,e,n){this.helpers=t||{},this.partials=e||{},this.decorators=n||{},a.registerDefaultHelpers(this),l.registerDefaultDecorators(this)}u.prototype={constructor:u,logger:s.default,log:s.default.log,registerHelper:function(t,e){if("[object Object]"===i.toString.call(t)){if(e)throw new o.default("Arg not supported with multiple helpers");i.extend(this.helpers,t)}else this.helpers[t]=e},unregisterHelper:function(t){delete this.helpers[t]},registerPartial:function(t,e){if("[object Object]"===i.toString.call(t))i.extend(this.partials,t);else{if(void 0===e)throw new o.default('Attempting to register a partial called "'+t+'" as undefined');this.partials[t]=e}},unregisterPartial:function(t){delete this.partials[t]},registerDecorator:function(t,e){if("[object Object]"===i.toString.call(t)){if(e)throw new o.default("Arg not supported with multiple decorators");i.extend(this.decorators,t)}else this.decorators[t]=e},unregisterDecorator:function(t){delete this.decorators[t]}};var c=s.default.log;e.log=c,e.createFrame=i.createFrame,e.logger=s.default},function(t,e,n){"use strict";var r,i,o,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(n,l){"object"===a(e)&&void 0!==t?l(e):(i=[e],void 0===(o="function"==typeof(r=l)?r.apply(e,i):r)||(t.exports=o))}(0,function(t){function e(t){return t===document.body||t===document.documentElement}function n(t,n){var r;if(e(t))r=0===n?t.clientLeft:t.clientTop;else{var i=t.getBoundingClientRect();r=0===n?i.left:i.top}return r}function r(t,n){return e(t)?0===n?window.innerWidth:window.innerHeight:0===n?t.clientWidth:t.clientHeight}function i(t,n,r){var i=0===n?"scrollLeft":"scrollTop",o=e(t);if(2===arguments.length)return o?document.body[i]||document.documentElement[i]:t[i];o?(document.documentElement[i]+=r,document.body[i]+=r):t[i]+=r}function o(t){var e=getComputedStyle(t);return t.scrollHeight>t.clientHeight&&("scroll"===e.overflowY||"auto"===e.overflowY)||t.scrollWidth>t.clientWidth&&("scroll"===e.overflowX||"auto"===e.overflowX)}function a(t,e,n){return t<n?-1:e-t<n?1:0}function l(t,e,n,r){return-1===t?Math.abs(e-r):1===t?Math.abs(n-e-r):0}function s(t,e,n){var r=0===t?n.scrollX:n.scrollY;return 1===e?r>=(0===t?n.scrollWidth-n.width:n.scrollHeight-n.height):-1!==e||r<=0}var u,c,d,f,h,p={threshold:75,velocityFn:function(t,e){var n=t/e;return n*n*n*e}},m={horizontal:0,vertical:0},v={x:0,y:0};function g(){u||(u=window.requestAnimationFrame(y))}function y(){var t=0,n=0,r=e(f);0!==m.horizontal&&(t=Math.round(p.velocityFn(v.x,p.threshold)*m.horizontal),i(f,0,t)),0!==m.vertical&&(n=Math.round(p.velocityFn(v.y,p.threshold)*m.vertical),i(f,1,n)),r?h(t,n):h(0,0),u=null,b(c,f,p.threshold,m,v)&&g()}function b(t,e,o,u,c){if(!t||!e)return!1;var d={x:n(e,0),y:n(e,1),width:r(e,0),height:r(e,1),scrollX:i(e,0),scrollY:i(e,1),scrollWidth:e.scrollWidth,scrollHeight:e.scrollHeight},f={x:t.x-d.x,y:t.y-d.y};return u.horizontal=a(f.x,d.width,o),u.vertical=a(f.y,d.height,o),u.horizontal&&s(0,u.horizontal,d)?u.horizontal=0:u.horizontal&&(c.x=l(u.horizontal,f.x,d.width,o)),u.vertical&&s(1,u.vertical,d)?u.vertical=0:u.vertical&&(c.y=l(u.vertical,f.y,d.height,o)),!(!u.horizontal&&!u.vertical)}var w=function(t,e,n,r){c=e,h=r,d!==n&&(f=function(t){do{if(!t)return;if(o(t))return t;if(t===document.documentElement)return null}while(t=t.parentNode);return null}(d=n)),b(c,f,p.threshold,m,v)?g():u&&(window.cancelAnimationFrame(u),u=null)};t.scrollBehaviourDragImageTranslateOverride=w,Object.defineProperty(t,"__esModule",{value:!0})})},function(t,e,n){"use strict";var r,i,o,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};!function(n,l){"object"==a(e)&&void 0!==t?l(e):(i=[e],void 0===(o="function"==typeof(r=l)?r.apply(e,i):r)||(t.exports=o))}(0,function(t){var e="dnd-poly-",n=["none","copy","copyLink","copyMove","link","linkMove","move","all"],r=["none","copy","move","link"],i=function(){var t=!1;try{var e=Object.defineProperty({},"passive",{get:function(){t=!0}});window.addEventListener("test",null,e)}catch(t){}return t}();function o(t){return t&&t.tagName}function a(t,e,n){void 0===n&&(n=!0),document.addEventListener(t,e,!!i&&{passive:n})}function l(t,e){document.removeEventListener(t,e)}function s(t,e,n,r){void 0===r&&(r=!1);var o=i?{passive:!0,capture:r}:r;return t.addEventListener(e,n,o),{off:function(){t.removeEventListener(e,n,o)}}}function u(t){return 0===t.length?0:t.reduce(function(t,e){return e+t},0)/t.length}function c(t,e){for(var n=0;n<t.changedTouches.length;n++)if(t.changedTouches[n].identifier===e)return!0;return!1}function d(t,e,n){for(var r=[],i=[],o=0;o<e.touches.length;o++){var a=e.touches[o];r.push(a[t+"X"]),i.push(a[t+"Y"])}n.x=u(r),n.y=u(i)}var f=["","-webkit-"];function h(t,e,n,r,i){void 0===i&&(i=!0);var o=e.x,a=e.y;r&&(o+=r.x,a+=r.y),i&&(o-=parseInt(t.offsetWidth,10)/2,a-=parseInt(t.offsetHeight,10)/2);for(var l="translate3d("+o+"px,"+a+"px, 0)",s=0;s<f.length;s++){var u=f[s]+"transform";t.style[u]=l+" "+n[s]}}var p=function(){function t(t,e){this.t=t,this.i=e,this.s=r[0]}return Object.defineProperty(t.prototype,"dropEffect",{get:function(){return this.s},set:function(t){0!==this.t.mode&&n.indexOf(t)>-1&&(this.s=t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"types",{get:function(){if(0!==this.t.mode)return Object.freeze(this.t.types)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"effectAllowed",{get:function(){return this.t.effectAllowed},set:function(t){2===this.t.mode&&n.indexOf(t)>-1&&(this.t.effectAllowed=t)},enumerable:!0,configurable:!0}),t.prototype.setData=function(t,e){if(2===this.t.mode){if(t.indexOf(" ")>-1)throw new Error("illegal arg: type contains space");this.t.data[t]=e,-1===this.t.types.indexOf(t)&&this.t.types.push(t)}},t.prototype.getData=function(t){if(1===this.t.mode||2===this.t.mode)return this.t.data[t]||""},t.prototype.clearData=function(t){if(2===this.t.mode){if(t&&this.t.data[t]){delete this.t.data[t];var e=this.t.types.indexOf(t);return void(e>-1&&this.t.types.splice(e,1))}this.t.data={},this.t.types=[]}},t.prototype.setDragImage=function(t,e,n){2===this.t.mode&&this.i(t,e,n)},t}();function m(t,e){return t?t===n[0]?r[0]:0===t.indexOf(n[1])||t===n[7]?r[1]:0===t.indexOf(n[4])?r[3]:t===n[6]?r[2]:r[1]:3===e.nodeType&&"A"===e.tagName?r[3]:r[1]}function v(t,e,n,r,i,o,a){void 0===o&&(o=!0),void 0===a&&(a=null);var l=function(t,e,n,r,i,o,a){void 0===a&&(a=null);var l=e.changedTouches[0],s=new Event(n,{bubbles:!0,cancelable:r});s.dataTransfer=o,s.relatedTarget=a,s.screenX=l.screenX,s.screenY=l.screenY,s.clientX=l.clientX,s.clientY=l.clientY,s.pageX=l.pageX,s.pageY=l.pageY;var u=t.getBoundingClientRect();return s.offsetX=s.clientX-u.left,s.offsetY=s.clientY-u.top,s}(e,n,t,o,document.defaultView,i,a),s=!e.dispatchEvent(l);return r.mode=0,s}function g(t,e){if(!t||t===n[7])return e;if(e===r[1]){if(0===t.indexOf(r[1]))return r[1]}else if(e===r[3]){if(0===t.indexOf(r[3])||t.indexOf("Link")>-1)return r[3]}else if(e===r[2]&&(0===t.indexOf(r[2])||t.indexOf("Move")>-1))return r[2];return r[0]}var y,b=function(){function t(t,e,n,r){this.h=t,this.o=e,this.u=n,this.l=r,this.v=0,this.p=null,this.g=null,this.m=t,this.I=t.changedTouches[0],this.j=this.S.bind(this),this.k=this.A.bind(this),a("touchmove",this.j,!1),a("touchend",this.k,!1),a("touchcancel",this.k,!1)}return t.prototype.O=function(){var t=this;this.v=1,this.C=r[0],this.D={data:{},effectAllowed:void 0,mode:3,types:[]},this.M={x:null,y:null},this.F={x:null,y:null};var e=this.u;if(this.N=new p(this.D,function(n,r,i){e=n,"number"!=typeof r&&"number"!=typeof i||(t.P={x:r||0,y:i||0})}),this.D.mode=2,this.N.dropEffect=r[0],v("dragstart",this.u,this.m,this.D,this.N))return this.v=3,this.T(),!1;d("page",this.m,this.F);var n,i=this.o.dragImageSetup(e);if(this.L=(n=i,f.map(function(t){var e=n.style[t+"transform"];return e&&"none"!==e?e.replace(/translate\(\D*\d+[^,]*,\D*\d+[^,]*\)\s*/g,""):""})),i.style.position="absolute",i.style.left="0px",i.style.top="0px",i.style.zIndex="999999",i.classList.add("dnd-poly-drag-image"),i.classList.add("dnd-poly-icon"),this._=i,!this.P)if(this.o.dragImageOffset)this.P={x:this.o.dragImageOffset.x,y:this.o.dragImageOffset.y};else if(this.o.dragImageCenterOnTouch){var o=getComputedStyle(e);this.P={x:0-parseInt(o.marginLeft,10),y:0-parseInt(o.marginTop,10)}}else{var a=e.getBoundingClientRect();o=getComputedStyle(e),this.P={x:a.left-this.I.clientX-parseInt(o.marginLeft,10)+a.width/2,y:a.top-this.I.clientY-parseInt(o.marginTop,10)+a.height/2}}return h(this._,this.F,this.L,this.P,this.o.dragImageCenterOnTouch),document.body.appendChild(this._),this.V=window.setInterval(function(){t.X||(t.X=!0,t.Y(),t.X=!1)},this.o.iterationInterval),!0},t.prototype.T=function(){this.V&&(clearInterval(this.V),this.V=null),l("touchmove",this.j),l("touchend",this.k),l("touchcancel",this.k),this._&&(this._.parentNode.removeChild(this._),this._=null),this.l(this.o,this.m,this.v)},t.prototype.S=function(t){var e=this;if(!1!==c(t,this.I.identifier)){if(this.m=t,0===this.v){var n=void 0;if(this.o.dragStartConditionOverride)try{n=this.o.dragStartConditionOverride(t)}catch(t){n=!1}else n=1===t.touches.length;return n?void(!0===this.O()&&(this.h.preventDefault(),t.preventDefault())):void this.T()}if(t.preventDefault(),d("client",t,this.M),d("page",t,this.F),this.o.dragImageTranslateOverride)try{var r=!1;if(this.o.dragImageTranslateOverride(t,{x:this.M.x,y:this.M.y},this.p,function(t,n){e._&&(r=!0,e.M.x+=t,e.M.y+=n,e.F.x+=t,e.F.y+=n,h(e._,e.F,e.L,e.P,e.o.dragImageCenterOnTouch))}),r)return}catch(t){}h(this._,this.F,this.L,this.P,this.o.dragImageCenterOnTouch)}},t.prototype.A=function(t){if(!1!==c(t,this.I.identifier)){if(this.o.dragImageTranslateOverride)try{this.o.dragImageTranslateOverride(void 0,void 0,void 0,function(){})}catch(t){}0!==this.v?(t.preventDefault(),this.v="touchcancel"===t.type?3:2):this.T()}},t.prototype.Y=function(){var t=this,n=this.C;this.D.mode=3,this.N.dropEffect=r[0];var i=v("drag",this.u,this.m,this.D,this.N);if(i&&(this.C=r[0]),i||2===this.v||3===this.v)return this.q(this.v)?void function(t,e,n,r){var i=getComputedStyle(t);if("hidden"!==i.visibility&&"none"!==i.display){e.classList.add("dnd-poly-snapback");var o=getComputedStyle(e),a=parseFloat(o.transitionDuration);if(isNaN(a)||0===a)r();else{var l=t.getBoundingClientRect(),s={x:l.left,y:l.top};s.x+=document.body.scrollLeft||document.documentElement.scrollLeft,s.y+=document.body.scrollTop||document.documentElement.scrollTop,s.x-=parseInt(i.marginLeft,10),s.y-=parseInt(i.marginTop,10);var u=parseFloat(o.transitionDelay),c=Math.round(1e3*(a+u));h(e,s,n,void 0,!1),setTimeout(r,c)}}else r()}(this.u,this._,this.L,function(){t.B()}):void this.B();var a=this.o.elementFromPoint(this.M.x,this.M.y),l=this.g;a!==this.p&&a!==this.g&&(this.p=a,null!==this.g&&(this.D.mode=3,this.N.dropEffect=r[0],v("dragexit",this.g,this.m,this.D,this.N,!1)),null===this.p?this.g=this.p:(this.D.mode=3,this.N.dropEffect=m(this.D.effectAllowed,this.u),v("dragenter",this.p,this.m,this.D,this.N)?(this.g=this.p,this.C=g(this.N.effectAllowed,this.N.dropEffect)):this.p!==document.body&&(this.g=document.body))),l!==this.g&&o(l)&&(this.D.mode=3,this.N.dropEffect=r[0],v("dragleave",l,this.m,this.D,this.N,!1,this.g)),o(this.g)&&(this.D.mode=3,this.N.dropEffect=m(this.D.effectAllowed,this.u),!1===v("dragover",this.g,this.m,this.D,this.N)?this.C=r[0]:this.C=g(this.N.effectAllowed,this.N.dropEffect)),n!==this.C&&this._.classList.remove(e+n);var s=e+this.C;this._.classList.add(s)},t.prototype.q=function(t){var e=this.C===r[0]||null===this.g||3===t;return e?o(this.g)&&(this.D.mode=3,this.N.dropEffect=r[0],v("dragleave",this.g,this.m,this.D,this.N,!1)):o(this.g)&&(this.D.mode=1,this.N.dropEffect=this.C,!0===v("drop",this.g,this.m,this.D,this.N)?this.C=this.N.dropEffect:this.C=r[0]),e},t.prototype.B=function(){this.D.mode=3,this.N.dropEffect=this.C,v("dragend",this.u,this.m,this.D,this.N,!1),this.v=2,this.T()},t}(),w={iterationInterval:150,tryFindDraggableTarget:function(t){var e=t.target;do{if(!1!==e.draggable&&e.getAttribute&&"true"===e.getAttribute("draggable"))return e}while((e=e.parentNode)&&e!==document.body)},dragImageSetup:function(t){var e=t.cloneNode(!0);return function t(e,n){if(1===e.nodeType){for(var r=getComputedStyle(e),i=0;i<r.length;i++){var o=r[i];n.style.setProperty(o,r.getPropertyValue(o),r.getPropertyPriority(o))}if(n.style.pointerEvents="none",n.removeAttribute("id"),n.removeAttribute("class"),n.removeAttribute("draggable"),"CANVAS"===n.nodeName){var a=e,l=n,s=a.getContext("2d").getImageData(0,0,a.width,a.height);l.getContext("2d").putImageData(s,0,0)}}if(e.hasChildNodes())for(i=0;i<e.childNodes.length;i++)t(e.childNodes[i],n.childNodes[i])}(t,e),e},elementFromPoint:function(t,e){return document.elementFromPoint(t,e)}};function x(t){if(!y){var e=w.tryFindDraggableTarget(t);if(e)try{y=new b(t,w,e,_)}catch(e){throw _(w,t,3),e}}}function E(t){var e=t.target,n=function(t){i.off(),o.off(),a.off(),clearTimeout(r)},r=window.setTimeout(function(){i.off(),o.off(),a.off(),x(t)},w.holdToDrag),i=s(e,"touchend",n),o=s(e,"touchcancel",n),a=s(window,"scroll",n,!0)}function _(t,e,n){if(0===n&&t.defaultActionOverride)try{t.defaultActionOverride(e),e.defaultPrevented}catch(t){}y=null}t.polyfill=function(t){if(t&&Object.keys(t).forEach(function(e){w[e]=t[e]}),!w.forceApply){var e=(n={dragEvents:"ondragstart"in document.documentElement,draggable:"draggable"in document.documentElement,userAgentSupportingNativeDnD:void 0},r=!!window.chrome||/chrome/i.test(navigator.userAgent),n.userAgentSupportingNativeDnD=!(/iPad|iPhone|iPod|Android/.test(navigator.userAgent)||r&&"ontouchstart"in document.documentElement),n);if(e.userAgentSupportingNativeDnD&&e.draggable&&e.dragEvents)return!1}var n,r;return w.holdToDrag?a("touchstart",E,!1):a("touchstart",x,!1),!0},Object.defineProperty(t,"__esModule",{value:!0})})},function(t,e,n){var r=n(2);t.exports=(r.default||r).template({compiler:[7,">= 4.0.0"],main:function(t,e,n,r,i){var o;return'<th>\n<div id="cell'+t.escapeExpression("function"==typeof(o=null!=(o=n.id||(null!=e?e.id:e))?o:n.helperMissing)?o.call(null!=e?e:t.nullContext||{},{name:"id",hash:{},data:i}):o)+'" class="stage">\n  <div class="base"></div>\n</div>\n</th>'},useData:!0})},function(t,e,n){var r=n(2);t.exports=(r.default||r).template({compiler:[7,">= 4.0.0"],main:function(t,e,n,r,i){var o,a=null!=e?e:t.nullContext||{},l=n.helperMissing,s=t.escapeExpression;return'<div class="stage">\n    <div id="piece'+s("function"==typeof(o=null!=(o=n.id||(null!=e?e.id:e))?o:l)?o.call(a,{name:"id",hash:{},data:i}):o)+'" class="'+s("function"==typeof(o=null!=(o=n.class||(null!=e?e.class:e))?o:l)?o.call(a,{name:"class",hash:{},data:i}):o)+'"> \n      <figure class="top"></figure>\n      <figure class="bottom"></figure>\n      <figure class="front"></figure>\n    </div>\n</div>'},useData:!0})},function(t,e,n){"use strict";var r,i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(t){"object"===("undefined"==typeof window?"undefined":i(window))&&(r=window)}t.exports=r},function(t,e,n){"use strict";(function(n){e.__esModule=!0,e.default=function(t){var e=void 0!==n?n:window,r=e.Handlebars;t.noConflict=function(){return e.Handlebars===t&&(e.Handlebars=r),t}},t.exports=e.default}).call(this,n(8))},function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.__esModule=!0,e.checkRevision=function(t){var e=t&&t[0]||1,n=a.COMPILER_REVISION;if(e!==n){if(e<n){var r=a.REVISION_CHANGES[n],i=a.REVISION_CHANGES[e];throw new o.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version ("+r+") or downgrade your runtime to an older version ("+i+").")}throw new o.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version ("+t[1]+").")}},e.template=function(t,e){if(!e)throw new o.default("No environment passed to template");if(!t||!t.main)throw new o.default("Unknown template object: "+(void 0===t?"undefined":r(t)));t.main.decorator=t.main_d,e.VM.checkRevision(t.compiler);var n={strict:function(t,e){if(!(e in t))throw new o.default('"'+e+'" not defined in '+t);return t[e]},lookup:function(t,e){for(var n=t.length,r=0;r<n;r++)if(t[r]&&null!=t[r][e])return t[r][e]},lambda:function(t,e){return"function"==typeof t?t.call(e):t},escapeExpression:i.escapeExpression,invokePartial:function(n,r,a){a.hash&&(r=i.extend({},r,a.hash),a.ids&&(a.ids[0]=!0));n=e.VM.resolvePartial.call(this,n,r,a);var l=e.VM.invokePartial.call(this,n,r,a);null==l&&e.compile&&(a.partials[a.name]=e.compile(n,t.compilerOptions,e),l=a.partials[a.name](r,a));if(null!=l){if(a.indent){for(var s=l.split("\n"),u=0,c=s.length;u<c&&(s[u]||u+1!==c);u++)s[u]=a.indent+s[u];l=s.join("\n")}return l}throw new o.default("The partial "+a.name+" could not be compiled when running in runtime-only mode")},fn:function(e){var n=t[e];return n.decorator=t[e+"_d"],n},programs:[],program:function(t,e,n,r,i){var o=this.programs[t],a=this.fn(t);return e||i||r||n?o=l(this,t,a,e,n,r,i):o||(o=this.programs[t]=l(this,t,a)),o},data:function(t,e){for(;t&&e--;)t=t._parent;return t},merge:function(t,e){var n=t||e;return t&&e&&t!==e&&(n=i.extend({},e,t)),n},nullContext:Object.seal({}),noop:e.VM.noop,compilerInfo:t.compiler};function s(e){var r=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],i=r.data;s._setup(r),!r.partial&&t.useData&&(i=function(t,e){e&&"root"in e||((e=e?a.createFrame(e):{}).root=t);return e}(e,i));var o=void 0,l=t.useBlockParams?[]:void 0;function c(e){return""+t.main(n,e,n.helpers,n.partials,i,l,o)}return t.useDepths&&(o=r.depths?e!=r.depths[0]?[e].concat(r.depths):r.depths:[e]),(c=u(t.main,c,n,r.depths||[],i,l))(e,r)}return s.isTop=!0,s._setup=function(r){r.partial?(n.helpers=r.helpers,n.partials=r.partials,n.decorators=r.decorators):(n.helpers=n.merge(r.helpers,e.helpers),t.usePartial&&(n.partials=n.merge(r.partials,e.partials)),(t.usePartial||t.useDecorators)&&(n.decorators=n.merge(r.decorators,e.decorators)))},s._child=function(e,r,i,a){if(t.useBlockParams&&!i)throw new o.default("must pass block params");if(t.useDepths&&!a)throw new o.default("must pass parent depths");return l(n,e,t[e],r,0,i,a)},s},e.wrapProgram=l,e.resolvePartial=function(t,e,n){t?t.call||n.name||(n.name=t,t=n.partials[t]):t="@partial-block"===n.name?n.data["partial-block"]:n.partials[n.name];return t},e.invokePartial=function(t,e,n){var r=n.data&&n.data["partial-block"];n.partial=!0,n.ids&&(n.data.contextPath=n.ids[0]||n.data.contextPath);var l=void 0;n.fn&&n.fn!==s&&function(){n.data=a.createFrame(n.data);var t=n.fn;l=n.data["partial-block"]=function(e){var n=arguments.length<=1||void 0===arguments[1]?{}:arguments[1];return n.data=a.createFrame(n.data),n.data["partial-block"]=r,t(e,n)},t.partials&&(n.partials=i.extend({},n.partials,t.partials))}();void 0===t&&l&&(t=l);if(void 0===t)throw new o.default("The partial "+n.name+" could not be found");if(t instanceof Function)return t(e,n)},e.noop=s;var i=function(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}(n(0)),o=function(t){return t&&t.__esModule?t:{default:t}}(n(1)),a=n(3);function l(t,e,n,r,i,o,a){function l(e){var i=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],l=a;return!a||e==a[0]||e===t.nullContext&&null===a[0]||(l=[e].concat(a)),n(t,e,t.helpers,t.partials,i.data||r,o&&[i.blockParams].concat(o),l)}return(l=u(n,l,t,a,r,o)).program=e,l.depth=a?a.length:0,l.blockParams=i||0,l}function s(){return""}function u(t,e,n,r,o,a){if(t.decorator){var l={};e=t.decorator(e,l,n,r&&r[0],o,a,r),i.extend(e,l)}return e}},function(t,e,n){"use strict";function r(t){this.string=t}e.__esModule=!0,r.prototype.toString=r.prototype.toHTML=function(){return""+this.string},e.default=r,t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0;var r=n(0),i={methodMap:["debug","info","warn","error"],level:"info",lookupLevel:function(t){if("string"==typeof t){var e=r.indexOf(i.methodMap,t.toLowerCase());t=e>=0?e:parseInt(t,10)}return t},log:function(t){if(t=i.lookupLevel(t),"undefined"!=typeof console&&i.lookupLevel(i.level)<=t){var e=i.methodMap[t];console[e]||(e="log");for(var n=arguments.length,r=Array(n>1?n-1:0),o=1;o<n;o++)r[o-1]=arguments[o];console[e].apply(console,r)}}};e.default=i,t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0;var r=n(0);e.default=function(t){t.registerDecorator("inline",function(t,e,n,i){var o=t;return e.partials||(e.partials={},o=function(i,o){var a=n.partials;n.partials=r.extend({},a,e.partials);var l=t(i,o);return n.partials=a,l}),e.partials[i.args[0]]=i.fn,o})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0,e.registerDefaultDecorators=function(t){r.default(t)};var r=function(t){return t&&t.__esModule?t:{default:t}}(n(13))},function(t,e,n){"use strict";e.__esModule=!0;var r=n(0);e.default=function(t){t.registerHelper("with",function(t,e){r.isFunction(t)&&(t=t.call(this));var n=e.fn;if(r.isEmpty(t))return e.inverse(this);var i=e.data;return e.data&&e.ids&&((i=r.createFrame(e.data)).contextPath=r.appendContextPath(e.data.contextPath,e.ids[0])),n(t,{data:i,blockParams:r.blockParams([t],[i&&i.contextPath])})})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t){t.registerHelper("lookup",function(t,e){return t&&t[e]})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0,e.default=function(t){t.registerHelper("log",function(){for(var e=[void 0],n=arguments[arguments.length-1],r=0;r<arguments.length-1;r++)e.push(arguments[r]);var i=1;null!=n.hash.level?i=n.hash.level:n.data&&null!=n.data.level&&(i=n.data.level),e[0]=i,t.log.apply(t,e)})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0;var r=n(0);e.default=function(t){t.registerHelper("if",function(t,e){return r.isFunction(t)&&(t=t.call(this)),!e.hash.includeZero&&!t||r.isEmpty(t)?e.inverse(this):e.fn(this)}),t.registerHelper("unless",function(e,n){return t.helpers.if.call(this,e,{fn:n.inverse,inverse:n.fn,hash:n.hash})})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0;var r=function(t){return t&&t.__esModule?t:{default:t}}(n(1));e.default=function(t){t.registerHelper("helperMissing",function(){if(1!==arguments.length)throw new r.default('Missing helper: "'+arguments[arguments.length-1].name+'"')})},t.exports=e.default},function(t,e,n){"use strict";var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.__esModule=!0;var i=n(0),o=function(t){return t&&t.__esModule?t:{default:t}}(n(1));e.default=function(t){t.registerHelper("each",function(t,e){if(!e)throw new o.default("Must pass iterator to #each");var n=e.fn,a=e.inverse,l=0,s="",u=void 0,c=void 0;function d(e,r,o){u&&(u.key=e,u.index=r,u.first=0===r,u.last=!!o,c&&(u.contextPath=c+e)),s+=n(t[e],{data:u,blockParams:i.blockParams([t[e],e],[c+e,null])})}if(e.data&&e.ids&&(c=i.appendContextPath(e.data.contextPath,e.ids[0])+"."),i.isFunction(t)&&(t=t.call(this)),e.data&&(u=i.createFrame(e.data)),t&&"object"===(void 0===t?"undefined":r(t)))if(i.isArray(t))for(var f=t.length;l<f;l++)l in t&&d(l,l,l===t.length-1);else{var h=void 0;for(var p in t)t.hasOwnProperty(p)&&(void 0!==h&&d(h,l-1),h=p,l++);void 0!==h&&d(h,l-1,!0)}return 0===l&&(s=a(this)),s})},t.exports=e.default},function(t,e,n){"use strict";e.__esModule=!0;var r=n(0);e.default=function(t){t.registerHelper("blockHelperMissing",function(e,n){var i=n.inverse,o=n.fn;if(!0===e)return o(this);if(!1===e||null==e)return i(this);if(r.isArray(e))return e.length>0?(n.ids&&(n.ids=[n.name]),t.helpers.each(e,n)):i(this);if(n.data&&n.ids){var a=r.createFrame(n.data);a.contextPath=r.appendContextPath(n.data.contextPath,n.name),n={data:a}}return o(e,n)})},t.exports=e.default},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}e.__esModule=!0,e.registerDefaultHelpers=function(t){i.default(t),o.default(t),a.default(t),l.default(t),s.default(t),u.default(t),c.default(t)};var i=r(n(21)),o=r(n(20)),a=r(n(19)),l=r(n(18)),s=r(n(17)),u=r(n(16)),c=r(n(15))},function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){if(t&&t.__esModule)return t;var e={};if(null!=t)for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e.default=t,e}e.__esModule=!0;var o=i(n(3)),a=r(n(11)),l=r(n(1)),s=i(n(0)),u=i(n(10)),c=r(n(9));function d(){var t=new o.HandlebarsEnvironment;return s.extend(t,o),t.SafeString=a.default,t.Exception=l.default,t.Utils=s,t.escapeExpression=s.escapeExpression,t.VM=u,t.template=function(e){return u.template(e,t)},t}var f=d();f.create=d,c.default(f),f.default=f,e.default=f,t.exports=e.default},function(t,e,n){var r=n(2);t.exports=(r.default||r).template({compiler:[7,">= 4.0.0"],main:function(t,e,n,r,i){var o,a=null!=e?e:t.nullContext||{},l=n.helperMissing,s=t.escapeExpression;return'<div class="stage">\n    <div id="piece'+s("function"==typeof(o=null!=(o=n.id||(null!=e?e.id:e))?o:l)?o.call(a,{name:"id",hash:{},data:i}):o)+'" class="'+s("function"==typeof(o=null!=(o=n.class||(null!=e?e.class:e))?o:l)?o.call(a,{name:"class",hash:{},data:i}):o)+'">\n      <figure class="back"></figure>\n      <figure class="top"></figure>\n      <figure class="bottom"></figure>\n      <figure class="left"></figure>\n      <figure class="right"></figure>\n      <figure class="front"></figure>\n    </div>\n</div>'},useData:!0})},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=a(n(24)),i=a(n(7)),o=a(n(6));function a(t){return t&&t.__esModule?t:{default:t}}e.default=function(){var t,e,n,a,l,s,u=["cylinder hole","cylinder hole dark","cube hole","cube hole dark","cylinder hole short","cylinder hole short dark","cube hole short","cube hole short dark","cylinder","cylinder dark","cube","cube dark","cylinder short","cylinder short dark","cube short","cube short dark"];function c(t){return[].concat.apply([],t)}function d(t){var e={};return e.row=Math.floor(t/4),e.col=t%4,e}return{start:function(){t=null,e=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),n=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),a=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),l=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),s=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]})},getAllPieces:function(){return u.reduce(function(t,e,n){return e.match("cube")?t+(0,r.default)({class:e,id:n}):t+(0,i.default)({class:e,id:n})},"")},getAllCells:function(){for(var t="",e=0;e<4;e++){for(var n="",r=0;r<4;r++)n+=(0,o.default)({id:4*e+r});t+="<tr>"+n+"</tr>"}return t},update:function(r,i){var o=d(Number(r.slice(4)));t=o,e[o.row][o.col]=1,i.match("cylinder")&&(n[o.row][o.col]=1),i.match("hole")&&(a[o.row][o.col]=1),i.match("dark")&&(l[o.row][o.col]=1),i.match("short")&&(s[o.row][o.col]=1)},alreadyPlaced:function(t){var n=d(Number(t.slice(4)));return 1==e[n.row][n.col]},quarto:function(){if(t){var r=[],i=[[t.row,0],[t.row,1],[t.row,2],[t.row,3]];4===i.reduce(function(t,n){return t+e[n[0]][n[1]]},0)&&r.push(i);var o=[[0,t.col],[1,t.col],[2,t.col],[3,t.col]];if(4===o.reduce(function(t,n){return t+e[n[0]][n[1]]},0)&&r.push(o),t.col===t.row){var u=[[0,0],[1,1],[2,2],[3,3]];4===u.reduce(function(t,n){return t+e[n[0]][n[1]]},0)&&r.push(u)}if(t.col+t.row===3){var d=[[0,3],[1,2],[2,1],[3,0]];4===d.reduce(function(t,n){return t+e[n[0]][n[1]]},0)&&r.push(d)}var f=[n,a,l,s].map(function(t){return function(t,e){return t.filter(function(t){var n=t.reduce(function(t,n){return t+e[n[0]][n[1]]},0);return 0==n||4==n})}.apply(null,[r,t])});return f=(f=c(c(f=f.filter(function(t){return t.length>0})))).map(function(t){return function(t){return 4*t[0]+t[1]}(t)}).filter(function(t,e,n){return n.indexOf(t)===e})}return[]}}}()},function(t,e,n){"use strict";var r=function(t){return t&&t.__esModule?t:{default:t}}(n(25)),i=n(5),o=n(4);!function(){var t=io.connect(window.location.hostname),e=document.getElementById("waitzone"),n=document.getElementById("messagebox"),a=document.getElementById("info"),l=document.getElementById("gameinfo"),s=document.getElementById("overlay"),u=document.getElementById("placezone"),c=document.getElementById("askreplay"),d={waitforjoin:"Waiting for a new player to join the game",waitforreplay:"Waiting for the other player to join the game",roomfull:"The game that you try to join is full. Please try another game",notexist:"The game that you try to join does not exist. Please try another game",waitformove:"Waiting for the other player to act",ready:"Game ready to start! Waiting for the other player to act",give:'Click a piece to give it to the other player or click <em id="quarto">Quarto!</em> here if you think you just made a line',place:"Drap the highlighted piece and drop on the desired cell",won:"You won!",lost:"You lost. The other player just found a Quarto",wrong:"No Quarto found with the piece that you just placed...",left:"The other player just left"},f=[];function h(){r.default.start(),e.classList.remove("selectable"),e.innerHTML=r.default.getAllPieces(),u.innerHTML=r.default.getAllCells()}function p(){s.classList.remove("hide"),c.classList.remove("hide"),c.addEventListener("click",m)}function m(e){var n=e.target;"left"==n.className?(h(),c.classList.add("hide"),c.removeEventListener("click",m),t.emit("replay",{room:room,replay:!0})):"right"==n.className&&(t.emit("replay",{room:room,replay:!1}),t.disconnect(),c.classList.add("hide"),c.removeEventListener("click",m))}function v(n){var r=n.target;"FIGURE"==r.nodeName&&((r=r.parentElement).setAttribute("draggable","true"),e.removeEventListener("click",v),e.classList.remove("selectable"),t.emit("given",{pieceid:r.id,room:room}),0===document.title.indexOf("*")&&(document.title=document.title.slice(1)))}function g(t){t.forEach(function(t){var e=document.getElementById("cell"+t);e.classList.add("highlight"),f.push(window.setTimeout(function(){e.classList.remove("highlight")},1e3)),f.push(window.setTimeout(function(){e.classList.add("highlight")},2e3))})}t.on("tell room",function(){t.emit("room name",{room:room})}),t.on("wait for other",function(){s.classList.remove("hide"),n.innerHTML=d.waitforjoin}),t.on("wait for replay",function(){f.forEach(clearTimeout),n.innerHTML=d.waitforreplay}),t.on("ready to start",function(){h(),n.innerHTML=d.ready}),t.on("room full",function(){n.innerHTML=d.roomfull}),t.on("not exist",function(){n.innerHTML=d.notexist}),t.on("pick one",function(){0!==document.title.indexOf("*")&&(document.title="*"+document.title),s.classList.add("hide"),n.innerHTML=d.give,e.addEventListener("click",v),e.classList.add("selectable")}),t.on("wait",function(){s.classList.remove("hide"),n.innerHTML=d.waitformove}),t.on("toplace",function(t){0!==document.title.indexOf("*")&&(document.title="*"+document.title),s.classList.add("hide"),function(t){document.getElementById(t).setAttribute("draggable","true")}(t.pieceid),n.innerHTML=d.place}),t.on("tochange",function(t){!function(t,e,n){r.default.update(e,n);var i=document.getElementById(t);i.removeAttribute("draggable");var o=document.getElementById(e);i.parentElement.removeChild(i),o.append(i)}(t.pieceid,t.cellid,t.classname)}),t.on("otherwon",function(t){g(t.pieceid),0!==document.title.indexOf("*")&&(document.title="*"+document.title),n.innerHTML=d.lost,f.push(window.setTimeout(function(){p(),document.title=document.title.slice(1)},3e3))}),t.on("player left",function(){0!==document.title.indexOf("*")&&(document.title="*"+document.title),f.forEach(clearTimeout),f=[],n.innerHTML=d.left,s.classList.remove("hide"),f.push(window.setTimeout(function(){n.innerHTML=d.waitforjoin,document.title=document.title.slice(1)},3e3))}),(0,i.polyfill)({dragImageTranslateOverride:o.scrollBehaviourDragImageTranslateOverride}),e.addEventListener("dragstart",function(t){var e=t.target;"FIGURE"==e.nodeName&&(e=e.parentElement),t.dataTransfer.setData("text",e.id)}),u.addEventListener("dragover",function(t){t.preventDefault();var e=t.target;"DIV"!==e.tagName?t.dataTransfer.dropEffect="none":(e.className.match("base")&&(e=e.parentElement),r.default.alreadyPlaced(e.id)&&(t.dataTransfer.dropEffect="none"))}),u.addEventListener("dragenter",function(t){if(t.preventDefault(),"DIV"==t.target.tagName){var e=t.target;e.className.match("base")&&(e=e.parentElement),r.default.alreadyPlaced(e.id)||e.classList.add("shine")}}),u.addEventListener("dragleave",function(t){if(t.preventDefault(),"DIV"==t.target.tagName){var e=t.target;e.className.match("base")&&(e=e.parentElement),r.default.alreadyPlaced(e.id)||e.classList.remove("shine")}}),u.addEventListener("drop",function(i){if(i.preventDefault(),"DIV"==i.target.tagName){var o=i.target;if(o.className.match("base")&&(o=o.parentElement),!r.default.alreadyPlaced(o.id)){o.classList.remove("shine");var a=i.dataTransfer.getData("text"),l=document.getElementById(a);l.removeAttribute("draggable"),o.append(l),n.innerHTML=d.give,t.emit("placed",{pieceid:a,cellid:o.id,classname:l.className,room:room}),r.default.update(o.id,l.className),e.addEventListener("click",v),e.classList.add("selectable")}}}),n.addEventListener("click",function(i){if("quarto"==i.target.id){var o=r.default.quarto();o.length>0?(0===document.title.indexOf("*")&&(document.title=document.title.slice(1)),g(o),n.innerHTML=d.won,e.removeEventListener("click",v),e.classList.remove("selectable"),t.emit("won",{pieceid:o,room:room}),f.push(window.setTimeout(function(){p()},3e3))):(n.innerHTML=d.wrong,f.push(window.setTimeout(function(){n.innerHTML=d.give},3e3)))}}),a.addEventListener("click",function(){l.classList.remove("hide")}),l.addEventListener("click",function(t){"close"==t.target.className&&l.classList.add("hide")}),h()}()}]);
//# sourceMappingURL=bundle.js.map