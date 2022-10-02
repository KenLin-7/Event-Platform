package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.Objects;

@RestController
@RequestMapping("/api/notification")
public class NotificationController {


    @Autowired
    private NotificationService notificationService;

    @GetMapping("/all")
    public ResponseResult<List<Notification>> getNotifications(@RequestBody String email){
        return ResponseResult.success(notificationService.getAll(email));
    }

    @PostMapping("/create")
    public ResponseResult<String> createNotification(@RequestBody Map<String, Object> payload){
        Notification notification = new Notification(payload.get("message").toString(),payload.get("status").toString());
        notificationService.create(notification,payload.get("email").toString());
        return ResponseResult.success();
    }

    @GetMapping("/total")
    public ResponseResult<Integer> getTotalNotifications(Principal principal){
        Integer count = notificationService.getCount(principal.getName());
        return ResponseResult.success(count);
    }

    @PostMapping("/update")
    public  ResponseResult<String> updateNotification(@RequestBody int Id){
        return ResponseResult.success();
    }
}
