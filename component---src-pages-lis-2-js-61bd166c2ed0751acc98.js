"use strict";(self.webpackChunkgatsby_starter_default=self.webpackChunkgatsby_starter_default||[]).push([[767],{3731:function(t,e,r){r.r(e),r.d(e,{Head:function(){return a}});var s=r(4578),n=r(7294),o=(r(1883),r(5592)),i=r(9357),p=r(8144);const a=()=>n.createElement(i.Z,{title:"Page two"});e.default=()=>{const{0:t,1:e}=(0,n.useState)([0,2,10,14,8,3,4,7,13,12,5,9,15,1,11,6]);return n.createElement(o.Z,null,n.createElement("h1",null,"Frontier-Removal Algorithm"),n.createElement("button",{onClick:(()=>{for(var t=[],r=0;r<16;r++)t.push(r);for(r=0;r<16;r++){var s=Math.floor(Math.random()*(16-r))+r;[t[r],t[s]]=[t[s],t[r]]}e(t)}).bind(void 0)},"Change a Permutation"),n.createElement(l,{data:t}))};let l=function(t){(0,s.Z)(r,t);var e=r.prototype;function r(e){var r;(r=t.call(this,e)||this).state={prevstep:0,step:8};var s=e.data.length;r.springLeft=[],r.springTop=[],r.springBackgroundColor=[],r.springBorderColor=[];for(var n=0;n<s;n++)r.springLeft.push(new p.qK(60*n)),r.springTop.push(new p.qK(300)),r.springBackgroundColor.push(new p.qK("rgb(90%,90%,90%)")),r.springBorderColor.push(new p.qK("#777777"));return r}return e.computeLisByStep=function(t,e){for(var r=e.length,s=[],n={},o={},i=0;i<r;i++)o[i]=0,n[i]=i;for(i=0;i<t;i++)if(0===s.length||e[s[s.length-1]]<e[i])s.push(i),n[i]=s.length-1,o[i]=1;else for(var p=0;p<s.length;p++)if(e[s[p]]>=e[i]){o[i]=o[s[p]]+1,s[p]=i,n[i]=p;break}return{lis:s,pos:n,depth:o}},e.nextStep=function(){var t={...this.state};t.prevstep=t.step,t.step+=1,t.step>this.props.data.length&&(t.step=this.props.data.length),this.setState(t)},e.resetStep=function(){var t={...this.state};t.prevstep=t.step,t.step=0,this.setState(t)},e.render=function(){const t=this.props.data,e=t.length;for(var r=this.computeLisByStep(this.state.step,t),s=0;s<e;s++)if(0!==r.depth[s]){var o=r.pos[s];this.springLeft[s].start(70*r.pos[s]),this.springTop[s].start(35*Math.log(1+r.depth[r.lis[r.pos[s]]]-r.depth[s])),this.springTop[s].start(60*(r.depth[s]-r.depth[r.lis[r.pos[s]]])+300),this.springBackgroundColor[s].start("rgb("+100*(e-o)/e+"%,"+(24+76*(e-o)/e)+"%,"+(70+30*(e-o)/e)+"%)"),this.springBorderColor[s].start("#22339A")}else this.springLeft[s].start(60*s),this.springTop[s].start(300),this.springBackgroundColor[s].start("rgb(90%,90%,90%)"),this.springBorderColor[s].start("#777777");var i=[];for(s=0;s<e;s++)i.push(n.createElement(p.q.div,{style:{display:"inline-flex",width:"60px",height:"60px",position:"absolute",left:this.springLeft[s],top:this.springTop[s],backgroundColor:this.springBackgroundColor[s],borderColor:this.springBorderColor[s],borderWidth:"2px",borderStyle:"solid",fontSize:"40px",justifyContent:"center",alignItems:"center"}},t[s]));return n.createElement(n.Fragment,null,n.createElement("p",null,"Data: ",JSON.stringify(t)),n.createElement("div",{style:{position:"relative",height:"400px"}},i),n.createElement("button",{onClick:this.nextStep.bind(this)},"Next Step"),n.createElement("button",{onClick:this.resetStep.bind(this)},"Reset"))},r}(n.Component)}}]);
//# sourceMappingURL=component---src-pages-lis-2-js-61bd166c2ed0751acc98.js.map