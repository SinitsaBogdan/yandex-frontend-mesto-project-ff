(()=>{"use strict";var t={templateCardSelector:"#card-template",cardSelector:".card",imageSelector:".card__image",titleSelector:".card__title",likeButtonSelector:".card__button-like",likeIconSelector:".card__like-svg",likeCountSelector:".card__like-count",cardDeleteSelector:".card__button-delete",cardLikeActiveClass:"card__button-like--active"},e=document.querySelector(t.templateCardSelector).content;function n(n,c,a,i,u,l){var s,d=(s=t.cardSelector,e.querySelector(s).cloneNode(!0)),f=d.querySelector(t.titleSelector),p=d.querySelector(t.imageSelector),m=d.querySelector(t.cardDeleteSelector),y=d.querySelector(t.likeButtonSelector),v=y.querySelector(t.likeCountSelector),_=y.querySelector(t.likeIconSelector);return l===n.owner._id?m.addEventListener("click",(function(t){var e=t.target.closest(".card");c(e)})):d.querySelector(t.cardDeleteSelector).remove(),r(n,l)&&o(_),d.id=n._id,p.src=n.link,p.alt=n.name,f.textContent=n.name,v.textContent=n.likes.length,p.addEventListener("click",(function(t){return i(t,u)})),_.addEventListener("click",(function(){a(n,v,_,o),o(_)})),d}function r(t,e){return t.likes.filter((function(t){return t._id===e})).length>0}function o(e){e.classList.toggle(t.cardLikeActiveClass)}function c(t){t.remove()}var a={popUpIsOpenSelector:".popup_is-opened",popUpIsOpenClass:"popup_is-opened"};function i(t){"Escape"===t.key&&l(s())}function u(t){t.classList.add(a.popUpIsOpenClass),document.addEventListener("keydown",i)}function l(t){t.classList.remove(a.popUpIsOpenClass),document.removeEventListener("keydown",i)}function s(){return document.querySelector(a.popUpIsOpenSelector)}function d(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var f=function(t,e){var n=Array.from(t.querySelectorAll(e.inputSelector)),r=t.querySelector(e.submitButtonSelector);n.forEach((function(o){o.addEventListener("input",(function(){p(t,o,e),v(n,r,e)}))}))},p=function(t,e,n){e.validity.valueMissing?e.setCustomValidity(e.dataset.errorEmpty):e.validity.patternMismatch?e.setCustomValidity(e.dataset.errorPattern):e.validity.typeMismatch?e.setCustomValidity(e.dataset.errorType):e.setCustomValidity(""),e.validity.valid?y(t,e,n):m(t,e,e.validationMessage,n)},m=function(t,e,n,r){var o=t.querySelector("#".concat(e.id,"-error"));o.classList.add(r.errorClass),o.textContent=n,e.classList.add(r.inputErrorClass)},y=function(t,e,n){var r=t.querySelector("#".concat(e.id,"-error"));r.classList.remove(n.errorClass),r.textContent="",e.classList.remove(n.inputErrorClass)},v=function(t,e,n){_(t)?(e.classList.add(n.inactiveButtonClass),e.disabled=!0):(e.classList.remove(n.inactiveButtonClass),e.disabled=!1)},_=function(t){return t.some((function(t){return!t.validity.valid}))},h={baseUrl:"https://nomoreparties.co/v1/wff-cohort-18",headers:{authorization:"4f72bdac-4a32-447e-a47f-4588193b59b1","Content-Type":"application/json"}},S=function(t){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:h.headers}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время установки лайка."))}))},b=function(t){return fetch("".concat(h.baseUrl,"/cards/").concat(t),{method:"DELETE",headers:h.headers}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время удаления карточки."))}))},C=function(t){return fetch("".concat(h.baseUrl,"/cards/likes/").concat(t),{method:"DELETE",headers:h.headers}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время удаления лайка."))}))};function g(t){return t.ok?t.json():Promise.reject("Ошибка: ".concat(t.status," во время запроса информации о профиле."))}function q(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}var E={},k={formSelector:".popup__form",inputSelector:".popup__input",errorSelector:".popup__form-field_error",submitButtonSelector:".popup__button",errorClass:"popup__error_visible",inputErrorClass:"popup__input-type_error",inactiveButtonClass:"popup__button-disabled"},L=document.querySelectorAll(".popup"),x=document.querySelector(".places__list"),A=document.querySelector(".profile__image"),U=document.querySelector(".profile__title"),w=document.querySelector(".profile__description"),I=document.querySelector(".profile__image"),O=document.querySelector(".profile__avatar"),T=document.querySelector(".profile__button-edit"),j=document.querySelector(".profile__button-add"),B=document.querySelector(".popup__confirmation"),D=document.querySelector(".popup_type_edit-avatar"),P=document.querySelector(".popup_type_edit-profile"),M=document.querySelector(".popup_type_new-card"),N=document.querySelector(".popup_type_delete_card"),V=document.querySelector(".popup_type_image"),J=V.querySelector(".popup__image"),H=V.querySelector(".popup__caption"),$=document.forms.edit_avatar,z=document.forms.edit_profile,F=document.forms.new_place;function G(t,e){!function(t,e){var n=Array.from(t.querySelectorAll(e.errorSelector)),r=Array.from(t.querySelectorAll(e.inputSelector)),o=t.querySelector(e.submitButtonSelector);t.reset(),n.forEach((function(t){t.classList.remove(e.errorClass),t.textContent=""})),r.forEach((function(t){return t.classList.remove(e.inputErrorClass)})),v(r,o,e)}(e,k),u(t)}function K(t){var e=N.querySelector(".popup__button");u(N),B.addEventListener("click",(function(){return function(t,e,n){n.textContent="Сохранение...",b(t.id).then((function(){c(t),l(e),n.textContent="Сохранение"})).catch((function(t){return console.log(t)}))}(t,N,e)}))}function Q(t,e){var n=t.target.closest(".card"),r=n.querySelector(".card__title").textContent,o=n.querySelector(".card__image").src;J.src=o,J.alt=r,H.textContent=r,u(e)}function R(t,e,n,r){var o=s(),c=e.name.value,a=e.description.value,i=o.querySelector(".popup__button");i.textContent="Сохранение...",t.preventDefault(),n.textContent=c,r.textContent=a,function(t,e){return fetch("".concat(h.baseUrl,"/users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:t,about:e})}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время обновления профиля."))}))}(c,a).then((function(){return l(o)})).catch((function(t){return console.log(t)})).finally((function(){return i.textContent="Сохранить"}))}function W(t,e,r){var o=s(),c={name:e.name.value,link:e.link.value},a=o.querySelector(".popup__button");a.textContent="Сохранение...",t.preventDefault(),new Promise((function(){(function(t){return fetch("".concat(h.baseUrl,"/cards"),{method:"POST",headers:h.headers,body:JSON.stringify(t)}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время сохранения карточки."))}))})(c).then((function(t){var e=n(t,K,X,Q,V,E.id);r.insertBefore(e,r.firstElementChild),l(o)})).catch((function(t){return console.log(t)})).finally((function(){return a.textContent="Сохранить"}))}))}function X(t,e){r(t,E.id)?C(t._id).then((function(n){return Y(n,t,e)})).catch((function(t){return console.log(t)})):S(t._id).then((function(n){return Y(n,t,e)})).catch((function(t){return console.log(t)}))}function Y(t,e,n){e.likes=t.likes,n.textContent=e.likes.length}function Z(t,e,n){var r=s(),o=e.link.value,c=r.querySelector(".popup__button");c.textContent="Сохранение...",t.preventDefault(),function(t){return fetch("".concat(h.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t})}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время обновления аватарки профлия."))}))}(o).then((function(){n.src=o,l(r)})).catch((function(t){return console.log(t)})).finally((function(){return c.textContent="Сохранить"}))}L.forEach((function(t){t.addEventListener("mousedown",(function(e){e.target.classList.contains("popup_is-opened")&&l(t),e.target.classList.contains("popup__close")&&l(t)}))})),T.addEventListener("click",(function(){var t=[P,z];G.apply(void 0,t),z.name.value=U.textContent,z.description.value=w.textContent})),j.addEventListener("click",(function(){var t=[M,F];G.apply(void 0,t)})),O.addEventListener("click",(function(){var t=[D,$];G.apply(void 0,t)})),z.addEventListener("submit",(function(t){var e=[t,z,U,w];R.apply(void 0,e)})),F.addEventListener("submit",(function(t){var e=[t,F,x,n,c];W.apply(void 0,e)})),$.addEventListener("submit",(function(t){var e=[t,$,A];Z.apply(void 0,e)})),Promise.all([fetch("".concat(h.baseUrl,"/users/me"),{headers:h.headers}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время запроса информации о профиле."))})),fetch("".concat(h.baseUrl,"/cards"),{headers:h.headers}).then((function(t){return g(t,"Ошибка: ".concat(t.status," во время запроса списка карточек."))}))]).then((function(t){var e,r,o,c=(o=2,function(t){if(Array.isArray(t))return t}(r=t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,c,a,i=[],u=!0,l=!1;try{if(c=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=c.call(n)).done)&&(i.push(r.value),i.length!==e);u=!0);}catch(t){l=!0,o=t}finally{try{if(!u&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return i}}(r,o)||function(t,e){if(t){if("string"==typeof t)return q(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?q(t,e):void 0}}(r,o)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),a=c[0],i=c[1];e=a,E.id=e._id,E.title=e.name,E.about=e.about,E.avatar=e.avatar,i.forEach((function(t){var e=n(t,K,X,Q,V,E.id);x.append(e)})),U.textContent=E.title,w.textContent=E.about,I.src=E.avatar})).catch((function(t){return console.log(t)})),function(t,e){var n,r=function(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return d(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?d(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,a=!0,i=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return a=t.done,t},e:function(t){i=!0,c=t},f:function(){try{a||null==n.return||n.return()}finally{if(i)throw c}}}}(t);try{for(r.s();!(n=r.n()).done;){var o=n.value;o.addEventListener("submit",(function(t){return t.preventDefault()})),f(o,e)}}catch(t){r.e(t)}finally{r.f()}}(document.forms,k)})();