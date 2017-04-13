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
	var opassText=document.getElementById('passText');      
	var ologin=document.getElementById('login');
    ologin.onclick=function () {                       //点击登陆进行表单验证
    	var loginRe=/^[a-z]+$/i;
    	if(loginRe.test(ologinText.value)){
    		alert('合法的用户名');
    	}
    	else{
    		alert('抱歉，出错');
    	}
    	var passwordRe=/^\d{6,10}$/;
    	if (passwordRe.test(opassText.value)) {
    		alert('合法的密码');
    	}
    	else{
    		alert('抱歉，出错');
    	}
    }
	var olandIcon=document.getElementById('landIcon');
	var ologinBox=document.getElementById('loginBox');     //点击，窗口弹出
	olandIcon.onclick=function(){
		ologinBox.style.display='block';
	}
	var oclose=document.getElementById('close');
	oclose.onclick=function(){
		ologinBox.style.display='none';
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