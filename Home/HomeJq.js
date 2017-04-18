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
                  $('#landIcon p').text(obj.user[0].name).css('display','block');   
              }
          });
	 });
});	