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
	var nextBtn=document.getElementById('next');
	oplay.parentNode.onmouseover=function(){
		clearInterval(timer);	
		nextBtn.style.display='block';
		nextBtn.onclick=function(){
			now++;
			if (now==3) {
			now=0;
			};
			tab();
		}
	};
	oplay.parentNode.onmouseout=function(){
		nextBtn.style.display='none';
		timer=setInterval(next,2500);
	};
	var oCenter=document.getElementById('center');      //类1，2，3，4的切换
	var oClassBtn=oCenter.getElementsByTagName('a');
	var otabClass=document.getElementsByTagName('content');	//分类，用content选定，4个
	for (var i = 0; i < oClassBtn.length; i++) {
		oClassBtn[i].index=i;
		oClassBtn[i].onclick=function(){
			for (var i = 0; i < oClassBtn.length; i++) {
				oClassBtn[i].className='';				//初始化全部，使他们特效消失
				otabClass[i].className='tabClass';
			}
			this.className='active';
			otabClass[this.index].className='tabClassActive';
			var showActive=document.getElementsByClassName('tabClassActive')[0];  //当类别改变时候，点击当前类里的书封面弹出详情页面
			var oshow0=showActive.getElementsByClassName('show')[0];
			var oImgBtn0=oshow0.getElementsByTagName('img');
			var oshow1=showActive.getElementsByClassName('show')[1];
			var oImgBtn1=oshow1.getElementsByTagName('img');
			for (var i = 0; i < oImgBtn0.length; i++) {
				oImgBtn0[i].onclick=function(){
				oDetailBox.style.display='block';
				oDetailBox.style.zIndex=3;
				startMove(oDetailBox,{width:1280, height:1150, opacity:100});
				}
				oImgBtn1[i].onclick=function(){
				oDetailBox.style.display='block';
				oDetailBox.style.zIndex=3;
				startMove(oDetailBox,{width:1280, height:1150, opacity:100});
				}
			};
			return false;
		}
	};
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

	var oDetailBox=document.getElementById('DetailBox');        //初始时，分类1，点击书面弹出详情页面
	var oldshow0=document.getElementsByClassName('show')[0];
	var oldshow1=document.getElementsByClassName('show')[1];
	var oldImgBtn0=oldshow0.getElementsByTagName('img');
	var oldImgBtn1=oldshow1.getElementsByTagName('img');
	for (var i = 0; i < oldImgBtn0.length; i++) {
		oldImgBtn0[i].onclick=function(){
			oDetailBox.style.display='block';
			oDetailBox.style.zIndex=3;
			startMove(oDetailBox,{width:1280, height:1150, opacity:100});
		}
		oldImgBtn1[i].onclick=function(){
			oDetailBox.style.display='block';
			oDetailBox.style.zIndex=3;
			startMove(oDetailBox,{width:1280, height:1150, opacity:100});
		}
	};
	var ocloseBtn=document.getElementById('close');				//点击关闭
	ocloseBtn.onclick=function(){
		oDetailBox.style.display='none';
		startMove(oDetailBox,{width:0, height:0, opacity:0});
		oDetailBox.style.zIndex=-3;
	}

	function open(){									//Loading动画后跳转到搜索页
		window.open('../search/Search.html','_self');
	}	
	var osearchImg=document.getElementById('searchImg');    //点击搜索图标，遮罩弹出,4秒后跳转
	var oLoadingBox=document.getElementById('LoadingBox');
	osearchImg.onclick=function(){
		oLoadingBox.style.display='block';
		var openSearchHtml=setTimeout(open,4000);	
	}
	document.onkeydown=function(event){                    //键入回车，遮罩弹出 键入Esc，遮罩消失
    var e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode==13){ 
                oLoadingBox.style.display='block'; 
                var openSearchHtml=setTimeout(open,4000);	
        }
        if(e && e.keyCode==27){  
                oLoadingBox.style.display='none'; 
        }
    };
};