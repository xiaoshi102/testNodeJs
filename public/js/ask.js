$('#back').click(function(){
	//后退到上一个历史记录
	history.go(-1)
})


//提交问题
$('form').submit(function(event){
	event.preventDefault()
	
	var data = $('form').serialize()
	
	$.post('/ask',data,function(responseData){
		//把返回的信息显示到模态框
		$('.modal-body').text(responseData.message)
		//弹出模态框
		$('.modal').modal('show')
		//监听事件   hide.bs.modal  它是bootstrap中的自定义事件, 当关闭模态框时,触发这个事件
		$('.modal').on('hide.bs.modal',function(){
			//如果提问成功,跳转到主页
			if(responseData.result == 1){
				//跳转主页 
				location.href = '/'
			}
		})
	})
	
})











