$('#back').click(function(){
	//后退到上一个历史记录
	history.go(-1)
})

//提交表单,上传头像
$('form').submit(function(event){
	event.preventDefault()
	
	//图片上传,用formData读取图片
	var formData = new FormData(this)
	
	//发送上传图片请求
	$.ajax({
		type : 'post',
		url : '/upload',
		data : formData ,
		//jquery自动数据类型,取消
		contentType : false ,
		//process加工/处理数据  ,取消 
		processData : false ,
		//原因:jQuery内部会把数据默认转化为字符串
		success : function(responseData){
//			console.log(responseData.message)
			location.href = '/'
		}
	})
})






















