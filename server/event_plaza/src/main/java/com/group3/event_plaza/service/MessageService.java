package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Notification;

public interface MessageService {

    void notifyUser(Notification notification,String email);

}
