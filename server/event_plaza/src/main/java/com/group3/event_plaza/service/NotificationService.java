package com.group3.event_plaza.service;


import com.group3.event_plaza.model.Notification;

import java.util.List;

public interface NotificationService {

        void create();

        List<Notification> getAll();

        void update(Notification notification);


}
