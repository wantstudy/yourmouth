<!DOCTYPE html>

<!--[if IE 8]> <html lang="en" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="en" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html class="no-js">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<head>
<meta charset="utf-8"/>
<title>用户登陆</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="/assets/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="/assets/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="/assets/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME STYLES -->
<link href="/assets/css/style-metronic.css" rel="stylesheet" type="text/css"/>
<link href="/assets/css/style.css" rel="stylesheet" type="text/css"/>
<link href="/assets/css/style-responsive.css" rel="stylesheet" type="text/css"/>
<link href="/assets/css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="/assets/css/themes/default.css" rel="stylesheet" type="text/css" id="style_color"/>
<link href="/assets/css/pages/login-soft.css" rel="stylesheet" type="text/css"/>
<link href="/assets/css/custom.css" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="shortcut icon" href="img/favicon.ico">
<style type="text/css" media="screen">
    .login .content{
        margin-top:150px;
    }
   
</style>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
        <%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" language="java"
         import="com.mouthcare.base.MDLoadHtm" %>
<script>
        window.projectName = "<%=MDLoadHtm.getProjecName()%>";
        window.apiSuffix = "<%=MDLoadHtm.getApiSuffix()%>";
    </script>
<!-- BEGIN LOGO -->
<!--div class="logo"> <a href="index.html"> <img src="/mp/assets/img/logo.png" alt=""/> </a> </div>
<!-- END LOGO --> 
<!-- BEGIN LOGIN -->
<div class="content"> 
    <!-- BEGIN LOGIN FORM -->
    
    <ul class="nav nav-tabs ">
        <li class="active"><a href="#nav_login"  data-toggle="tab"> 豆豆口腔 </a> </li>
    </ul>
    <div class="tab-content">
        <div id="nav_login" class="tab-pane active">
            <form class="login-form" id="login_menu" action="/login" method="post">
                <!--h3 class="form-title">Login to your account</h3-->
                <div class="alert alert-danger display-hide">
                    <button class="close" type="button" data-close="alert"></button>
                    <span> 请输入用户名和密码！ </span> </div>
                <div class="alert alert-warning display-hide">
                <button class="close" type="button" data-close="alert"></button>
                <span> </span> </div>                       
                <div class="form-group"> 
                    <!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
                    <label class="control-label visible-ie8 visible-ie9">用户名</label>
                    <div class="input-icon"> <i class="fa fa-user"></i>
                        <input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="userName" id="username"/>
                    </div>
                </div>
                <div class="form-group">
                    <label class="control-label visible-ie8 visible-ie9">密码</label>
                    <div class="input-icon"> <i class="fa fa-lock"></i>
                        <input class="form-control placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password"/><input name="loginnew" value="new" type="hidden" />
                    </div>
                </div>
                <div class="form-actions">
                    
                    <button  id="save" class="btn blue pull-right"> 登录 <i class="m-icon-swapright m-icon-white"></i> </button>
                </div>
            </form>
        </div>

    </div>

    
    <!-- END LOGIN FORM --> 
    <!-- BEGIN FORGOT PASSWORD FORM -->

    <!-- END FORGOT PASSWORD FORM --> 
    <!-- BEGIN REGISTRATION FORM -->

    <!-- END REGISTRATION FORM --> 
</div>
<!-- END LOGIN --> 
<!-- BEGIN COPYRIGHT -->
<div class="copyright"> Copyright ©  </div>
<!-- END COPYRIGHT --> 
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) --> 
<!-- BEGIN CORE PLUGINS --> 
<!--[if lt IE 9]>
    <script src="express/new/assets/plugins/respond.min.js"></script>
    <script src="express/new/assets/plugins/excanvas.min.js"></script> 
    <![endif]--> 
<!-- END CORE PLUGINS --> 
<!-- BEGIN PAGE LEVEL PLUGINS --> 
<jsp:include page="/include/footer.jsp" flush="true"/>
<script src="/assets/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script> 
<script src="/assets/plugins/backstretch/jquery.backstretch.min.js" type="text/javascript"></script> 
<%=MDLoadHtm.loadJs("/js/lib/img.js") %>
<%=MDLoadHtm.loadJs("/js/user/login.js")%>
<%=MDLoadHtm.loadJs("/js/lib/md5.js")%>
<!-- END PAGE LEVEL PLUGINS --> 
<!-- BEGIN PAGE LEVEL SCRIPTS --> 
<!-- END PAGE LEVEL SCRIPTS --> 
</body>
<!-- END BODY -->
</html>