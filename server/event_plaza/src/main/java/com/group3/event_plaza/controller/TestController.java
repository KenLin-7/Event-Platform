package com.group3.event_plaza.controller;

import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/test")
@RestController
public class TestController {

    @Autowired
    private UserService userService;


    @GetMapping("/info")
    public User getUserInfo(String email){
        return  userService.getUserInfo(email);
    }

}
