package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping("/api/event")
public class EventController {

    @Autowired
    EventService eventService;

    @PostMapping("/create")
    public ResponseResult<String> postEvent(Principal principal, @RequestBody Event event){
        eventService.createEvent(principal,event);
        return ResponseResult.success();
    }

}
