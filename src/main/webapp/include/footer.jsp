<%@ page import="com.mouthcare.base.MDLoadHtm" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%=MDLoadHtm.loadJs("/js/lib/jquery-1.8.3.js")%>
<%=MDLoadHtm.loadJs("/js/lib/jquery-ui-1.9.2.custom.js")%>
<%=MDLoadHtm.loadJs("/js/lib/bootstrap.js")%>
<%=MDLoadHtm.loadJs("/js/lib/QBase.js")%>
<script>
    if ($(".citySuggest")[0]) {
        util.loadJs('<%=MDLoadHtm.loadJsUrl("/js/lib/citySuggest.js")%>');
    }
    if ($(".schoolSuggest")[0]) {
        util.loadJs('<%=MDLoadHtm.loadJsUrl("/js/lib/schoolSuggest.js")%>');
    }
    if ($(".categorySelect")[0]) {
        util.loadJs('<%=MDLoadHtm.loadJsUrl("/js/lib/categorySelect.js")%>');
    }
    if ($(".uploadImg")[0]) {
        util.loadJs('<%=MDLoadHtm.loadJsUrl("/js/lib/uploadImg.js")%>');
    }
    if ($(".cleditor")[0]) {
        util.loadCss('<%=MDLoadHtm.loadJsUrl("/css/jquery.cleditor.css")%>');
        util.loadJs('<%=MDLoadHtm.loadJsUrl("/js/lib/jquery.cleditor.min.js")%>', function () {
            $('.cleditor').cleditor();
        });
    }
</script>
<%
    if (MDLoadHtm.isDebug()) {
%>
<%=MDLoadHtm.loadJs("/js/lib/jquery.mockjax.js")%>
<%
    }
%>
