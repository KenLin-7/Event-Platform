package com.group3.event_plaza.schedule.job;

import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class EmailJob {
    private static final Logger log = LoggerFactory.getLogger(EmailJob.class);

    @Autowired
    private MessageService messageService;


    @Scheduled(cron = "0 53 22 * * *")
    public void sendEmail(){
        log.info("Email sent");
        messageService.notifyUser(new Notification(),"ken@test.com");

    }
}
