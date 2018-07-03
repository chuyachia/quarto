!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default=function(){var e,t,n,r,o,a,i=["cylinder hole","cylinder hole dark","cube hole","cube hole dark","cylinder hole short","cylinder hole short dark","cube hole short","cube hole short dark","cylinder","cylinder dark","cube","cube dark","cylinder short","cylinder short dark","cube short","cube short dark"],l=Handlebars.compile(document.getElementById("cubeTemplate").innerHTML),c=Handlebars.compile(document.getElementById("cylinderTemplate").innerHTML),u=Handlebars.compile(document.getElementById("cellTemplate").innerHTML);function d(e){return[].concat.apply([],e)}function s(e){var t={};return t.row=Math.floor(e/4),t.col=e%4,t}return{start:function(){e=null,t=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),n=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),r=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),o=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]}),a=Array.apply(null,Array(4)).map(function(){return[0,0,0,0]})},getAllPieces:function(){return i.reduce(function(e,t,n){return t.match("cube")?e+l({class:t,id:n}):e+c({class:t,id:n})},"")},getAllCells:function(){for(var e="",t=0;t<4;t++){for(var n="",r=0;r<4;r++)n+=u({id:4*t+r});e+="<tr>"+n+"</tr>"}return e},update:function(i,l){var c=s(Number(i.slice(4)));e=c,t[c.row][c.col]=1,l.match("cylinder")&&(n[c.row][c.col]=1),l.match("hole")&&(r[c.row][c.col]=1),l.match("dark")&&(o[c.row][c.col]=1),l.match("short")&&(a[c.row][c.col]=1)},alreadyPlaced:function(e){var n=s(Number(e.slice(4)));return 1==t[n.row][n.col]},quarto:function(){if(e){var i=[],l=[[e.row,0],[e.row,1],[e.row,2],[e.row,3]];4===l.reduce(function(e,n){return e+t[n[0]][n[1]]},0)&&i.push(l);var c=[[0,e.col],[1,e.col],[2,e.col],[3,e.col]];if(4===c.reduce(function(e,n){return e+t[n[0]][n[1]]},0)&&i.push(c),e.col===e.row){var u=[[0,0],[1,1],[2,2],[3,3]];4===u.reduce(function(e,n){return e+t[n[0]][n[1]]},0)&&i.push(u)}if(e.col+e.row===3){var s=[[0,3],[1,2],[2,1],[3,0]];4===s.reduce(function(e,n){return e+t[n[0]][n[1]]},0)&&i.push(s)}var f=[n,r,o,a].map(function(e){return function(e,t){return e.filter(function(e){var n=e.reduce(function(e,n){return e+t[n[0]][n[1]]},0);return 0==n||4==n})}.apply(null,[i,e])});return f=(f=d(d(f=f.filter(function(e){return e.length>0})))).map(function(e){return function(e){return 4*e[0]+e[1]}(e)}).filter(function(e,t,n){return n.indexOf(e)===t})}return[]}}}()},function(e,t,n){"use strict";var r=function(e){return e&&e.__esModule?e:{default:e}}(n(0));!function(){var e=io.connect("https://quarto-game-ccyqc.c9users.io/"),t=document.getElementById("waitzone"),n=document.getElementById("messagebox"),o=document.getElementById("overlay"),a=document.getElementById("placezone"),i=document.getElementById("modal"),l={waitforjoin:"Waiting for the other player to join the game",roomfull:"The game that you try to join is full. Please try another game",notexist:"The game that you try to join does not exist. Please try another game",waitformove:"Waiting for the other player to act",ready:"Game ready to start! Waiting for the other player to act",give:'Click a piece to give it to the other player or click <em id="quarto">Quarto!</em> here if you think you just made a line.',place:"Drap the highlighted piece and drop on the desired cell.",won:"You won!",lost:"The other player just found a Quarto. You lost...",wrong:"No Quarto found with the piece that you just placed...",left:"The other player just left",replay:"<button id='replay'>Play again</button><button id='leave'>Leave</button>"};function c(){r.default.start(),t.classList.remove("selectable"),t.innerHTML=r.default.getAllPieces(),a.innerHTML=r.default.getAllCells()}function u(t){var n=t.target;"left"==n.className?(c(),i.classList.add("hide"),i.removeEventListener("click",u),e.emit("replay",{room:room})):"right"==n.className&&(e.disconnect(),i.classList.add("hide"),i.removeEventListener("click",u))}function d(r){var a=r.target;"FIGURE"==a.nodeName&&((a=a.parentElement).setAttribute("draggable","true"),t.removeEventListener("click",d),t.classList.remove("selectable"),e.emit("given",{pieceid:a.id,room:room}),n.innerHTML=l.waitformove,o.classList.remove("hide"))}function s(e){e.forEach(function(e){document.getElementById("cell"+e).classList.add("highlight")})}e.on("tell room",function(){console.log("tell room"),e.emit("room name",{room:room})}),e.on("wait for other",function(){console.log("Created a new game"),n.innerHTML=l.waitforjoin}),e.on("ready to start",function(){console.log("Game ready to start!"),o.classList.add("hide"),n.innerHTML=l.ready}),e.on("room full",function(){n.innerHTML=l.roomfull}),e.on("not exist",function(){n.innerHTML=l.notexist}),e.on("pick one",function(){console.log("pick one"),n.innerHTML=l.give,t.addEventListener("click",d),t.classList.add("selectable")}),e.on("wait",function(){n.innerHTML=l.waitformove}),e.on("toplace",function(e){o.classList.add("hide"),function(e){document.getElementById(e).setAttribute("draggable","true")}(e.pieceid),n.innerHTML=l.place}),e.on("tochange",function(e){!function(e,t,n){r.default.update(t,n);var o=document.getElementById(e);o.removeAttribute("draggable");var a=document.getElementById(t);o.parentElement.removeChild(o),a.append(o)}(e.pieceid,e.cellid,e.classname)}),e.on("otherwon",function(e){s(e.pieceid),n.innerHTML=l.lost,window.setTimeout(function(){o.classList.remove("hide"),i.classList.remove("hide"),i.addEventListener("click",u)},3e3)}),e.on("player left",function(){n.innerHTML=l.left,c(),o.classList.remove("hide"),window.setTimeout(function(){n.innerHTML=l.waitforjoin},3e3)}),t.addEventListener("dragstart",function(e){var t=e.target;"FIGURE"==t.nodeName&&(t=t.parentElement),e.dataTransfer.setData("text",t.id)}),a.addEventListener("dragover",function(e){e.preventDefault();var t=e.target;"DIV"!==t.tagName?e.dataTransfer.dropEffect="none":(t.className.match("base")&&(t=t.parentElement),r.default.alreadyPlaced(t.id)&&(e.dataTransfer.dropEffect="none"))}),a.addEventListener("dragenter",function(e){if(e.preventDefault(),"DIV"==e.target.tagName){var t=e.target;t.className.match("base")&&(t=t.parentElement),r.default.alreadyPlaced(t.id)||t.classList.add("shine")}}),a.addEventListener("dragleave",function(e){if(e.preventDefault(),"DIV"==e.target.tagName){var t=e.target;t.className.match("base")&&(t=t.parentElement),r.default.alreadyPlaced(t.id)||t.classList.remove("shine")}}),a.addEventListener("drop",function(o){if(o.preventDefault(),"DIV"==o.target.tagName){var a=o.target;if(a.className.match("base")&&(a=a.parentElement),!r.default.alreadyPlaced(a.id)){a.classList.remove("shine");var i=o.dataTransfer.getData("text"),c=document.getElementById(i);c.removeAttribute("draggable"),a.append(c),n.innerHTML=l.give,e.emit("placed",{pieceid:i,cellid:a.id,classname:c.className,room:room}),r.default.update(a.id,c.className),t.addEventListener("click",d),t.classList.add("selectable")}}}),n.addEventListener("click",function(a){if("quarto"==a.target.id){var c=r.default.quarto();c.length>0?(s(c),n.innerHTML=l.won,t.removeEventListener("click",d),t.classList.remove("selectable"),e.emit("won",{pieceid:c,room:room}),window.setTimeout(function(){o.classList.remove("hide"),i.classList.remove("hide"),i.addEventListener("click",u)},3e3)):(n.innerHTML=l.wrong,window.setTimeout(function(){n.innerHTML=l.give},3e3))}}),c()}()}]);
//# sourceMappingURL=bundle.js.map