package com.group3.event_plaza.service;


import com.group3.event_plaza.model.Notification;

import java.util.List;

public interface NotificationService {

        void create(Notification notification,String email);

        List<Notification> getAll(String email);

        void update(Notification notification);

        Integer getCount(String email);


}
