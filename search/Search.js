function changeText(obj){                           //写了一个聚焦清空原文本的函数
	if (obj.getAttribute('value')) {
			obj.setAttribute('value','');
	}
};
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
};
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
	var oText=document.getElementById('Text');			//运用到搜索栏
	oText.onclick=function(){
		changeText(oText);
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
	};
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
    var omenu=document.getElementById('menu');           //二级下拉菜单
	menu.onmouseover=function(){
		startMove(omenu,{height:135});
	};
	menu.onmouseout=function(){
		startMove(omenu,{height:33});
	}
}