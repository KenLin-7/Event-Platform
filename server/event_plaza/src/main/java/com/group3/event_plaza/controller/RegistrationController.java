package com.group3.event_plaza.controller;

import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.EventService;
import com.group3.event_plaza.service.RegistrationService;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;

@RequestMapping("/api/registration")
@RestController
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;


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





}
