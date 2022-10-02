package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/test")
@RestController
public class TestController {

    @Autowired
    private UserService userService;


    @PostMapping("/info")
    public ResponseResult<User> getUserInfo(@RequestBody String email){
        System.out.println(email);
        return ResponseResult.success(userService.getUserInfo("ken@test.com"));
    }

}
