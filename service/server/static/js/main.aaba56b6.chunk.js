(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{8:function(e,t,n){e.exports=n(9)},9:function(e,t,n){"use strict";n.r(t);var a=n(2),r=n(3),o=n(6),s=n(4),c=n(7),u=n(0),l=n.n(u),i=n(5),p=n.n(i);function d(){var e=document.getElementById("account").value,t=document.getElementById("passwd").value,n=JSON.stringify({account:e,passwd:t});return console.log("============",n),n}var m=function(e){function t(){return Object(a.a)(this,t),Object(o.a)(this,Object(s.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(r.a)(t,[{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("h2",null,"Welcome to MyBlog"),l.a.createElement("form",{id:"myDiv"},"\u8d26\u53f7\uff1a",l.a.createElement("input",{type:"text",id:"account"}),l.a.createElement("br",null),"\u5bc6\u7801\uff1a",l.a.createElement("input",{type:"password",id:"passwd"}),l.a.createElement("br",null),l.a.createElement("button",{type:"button",onClick:this.login},"\u767b\u9646"),l.a.createElement("button",{type:"button",onClick:this.register},"\u6ce8\u518c"),l.a.createElement("label",{id:"response"})))}},{key:"login",value:function(){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===e.readyState&&200===e.status&&(document.getElementById("response").innerHTML=e.responseText)};var t=d();e.open("POST","http://127.0.0.1:8000/server/Login/",!0),e.setRequestHeader("Content-type","application/json"),e.send(t)}},{key:"register",value:function(){var e=new XMLHttpRequest;e.onreadystatechange=function(){4===e.readyState&&200===e.status&&(document.getElementById("response").innerHTML=e.responseText)};var t=d();e.open("POST","http://127.0.0.1:8000/server/register/",!0),e.setRequestHeader("Content-type","application/json"),e.send(t)}}]),t}(l.a.Component);p.a.render(l.a.createElement(m,null),document.getElementById("root"))}},[[8,1,2]]]);
//# sourceMappingURL=main.aaba56b6.chunk.js.map