package com.group3.event_plaza.service;


import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.dto.NotificationDTO;

import java.util.List;

public interface NotificationService{

        void create(Notification notification,String email);

        List<NotificationDTO> getAll(String email);

        void update(int notificationId);

        Integer getCount(String email);

        void createNotifications(int eventId);

        void updateAll(List<Notification> notifications);

        List<Integer> getUserEvent(String email);

        void createEventNotifications(int eventId,String message);

}
