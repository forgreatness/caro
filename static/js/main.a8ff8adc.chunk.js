(this.webpackJsonpcaro=this.webpackJsonpcaro||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),s=n(7),i=n.n(s),l=(n(13),n(1)),u=n(2),o=n(4),c=n(3),h=n(5);n(14);function m(e){return a.a.createElement("button",{className:"square","data-value":e.value,onClick:e.onClick},e.value)}var v=function(e){function t(){return Object(l.a)(this,t),Object(o.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(h.a)(t,e),Object(u.a)(t,[{key:"renderSquare",value:function(e){var t=this;return a.a.createElement(m,{key:e,value:this.props.squares[e],onClick:function(){return t.props.onClick(e)}})}},{key:"renderRow",value:function(e,t){for(var n=[],r=0;r<t;r++)n.push(this.renderSquare(e*t+r));return a.a.createElement("div",{className:"board-row",key:"row".concat(e)},n)}},{key:"renderBoard",value:function(e,t){for(var n=[],r=0;r<e;r++)n.push(this.renderRow(r,t));return n}},{key:"render",value:function(){return a.a.createElement("div",null,this.renderBoard(this.props.numRows,this.props.numCols))}}]),t}(a.a.Component),f=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(o.a)(this,Object(c.a)(t).call(this,e))).state={winner:null,history:[{squares:Array(400).fill(null)}],xIsNext:!0,moveNumber:0},n}return Object(h.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e,t=this,n=this.state.history,r=n[this.state.moveNumber];return console.log(n.length),console.log(this.state.moveNumber),e=null!=this.state.winner?"Winner: ".concat(this.state.winner):"Next player: ".concat(this.state.xIsNext?"X":"O"),a.a.createElement("div",{className:"game"},a.a.createElement("div",{className:"game-board"},a.a.createElement(v,{numRows:20,numCols:20,winCondition:5,squares:r.squares,onClick:function(e){return t.handleClick(e)}})),a.a.createElement("div",{className:"game-info"},a.a.createElement("div",null,e),a.a.createElement("div",null,a.a.createElement("button",{onClick:function(){return t.previousMove()}},"Redo"),a.a.createElement("button",{onClick:function(){return t.restartGame()}},"Restart"))))}},{key:"previousMove",value:function(){if(0!==this.state.moveNumber){var e=this.state.history.slice(0,this.state.moveNumber);console.log(e.length),this.setState({history:e,moveNumber:e.length-1,xIsNext:!this.state.xIsNext,winner:null})}}},{key:"restartGame",value:function(){this.setState({winner:null,history:[{squares:Array(400).fill(null)}],xIsNext:!0,moveNumber:0})}},{key:"handleClick",value:function(e){var t=this.state.history.slice(0,this.state.moveNumber+1),n=t[t.length-1].squares.slice();if(!n[e]&&null==this.state.winner){n[e]=this.state.xIsNext?"X":"O";var r=function(e,t,n,r,a){var s,i=t%r,l=parseInt(t/r),u=r-1-i,o=n-1-l;s=[];for(var c=l*r,h=c+(r-1),m=Math.max(c,t-(a-1)),v=Math.min(h,t+(a-1)),f=m;f<=v&&v-f+1>=a-s.length;f++)if(null==e[f]||e[f]!==e[t])s=[];else if(s.unshift(f),s.length===a)return s;s=[];for(var d=t%r,b=d+r*(n-1),p=Math.max(d,t-(a-1)*r),N=Math.min(b,t+(a-1)*r),x=p;x<=N&&(N-x)/r+1>=a-s.length;x+=r)if(null==e[x]||e[x]!==e[t])s=[];else if(s.unshift(x),s.length===a)return s;s=[];for(var y=Math.min(i,l),k=Math.min(u,o),g=r+1,w=Math.max(t-(a-1)*g,t-y*g),C=Math.min(t+(a+1)*g,t+k*g),E=w;E<=C&&(C-E)/g+1>=a-s.length;E+=g)if(null==e[E]||e[E]!==e[t])s=[];else if(s.unshift(E),s.length===a)return s;s=[];for(var M=Math.min(u,l),O=Math.min(o,i),j=r-1,q=Math.max(t-(a-1)*j,t-M*j),I=Math.min(t+(a-1)*j,t+O*j),R=q;R<=I&&(I-R)/j+1>=a-s.length;R+=j)if(null==e[R]||e[R]!==e[t])s=[];else if(s.unshift(R),s.length===a)return s;return null}(n,e,20,20,5);this.setState({history:t.concat([{squares:n}]),moveNumber:t.length,xIsNext:!this.state.xIsNext,winner:null!=r?n[e]:null})}}}]),t}(a.a.Component);i.a.render(a.a.createElement(f,null),document.getElementById("root"))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.a8ff8adc.chunk.js.map