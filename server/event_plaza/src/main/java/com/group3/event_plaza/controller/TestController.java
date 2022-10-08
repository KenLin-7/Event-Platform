package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.EventService;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RequestMapping("/api/test")
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


    @GetMapping("/event/24")
    public ResponseResult<List<Event>> getEventLess24(){
        return  ResponseResult.success(eventService.getEventLess24());
    }

}
