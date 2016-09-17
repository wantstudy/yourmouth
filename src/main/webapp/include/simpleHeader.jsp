<%@ page import="com.mouthcare.base.MDLoadHtm" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <!--
        Charisma v1.0.0

        Copyright 2012 Muhammad Usman
        Licensed under the Apache License v2.0
        http://www.apache.org/licenses/LICENSE-2.0

        http://usman.it
        http://twitter.com/halalit_usman
    -->
    <meta charset="utf-8">
    <title><%=request.getParameter("title")%>
    </title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Charisma, a fully featured, responsive, HTML5, Bootstrap admin template.">
    <meta name="author" content="Muhammad Usman">

    <!-- The styles -->
    <%=MDLoadHtm.loadCss("/css/bootstrap-spacelab.css")%>
    <%=MDLoadHtm.loadCss("/css/bootstrap-responsive.css")%>
    <%=MDLoadHtm.loadCss("/css/charisma-app.css")%>
    <%=MDLoadHtm.loadCss("/css/jquery-ui-1.8.21.custom.css")%>
    <!-- The HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
    <%=MDLoadHtm.loadJs("/js/lib/html5.js")%>
    <![endif]-->

    <script>
        window.projectName = "<%=MDLoadHtm.getProjecName()%>";
        window.apiSuffix = "<%=MDLoadHtm.getApiSuffix()%>";
    </script>

    <!-- The fav icon -->
    <link rel="shortcut icon" href="img/favicon.ico">

</head>
