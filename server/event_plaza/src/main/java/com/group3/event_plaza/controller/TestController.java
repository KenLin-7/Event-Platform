package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.EventService;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RequestMapping("/test")
@RestController
public class TestController {

    @Autowired
    private UserService userService;

    @Autowired
    private EventService eventService;


    @PostMapping("/info")
    public ResponseResult<User> getUserInfo(@RequestBody String email) throws DataNotFoundException {
        System.out.println(email);
        return ResponseResult.success(userService.getUserInfo("ken22@test.com"));
    }

    @GetMapping("/getEventDetail")
    public ResponseResult<Map<String,Object>> getUserInfo() throws DataNotFoundException {

        Map<String,Object> result= eventService.getEventDetail(6,31);

        return ResponseResult.success(result);
    }




}
