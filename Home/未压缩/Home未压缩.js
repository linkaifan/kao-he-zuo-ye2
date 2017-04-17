window.onload=function ()
{	
	function changeText(obj){                           //写了一个聚焦清空原文本的函数
		if (obj.getAttribute('value')) {
			obj.setAttribute('value','');
		}
	}
	var oText=document.getElementById('Text');			//运用到搜索栏
	oText.onclick=function(){
		changeText(oText);
	}
	var ologinText=document.getElementById('loginText');   //运用到用户名处
	ologinText.onclick=function(){
		changeText(ologinText);
	}


	var olandIcon=document.getElementById('landIcon');
	var ologinBox=document.getElementById('loginBox');     //点击，登陆窗口弹出
	olandIcon.onclick=function(){
		ologinBox.style.display='block';
	}
	var oclose=document.getElementById('close');
	oclose.onclick=function(){
		ologinBox.style.display='none';
	}
	var opassText=document.getElementById('passText');      
	var ologin=document.getElementById('login');
	var loginname=olandIcon.getElementsByTagName('span')[0];
	var loginimg=olandIcon.getElementsByTagName('img')[0];
    ologin.onclick=function () {                       //点击登陆进行表单验证
    	var loginRe=/^[a-z]+$/i;					//英文字母
    	var passwordRe=/^\d{6,10}$/;				//6到10个数字
    	if(loginRe.test(ologinText.value)&&passwordRe.test(opassText.value)){		//登陆成功时候，load出现用户名 登陆框消失
    		alert('合法的用户名与密码');
    		loginname.innerHTML=ologinText.value;
    		loginname.style.display='block';
    		loginimg.style.display='none';
    		ologinBox.style.display='none';
    		return false;
    	}
    	else{
    		alert('抱歉，出错了');
    	}
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
    }
};