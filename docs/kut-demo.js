require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({28:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.KUT_ID="data-kutid",exports.KUT_RESERVED_PROPS={key:!0},exports.CUT_ON_REGEX=/^on/;var e=Object.keys(window||{}).filter(function(e){return exports.CUT_ON_REGEX.test(e)});exports.KUT_SUPPORTED_EVENTS=e.map(function(e){return e.replace(exports.CUT_ON_REGEX,"")}),exports.KUT_SUPPORTED_EVENT_HANDLERS={},e.forEach(function(e){exports.KUT_SUPPORTED_EVENT_HANDLERS[e]=!0});
},{}],23:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./constant");function r(r,t){for(var l=[],a=2;a<arguments.length;a++)l[a-2]=arguments[a];var n={children:l=l.length?[].concat.apply([],l):[""]},o=null;if(t){for(var c in null!=t.key&&(o=(""+t.key).replace(/:/g,"_")),t)Object.hasOwnProperty.call(t,c)&&!e.KUT_RESERVED_PROPS[c]&&(n[c]=t[c]);if(r&&r.defaultProps){var p=r.defaultProps;for(var c in p)Object.hasOwnProperty.call(p,c)&&!e.KUT_RESERVED_PROPS[c]&&null==n[c]&&(n[c]=p[c])}}return{type:r,key:o,props:n}}exports.createElement=r;
},{"./constant":28}],29:[function(require,module,exports) {
"use strict";var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};Object.defineProperty(exports,"__esModule",{value:!0});var r=require("./constant");function e(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];if(0===t.length)return null;for(var e=t[0],n=1;n<t.length;++n)for(var o in t[n])Object.hasOwnProperty.call(t[n],o)&&(e[o]=t[n][o]);return e}function n(t){var r=/[:]\w+$/;return r.test(t)&&t.replace(r,"")}function o(t){return document.querySelector("["+r.KUT_ID+'="'+t+'"]')}function i(t){if(""===t)return document.createTextNode("");var r=document.createElement("div");return r.innerHTML=t,r.firstChild}function a(r){var e="";return null==r||("object"===(void 0===r?"undefined":t(r))?e+=Object.keys(r).filter(function(t){return r[t]}).join(" "):Array.isArray(r)?e+=r.join(" "):e+=r.toString()),e.trim()}function s(r){var e="";if(null==r);else if("object"===(void 0===r?"undefined":t(r)))for(var n in r)Object.hasOwnProperty.call(r,n)&&(e+=n.replace(/[A-Z]/g,function(t){return"-"+t.toLowerCase()})+": "+r[n]+"; ");else e+=r.toString();return e.trim()}exports.assign=e,exports.getParentID=n,exports.getNode=o,exports.createNode=i,exports.getClassString=a,exports.getStyleString=s;var u=function(){function t(){this._didMountHandlers=[]}return t.prototype.add=function(t){this._didMountHandlers.push(t)},t.prototype.exec=function(){for(;this._didMountHandlers.length;){this._didMountHandlers.pop()()}},t}();exports.DidMountSet=u,exports.didMountSet=new u;var p=function(){function t(t){this._arr=[],this._compare=t}return Object.defineProperty(t.prototype,"length",{get:function(){return this._arr.length},enumerable:!0,configurable:!0}),t.prototype.push=function(t){this._arr.push(t),this._promote(this._arr.length-1)},t.prototype.pop=function(){var t;return this._arr.length>1?(t=this._arr[0],this._arr[0]=this._arr.pop(),this._heapify(0)):t=this._arr.pop(),t},t.prototype._heapify=function(t){var r,e=this._left(t),n=this._right(t),o=t;this._arr[e]&&this._compare(this._arr[e],this._arr[t])&&(o=e),this._arr[n]&&this._compare(this._arr[n],this._arr[t])&&(o=n),o!==t&&(r=[this._arr[o],this._arr[t]],this._arr[t]=r[0],this._arr[o]=r[1],this._heapify(o))},t.prototype._promote=function(t){for(var r,e=this._parent(t);this._arr[e]&&this._compare(this._arr[e],this._arr[t]);)r=[this._arr[e],this._arr[t]],this._arr[t]=r[0],this._arr[e]=r[1],t=e,e=this._parent(t)},t.prototype._parent=function(t){return Math.floor((t+1)/2)-1},t.prototype._left=function(t){return 2*(t+1)-1},t.prototype._right=function(t){return 2*(t+1)},t}();exports.Heap=p;
},{"./constant":28}],24:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./util"),o=function(){function o(t){this.state={},this.update=function(){},this.props=t}return o.prototype.setState=function(o){this.state=t.assign({},this.state,o),this.update()},o.prototype.forceUpdate=function(){this.update()},o.prototype.render=function(t){return void 0===t&&(t=this.props),null},o.prototype.componentWillMount=function(){},o.prototype.componentDidMount=function(){},o.prototype.componentWillReceiveProps=function(t){},o.prototype.shouldComponentUpdate=function(t,o){return!0},o.prototype.componentWillUpdate=function(t,o){},o.prototype.componentDidUpdate=function(){},o.prototype.componentWillUnmount=function(){},o}();exports.Component=o;
},{"./util":29}],36:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./util"),e=function(){function e(){this._map={},this._arr=new t.Heap(function(t,e){return t.split(":").length<e.split(":").length})}return Object.defineProperty(e.prototype,"length",{get:function(){return this._arr.length},enumerable:!0,configurable:!0}),e.prototype.push=function(t){var e=t.instance.kutId;this._map[e]||this._arr.push(e),this._map[e]=t},e.prototype.pop=function(){var t=this._arr.pop(),e=this._map[t];return delete this._map[t],e},e}(),n=function(){function t(){this._dirtyInstanceSet=new e,this._isBatchUpdating=!1}return t.prototype.enqueueUpdate=function(t,e,n){this._dirtyInstanceSet.push({instance:t,element:e,callback:n}),this._isBatchUpdating||this._runBatchUpdate()},t.prototype._runBatchUpdate=function(){var t=this;this._isBatchUpdating=!0,requestAnimationFrame(function(){for(;t._dirtyInstanceSet.length;){var e=t._dirtyInstanceSet.pop(),n=e.instance,i=e.element,r=e.callback;n.kutId&&(n.update(i),r&&r())}t._isBatchUpdating=!1})},t}();exports.Reconciler=n,exports.reconciler=new n;
},{"./util":29}],34:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./renderer"),n=require("./util"),r=require("./reconciler");function t(n,t){var i={};n.forEach(function(e,n){return i[e.key]=e});var o=[];t.forEach(function(n,t){var s=null!=n.key?"k_"+n.key:""+t,u=i[s];if(u&&u.shouldReceive(n))r.reconciler.enqueueUpdate(u,n),o.push(u);else{var a=e.instantiate(n);a.index=t,o.push(a)}});for(var s=[],u=[],a=-1,p=n.length,d=0;d<o.length;++d){var h=o[d],c=i[h.key];c===h?(c.index<a&&s.push({type:"move",inst:c,index:a}),a=Math.max(c.index,a)):(c&&s.push({type:"remove",inst:c}),s.push({type:"insert",inst:h,index:a}));var f=o[o.length-d-1],v=i[f.key];v===f?(v.index>p&&u.push({type:"move",inst:v,index:p}),p=Math.min(v.index,p)):(v&&u.push({type:"remove",inst:v}),u.push({type:"insert",inst:f,index:p}))}var l={};for(var y in o.forEach(function(e,n){return l[e.key]=e}),i)l[y]||(s.push({type:"remove",inst:i[y]}),u.push({type:"remove",inst:i[y]}));return o.forEach(function(e,n){return e.index=n}),n.length=0,n.push.apply(n,o),s.length<u.length?{ops:s,dir:"forward"}:{ops:u,dir:"backward"}}function i(e,r){var t=n.getNode(e),i=r.ops,o=r.dir,s=0;i.forEach(function(r){var i="forward"===o?r.index+1+s:r.index;if("remove"===r.type)r.inst.unmount();else if("insert"===r.type){++s;var u=r.inst.mount(e+":"+r.inst.key),a=n.createNode(u),p=t.children[i];t.insertBefore(a,p),n.didMountSet.exec()}else{a=r.inst.node,p=t.children[i];t.insertBefore(a,p)}})}exports.diff=t,exports.patch=i;
},{"./renderer":25,"./util":29,"./reconciler":36}],35:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./constant"),t=require("./util"),n=function(){function n(){var n=this;this._eventListeners={},document&&e.KUT_SUPPORTED_EVENTS.forEach(function(r){document.addEventListener(r,function(s){for(var i=s.target.getAttribute&&s.target.getAttribute(e.KUT_ID);i;){var o=n._eventListeners[i]&&n._eventListeners[i][r];o&&o(s),i=t.getParentID(i)}})})}return n.prototype.get=function(e,t){return this._eventListeners[e][t]},n.prototype.set=function(e,t,n){this._eventListeners[e]||(this._eventListeners[e]={}),this._eventListeners[e][t]=n},n.prototype.del=function(e,t){this._eventListeners[e]&&delete this._eventListeners[e][t]},n.prototype.delAll=function(e){delete this._eventListeners[e]},n}();exports.EventListenerSet=n,exports.eventListenerSet=new n;
},{"./constant":28,"./util":29}],30:[function(require,module,exports) {
"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./renderer"),n=require("./diff"),o=require("./constant"),i=require("./event"),r=require("./util"),s=require("./reconciler"),l=function(){function e(e){this.index=0,this._element=""+e}return Object.defineProperty(e.prototype,"key",{get:function(){return""+this.index},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"node",{get:function(){return r.getNode(this.kutId)},enumerable:!0,configurable:!0}),e.prototype.mount=function(e){return this.kutId=e,"<span "+o.KUT_ID+'="'+e+'" >'+this._element+"</span>"},e.prototype.shouldReceive=function(e){return"number"==typeof e||"string"==typeof e},e.prototype.update=function(e){e=null==e?this._element:""+e,this._element!==e&&(this._element=e,this.node.innerText=this._element)},e.prototype.unmount=function(){i.eventListenerSet.delAll(this.kutId),r.getNode(this.kutId).remove(),delete this.kutId,delete this.index,delete this._element},e}();exports.TextInstance=l;var u=function(){function l(e){this.index=0,this._element=e}return Object.defineProperty(l.prototype,"key",{get:function(){return null!=this._element.key?"k_"+this._element.key:""+this.index},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"node",{get:function(){return r.getNode(this.kutId)},enumerable:!0,configurable:!0}),l.prototype.mount=function(e){var n=this;this.kutId=e;var s="<"+this._element.type+" "+o.KUT_ID+'="'+e+'" ';null!=this._element.key&&(s+='key="'+this._element.key+'" ');var l=this._element.props;for(var u in l)"children"===u||("className"===u?s+='class="'+r.getClassString(l.className)+'" ':"style"===u?s+='style="'+r.getStyleString(l.style)+'" ':o.KUT_SUPPORTED_EVENT_HANDLERS[u.toLowerCase()]&&"function"==typeof l[u]?i.eventListenerSet.set(e,u.toLowerCase().replace(o.CUT_ON_REGEX,""),l[u]):s+=u+'="'+l[u]+'" ');return s+=">",this._childInstances=[],this._element.props.children.forEach(function(o,i){var r=t.instantiate(o);r.index=i,s+=r.mount(e+":"+r.key),n._childInstances.push(r)}),s+="</"+this._element.type+">"},l.prototype.shouldReceive=function(t){return"object"===(void 0===t?"undefined":e(t))&&t.type===this._element.type&&t.key===this._element.key},l.prototype.update=function(e){e=null==e?this._element:e;var t=r.getNode(this.kutId),l=this._element.props,u=e.props;for(var p in u)if("children"!==p)if("className"===p){var c=r.getClassString(u.className);t.className!==c&&(t.className=c)}else if("style"===p){var d=r.getStyleString(u.style);t.style.cssText!==d&&(t.style.cssText=d)}else if("value"===p){var h=u.value;t.value!==h&&(t.value=h)}else if(o.KUT_SUPPORTED_EVENT_HANDLERS[p.toLowerCase()]&&"function"==typeof u[p]){var a=p.toLowerCase().replace(o.CUT_ON_REGEX,""),m=i.eventListenerSet.get(this.kutId,a),_=u[p];m!==_&&i.eventListenerSet.set(this.kutId,a,_)}else{var f=u[p];t.getAttribute(p)!==f&&t.setAttribute(p,f)}for(var p in l)null==u[p]&&(o.KUT_SUPPORTED_EVENT_HANDLERS[p.toLowerCase()]&&"function"==typeof u[p]?i.eventListenerSet.del(this.kutId,p.toLowerCase().replace(o.CUT_ON_REGEX,"")):t.removeAttribute(p));var y=this._childInstances,v=e.props.children;if(1===y.length&&1===v.length&&y[0].shouldReceive(v[0]))s.reconciler.enqueueUpdate(y[0],v[0]);else{var k=n.diff(y,v);n.patch(this.kutId,k)}this._element=e},l.prototype.unmount=function(){i.eventListenerSet.delAll(this.kutId),this._childInstances.forEach(function(e){return e.unmount()}),r.getNode(this.kutId).remove(),delete this.kutId,delete this.index,delete this._element,delete this._childInstances},l}();exports.DOMInstance=u;var p=function(){function n(e){this.index=0,this._element=e}return Object.defineProperty(n.prototype,"key",{get:function(){return null!=this._element.key?"k_"+this._element.key:""+this.index},enumerable:!0,configurable:!0}),Object.defineProperty(n.prototype,"node",{get:function(){return r.getNode(this.kutId)},enumerable:!0,configurable:!0}),n.prototype.mount=function(e){var n=this;this.kutId=e;var o=this._element.type;this._component=new o(this._element.props),this._component.componentWillMount(),this._component.update=function(){return s.reconciler.enqueueUpdate(n,null)};var i=this._component.render();this._renderedInstance=t.instantiate(i);var l=this._renderedInstance.mount(e);return r.didMountSet.add(this._component.componentDidMount.bind(this._component)),l},n.prototype.shouldReceive=function(t){return"object"===(void 0===t?"undefined":e(t))&&t.type===this._element.type&&t.key===this._element.key},n.prototype.update=function(e){e=null==e?this._element:e,this._element!==e&&this._component.componentWillReceiveProps(e.props);var t=this._component.props=e.props,n=this._component.state;if(this._component.shouldComponentUpdate(t,n)){this._component.componentWillUpdate(t,n);var o=this._component.render();s.reconciler.enqueueUpdate(this._renderedInstance,o,this._component.componentDidUpdate.bind(this._component))}this._element=e},n.prototype.unmount=function(){this._component.componentWillUnmount(),i.eventListenerSet.delAll(this.kutId),this._renderedInstance.unmount(),r.getNode(this.kutId).remove(),delete this.kutId,delete this.index,delete this._element,delete this._component,delete this._renderedInstance},n}();exports.ComponentInstance=p;
},{"./renderer":25,"./diff":34,"./constant":28,"./event":35,"./util":29,"./reconciler":36}],25:[function(require,module,exports) {
"use strict";var e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};Object.defineProperty(exports,"__esModule",{value:!0});var t=require("./component"),n=require("./instance"),o=require("./util");function r(o){var r=null;return"number"==typeof o||"string"==typeof o?r=new n.TextInstance(o):"string"==typeof o.type?r=new n.DOMInstance(o):e(o.type)===e(t.Component)&&(r=new n.ComponentInstance(o)),r}function u(e,t){var n=r(e).mount("kut");t.innerHTML=n,o.didMountSet.exec()}exports.instantiate=r,exports.render=u;
},{"./component":24,"./instance":30,"./util":29}],17:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./element"),r=require("./component"),t=require("./renderer"),n={createElement:e.createElement,Component:r.Component,render:t.render};window&&(window.Kut=n),exports.default=n;
},{"./element":23,"./component":24,"./renderer":25}],11:[function(require,module,exports) {
"use strict";module.exports=require("./dist/lib/kut.js");
},{"./dist/lib/kut.js":17}],31:[function(require,module,exports) {

},{}],18:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),t=require("../../../index"),r=n(t);function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function u(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Banner.less");var l=function(t){function n(e){return a(this,n),o(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return u(n,r.default.Component),e(n,[{key:"render",value:function(){return r.default.createElement("header",{className:"Banner"},r.default.createElement("h1",{className:"title"},"Kut"),r.default.createElement("p",{className:"desc"},"数据驱动的前端视图渲染库"),r.default.createElement("div",{className:"link"},r.default.createElement("a",{href:"https://www.npmjs.com/package/kut"},r.default.createElement("img",{src:"https://img.shields.io/npm/v/kut.svg?style=flat-square",alt:""})),r.default.createElement("a",{href:"https://github.com/Siubaak/kut"},r.default.createElement("img",{src:"https://img.shields.io/github/stars/Siubaak/kut.svg?style=flat-square&label=Stars",alt:""}))))}}]),n}();exports.default=l;
},{"../../../index":11,"./Banner.less":31}],19:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),t=require("../../../index"),r=n(t);function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Nav.less");var a=function(t){function n(e){return o(this,n),u(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return i(n,r.default.Component),e(n,[{key:"render",value:function(){return r.default.createElement("nav",{className:"Nav"},r.default.createElement("div",{className:{nav:!0,fix:this.props.fix}},this.props.children))}}]),n}();exports.default=a;
},{"../../../index":11,"./Nav.less":31}],20:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),t=require("../../../index"),n=r(t);function r(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Content.less");var a=function(t){function r(e){return o(this,r),u(this,(r.__proto__||Object.getPrototypeOf(r)).call(this,e))}return i(r,n.default.Component),e(r,[{key:"render",value:function(){return n.default.createElement("div",{className:"Content"},n.default.createElement("div",{className:{top:this.props.fix}},this.props.children))}}]),r}();exports.default=a;
},{"../../../index":11,"./Content.less":31}],22:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),t=require("../../../index"),n=a(t);function a(e){return e&&e.__esModule?e:{default:e}}function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Demo.less");var l=0,u=function(t){function a(e){o(this,a);var t=i(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={input:"",todos:[{key:-1,item:"给笔记本电脑清灰"},{key:-2,item:"继续学习React源码"},{key:-3,item:"补番《紫罗兰永恒公园》"},{key:-4,item:"完成课程论文第二章"},{key:-5,item:"买洗发水和沐浴露"}]},t}return s(a,n.default.Component),e(a,[{key:"handleInput",value:function(e){this.setState({input:e.target.value})}},{key:"handleAdd",value:function(e){if(""!==this.state.input){var t={key:l++,item:this.state.input},n=[].concat(r(this.state.todos));n.push(t),this.setState({todos:n,input:""})}}},{key:"handleRan",value:function(e){for(var t=[].concat(r(this.state.todos)),n=[];t.length;){var a=Math.floor(Math.random()*t.length);n.push(t[a]),t.splice(a,1)}this.setState({todos:n})}},{key:"handleDel",value:function(e){var t=[].concat(r(this.state.todos));t.splice(e,1),this.setState({todos:t})}},{key:"render",value:function(){var e=this;return n.default.createElement("div",{className:"Demo"},n.default.createElement("p",{className:"desc"},"待办事项"),n.default.createElement("div",{className:"input-box"},n.default.createElement("input",{className:"input",onInput:this.handleInput.bind(this),value:this.state.input}),n.default.createElement("button",{className:"add",onClick:this.handleAdd.bind(this)},"添加"),n.default.createElement("button",{className:"add",onClick:this.handleRan.bind(this)},"打乱")),n.default.createElement("ul",{className:"list"},this.state.todos.length?this.state.todos.map(function(t,a){return n.default.createElement("li",{className:"item",key:t.key},t.item,n.default.createElement("button",{className:"del",onClick:function(){return e.handleDel(a)}},"完成"))}):n.default.createElement("li",{className:"item"},"无")))}}]),a}();exports.default=u;
},{"../../../index":11,"./Demo.less":31}],21:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),t=require("../../../index"),r=n(t);function n(e){return e&&e.__esModule?e:{default:e}}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function a(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./Footer.less");var i=function(t){function n(e){return o(this,n),u(this,(n.__proto__||Object.getPrototypeOf(n)).call(this,e))}return a(n,r.default.Component),e(n,[{key:"render",value:function(){return r.default.createElement("footer",{className:"Footer"},r.default.createElement("a",{className:"desc",href:"https://github.com/Siubaak/kut"},"Github - Kut"))}}]),n}();exports.default=i;
},{"../../../index":11,"./Footer.less":31}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),t=require("../index"),n=m(t),a=require("./components/Banner"),l=m(a),r=require("./components/Nav"),c=m(r),o=require("./components/Content"),i=m(o),u=require("./components/Demo"),s=m(u),f=require("./components/Footer"),d=m(f);function m(e){return e&&e.__esModule?e:{default:e}}function p(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function h(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function E(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}require("./App.less");var y=function(t){function a(e){p(this,a);var t=h(this,(a.__proto__||Object.getPrototypeOf(a)).call(this,e));return t.state={fix:!1},t}return E(a,n.default.Component),e(a,[{key:"componentDidMount",value:function(){var e=this;window.addEventListener("scroll",function(t){window.pageYOffset>400&&!e.state.fix?e.setState({fix:!0}):window.pageYOffset<=400&&e.state.fix&&e.setState({fix:!1})})}},{key:"render",value:function(){return n.default.createElement("div",{className:"App"},n.default.createElement(l.default,null),n.default.createElement(c.default,{fix:this.state.fix},n.default.createElement("a",{className:{tab:!0,color:this.state.fix},href:"#intro"},"介绍"),n.default.createElement("a",{className:{tab:!0,color:this.state.fix},href:"#demo"},"示例"),n.default.createElement("a",{className:{tab:!0,color:this.state.fix},href:"#docs"},"文档")),n.default.createElement(i.default,{fix:this.state.fix},n.default.createElement("div",{id:"intro",className:"anchor"}),n.default.createElement("div",{className:"item"},n.default.createElement("h1",{className:"title"},"介绍"),n.default.createElement("p",{className:"desc indent"},"Kut，一个简单的React-Like的前端视图渲染库，是在学习React源码时造的轮子。目前Kut支持的方法仅有两个，即createElement、render，同时也支持组件化开发，即Component类。已经能满足部分开发需求，这个网页本身就是基于Kut构建的，性能还行。"),n.default.createElement("p",{className:"desc indent"},"由于是参考（抄）的React，所以Kut基本的实现逻辑和React是相似的，Kut进行了改进的一个地方是diff算法。React的diff算法我称其为前向diff，这篇",n.default.createElement("a",{href:"https://zhuanlan.zhihu.com/p/20346379"},"文章"),"讲得很好，我就不赘述了。对于把元素从列表中底部挪到顶部的做法，React的前向diff更新操作过多会影响性能，而Kut引入了后向diff，并取前向diff和后向diff的较优结果进行更新，从而提升性能（后面发现有些项目也是这么做的）。大家可以对示例中的待办事项进行添加、打乱来体验。"),n.default.createElement("p",{className:"desc indent"},"由衷感叹一下React实在是太强大了，特别是Fiber。接下来我会慢慢的支持Context、Portal等特性。欢迎大家Pull Request和Star。学习过程中看到的项目有",n.default.createElement("a",{href:"https://github.com/facebook/react"},"React"),"、",n.default.createElement("a",{href:"https://github.com/CodeFalling/react-tiny"},"React-Tiny"),"、",n.default.createElement("a",{href:"https://github.com/RubyLouvre/anu"},"Anu"),"和",n.default.createElement("a",{href:"https://github.com/215566435/Luy"},"Luy"),"，而图标是",n.default.createElement("a",{href:"http://www.iconfont.cn"},"Iconfont"),"上随手搜索得到的，表示感谢。")),n.default.createElement("div",{id:"demo",className:"anchor"}),n.default.createElement("div",{className:"item"},n.default.createElement("h1",{className:"title"},"示例"),n.default.createElement(s.default,null)),n.default.createElement("div",{id:"docs",className:"anchor"}),n.default.createElement("div",{className:"item"},n.default.createElement("h1",{className:"title"},"文档"),n.default.createElement("p",{className:"desc indent"},"Kut是基于TypeScript开发的，且编译打包文件自带声明，因此VSCode有良好的智能提示。其实由于是参考（抄）的React，所以接口的用法基本一致。"),n.default.createElement("h2",{className:"title"},"Kut.createElement"),n.default.createElement("section",{className:"code"},"function createElement(type, config, ...children): KutElement"),n.default.createElement("p",{className:"desc indent"},"KutElement的工厂函数。参数为type、config、children。其中type类型为string或typeof Component，config类型为any，children类型为string[]或number[]或KutElement[]。返回值为KutElement即Virtual DOM节点对象。type参数接受普通的文本、内置DOM类型字面量（如div、h1等）和Kut.Component继承子类；config参数为Virtual DOM节点的属性，包括唯一识别key、类名className、样式style等等任意属性；children参数为该节点的子节点数组，元素为KutElement。若使用JSX以及Babel进行转换的话将不需要手动调用该方法。"),n.default.createElement("h2",{className:"title"},"Kut.Component"),n.default.createElement("section",{className:"code"},"class Component ","{"," constructor(props) ","{"," ","}"," ","}"),n.default.createElement("p",{className:"desc indent"},"组件类基类。与React相同，进行组件开发时必须继承此类。目前暂不支持Context特性，故无法使用React-Redux，构造参数仅有props，为Virtual DOM父节点传入属性。目前支持setState(state)和forceUpdate()方法，以及生命周期函数componentWillMount()、componentDidMount()、shouldComponentUpdate(nextProps, nextState)、componentWillUpdate(nextProps, nextState)、componentDidUpdate()、componentWillUnmount()。"),n.default.createElement("h2",{className:"title"},"Kut.render"),n.default.createElement("section",{className:"code"},"function render(element, container?): void | string"),n.default.createElement("p",{className:"desc indent"},"渲染挂载函数。参数为element、container。其中element类型为string、number或KutElement，container类型为HTMLElement，即DOM节点实例。container参数可选，提供时将使用container.innerHTML进行渲染挂载，缺省时将返回渲染的字符串。"))),n.default.createElement(d.default,null))}}]),a}();exports.default=y;
},{"../index":11,"./components/Banner":18,"./components/Nav":19,"./components/Content":20,"./components/Demo":22,"./components/Footer":21,"./App.less":31}],7:[function(require,module,exports) {
"use strict";var e=require("../index"),r=d(e),t=require("./App"),u=d(t);function d(e){return e&&e.__esModule?e:{default:e}}require("./index.less"),r.default.render(r.default.createElement(u.default,null),document.getElementById("root"));
},{"../index":11,"./App":12,"./index.less":31}]},{},[7])