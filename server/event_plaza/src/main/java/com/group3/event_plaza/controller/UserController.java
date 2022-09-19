package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
public class UserController {



    @Autowired
    UserService userService;

    @PostMapping("/register")
    public ResponseResult<String> register(@RequestBody User user){
//        System.out.println(phone);
//        User user = new User(name,email,password,phone);
        userService.register(user);
        return ResponseResult.success();
    }

}
