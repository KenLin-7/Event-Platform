package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;



import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.RegistrationService;
import org.springframework.web.bind.annotation.*;


import java.util.Map;

@RequestMapping("/api/registration")
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private EventService eventService;
    @PostMapping("/create")
    public ResponseResult<User> createRegistration(Principal principal, @RequestBody Map<String, Integer> map) throws DataNotFoundException {
             int eventId = map.get("eventId");
             registrationService.createRegistration(principal,eventId);
        return ResponseResult.success();
    }

    @PostMapping("/delete")
    public ResponseResult<User> deleteRegistration(Principal principal, @RequestBody Map<String, Integer> map) throws DataNotFoundException {
        int eventId = map.get("eventId");
        registrationService.deleteRegistration(principal,eventId);
        return ResponseResult.success();
    }

    @GetMapping("/getAllRegistrationRequests")
    public ResponseResult<List<Event>> getUserRegistrationEvents(Principal principal){
        String email = principal.getName();
        List<Event> eventList = eventService.getCurrentUserEvents(email);

        List<Event> result = new ArrayList<>();
        for(int i = 0; i <= eventList.size(); i++){
            if(eventList.get(i).getRegistrationList().size() != 0){
                result.add(eventList.get(i));
            }
        }

        return ResponseResult.success(eventList);
    }





}

