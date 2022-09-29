package com.group3.event_plaza.schedule.job;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.service.MessageService;
import com.group3.event_plaza.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;


public class NotificationJob {

    private static final Logger log = LoggerFactory.getLogger(NotificationJob.class);

    @Autowired
    private MessageService messageService;

    @Scheduled(fixedRate = 1000, initialDelay = 1000)
    public void sendNotification(){
        log.info("Start");
        messageService.notifyUser(new Notification(),"ken@test.com");
    }
}
