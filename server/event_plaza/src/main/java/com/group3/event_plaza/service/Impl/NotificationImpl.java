package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.MessageService;
import com.group3.event_plaza.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class NotificationImpl implements NotificationService, MessageService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private  UserRepository userRepository;

    @Override
    public void notifyUser(Notification notification,String email) {
        simpMessagingTemplate.convertAndSendToUser(email,
                "/notification","Notification Sent");
    }


}
