(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{372:function(t,e,n){"use strict";function r(t){return t.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")}function a(t){return(Math.round(100*t)/100).toFixed(2)}function o(t){return""===t||null===t?"":t.toLowerCase().split(" ").map(function(t){return t.replace(t[0],t[0].toUpperCase())}).join(" ")}function c(t){return!isNaN(parseFloat(t))&&!isNaN(t-0)}function i(t){return new Map(JSON.parse(t))}n.d(e,"d",function(){return r}),n.d(e,"a",function(){return a}),n.d(e,"e",function(){return o}),n.d(e,"b",function(){return c}),n.d(e,"c",function(){return i})},717:function(t,e,n){var r=n(718);"string"==typeof r&&(r=[[t.i,r,""]]);var a={hmr:!0,transform:void 0,insertInto:void 0};n(54)(r,a);r.locals&&(t.exports=r.locals)},718:function(t,e,n){(t.exports=n(53)(!1)).push([t.i,".networth {\n  position: relative; }\n  @media all and (min-width: 801px) {\n    .networth {\n      margin-top: 0; } }\n  .networth--loading {\n    padding: 30px;\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n    align-items: center; }\n    .networth--loading h1 {\n      text-align: center; }\n    .networth--loading img {\n      margin-top: 20px;\n      border-radius: 20px; }\n  .networth table {\n    margin: 0 auto;\n    padding: 30px;\n    border-collapse: collapse; }\n    .networth table thead tr {\n      border-bottom: 1px solid #ff8484; }\n      .networth table thead tr th {\n        width: 200px;\n        padding-bottom: 10px;\n        font-size: 30px;\n        text-align: center; }\n    .networth table tbody tr td {\n      width: 300px;\n      height: 40px;\n      padding: 10px;\n      font-size: 30px;\n      text-align: center; }\n    .networth table tbody tr .acct-name {\n      text-align: center; }\n    .networth table tbody tr:nth-child(even) {\n      background: #1c2b36; }\n    .networth table tbody tr:hover {\n      background: #17232c; }\n  .networth--recurring-payments {\n    margin: 30px;\n    width: 260px; }\n    .networth--recurring-payments hr {\n      margin-bottom: 30px;\n      height: 1px;\n      background-color: gray; }\n",""])},862:function(t,e,n){"use strict";n.r(e);var r=n(100),a=n.n(r),o=n(1),c=n.n(o),i=n(372);n(717);function l(t){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function u(t,e,n,r,a,o,c){try{var i=t[o](c),l=i.value}catch(t){return void n(t)}i.done?e(l):Promise.resolve(l).then(r,a)}function s(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function p(t,e){return!e||"object"!==l(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function d(t){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function f(t,e){return(f=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var m=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=p(this,d(e).call(this,t))).state={total:0,accountBalances:[],recurringPayments:[],loading:!0},n}var n,r,l;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&f(t,e)}(e,o["Component"]),n=e,(r=[{key:"componentWillReceiveProps",value:function(t){var e=new Set;t.transactions.forEach(function(n){var r=0;t.transactions.forEach(function(t){JSON.stringify(n)===JSON.stringify(t)&&(r+=1)}),r>1&&e.add(JSON.stringify(n))});var n=[];e.forEach(function(t){n.push(JSON.parse(t))}),this.setState({recurringPayments:n})}},{key:"componentDidMount",value:function(){var t,e=(t=regeneratorRuntime.mark(function t(){var e,n;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(!window.sessionStorage.getItem("balance")){t.next=5;break}e=window.sessionStorage.getItem("balance"),e=JSON.parse(e),t.next=16;break;case 5:return t.next=7,a()({method:"POST",url:"/plaid-api/balance"});case 7:if(!(e=(e=t.sent).data).Error){t.next=15;break}return t.next=12,a.a.get("/plaid-api/key-and-env");case 12:n=t.sent,Plaid.create({apiVersion:"v2",clientName:"Update Account",env:n.data.env,product:["balance"],key:n.data.publicKey,token:e.publicToken,onSuccess:function(t){console.log("Update of Account successful")}}).open();case 15:window.sessionStorage.setItem("balance",JSON.stringify(e));case 16:this.setState({total:e.networth,accountBalances:e.maps,loading:!1});case 17:case"end":return t.stop()}},t,this)}),function(){var e=this,n=arguments;return new Promise(function(r,a){var o=t.apply(e,n);function c(t){u(o,r,a,c,i,"next",t)}function i(t){u(o,r,a,c,i,"throw",t)}c(void 0)})});return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var t,e;return t=0===this.state.recurringPayments.length?c.a.createElement("p",null,"No Recurring Payments Found"):c.a.createElement("ul",null," this.state.recurringPayments.map(val => ",c.a.createElement("li",null,"val.name"),") "),e=this.state.loading?c.a.createElement("div",{className:"networth--loading"},c.a.createElement("h1",null,"Hang tight, getting your data from the cloud"),c.a.createElement("img",{src:"/loading-gifs/loading-three.gif",alt:"loading"})):c.a.createElement("table",null,c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Account Name"),c.a.createElement("th",null,"Amount"))),c.a.createElement("tbody",null,this.state.accountBalances.map(function(t,e){return Object.keys(t).map(function(e,n){return c.a.createElement("tr",{key:n,className:"networth--entry"},c.a.createElement("td",{className:"acct-name"},Object(i.e)(e)),c.a.createElement("td",{className:"acct-value"},!0===Object(i.b)(t[e])?"$"+Object(i.d)(Object(i.a)(t[e])):"N/A"))})}),c.a.createElement("tr",null,c.a.createElement("td",{className:"acct-name"},"Total"),c.a.createElement("td",{className:"acct-value"},"$",Object(i.d)(Object(i.a)(this.state.total)))))),c.a.createElement("div",{className:"networth"},e,c.a.createElement("div",{className:"networth--recurring-payments"},c.a.createElement("h2",null,"Recurring Payments"),c.a.createElement("hr",null),t))}}])&&s(n.prototype,r),l&&s(n,l),e}();e.default=m}}]);
//# sourceMappingURL=12.js.map