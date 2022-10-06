package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.NotificationRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.MessageService;
import com.group3.event_plaza.service.NotificationService;
import org.aspectj.weaver.ast.Not;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Iterator;
import java.util.List;

@Service
public class NotificationImpl implements NotificationService, MessageService {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private  UserRepository userRepository;

    @Autowired
    private NotificationRepository notificationRepository;


    /**
     * Send private notification to user
     * @param email
     */
    @Override
    public void notifyUser(String email,String message) {
        simpMessagingTemplate.convertAndSendToUser(email,
                "/notification","Notification Sent to"+email);

    }

    /**
     * Send notification when event has been updated
     * @param eventId
     * @param content
     */
    @Override
    public void eventNotification(String eventId,String content){
            simpMessagingTemplate.convertAndSend("/event/"+eventId+"/notification","Event Update");

    }


    @Override
    public void create(Notification notification,String email) {
        notification.setRead(false);
        User receiver = userRepository.findByEmail(email);
        notification.setReceiver(receiver);
        notificationRepository.save(notification);
    }

    @Override
    public List<Notification> getAll(String email) {
        User receiver = userRepository.findByEmail(email);
        List<Notification> notifications = notificationRepository.findAllUnRead(receiver.getUserId());

        return notifications;
    }



    @Override
    public void update(int notificationId) {

    }

    @Override
    public void updateAll(List<Notification> notifications){
        for (Notification notification: notifications) {
            notification.setRead(true);
        }
        notificationRepository.saveAll(notifications);
    }



    @Override
    public Integer getCount(String email) {
        User user = userRepository.findByEmail(email);
        return notificationRepository.countByReceiver_UserId(user.getUserId());
    }

    @Override
    public void createNotifications(int eventId) {
        // TODO get participant email to save notification
    }


}
