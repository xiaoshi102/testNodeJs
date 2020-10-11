$('#back').click(function(){
	//后退到上一个历史记录
	history.go(-1)
})

//提交注册
$('form').submit(function(event){
	//阻止默认提交行为
	event.preventDefault()
	
	//判断两次输入的密码是否一致
	//找到form表单中的密码输入框,放到jQuery对象中
//	$('input[type=password]') ==== $(':password')
	
	if($(':password')[0].value != $(':password')[1].value){
		//如果两次密码输入不相同,弹出模态框提醒用户
		$('.modal-body').text('两次输入的密码不一致,请重新输入')
		$('#myModal').modal('show')
		//结束方法
		return
	}
	
	//如果表单信息无误,提交数据
	//用jQuery的方法读取表单的数据 
	//序列化为 key1=value1&key2=value2.....
	var data = $('form').serialize()
	console.log(data)
	$.post('/register',data,function(responseData){
		console.log(responseData)
		
		//把返回的信息显示到模态框
		$('.modal-body').text(responseData.message)
		//弹出模态框
		$('.modal').modal('show')
		//监听事件   hide.bs.modal  它是bootstrap中的自定义事件, 当关闭模态框时,触发这个事件
		$('.modal').on('hide.bs.modal',function(){
			//如果注册成功,跳转到登录页面
			if(responseData.result == 1){
				location.href = 'login.html'
			}
		})
	})
	
	
	
})



























