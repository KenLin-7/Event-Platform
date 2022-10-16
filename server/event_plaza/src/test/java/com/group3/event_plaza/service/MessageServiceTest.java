package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class MessageServiceTest {

    @Autowired
    private MessageService messageService;

    @Test
    void notifyUser() {
        messageService.notifyUser("378031309@qq.com","test send");
    }

    @Test
    void eventNotification() {
        messageService.eventNotification("1","test send");
    }
}