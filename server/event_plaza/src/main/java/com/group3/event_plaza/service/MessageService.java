package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Notification;

public interface MessageService {

    void notifyUser(String email,String message);

    void eventNotification(String eventId,String message);

}
