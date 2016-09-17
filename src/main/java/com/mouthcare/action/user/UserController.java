package com.mouthcare.action.user;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.mouthcare.bean.user.Users;
import com.mouthcare.service.user.IUserService;

@Controller
@RequestMapping("/user")
public class UserController {
	
    @Resource
	private IUserService userService;
	
	@RequestMapping("/showUser")
	@ResponseBody
	public  String toIndex(HttpServletRequest request,@RequestParam("id") String id){
	    JSONObject jsonObject = new JSONObject();
		Users user = this.userService.getUserById(id);
		jsonObject.put("user", user);
		return jsonObject.toJSONString();
	}
}
