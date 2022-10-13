package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.dto.EventDTO;
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
    public ResponseResult<Integer> postEvent(Principal principal, @RequestBody Event event){
        int eventId = eventService.createEvent(principal,event);
        return ResponseResult.success(eventId);
    }

    @PostMapping("/updateEvent")
    public ResponseResult<String> updateEvent(@RequestBody Event event){
        eventService.updateEvent(event);
        return ResponseResult.success();
    }

    @GetMapping("/search/{keyword}")
    public ResponseResult<List<Event>> search(@PathVariable String keyword){
        List<Event> list = eventService.searchEvent(keyword);
        return ResponseResult.success(list);
    }

    @GetMapping("/search/all/{category}")
    public ResponseResult<List<Event>> searchEventByCategory(@PathVariable String category){
        List<Event> list = eventService.searchEventByCategory(category);
        return ResponseResult.success(list);
    }

    @GetMapping("/search/{keyword}/{category}")
    public ResponseResult<List<Event>> searchEventByCategoryAndKeyword(@PathVariable String keyword, @PathVariable String category){
        List<Event> list = eventService.searchEventByCategoryAndKeyword(keyword, category);
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
    public ResponseResult<List<Event>> getCurrentUserEvents(Principal principal){
        String email = principal.getName();
        List<Event> list = eventService.getCurrentUserEvents(email);
        return ResponseResult.success(list);
    }

    @PostMapping("/getEventDetail")
    public ResponseResult<Map<String,Object>> getEventDetail(Principal principal,@RequestBody Map<String,Integer>map) throws DataNotFoundException {
        int eventId = map.get("eventId");
        Map<String,Object> result= eventService.getEventDetail(eventId,principal.getName());

        return ResponseResult.success(result);
    }

    @PostMapping("/getEventDetailForEdit")
    public ResponseResult<Map<String,Object>> getEventDetailForEdit(Principal principal,@RequestBody Map<String,Integer>map) throws DataNotFoundException {
        int eventId = map.get("eventId");
        Map<String,Object> result= eventService.getEventDetailForEdit(eventId,principal.getName());

        return ResponseResult.success(result);
    }


    @GetMapping("/getUserRegistrationEvents")
    public ResponseResult<List<Registration>> getUserRegistrationEvents(Principal principal){
        String email = principal.getName();
        List<Registration> list = eventService.getUserRegistrationEvents(email);
        return ResponseResult.success(list);
    }

    @GetMapping("/getNoCancelledEvents")
    public ResponseResult<List<Event>> getNoCancelledEvents(Principal principal){
        String email = principal.getName();
        List<Event> list = eventService.getNoCancelledEvents(email);
        return ResponseResult.success(list);
    }

    @PostMapping("/cancelEvent")
    public ResponseResult<String> cancelEvent(@RequestBody Map<String,String> map){
        int newId = Integer.parseInt(map.get("eventId"));
        eventService.cancelEvent(newId);
        return ResponseResult.success();
    }


    @PostMapping("/notification/event")
    public ResponseResult<EventDTO> getBriefEvent(@RequestBody Map<String,Integer> data) throws DataNotFoundException {
        int eventId = data.get("eventId");
        return ResponseResult.success(eventService.getBriefEventDetails(eventId));
    }
}
