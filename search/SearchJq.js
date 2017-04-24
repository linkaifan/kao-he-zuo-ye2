$(document).ready(function(){	
	Mock.mock('http://vtmer.cn/search', {
               // 书的大分类
               'bookclass':[{
                    // 书的详情
                    'bookInfo|20-40':[{
                         // 书名
                         title:'@title(2)',			//修改为2个单词形式，不然可能过长
                         // 作者
                         author:'@name()',
                         // 出版社
                         publish:'@region()出版社',
                         // 出版时间
                         publishDate:'@date(yyyy-MM-dd)',
                         // 图书馆详情
                         library:[{
                              // 数目
                              total:'@natural(0, 100)',
                              // 位置
                              position:'@natural(2, 7)楼@natural(1,100)架@natural(0, 100)'
                         }],
                         // 书本链接
                         bookUrl:[{
                              doubanUrl:'@url()',
                              zhihuUrl:'@url()'
                         }],
                         // 书本购买链接
                         buyUrl:[{
                              jDUrl:'@url()',
                              DangUrl:'@url()',
                              AmazonUrl:'@url()'
                         }],
                         // 作者介绍
                         ahthorIntro:'@paragraph(1)',			//修改了句子长度
                         // 书本介绍
                         bookIntro:'@paragraph(2)',
                         // 书本封面链接
                         cover: '@image(200x280,@color(),png)',
                         // 评分
                         socre:'@natural(0, 5)'
                    }]
          }]
    });

      if (location.href.indexOf('?')!=-1) {		     //获得本网址搜索的内容
    	var Value=location.href.split("?");		      //第一本书，书名与搜索内容相同
    	$('.star:first p:first').text(Value[1]);
    	$('#SearchValue p:first').text(Value[1]);	
    	$.ajax({
            type: "POST",
            url: "http://vtmer.cn/search",
            success: function(data){
            	var bookdata = eval ("(" + data + ")");
            	$('.star:first p:eq(1)').text(bookdata.bookclass[0].bookInfo[0].author);
            	$('.show:first img:first').click(function(){
            		$('h3:first').text(Value[1]);				
               		$(' #ahthorIntro').text(bookdata.bookclass[0].bookInfo[0].ahthorIntro);		
               		$(' #bookIntro').text(bookdata.bookclass[0].bookInfo[0].bookIntro);			
               		$('.information p:eq(0) span:first').text(bookdata.bookclass[0].bookInfo[0].author);					
               		$('.information p:eq(1) span:first').text(bookdata.bookclass[0].bookInfo[0].publish);				
               		$('.information p:eq(2) span:first').text(bookdata.bookclass[0].bookInfo[0].publishDate);				
               		$('.information p:eq(3) span:first').text(bookdata.bookclass[0].bookInfo[0].library[0].total);					
               		$('.information p:eq(3) span:eq(1)').text(bookdata.bookclass[0].bookInfo[0].library[0].position);
               		$('.detail img:eq(0)').attr('src',bookdata.bookclass[0].bookInfo[0].cover);	
            	})
            }
   		})
   		
    }
    $('form img:first').click(function(){					//输入搜索内容，点击搜索后，url上出现搜索内容
    	var SearchValue=$('form input:first').val();
    	$('#SearchValue p:first').text(SearchValue);
    	function open(){									          //Loading动画后跳转到搜索页
		  window.open('../search/Search.html?'+SearchValue,'_self');
		  }
		  var openSearchHtml=setTimeout(open,4000);	
    })
    $('#Text').keydown(function(event){          //回车Loading动画后跳转到搜索页
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if(e && e.keyCode==13){ 
               var SearchValue=$('form:first input:first').val();
               function open(){                                            
               window.open('../search/Search.html?'+SearchValue,'_self');
               }
               var openSearchHtml=setTimeout(open,4000);         
          }

     })
})