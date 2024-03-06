package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.model.dto.NotificationDTO;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import java.util.ArrayList;
import java.util.List;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class NotificationServiceTest {

    @Autowired
    private NotificationService notificationService;

    @Test
    @Order(1)
    void create() {
        Notification notification = new Notification();
        notification.setNotificationId(1);
        notification.setEventId(1);
        notification.setRead(false);
        notification.setMessage("test notification");
        notification.setReceiver(new User("test01", "test01@qq.com", "123456", 1888888888));
        notificationService.create(notification, "378031309@qq.com");
    }

    @Test
    @Order(2)
    void getAll() {
        List<NotificationDTO> all = notificationService.getAll("378031309@qq.com");
        System.out.println(all.size());
    }

    @Test
    @Order(3)
    void getCount() {
        notificationService.getCount("378031309@qq.com");
    }



    @Test
    @Order(4)
    void getUserEvent() {
        List<Integer> userEvent = notificationService.getUserEvent("378031309@qq.com");
        System.err.println(userEvent.size());
    }

    @Test
    @Order(5)
    void createEventNotifications() {
        notificationService.createEventNotifications(1, "test message");
    }

    @Test
    @Order(6)
    void update() {
        notificationService.update(1);
    }

    @Test
    @Order(7)
    void updateAll() {
        List<Notification> list = new ArrayList<>();
        Notification notification = new Notification("notification message",40);
//        notification.setNotificationId(1);
        list.add(notification);
        notificationService.updateAll(list);
    }
}