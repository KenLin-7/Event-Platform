package com.group3.event_plaza.service;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import static org.junit.jupiter.api.Assertions.*;
import com.group3.event_plaza.EventPlazaApplication;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class EmailServiceTest {

    @Autowired
    private EmailService emailService;

    @Test
    void sendSimpleMail() {
        emailService.sendSimpleMail("378031309@qq.com", "1", "1");
    }
}