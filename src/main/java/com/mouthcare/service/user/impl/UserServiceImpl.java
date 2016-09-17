package com.mouthcare.service.user.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mouthcare.bean.user.Users;
import com.mouthcare.bean.user.UsersExample;
import com.mouthcare.bean.user.UsersExample.Criteria;
import com.mouthcare.mapper.UsersMapper;
import com.mouthcare.service.user.IUserService;

@Service
public class UserServiceImpl implements IUserService {
  
    @Autowired
    private UsersMapper usersMapper;
    
    @Override
    public Users getUserById(String userId) {
        return usersMapper.selectByPrimaryKey(userId);
    }
    
    @Override
    public boolean checkLogin(Users user) {
        boolean flag = false;
        UsersExample example = new UsersExample();
        example.or().andUserNameEqualTo(user.getUserName())
                    .andPasswordEqualTo(user.getPassword());
        List<Users> selectByExample = usersMapper.selectByExample(example);
        if(selectByExample.size()>0)
            flag = true;
        return flag;
    }
}