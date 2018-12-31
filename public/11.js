(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{365:function(e,n,t){"use strict";var a=t(1),r=t.n(a),o=t(2),i=t.n(o),l=t(25),c=t.n(l),s=t(96),u=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e};function d(e,n){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!n||"object"!=typeof n&&"function"!=typeof n?e:n}var p=function(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)},f=function(e){function n(){var t,a;!function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n);for(var r=arguments.length,o=Array(r),i=0;i<r;i++)o[i]=arguments[i];return t=a=d(this,e.call.apply(e,[this].concat(o))),a.handleClick=function(e){if(a.props.onClick&&a.props.onClick(e),!e.defaultPrevented&&0===e.button&&!a.props.target&&!p(e)){e.preventDefault();var n=a.context.router.history,t=a.props,r=t.replace,o=t.to;r?n.replace(o):n.push(o)}},d(a,t)}return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function, not "+typeof n);e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),n&&(Object.setPrototypeOf?Object.setPrototypeOf(e,n):e.__proto__=n)}(n,e),n.prototype.render=function(){var e=this.props,n=(e.replace,e.to),t=e.innerRef,a=function(e,n){var t={};for(var a in e)n.indexOf(a)>=0||Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a]);return t}(e,["replace","to","innerRef"]);c()(this.context.router,"You should not use <Link> outside a <Router>"),c()(void 0!==n,'You must specify the "to" property');var o=this.context.router.history,i="string"==typeof n?Object(s.b)(n,null,null,o.location):n,l=o.createHref(i);return r.a.createElement("a",u({},a,{onClick:this.handleClick,href:l,ref:t}))},n}(r.a.Component);f.propTypes={onClick:i.a.func,target:i.a.string,replace:i.a.bool,to:i.a.oneOfType([i.a.string,i.a.object]).isRequired,innerRef:i.a.oneOfType([i.a.string,i.a.func])},f.defaultProps={replace:!1},f.contextTypes={router:i.a.shape({history:i.a.shape({push:i.a.func.isRequired,replace:i.a.func.isRequired,createHref:i.a.func.isRequired}).isRequired}).isRequired},n.a=f},580:function(e,n,t){var a=t(581);"string"==typeof a&&(a=[[e.i,a,""]]);var r={hmr:!0,transform:void 0,insertInto:void 0};t(54)(a,r);a.locals&&(e.exports=a.locals)},581:function(e,n,t){(e.exports=t(53)(!1)).push([e.i,".navbar--desktop {\n  width: 100vw;\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center; }\n  @media all and (max-width: 800px) {\n    .navbar--desktop {\n      display: none; } }\n  .navbar--desktop ul {\n    display: flex;\n    flex-direction: row; }\n    .navbar--desktop ul li {\n      margin-right: 15px;\n      text-transform: uppercase; }\n      .navbar--desktop ul li:after {\n        content: '';\n        margin: auto;\n        display: block;\n        width: 0;\n        height: 3px;\n        background: #ff8484;\n        transition: all .3s ease; }\n      .navbar--desktop ul li:hover:after {\n        width: 100%; }\n      .navbar--desktop ul li a {\n        color: white;\n        text-decoration: none; }\n    .navbar--desktop ul li:first-child {\n      margin-left: 15px; }\n  .navbar--desktop div {\n    display: flex;\n    align-items: center; }\n    .navbar--desktop div button {\n      margin-top: 15px;\n      margin-right: 15px;\n      padding: 15px;\n      background-color: #346ca1;\n      border: 1px solid black;\n      border-radius: 5px;\n      font-size: 20px;\n      color: white;\n      cursor: pointer; }\n\n@media all and (min-width: 801px) {\n  .navbar--mobile {\n    display: none; } }\n\n.navbar--mobile--header {\n  width: 100vw;\n  height: 70px;\n  background-color: #253847;\n  z-index: 3;\n  display: flex;\n  justify-content: space-between;\n  align-items: center; }\n  .navbar--mobile--header .icon {\n    margin: 15px;\n    font-size: 2em;\n    cursor: pointer; }\n  .navbar--mobile--header a {\n    float: right; }\n\n.navbar--mobile--links {\n  position: absolute;\n  top: 0;\n  width: 80vw;\n  height: 0;\n  background-color: white;\n  box-shadow: 2px 8px 20px black;\n  -webkit-transform: translateX(calc(86vw * -1));\n          transform: translateX(calc(86vw * -1));\n  -webkit-animation: slideOut .4s 1;\n          animation: slideOut .4s 1;\n  z-index: 2;\n  display: flex;\n  flex-direction: column; }\n  .navbar--mobile--links--profile {\n    height: 30vw;\n    min-height: 120px;\n    background-image: url(/profile-background.png);\n    background-size: cover;\n    display: flex;\n    flex-direction: column;\n    justify-content: flex-end; }\n    .navbar--mobile--links--profile img {\n      margin: 0 0 15px 15px;\n      width: 50px;\n      height: 50px;\n      border-radius: 50%; }\n    .navbar--mobile--links--profile h3 {\n      padding: 0 0 10px 10px;\n      color: white;\n      text-shadow: 0px 0px 6px black;\n      font-weight: bolder; }\n  .navbar--mobile--links a {\n    height: 60px;\n    padding-left: 20px;\n    overflow-y: hidden;\n    font-size: 1em;\n    overflow-y: hidden;\n    text-decoration: none;\n    font-weight: 400;\n    display: flex;\n    transition: background-color .1s ease-in;\n    display: flex;\n    flex-direction: row;\n    align-items: center; }\n    .navbar--mobile--links a:hover {\n      background-color: #e6e6e6;\n      cursor: pointer;\n      transition: background-color .1s ease-in; }\n    .navbar--mobile--links a .link-container {\n      color: #25323c; }\n      .navbar--mobile--links a .link-container svg {\n        padding: 0 15px; }\n        .navbar--mobile--links a .link-container svg path {\n          color: #4e4646; }\n  .navbar--mobile--links hr {\n    margin: 5px 0;\n    width: 100%;\n    height: 1px;\n    background: #d4c3c3; }\n  .navbar--mobile--links__active {\n    height: 100vh;\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    -webkit-animation: slideIn .4s 1;\n            animation: slideIn .4s 1;\n    z-index: 2; }\n\n@-webkit-keyframes slideIn {\n  0% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1)); }\n  1% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw); } }\n\n@keyframes slideIn {\n  0% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1)); }\n  1% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw); } }\n\n@-webkit-keyframes slideOut {\n  0% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    height: 100vh; }\n  99% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1));\n    height: 0; } }\n\n@keyframes slideOut {\n  0% {\n    -webkit-transform: translateX(0vw);\n            transform: translateX(0vw);\n    height: 100vh; }\n  99% {\n    height: 100vh; }\n  100% {\n    -webkit-transform: translateX(calc(86vw * -1));\n            transform: translateX(calc(86vw * -1));\n    height: 0; } }\n",""])},859:function(e,n,t){"use strict";t.r(n);var a=t(1),r=t.n(a),o=t(365),i=t(100),l=t.n(i),c=t(311),s=t(412);t(580);function u(e){return(u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function d(e,n,t,a,r,o,i){try{var l=e[o](i),c=l.value}catch(e){return void t(e)}l.done?n(c):Promise.resolve(c).then(a,r)}function p(e,n){for(var t=0;t<n.length;t++){var a=n[t];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function f(e){return(f=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function m(e,n){return(m=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}function h(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}var b=function(e){function n(e){var t,a,r;return function(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}(this,n),a=this,(t=!(r=f(n).call(this,e))||"object"!==u(r)&&"function"!=typeof r?h(a):r).state={handler:{user:"..."}},t.addAccount=t.addAccount.bind(h(h(t))),t}var t,i,b;return function(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&m(e,n)}(n,a["Component"]),t=n,(i=[{key:"componentDidMount",value:function(){var e,n=(e=regeneratorRuntime.mark(function e(){var n,t,a;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("/plaid-api/key-and-env");case 2:return n=e.sent,t=Plaid.create({apiVersion:"v2",clientName:"Plaid Walkthrough Demo",env:n.data.env,product:["transactions"],key:n.data.publicKey,onSuccess:function(e){l()({method:"POST",url:"/plaid-api/get-access-token",data:{public_token:e,client_id:"5a24ca6a4e95b836d37e37fe",secret:"f07a761a591de3cbbc5ac3ba2f4301"}})}}),e.next=6,l.a.get("/user-info/name");case 6:a=(a=e.sent).data,this.setState({handler:t,name:a});case 9:case"end":return e.stop()}},e,this)}),function(){var n=this,t=arguments;return new Promise(function(a,r){var o=e.apply(n,t);function i(e){d(o,a,r,i,l,"next",e)}function l(e){d(o,a,r,i,l,"throw",e)}i(void 0)})});return function(){return n.apply(this,arguments)}}()},{key:"addAccount",value:function(){this.state.handler.open(),window.localStorage.clear(),window.sessionStorage.clear(),console.log("LOCAL AND SESSION STORAGE CLEARED")}},{key:"toggleMenu",value:function(){var e=document.querySelector(".navbar--mobile--links");e.classList.toggle("navbar--mobile--links__active"),e.classList.contains("navbar--mobile--links__active")?(document.querySelector("body").style.maxHeight="100vh",document.querySelector("body").style.overflowY="hidden",document.querySelector(".navbar--mobile--header").style.filter="brightness(.8)"):(document.querySelector("body").style.maxHeight=null,document.querySelector("body").style.overflowY=null,document.querySelector(".navbar--mobile--header").style.filter=null,document.querySelector(".main").style.filter=null)}},{key:"closeMenu",value:function(){var e=document.querySelector(".navbar--mobile--links");e.classList.contains("navbar--mobile--links__active")&&e.classList.remove("navbar--mobile--links__active")}},{key:"render",value:function(){return r.a.createElement("nav",{className:"navbar"},r.a.createElement("div",{className:"navbar--desktop"},r.a.createElement("ul",null,r.a.createElement("li",null,r.a.createElement(o.a,{to:"/"},"Home")),r.a.createElement("li",null,r.a.createElement(o.a,{to:"/transactions"},"Transactions")),r.a.createElement("li",null,r.a.createElement(o.a,{to:"/statistics"},"Statistics")),r.a.createElement("li",null,r.a.createElement(o.a,{to:"/networth"},"Networth")),r.a.createElement("li",null,r.a.createElement(o.a,{to:"/settings"},"Settings"))),r.a.createElement("div",null,r.a.createElement("button",{onClick:this.addAccount},"Add Accounts"))),r.a.createElement("div",{className:"navbar--mobile"},r.a.createElement("div",{className:"navbar--mobile--header"},r.a.createElement(o.a,{to:"/",onClick:this.closeMenu}," ",r.a.createElement(c.a,{className:"icon",icon:s.f})," "),r.a.createElement("h2",null,"Budgeteer"),r.a.createElement(c.a,{className:"icon",icon:s.a,onClick:this.toggleMenu})),r.a.createElement("div",{className:"navbar--mobile--links"},r.a.createElement("div",{className:"navbar--mobile--links--profile"},r.a.createElement("img",{src:"https://via.placeholder.com/50x50"}),r.a.createElement("h3",null,this.state.name)),r.a.createElement(o.a,{to:"/transactions",className:"first",onClick:this.toggleMenu},r.a.createElement("div",{className:"link-container"},r.a.createElement(c.a,{icon:s.e}),"Your Transactions")),r.a.createElement(o.a,{to:"/statistics",className:"second",onClick:this.toggleMenu},r.a.createElement("div",{className:"link-container"},r.a.createElement(c.a,{icon:s.c}),"Your Statistics")),r.a.createElement(o.a,{to:"/networth",className:"third",onClick:this.toggleMenu},r.a.createElement("div",{className:"link-container"},r.a.createElement(c.a,{icon:s.h}),"Your Networth")),r.a.createElement("hr",null),r.a.createElement(o.a,{to:"/settings",className:"fourth",onClick:this.toggleMenu},r.a.createElement("div",{className:"link-container"},r.a.createElement(c.a,{icon:s.d}),"Your Settings")),r.a.createElement("a",{className:"fifth",onClick:this.addAccount},r.a.createElement("div",{className:"link-container"},r.a.createElement(c.a,{icon:s.k}),"Add Account")))))}}])&&p(t.prototype,i),b&&p(t,b),n}();n.default=b}}]);
//# sourceMappingURL=11.js.map