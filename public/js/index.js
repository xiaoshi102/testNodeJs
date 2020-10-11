
//定义变量,标记是否登录
var islogin = false ;

//如果主页是由登录页面跳转过来的,说明登陆了响应数据中的cookie已经存到本地了,那么就可以判断本地cookie是否有用户名,确定是否登录
var userName = $.cookie('userName')
if(userName){
	islogin = true ;
	//如果登录.显示用户名
	$('#login span:nth-child(2)').text(userName)
}else{
	$('#login span:nth-child(2)').text('登录')
}

//点击登录按钮
$('#login').click(function(){
	if(islogin){ //已登录
		//已登录,添加下拉列表功能
		$(this).attr('data-toggle','dropdown')
	}else{
		//未登录,取消下拉列表功能
		$(this).removeAttr('data-toggle')
		//跳转到登录页面
		location.href = 'login.html'
	}
})


//点击退出按钮
$('ul li:nth-child(3)').click(function(){
	//发送 退出登录 请求
	$.get('/logout',function(){
		console.log(document.cookie)
		//cookie信息删掉之后,刷新页面
		location.href = '/'
	})
})


//点击提问按钮
$('#ask').click(function(){
	if(islogin){
		//已经登录,提问页面
		location.href = 'ask.html'
	}else{
		//没有登录,跳到登录页面
		location.href = 'login.html'
	}
})


//页面加载完成之后,向服务器发送请求获取问答数据
$(function(){
	//发送请求获取问答数据
	$.get('/questions',function(responseData){
		console.log(responseData)
		if(responseData.result == 0){
			//把返回的信息显示到模态框
			$('.modal-body').text(responseData.message)
			//弹出模态框
			$('.modal').modal('show')
		}else{
			//取出需要的数据
			var array = responseData.message ;
			console.log(array)
			//数组中的每一个问题需要放到下边的结构中
			/*
			<section>
		        <div class='questions' data-fileName='保存问题的文件名'>
		        	<img src="headImg/" + 用户名 +".jpg" />
			        <h3>用户名</h3>
			        <p>问题</p>
			        <time>提问的时间</time>
		        </div>
		       	<div class="answer">
		        	<p>回答</p>
		        	<img src="headImg/" + 用户名 +".jpg" />
		        	<time>提问的时间</time>
		        	<h3>用户名</h3>
		        </div>	 	
		    </section>
			 */
			//拼接一段HTML代码,放到main标签中,展示问答信息
			var html = ''
			for(var i = 0 ; i < array.length; i++){
				var obj = array[i]
				html += "<section>"
				html += '<div class="questions" data-fileName="' + obj.fileName + '">'
				html += '<img src="headImg/' + obj.userName + '.jpg" />'
				html += '<h3>' + obj.userName + '</h3>'
				html += '<p>' + obj.ask + '</p>'
				html += '<time>'+ setTimeString(obj.date) +'</time>'
				html += '</div>'
				
				//判断这个问题有没有回答,如果有,显示答案
				if(obj.answers){
					//for循环遍历所有的答案
					for(var n = 0 ; n<obj.answers.length;n++){
						var answerObj = obj.answers[n]
						//拼接答案
						html += '<hr>'
						html += '<div class="answer">'
			        	html += '<p>' + answerObj.answer + '</p>'
			        	html += '<img src="headImg/' + answerObj.userName + '.jpg" />'
			        	html += '<time>'+ setTimeString(answerObj.date) +'</time>'
			        	html += '<h3>' + answerObj.userName + '</h3>'
			        	html += '</div>'
					}
				}
				
				html += '</section>'
				
			}
			console.log(html)
			//把拼接好的html代码放到main标签中
			$('main').html(html)
			
			//img标签创建添加之后,监听img的事件
			//找不到用户头像时,设置为默认头像
			$('main img').error(function(){
				this.src = 'headImg/default/default.jpg'
			})
			
			
			//在section被创建并添加到main之后,给section添加点击事件
			setClickEvent()
			
		}
	})
})


//更改时间格式
function setTimeString(time){
	//用时间参数创建一个事件对象
	var date = new Date(time)
	console.log(date)
	//单独获取年月日时分秒
	var year = date.getFullYear()
	var month = date.getMonth() + 1
	var day = date.getDate()
	var hour = date.getHours()
	var minute = date.getMinutes()
	var second = date.getSeconds()
	
	hour = hour < 10 ? '0' + hour : hour
	minute = minute < 10 ? '0' + minute : minute
	second = second < 10 ? '0' + second : second
	
	//重新定义事件格式
	return  year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second ;
}


//注意下面输出中,jQuery对象中是没有标签元素的
//原因:ajax请求时异步的,程序执行到这句输出时,服务器尚未反馈数据,也就是section标签还没有被创建,添加,
console.log($('.questions'))


//解决方法一: 在section标签被创建之后,在绑定点击事件
function setClickEvent(){
	$('.questions').click(function(){
		console.log('点击了问题')
		if(islogin){
			//已登录,跳到回答页面
			location.href = 'answer.html'
			//获取点击的问题对应的(存储问题的文件)文件名
			var fileName = $(this).attr('data-fileName')
			//把文件名保存到cookie中
			$.cookie('fileName',fileName)
		}else{
			//未登录,跳到登录页面
			location.href = 'login.html'
		}
	})
}

//解决方法二: 
//用jQuery提供的delegate方法添加事件:可以给'未来'的元素添加事件
$('main').delegate('.questions','click',function(){
	console.log('点击了问题')
})











