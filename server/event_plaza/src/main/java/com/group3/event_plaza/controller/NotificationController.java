package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class NotificationController{

    private MessageService messageService;


    @Autowired
    public NotificationController(MessageService messageService) {
        this.messageService = messageService;
    }


    @SubscribeMapping("/user/{email}/notification")
    public void sendUserNotification(@DestinationVariable String email,String message){
        messageService.notifyUser(email,message);
    }


    @SubscribeMapping("/event/{eventId}/notification")
    @SendTo("/event/{eventId}/notification")
    public void sendEventNotification(@DestinationVariable String eventId,String message){
        messageService.eventNotification(eventId,message);
    }


}
