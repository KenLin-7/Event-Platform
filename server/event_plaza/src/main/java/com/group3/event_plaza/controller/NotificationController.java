package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.dto.NotificationDTO;
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
    public ResponseResult<List<NotificationDTO>> getNotifications(Principal principal){
        return ResponseResult.success(notificationService.getAll(principal.getName()));
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

    @PostMapping("/update/all")
    public ResponseResult<String> updateAll(@RequestBody Map<String,List<Notification>> data){
        notificationService.updateAll(data.get("notifications"));
        return ResponseResult.success();
    }

    @PostMapping("/confirmed/event")
    public ResponseResult<List<Integer>> getUserConfirmedEvents(Principal principal){
        return ResponseResult.success(notificationService.getUserEvent(principal.getName()));
    }
}
