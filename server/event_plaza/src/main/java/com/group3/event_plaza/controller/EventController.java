package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;
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

    @PostMapping("/eventDetail")
    public ResponseResult<Event> getEventDetail(@RequestBody Map<String,String> map){
        int newId = Integer.parseInt(map.get("eventId"));
        Event event = eventService.getEvent(newId);
        return ResponseResult.success(event);
    }

    @GetMapping("/search/{keyword}")
    public ResponseResult<List<Event>> search(@PathVariable String keyword){
        List<Event> list = eventService.searchEvent(keyword);
        return ResponseResult.success(list);
    }

    @GetMapping("/latestEvent")
    public ResponseResult<List<Event>> getLatestEvent(){
        List<Event> list = eventService.getLatestEvent();
        return ResponseResult.success(list);
    }

    @GetMapping("/getAllEvent")
    public ResponseResult<List<Event>> getAllEvent(){
        List<Event> list = eventService.getAllEvent();
        return ResponseResult.success(list);
    }

    @GetMapping("/currentUserEvents")
    public ResponseResult<List<Event>> getCurrentUserEvents(int id){
        List<Event> list = eventService.getCurrentUserEvents(id);
        return ResponseResult.success(list);
    }

}
