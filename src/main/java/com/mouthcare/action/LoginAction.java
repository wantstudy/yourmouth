package com.mouthcare.action;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.mouthcare.bean.user.Users;
import com.mouthcare.service.user.IUserService;

@Controller
public class LoginAction {

    @Resource
    private IUserService userService;

    @RequestMapping("login")
    @ResponseBody
    public String login(HttpServletRequest request,Users user){
        JSONObject jsonObject = new JSONObject();
        boolean islogin = this.userService.checkLogin(user);
        if(islogin){
            jsonObject.put("user", user);
            jsonObject.put("success", true);
        }
        else{
            jsonObject.put("success", false);
            jsonObject.put("msg", "登陆失败");
        }
        return jsonObject.toJSONString();
    }
}
