/*! For license information please see home.js.LICENSE.txt */
(()=>{"use strict";var t={templateCardSelector:"#card-template",cardSelector:".card",imageSelector:".card__image",titleSelector:".card__title",likeButtonSelector:".card__like-button",likeIconSelector:".card__like-svg",likeCountSelector:".card__like-count",cardDeleteSelector:".card__delete-button",cardLikeActiveClass:"card__like-button_is-active"},e=document.querySelector(t.templateCardSelector).content;function r(r,a,i,c,u,s){var l=e.querySelector(t.cardSelector).cloneNode(!0),f=l.querySelector(t.titleSelector),p=l.querySelector(t.imageSelector),d=l.querySelector(t.cardDeleteSelector),h=l.querySelector(t.likeButtonSelector),y=h.querySelector(t.likeCountSelector),v=h.querySelector(t.likeIconSelector);return console.log("profileId : "+s),console.log("card.owner._id : "+r.owner._id),s===r.owner._id?d.addEventListener("click",(function(t){var e=t.target.closest(".card");a(e)})):l.querySelector(t.cardDeleteSelector).remove(),n(r,s)&&o(v),l.id=r._id,p.src=r.link,p.alt=r.name,f.textContent=r.name,y.textContent=r.likes.length,p.addEventListener("click",(function(t){return c(t,u)})),v.addEventListener("click",(function(){i(r,y,v,o),o(v)})),l}function n(t,e){return t.likes.filter((function(t){return t._id===e})).length>0}function o(e){e.classList.toggle(t.cardLikeActiveClass)}function a(t){t.remove()}var i={popUpIsOpenSelector:".popup_is-opened",popUpIsOpenClass:"popup_is-opened"};function c(t){"Escape"===t.key&&s(l())}function u(t){t.classList.add(i.popUpIsOpenClass),document.addEventListener("keydown",c)}function s(t){t.classList.remove(i.popUpIsOpenClass),document.removeEventListener("keydown",c)}function l(){return document.querySelector(i.popUpIsOpenSelector)}function f(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}var p=".popup__input",d=".popup__button",h="popup__error_visible",y="popup__input_type_error",v="popup__button_disabled",m=function(t){var e=Array.from(t.querySelectorAll(".popup__form_field-error")),r=Array.from(t.querySelectorAll(p)),n=t.querySelector(d);t.reset(),e.forEach((function(t){t.classList.remove(h),t.textContent=""})),r.forEach((function(t){return t.classList.remove(y)})),w(r,n)},b=function(t){var e=Array.from(t.querySelectorAll(p)),r=t.querySelector(d);e.forEach((function(n){n.addEventListener("input",(function(){_(t,n),w(e,r)}))}))},_=function(t,e){e.validity.valueMissing?e.setCustomValidity(e.dataset.errorEmpty):e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorPattern):e.validity.typeMismatch?e.setCustomValidity(e.dataset.errorType):e.setCustomValidity(""),e.validity.valid?S(t,e):g(t,e,e.validationMessage)},g=function(t,e,r){var n=t.querySelector("#".concat(e.id,"-error"));n.classList.add(h),n.textContent=r,e.classList.add(y)},S=function(t,e){var r=t.querySelector("#".concat(e.id,"-error"));r.classList.remove(h),r.textContent="",e.classList.remove(y)},w=function(t,e){x(t)?(e.classList.add(v),e.disabled=!0):(e.classList.remove(v),e.disabled=!1)},x=function(t){return t.some((function(t){return!t.validity.valid}))};function k(t){return k="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},k(t)}function L(){L=function(){return e};var t,e={},r=Object.prototype,n=r.hasOwnProperty,o=Object.defineProperty||function(t,e,r){t[e]=r.value},a="function"==typeof Symbol?Symbol:{},i=a.iterator||"@@iterator",c=a.asyncIterator||"@@asyncIterator",u=a.toStringTag||"@@toStringTag";function s(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,r){return t[e]=r}}function l(t,e,r,n){var a=e&&e.prototype instanceof m?e:m,i=Object.create(a.prototype),c=new A(n||[]);return o(i,"_invoke",{value:q(t,r,c)}),i}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=l;var p="suspendedStart",d="suspendedYield",h="executing",y="completed",v={};function m(){}function b(){}function _(){}var g={};s(g,i,(function(){return this}));var S=Object.getPrototypeOf,w=S&&S(S(I([])));w&&w!==r&&n.call(w,i)&&(g=w);var x=_.prototype=m.prototype=Object.create(g);function E(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function C(t,e){function r(o,a,i,c){var u=f(t[o],t,a);if("throw"!==u.type){var s=u.arg,l=s.value;return l&&"object"==k(l)&&n.call(l,"__await")?e.resolve(l.__await).then((function(t){r("next",t,i,c)}),(function(t){r("throw",t,i,c)})):e.resolve(l).then((function(t){s.value=t,i(s)}),(function(t){return r("throw",t,i,c)}))}c(u.arg)}var a;o(this,"_invoke",{value:function(t,n){function o(){return new e((function(e,o){r(t,n,e,o)}))}return a=a?a.then(o,o):o()}})}function q(e,r,n){var o=p;return function(a,i){if(o===h)throw Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:t,done:!0}}for(n.method=a,n.arg=i;;){var c=n.delegate;if(c){var u=j(c,n);if(u){if(u===v)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(o===p)throw o=y,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);o=h;var s=f(e,r,n);if("normal"===s.type){if(o=n.done?y:d,s.arg===v)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(o=y,n.method="throw",n.arg=s.arg)}}}function j(e,r){var n=r.method,o=e.iterator[n];if(o===t)return r.delegate=null,"throw"===n&&e.iterator.return&&(r.method="return",r.arg=t,j(e,r),"throw"===r.method)||"return"!==n&&(r.method="throw",r.arg=new TypeError("The iterator does not provide a '"+n+"' method")),v;var a=f(o,e.iterator,r.arg);if("throw"===a.type)return r.method="throw",r.arg=a.arg,r.delegate=null,v;var i=a.arg;return i?i.done?(r[e.resultName]=i.value,r.next=e.nextLoc,"return"!==r.method&&(r.method="next",r.arg=t),r.delegate=null,v):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,v)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function O(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function I(e){if(e||""===e){var r=e[i];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,a=function r(){for(;++o<e.length;)if(n.call(e,o))return r.value=e[o],r.done=!1,r;return r.value=t,r.done=!0,r};return a.next=a}}throw new TypeError(k(e)+" is not iterable")}return b.prototype=_,o(x,"constructor",{value:_,configurable:!0}),o(_,"constructor",{value:b,configurable:!0}),b.displayName=s(_,u,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===b||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,_):(t.__proto__=_,s(t,u,"GeneratorFunction")),t.prototype=Object.create(x),t},e.awrap=function(t){return{__await:t}},E(C.prototype),s(C.prototype,c,(function(){return this})),e.AsyncIterator=C,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new C(l(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},E(x),s(x,u,"Generator"),s(x,i,(function(){return this})),s(x,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},e.values=I,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(O),!e)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var r=this;function o(n,o){return c.type="throw",c.arg=e,r.next=n,o&&(r.method="next",r.arg=t),!!o}for(var a=this.tryEntries.length-1;a>=0;--a){var i=this.tryEntries[a],c=i.completion;if("root"===i.tryLoc)return o("end");if(i.tryLoc<=this.prev){var u=n.call(i,"catchLoc"),s=n.call(i,"finallyLoc");if(u&&s){if(this.prev<i.catchLoc)return o(i.catchLoc,!0);if(this.prev<i.finallyLoc)return o(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return o(i.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return o(i.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var a=o;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var i=a?a.completion:{};return i.type=t,i.arg=e,a?(this.method="next",this.next=a.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),O(r),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;O(r)}return o}}throw Error("illegal catch attempt")},delegateYield:function(e,r,n){return this.delegate={iterator:I(e),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=t),v}},e}function E(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function C(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){E(a,n,o,i,c,"next",t)}function c(t){E(a,n,o,i,c,"throw",t)}i(void 0)}))}}var q={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"4f72bdac-4a32-447e-a47f-4588193b59b1","Content-Type":"application/json"}},j=function(){var t=C(L().mark((function t(){var e;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/users/me"),{headers:q.headers});case 2:if(!(e=t.sent).ok){t.next=5;break}return t.abrupt("return",e.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(e.status," во время запроса информации о профиле."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),P=function(){var t=C(L().mark((function t(){var e;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/cards"),{headers:q.headers});case 2:if(!(e=t.sent).ok){t.next=5;break}return t.abrupt("return",e.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(e.status," во время запроса списка карточек."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),O=function(){var t=C(L().mark((function t(e){var r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:q.headers,body:JSON.stringify({avatar:e})});case 2:if(!(r=t.sent).ok){t.next=5;break}return t.abrupt("return",r.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(r.status," во время обновления аватарки профлия."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),A=function(){var t=C(L().mark((function t(e,r){var n;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/users/me"),{method:"PATCH",headers:q.headers,body:JSON.stringify({name:e,about:r})});case 2:if(!(n=t.sent).ok){t.next=5;break}return t.abrupt("return",n.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(n.status," во время обновления профиля."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e,r){return t.apply(this,arguments)}}(),I=function(){var t=C(L().mark((function t(e){var r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/cards"),{method:"POST",headers:q.headers,body:JSON.stringify(e)});case 2:if(!(r=t.sent).ok){t.next=5;break}return t.abrupt("return",r.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(r.status," во время сохранения карточки."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),U=function(){var t=C(L().mark((function t(e){var r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/cards/likes/").concat(e),{method:"PUT",headers:q.headers});case 2:if(!(r=t.sent).ok){t.next=5;break}return t.abrupt("return",r.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(r.status," во время установки лайка."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),T=function(){var t=C(L().mark((function t(e){var r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/cards/").concat(e),{method:"DELETE",headers:q.headers});case 2:if(!(r=t.sent).ok){t.next=5;break}return t.abrupt("return",r.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(r.status," во время удаления карточки."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),N=function(){var t=C(L().mark((function t(e){var r;return L().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("".concat(q.baseUrl,"/cards/likes/").concat(e),{method:"DELETE",headers:q.headers});case 2:if(!(r=t.sent).ok){t.next=5;break}return t.abrupt("return",r.json());case 5:return t.next=7,Promise.reject("Ошибка: ".concat(r.status," во время удаления лайка."));case 7:return t.abrupt("return",t.sent);case 8:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}();function D(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=Array(e);r<e;r++)n[r]=t[r];return n}var G,M,F,V={},B=document.querySelectorAll(".popup"),J=document.querySelector(".places__list"),H=document.querySelector(".profile__image"),Y=document.querySelector(".profile__title"),$=document.querySelector(".profile__description"),z=document.querySelector(".profile__image"),K=document.querySelector(".profile__avatar"),Q=document.querySelector(".profile__edit-button"),R=document.querySelector(".profile__add-button"),W=document.querySelector(".popup__confirmation"),X=document.querySelector(".popup_type_edit-avatar"),Z=document.querySelector(".popup_type_edit-profile"),tt=document.querySelector(".popup_type_new-card"),et=document.querySelector(".popup_type_delete_card"),rt=document.querySelector(".popup_type_image"),nt=rt.querySelector(".popup__image"),ot=rt.querySelector(".popup__caption"),at=document.forms.edit_avatar,it=document.forms.edit_profile,ct=document.forms.new_place;function ut(t,e){m(e),u(t)}function st(t){var e=et.querySelector(".popup__button");u(et),W.addEventListener("click",(function(){return function(t,e,r){r.textContent="Сохранение...",new Promise((function(){T(t.id).catch((function(t){return console.log(t)})).finally((function(){a(t),s(e),r.textContent="Сохранение"}))}))}(t,et,e)}))}function lt(t,e){var r=t.target.closest(".card"),n=r.querySelector(".card__title").textContent,o=r.querySelector(".card__image").src;nt.src=o,nt.alt=n,ot.textContent=n,u(e)}function ft(t,e,r,n){var o=l(),a=e.name.value,i=e.description.value,c=o.querySelector(".popup__button");c.textContent="Сохранение...",t.preventDefault(),r.textContent=a,n.textContent=i,new Promise((function(){A(a,i).catch((function(t){return console.log(t)})).finally((function(){s(o),m(e),c.textContent="Сохранение"}))}))}function pt(t,e,n){var o=l(),a={name:e.name.value,link:e.link.value},i=o.querySelector(".popup__button");i.textContent="Сохранение...",t.preventDefault(),I(a).then((function(t){var e=r(t,st,dt,lt,rt,V.id);n.insertBefore(e,n.firstElementChild)})).catch((function(t){return console.log(t)})).finally((function(){m(e),s(o),i.textContent="Сохранение"}))}function dt(t,e){n(t,V.id)?new Promise((function(){N(t._id).then((function(r){return ht(r,t,e)})).catch((function(t){return console.log(t)}))})):new Promise((function(){U(t._id).then((function(r){return ht(r,t,e)})).catch((function(t){return console.log(t)}))}))}function ht(t,e,r){e.likes=t.likes,r.textContent=e.likes.length}function yt(t,e,r){var n=l(),o=e.link.value,a=n.querySelector(".popup__button");a.textContent="Сохранение...",t.preventDefault(),new Promise((function(){O(o).then((function(){return r.src=o})).catch((function(t){return console.log(t)})).finally((function(){s(n),a.textContent="Сохранение"}))}))}B.forEach((function(t){t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_is-opened")&&s(t),e.target.classList.contains("popup__close")&&s(t)}))})),Q.addEventListener("click",(function(){var t=[Z,it];ut.apply(void 0,t),it.name.value=Y.textContent,it.description.value=$.textContent})),R.addEventListener("click",(function(){var t=[tt,ct];ut.apply(void 0,t)})),K.addEventListener("click",(function(){var t=[X,at];ut.apply(void 0,t)})),it.addEventListener("submit",(function(t){var e=[t,it,Y,$];ft.apply(void 0,e)})),ct.addEventListener("submit",(function(t){var e=[t,ct,J,r,a];pt.apply(void 0,e)})),at.addEventListener("submit",(function(t){var e=[t,at,H];yt.apply(void 0,e)})),G=[],M=new Promise((function(t){return t(j())})),F=new Promise((function(t){return t(P())})),G.push(M),G.push(F),Promise.all(G).then((function(t){var e,n,o,a=(o=2,function(t){if(Array.isArray(t))return t}(n=t)||function(t,e){var r=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=r){var n,o,a,i,c=[],u=!0,s=!1;try{if(a=(r=r.call(t)).next,0===e){if(Object(r)!==r)return;u=!1}else for(;!(u=(n=a.call(r)).done)&&(c.push(n.value),c.length!==e);u=!0);}catch(t){s=!0,o=t}finally{try{if(!u&&null!=r.return&&(i=r.return(),Object(i)!==i))return}finally{if(s)throw o}}return c}}(n,o)||function(t,e){if(t){if("string"==typeof t)return D(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?D(t,e):void 0}}(n,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),i=a[0],c=a[1];e=i,V.id=e._id,V.title=e.name,V.about=e.about,V.avatar=e.avatar,c.forEach((function(t){var e=r(t,st,dt,lt,rt,V.id);J.append(e)})),Y.textContent=V.title,$.textContent=V.about,z.src=V.avatar})).catch((function(t){return console.log(t)})),function(t){var e,r=function(t,e){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,e){if(t){if("string"==typeof t)return f(t,e);var r={}.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){r&&(t=r);var n=0,o=function(){};return{s:o,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,c=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){c=!0,a=t},f:function(){try{i||null==r.return||r.return()}finally{if(c)throw a}}}}(document.forms);try{for(r.s();!(e=r.n()).done;){var n=e.value;n.addEventListener("submit",(function(t){return t.preventDefault()})),b(n)}}catch(t){r.e(t)}finally{r.f()}}()})();