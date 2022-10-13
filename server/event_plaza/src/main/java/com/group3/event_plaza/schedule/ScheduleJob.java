package com.group3.event_plaza.schedule;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.service.EmailService;
import com.group3.event_plaza.service.EventService;
import com.group3.event_plaza.service.MessageService;
import com.group3.event_plaza.service.NotificationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.*;

@Component
public class ScheduleJob {
    private static final Logger log = LoggerFactory.getLogger(ScheduleJob.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private EventService eventService;

    @Autowired
    EmailService emailService;

    @Autowired
    NotificationService notificationService;




    @Scheduled(cron = "0 47 22 * * *")
    @Transactional
    public void sendEmail(){
        log.info(new Timestamp(getTodayTime())+" Start searching event");
        List<Event> events = eventService.getEventLess24();
        if(events.size() >0){
            log.info("Events get");
            for (Event event :events) {
                for (Registration registration:event.getRegistrationList()) {

                    // send email to user
                    emailService.sendSimpleMail(registration.getRequester().getEmail(),
                            event.getTitle()+" This event will start tomorrow at " + event.getStartDate(),
                            "Your registered event will start tomorrow");
                    log.info("Email sent to " + registration.getRequester().getEmail());

                    Map<String,String> message = new HashMap<>();

                    // send notification to user
                    messageService.notifyUser(registration.getRequester().getEmail(),
                            "Your event "+ event.getTitle()+" will start tomorrow at "+event.getStartDate());
                }
            }
        }else{
            log.info("No email need to send");
        }
    }



    private long getTodayTime(){
        Calendar calendar =Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        return calendar.getTime().getTime();
    }




}
