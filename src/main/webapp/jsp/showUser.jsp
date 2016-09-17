<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"
	language="java" import="com.mouthcare.base.MDLoadHtm"%>

<jsp:include page="/include/header.jsp" flush="true">
	<jsp:param name="title" value="用户查询" />
</jsp:include>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>用户展示</title>
</head>

<body>
	${user.userName}


	<jsp:include page="/include/footer.jsp" flush="true" />
	<script>	
		$(function () {
			$.ajax({
				url:'/user/showUser.action',
				type:'post',
				data:{id:1},
				success:function(data){
					alert(data.user.userName);					
				},
				error:function(){
					alert('System is wrong.');					
				}
			});
		});
</script>
</body>
</html>
