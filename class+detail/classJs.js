function changeText(a){if(a.getAttribute("value")){a.setAttribute("value","")}}function getStyle(b,a){if(b.currentStyle){return b.currentStyle[a]}else{return getComputedStyle(b,false)[a]}}function startMove(c,b,a){clearInterval(c.timer);c.timer=setInterval(function(){var e=true;for(var d in b){var g=0;if(d=="opacity"){g=Math.round(parseFloat(getStyle(c,d))*100)}else{g=parseInt(getStyle(c,d))}var f=(b[d]-g)/6;f=f>0?Math.ceil(f):Math.floor(f);if(g!=b[d]){e=false}if(d=="opacity"){c.style.filter="alpha(opacity:"+(g+f)+")";c.style.opacity=(g+(f))/100}else{c.style[d]=g+f+"px"}}if(e){clearInterval(c.timer);if(a){a()}}},30)}window.onload=function(){var j=document.getElementById("play");var m=document.getElementsByClassName("circle")[0];var d=m.getElementsByTagName("li");var a=0;for(var s=0;s<d.length;s++){d[s].index=s;d[s].onclick=function(){a=this.index;b()}}function b(){for(var x=0;x<d.length;x++){d[x].className=""}d[a].className="active";startMove(j,{left:-1280*a})}function r(){a++;if(a==d.length){a=0}b()}var l=setInterval(r,2500);j.parentNode.onmouseover=function(){clearInterval(l)};j.parentNode.onmouseout=function(){l=setInterval(r,2500)};var e=document.getElementById("center");var u=e.getElementsByTagName("a");var t=document.getElementsByTagName("content");for(var s=0;s<u.length;s++){u[s].index=s;u[s].onclick=function(){for(var z=0;z<u.length;z++){u[z].className="";t[z].className="tabClass"}this.className="active";t[this.index].className="tabClassActive";var B=document.getElementsByClassName("tabClassActive")[0];var y=B.getElementsByClassName("show")[0];var C=y.getElementsByTagName("img");var A=B.getElementsByClassName("show")[1];var x=A.getElementsByTagName("img");for(var z=0;z<C.length;z++){C[z].onclick=function(){n.style.display="block";n.style.zIndex=3;startMove(n,{width:1280,height:1150,opacity:100})};x[z].onclick=function(){n.style.display="block";n.style.zIndex=3;startMove(n,{width:1280,height:1150,opacity:100})}}return false}}var c=document.getElementsByTagName("footer")[0];var h=c.getElementsByTagName("a");for(var s=0;s<h.length;s++){h[s].onclick=function(){for(var x=0;x<h.length;x++){h[x].className=""}this.className="active";return false}}var f=document.getElementById("Text");f.onclick=function(){changeText(f)};var n=document.getElementById("DetailBox");var w=document.getElementsByClassName("show")[0];var v=document.getElementsByClassName("show")[1];var p=w.getElementsByTagName("img");var q=v.getElementsByTagName("img");for(var s=0;s<p.length;s++){p[s].onclick=function(){n.style.display="block";n.style.zIndex=3;startMove(n,{width:1280,height:1150,opacity:100})};q[s].onclick=function(){n.style.display="block";n.style.zIndex=3;startMove(n,{width:1280,height:1150,opacity:100})}}var k=document.getElementById("close");k.onclick=function(){n.style.display="none";startMove(n,{width:0,height:0,opacity:0});n.style.zIndex=-3};var g=document.getElementById("searchImg");var o=document.getElementById("LoadingBox");g.onclick=function(){o.style.display="block"};document.onkeydown=function(i){var x=i||window.event||arguments.callee.caller.arguments[0];if(x&&x.keyCode==13){o.style.display="block"}if(x&&x.keyCode==27){o.style.display="none"}}};