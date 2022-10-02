package com.group3.event_plaza.controller;


import com.group3.event_plaza.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SubscribeMapping;
import org.springframework.stereotype.Controller;

@Controller
public class MessageController {

    private MessageService messageService;


    @Autowired
    public MessageController(MessageService messageService) {
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
