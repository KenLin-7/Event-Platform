package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.model.dto.NotificationDTO;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class NotificationServiceTest {

    @Autowired
    private NotificationService notificationService;

    @Test
    void create() {
        Notification notification = new Notification();
        notification.setNotificationId(1);
        notification.setEventId(1);
        notification.setRead(false);
        notification.setMessage("测试");
        notification.setReceiver(new User("test01", "378031309@qq.com", "z03120601", 1888888888));
        notificationService.create(notification, "378031309@qq.com");
    }

    @Test
    void getAll() {
        List<NotificationDTO> all = notificationService.getAll("378031309@qq.com");
        System.out.println(all.size());
    }

    @Test
    void update() {
        notificationService.update(1);
    }

    @Test
    void getCount() {
        notificationService.getCount("378031309@qq.com");
    }

    @Test
    void updateAll() {
        List<Notification> list = new ArrayList<>();
        Notification notification = new Notification();
        notification.setNotificationId(1);
        list.add(notification);
        notificationService.updateAll(list);
    }

    @Test
    void getUserEvent() {
        List<Integer> userEvent = notificationService.getUserEvent("378031309@qq.com");
        System.err.println(userEvent.size());
    }

    @Test
    void createEventNotifications() {
        notificationService.createEventNotifications(1, "test message");
    }
}