(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(17),o=t.n(c),a=t(3),r=t(2),s=t(0),u=function(e){return Object(s.jsx)("input",{placeholder:"filter contacts",value:e.filter,onChange:e.handleFilter})},i=function(e){var n=e.text;return Object(s.jsx)("h2",{children:n})},l=function(){return Object(s.jsxs)("div",{style:{color:"green",fontStyle:"italic",fontSize:16},children:[Object(s.jsx)("br",{}),Object(s.jsx)("em",{children:"phonebook app by Lukas Vidfar, 2021"})]})},j=function(e){var n=e.message;return null===n?null:n.includes("successfully")?Object(s.jsx)("div",{className:"success",children:n}):(n.includes("already"),Object(s.jsx)("div",{className:"error",children:n}))},d=t(4),b=t.n(d),f="/persons",h=function(){return b.a.get(f).then((function(e){return e.data}))},O=function(e){return b.a.post(f,e).then((function(e){return e.data}))},m=function(e){return b.a.delete("".concat(f,"/").concat(e)).then((function(e){return e.data}))},p=(t(40),function(e){return Object(s.jsx)("div",{children:Object(s.jsxs)("form",{onSubmit:e.addPerson,children:[Object(s.jsx)("input",{placeholder:"add name",value:e.newName,onChange:e.handleNameChange}),Object(s.jsx)("br",{}),Object(s.jsx)("input",{placeholder:"add number",value:e.newNumber,onChange:e.handleNumberChange}),Object(s.jsx)("br",{}),Object(s.jsx)("button",{type:"submit",children:"save"})]})})}),x=function(e){var n=e.person,t=e.setPersons,c=e.setNotification,o=(e.personObject,e.persons);return Object(s.jsx)("div",{children:Object(s.jsxs)("li",{children:[" ",n.name," ",n.number,Object(s.jsx)("button",{onClick:function(e){e.preventDefault(),window.confirm("do you want to delete?")?(console.log("yes"),m("".concat(n.id)).then(t(o.filter((function(e){return e.name!==n.name})))).catch((function(e){c("".concat(n.name," was already removed from the phonebook")),setTimeout((function(){c(null)}),2e3)})),c("".concat(n.name," was successfully removed in the phonebook")),setTimeout((function(){c(null)}),2e3)):console.log("no")},children:"  delete "})]})})},v=function(){var e=Object(r.useState)([]),n=Object(a.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(""),d=Object(a.a)(o,2),b=d[0],f=d[1],m=Object(r.useState)(""),v=Object(a.a)(m,2),g=v[0],w=v[1],y=Object(r.useState)(""),N=Object(a.a)(y,2),k=N[0],C=N[1],S=Object(r.useState)(null),P=Object(a.a)(S,2),T=P[0],D=P[1];Object(r.useEffect)((function(){console.log("effect"),h().then((function(e){console.log("got all"),c(e)}))}),[]);var E=t.filter((function(e){return e.name.toLowerCase().includes(k)}));return Object(s.jsxs)("div",{children:[Object(s.jsx)(j,{message:T}),Object(s.jsx)(i,{text:"phonebook app"}),Object(s.jsx)(u,{filter:k,handleFilter:function(e){C(e.target.value)}}),Object(s.jsx)(i,{text:"add new"}),Object(s.jsx)(p,{addPerson:function(e){e.preventDefault();var n={name:b,number:g};O(n).then((function(e){c(t.concat(e)),D("".concat(n.name," was successfully added to the phonebook")),setTimeout((function(){D(null)}),2e3),f(""),w("")})).catch((function(e){console.log(e),D("".concat(e.response.data.error)),setTimeout((function(){D(null)}),3e3)}))},newName:b,newNumber:g,handleNameChange:function(e){f(e.target.value)},handleNumberChange:function(e){w(e.target.value)}}),Object(s.jsx)(i,{text:"contacts"}),Object(s.jsx)("ul",{children:E.map((function(e){return Object(s.jsx)(x,{setPersons:c,setNotification:D,persons:t,person:e},e.id)}))}),Object(s.jsx)(l,{})]})};t(41);o.a.render(Object(s.jsx)(v,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.e1c729a8.chunk.js.map