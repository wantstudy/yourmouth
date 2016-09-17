package com.mouthcare.base;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;

/**
 * Created by asheng on 2014/8/6 0006.
 */
@SuppressWarnings("serial")
public class MDLoadHtm extends HttpServlet {
    private static Logger logger = Logger.getLogger(MDLoadHtm.class);
    private static String staticPrefix;
    private static String projecName;
    private static String apiSuffix;

    private static String timestamp;
    private static String debug;

    public static boolean isDebug() {
        return "true".equals(MDLoadHtm.debug);
    }

    public static String getStaticPrefix() {
        return MDLoadHtm.staticPrefix;
    }

    public static String getApiSuffix() {
        return MDLoadHtm.apiSuffix;
    }

    public static String getProjecName() {
        return MDLoadHtm.projecName;
    }

    public void init(ServletConfig config) throws ServletException {
        MDLoadHtm.staticPrefix = config.getInitParameter("static-prefix");
        MDLoadHtm.staticPrefix = MDLoadHtm.staticPrefix.equals("/") ? "" : MDLoadHtm.staticPrefix;
        MDLoadHtm.projecName = config.getInitParameter("project-name");
        MDLoadHtm.projecName = MDLoadHtm.projecName.equals("/") ? "" : MDLoadHtm.projecName;
        MDLoadHtm.apiSuffix = config.getInitParameter("api-suffix");

        MDLoadHtm.timestamp = config.getInitParameter("timestamp");
        MDLoadHtm.debug = config.getInitParameter("debug");

        logger.info("projecName:" + MDLoadHtm.projecName);
        logger.info("apiSuffix:" + MDLoadHtm.apiSuffix);
        logger.info("staticPrefix:" + MDLoadHtm.staticPrefix);
        logger.info(MDLoadHtm.timestamp);
        logger.info(MDLoadHtm.debug);
        super.init(config);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        try {
            request.setCharacterEncoding("UTF-8");
            response.setCharacterEncoding("UTF-8");

            String path = request.getRequestURI().replaceAll(".htm", ".jsp").replace(request.getContextPath(), "");
            //验证登录和权限
            if (!this.checkPermission(request, response)) {
                path = "/error.jsp";
            }
            logger.info(path + "\n");

            request.getRequestDispatcher(path).forward(request, response);
        } catch (Exception ex) {
            logger.info(ex);
            ex.printStackTrace();
        }
    }

    private boolean checkPermission(HttpServletRequest request, HttpServletResponse response) {
        //验证登录，如没有登录
        request.setAttribute("msg", "请登录");
        return true;
    }

    public static String loadJs(String jsfile) {
        return "<script src=\"" + MDLoadHtm.staticPrefix + jsfile + "?v=" + MDLoadHtm.timestamp + "\"></script>";
    }

    public static String loadJsUrl(String jsfile) {
        return MDLoadHtm.staticPrefix + jsfile + "?v=" + MDLoadHtm.timestamp ;
    }

    public static String loadCss(String cssfile) {
        return "<link href=\"" + MDLoadHtm.staticPrefix + cssfile + "?v=" + MDLoadHtm.timestamp + "\" rel=\"stylesheet\">";
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) {
        this.doGet(request, response);
    }
}