$(document).ready(function(){	
	 Mock.mock('http://vtmer.cn/login', {
          'user|9':[{
          	name:'@first()',
          	password:'@string(number,6,10)'
          }]         
     });
	 $('#login').click(function () {
	 	$.ajax({
              type: "POST",
              url: "http://vtmer.cn/login",
              success: function(data){
               		var obj = eval ("(" + data + ")");
	                var username=obj.user[0].name;
                  $('#landIcon span').text(obj.user[0].name).css('display','block');   
              }
          });
	 });
   $('#searchImg').click(function(){
          var SearchValue=$('#Text').val();
          function open(){                                            //Loading动画后跳转到搜索页
               window.open('../search/Search.html?'+SearchValue,'_self');
          }
          var openSearchHtml=setTimeout(open,4000);    
     })
   $('#Text').keydown(function(event){ 
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if(e && e.keyCode==13){ 
               var SearchValue=$('#Text').val();
               function open(){                                            //回车Loading动画后跳转到搜索页
               window.open('../search/Search.html?'+SearchValue,'_self');
               }
               var openSearchHtml=setTimeout(open,4000);         
          }

     })
   
});	