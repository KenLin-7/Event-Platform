package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/registration")
public class RegistrationController {

    @Autowired
    private EventService eventService;

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
