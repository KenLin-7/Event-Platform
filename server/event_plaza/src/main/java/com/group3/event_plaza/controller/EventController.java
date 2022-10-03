package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/eventDetail")
    public ResponseResult<Event> getEventDetail(int eventId){
        System.out.println(eventId+2.23232323232);
        Event event =  eventService.getEvent(eventId);
        return (ResponseResult.success(event));
    }


}
