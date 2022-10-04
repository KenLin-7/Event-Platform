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
import java.util.List;

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

    @PostMapping("/events")
    public ResponseResult<List<Event>> events(Principal principal){
        List<Event> events = eventService.userEvents(principal);
        return ResponseResult.success(events);
    }

    @PostMapping("/event")
    public ResponseResult<Event> event(Principal principal, String id){
        Event event = eventService.eventDetail(principal,id);
        return ResponseResult.success(event);
    }

    @PostMapping("/eventDelete")
    public ResponseResult<Event> eventDelete(Principal principal, String id){
        eventService.deleteEvent(principal,id);
        return ResponseResult.success();
    }

    @PostMapping("/updateEvent")
    public ResponseResult<Event> eventUpdate(Principal principal, String id, Event event){
        Event oldevent = eventService.eventDetail(principal,id);
        eventService.
        return ResponseResult.success();
    }

}
