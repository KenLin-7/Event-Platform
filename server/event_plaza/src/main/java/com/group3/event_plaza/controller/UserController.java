package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.Impl.UserServiceImpl;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/user")
public class UserController {



    @Autowired
    UserService userService;
    UserServiceImpl userServiceimpl;

    @PostMapping("/register")
    public ResponseResult<String> register(@RequestBody User user){
        userService.register(user);
        userServiceimpl.register(user);
        return ResponseResult.success();

    }

    @PostMapping("/current")
    public ResponseResult<String> getCurrentUser(Principal principal){
        return ResponseResult.success(principal.getName());
    }


}
