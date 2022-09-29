package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

@Controller
public class NotificationController{

    private MessageService messageService;


    @Autowired
    public NotificationController(MessageService messageService) {
        this.messageService = messageService;
    }


    @MessageMapping("/private-message")
    public ResponseResult<String> sendNotification(){
        messageService.notifyUser(new Notification(),"ken@test.com");
        return ResponseResult.success();
    }


}
