$(document).ready(function(){	
	Mock.mock('http://vtmer.cn/class', {
			// 书的大分类
 			'bookclass|4':[{
 				// 书的详情
 				'bookInfo|24':[{			//修改为24本，刚好3页
 					// 书名
          			title:'@title(2)',		//修改为2个单词形式，不然可能过长
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
          			ahthorIntro:'@paragraph(1)',				//修改了句子长度
          			// 书本介绍
          			bookIntro:'@paragraph(2)',
          			// 书本封面链接
          			cover: '@image(200x280,@color(),png)',
          			// 评分
          			socre:'@natural(0, 5)'
 				}]
         	}]
     });
	
	 	$.ajax({
               type: "POST",
               url: "http://vtmer.cn/class",
               success: function(data){
               			var bookdata = eval ("(" + data + ")");
               			function AuthorBookname(id,n){
               				$(id+' .star .bookname').each(function(index,element){                   //分类x书名、作者
               				$(this).text(bookdata.bookclass[n].bookInfo[index].title);
               			})
               				$(id+' .star .author').each(function(index,element){					
               				$(this).text(bookdata.bookclass[n].bookInfo[index].author);
               			})
               			}
               			AuthorBookname('#class1','0');
               			AuthorBookname('#class2','1');
               			AuthorBookname('#class3','2');
               			AuthorBookname('#class4','3');

               			function Detail(id,n){               											//详情页
               				$(id+' .show img').each(function(index,element){
               					$(this).click(function(){
               						$('h3:first').text(bookdata.bookclass[n].bookInfo[index].title);				
               						$(' #ahthorIntro').text(bookdata.bookclass[n].bookInfo[index].ahthorIntro);		
               						$(' #bookIntro').text(bookdata.bookclass[n].bookInfo[index].bookIntro);			
               						$('.information p:eq(0) span:first').text(bookdata.bookclass[n].bookInfo[index].author);					
               						$('.information p:eq(1) span:first').text(bookdata.bookclass[n].bookInfo[index].publish);				
               						$('.information p:eq(2) span:first').text(bookdata.bookclass[n].bookInfo[index].publishDate);				
               						$('.information p:eq(3) span:first').text(bookdata.bookclass[n].bookInfo[index].library[0].total);					
               						$('.information p:eq(3) span:eq(1)').text(bookdata.bookclass[n].bookInfo[index].library[0].position);
               						$('.detail img:eq(0)').attr('src',bookdata.bookclass[n].bookInfo[index].cover);	
               					})
               				})
               			}            
               			Detail('#class1','0');
               			Detail('#class2','1');
               			Detail('#class3','2');
               			Detail('#class4','3');

               			function page(id,pageN,n){ 														//翻页
               				$('footer a:eq('+pageN+')').click(function(){	
               				var N=8*pageN; 							
               				$(id+' .star .bookname').each(function(index,element){              
               					$(this).text(bookdata.bookclass[n].bookInfo[index+N].title);
               				});
               				$(id+' .star .author').each(function(index,element){  
               					$(this).text(bookdata.bookclass[n].bookInfo[index+N].author);
               				});
               				$(id+' .show img').each(function(index,element){
               					$(this).click(function(){
               						$('h3:first').text(bookdata.bookclass[n].bookInfo[index+N].title);				
               						$(' #ahthorIntro').text(bookdata.bookclass[n].bookInfo[index+N].ahthorIntro);		
               						$(' #bookIntro').text(bookdata.bookclass[n].bookInfo[index+N].bookIntro);			
               						$('.information p:eq(0) span:first').text(bookdata.bookclass[n].bookInfo[index+N].author);					
               						$('.information p:eq(1) span:first').text(bookdata.bookclass[n].bookInfo[index+N].publish);				
               						$('.information p:eq(2) span:first').text(bookdata.bookclass[n].bookInfo[index+N].publishDate);				
               						$('.information p:eq(3) span:first').text(bookdata.bookclass[n].bookInfo[index+N].library[0].total);					
               						$('.information p:eq(3) span:eq(1)').text(bookdata.bookclass[n].bookInfo[index+N].library[0].position);
               						$('.detail img:eq(0)').attr('src',bookdata.bookclass[n].bookInfo[index+N].cover);	
               					})
               				})
               			});

               			}
                             page('#class1','0','0');page('#class1','1','0');page('#class1','2','0'); 	//初始化
                              $('nav a').each(function(){
                                   $(this).click(function(){
                                   if ($('#class1').attr('class')=="tabClassActive"){     
                                        page('#class1','0','0');page('#class1','1','0');page('#class1','2','0');     //分类1翻页
                                        
                                   }
               			     		else if($('#class2').attr('class')=="tabClassActive"){
                                        page('#class2','0','1');page('#class2','1','1');page('#class2','2','1');     //分类2翻页
                                        
                                   }
                                   else if ($('#class3').attr('class')=="tabClassActive") {
                                        page('#class3','0','2');page('#class3','1','2');page('#class3','2','2');     //分类3翻页
                                        
                                   }
                                   else if ($('#class4').attr('class')=="tabClassActive") {
               			          page('#class4','0','3');page('#class4','1','3');page('#class4','2','3');     //分类4翻页
                                        
                                   }
                                   $('footer a:first').click();
                                   })

                              })   
               			//到这里写完了分类的数据交互，但代码还是有重复的部分。哎，等有时间冷静下来改！功能部分还不太完美，


        				
                }
        });
     $('#searchImg').click(function(){
          var SearchValue=$('form:first input:first').val();
          function open(){                                            //Loading动画后跳转到搜索页
               window.open('../search/Search.html?'+SearchValue,'_self');
          }
          var openSearchHtml=setTimeout(open,4000);    
     })
     $('#Text').keydown(function(event){ 
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if(e && e.keyCode==13){ 
               var SearchValue=$('form:first input:first').val();
               function open(){                                            //回车Loading动画后跳转到搜索页
               window.open('../search/Search.html?'+SearchValue,'_self');
               }
               var openSearchHtml=setTimeout(open,4000);         
          }

     })

});