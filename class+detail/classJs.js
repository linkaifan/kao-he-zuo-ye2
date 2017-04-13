function changeText(obj){                           //写了一个聚焦清空原文本的函数
		if (obj.getAttribute('value')) {
			obj.setAttribute('value','');
		}
	}
  //跟着教程写了一个运动框架。
function getStyle(obj, name)                    //取得obj的某个样式，兼容。        
{
	if(obj.currentStyle)
	{
		return obj.currentStyle[name];
	}
	else
	{
		return getComputedStyle(obj, false)[name];
	}
}

function startMove(obj, json, fnEnd)                //运动框架
{
	clearInterval(obj.timer);
	obj.timer=setInterval(function (){
		var bStop=true;		//假设：所有值都已经到了
		
		for(var attr in json)
		{
			var cur=0;
			
			if(attr=='opacity')
			{
				cur=Math.round(parseFloat(getStyle(obj, attr))*100);
			}
			else
			{
				cur=parseInt(getStyle(obj, attr));
			}
			
			var speed=(json[attr]-cur)/6;
			speed=speed>0?Math.ceil(speed):Math.floor(speed);
			
			if(cur!=json[attr])
				bStop=false;
			
			if(attr=='opacity')
			{
				obj.style.filter='alpha(opacity:'+(cur+speed)+')';
				obj.style.opacity=(cur+(speed))/100;
			}
			else
			{
				obj.style[attr]=cur+speed+'px';
			}
		}
		
		if(bStop)
		{
			clearInterval(obj.timer);
						
			if(fnEnd)fnEnd();
		}
	}, 30);
}

window.onload=function(){                                
	var oplay=document.getElementById('play');
	var ocircle=document.getElementsByClassName('circle')[0];
	var oBtn=ocircle.getElementsByTagName('li');
	var now=0;
	for (var i = 0; i < oBtn.length; i++) {               //轮播图
		oBtn[i].index=i;								//小圆点的切换+内容的切换
		oBtn[i].onclick=function(){
			now=this.index;
			tab();
		};
	}
	function tab(){								
		for (var i = 0; i < oBtn.length; i++) {
			 	oBtn[i].className='';
			 }
			 oBtn[now].className='active';
			startMove(oplay,{left:-1280*now});
	}
	function next(){                                 //自动切换
		now++;
		if (now==oBtn.length) {
			now=0;
		}
		tab();
	}
	var timer=setInterval(next,2500);            //鼠标移入时，停止自动切换
	oplay.parentNode.onmouseover=function(){
		clearInterval(timer);
	};
	oplay.parentNode.onmouseout=function(){
		timer=setInterval(next,2500);
	};
	/*var oCenter=document.getElementById('center');      //类1，2，3，4的切换
	var oClassBtn=oCenter.getElementsByTagName('a');
	for (var i = 0; i < oClassBtn.length; i++) {
		oClassBtn[i].onclick=function(){
			for (var i = 0; i < oClassBtn.length; i++) {
				oClassBtn[i].className='';
			}
			this.className='active';
			return false;
		}
	};*/
	var ofooter=document.getElementsByTagName('footer')[0];        //页码的切换
	var oPageBtn=ofooter.getElementsByTagName('a');
	for (var i = 0; i < oPageBtn.length; i++) {
		oPageBtn[i].onclick=function(){
			for (var i = 0; i < oPageBtn.length; i++) {
				oPageBtn[i].className='';
			}
			this.className='active';
			return false;
		}
	};
	var oText=document.getElementById('Text');			//运用到搜索栏
	oText.onclick=function(){
		changeText(oText);
	};
	var oDetailBox=document.getElementById('DetailBox');            //点击书面弹出详情页面
	var oshow0=document.getElementsByClassName('show')[0];
	var oImgBtn0=oshow0.getElementsByTagName('img');
	for (var i = 0; i < oImgBtn0.length; i++) {
		oImgBtn0[i].onclick=function(){
			oDetailBox.style.display='block';
			oDetailBox.style.zIndex=3;
			startMove(oDetailBox,{width:1280, height:1150, opacity:100});
		}
	};
	var ocloseBtn=document.getElementById('close');
	ocloseBtn.onclick=function(){
		oDetailBox.style.display='none';
		startMove(oDetailBox,{width:0, height:0, opacity:0});
		oDetailBox.style.zIndex=-3;
	}
	var osearchImg=document.getElementById('searchImg');    //点击搜索图标，遮罩弹出
	var oLoadingBox=document.getElementById('LoadingBox');
	osearchImg.onclick=function(){
		oLoadingBox.style.display='block';
	}
	document.onkeydown=function(event){                    //键入回车，遮罩弹出 键入Esc，遮罩消失
    var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ 
                oLoadingBox.style.display='block'; 
        }
        if(e && e.keyCode==27){  
                oLoadingBox.style.display='none'; 
        }
    };
};