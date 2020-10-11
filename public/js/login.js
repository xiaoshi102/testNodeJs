$('#back').click(function(){
	//后退到上一个历史记录
	history.go(-1)
})

$('#register').click(function(){
	location.href = 'register.html'
})


$('form').submit(function(event){
	//阻止默认提交行为
	event.preventDefault()
	
	var data = $('form').serialize()
	console.log(document.cookie)
	$.post('/login',data,function(responseData){
		
		//请求成功时,响应数据中会有一个cookie字段,获取响应数据后,这个cookie字段的信息会自动存到本地cookie ,  注意:响应数据自动存储的cookie是会话cookie,当窗口关闭,会自动清理
		console.log(document.cookie)
		
		//把返回的信息显示到模态框
		$('.modal-body').text(responseData.message)
		//弹出模态框
		$('.modal').modal('show')
		//监听事件   hide.bs.modal  它是bootstrap中的自定义事件, 当关闭模态框时,触发这个事件
		$('.modal').on('hide.bs.modal',function(){
			//如果登录成功,跳转到主页
			if(responseData.result == 1){
				//跳转主页    /  通配符  可以替代 index.html
				location.href = '/'
			}
		})
		
	})
})









