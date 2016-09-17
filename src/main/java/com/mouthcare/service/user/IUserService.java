package com.mouthcare.service.user;

import com.mouthcare.bean.user.Users;

public interface IUserService {
	public Users getUserById(String userId);

    public boolean checkLogin(Users user);
}
