package com.group3.event_plaza.schedule;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.service.EmailService;
import com.group3.event_plaza.service.EventService;
import com.group3.event_plaza.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Component
public class ScheduleJob {
    private static final Logger log = LoggerFactory.getLogger(ScheduleJob.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private EventService eventService;

    @Autowired
    EmailService emailService;




    @Scheduled(cron = "0 37 17 * * *")
    public void sendEmail(){
        log.info(new Timestamp(getTodayTime())+" Start searching event");
        emailService.sendSimpleMail("kenlbd61@gmail.com",
                "Your registered event will start tomorrow",
                " This event will start tomorrow at" );
//        List<Event> events = eventService.getEventLess24();
//        if(events.size() >0){
//            log.info("Events get");
////            System.out.println(events);
//            for (Event event :events) {
//                for (Registration registration:event.getRegistrationList()) {
//
//                    emailService.sendSimpleMail(registration.getRequester().getEmail(),
//                            "Your registered event will start tomorrow",
//                            event.getTitle()+" This event will start tomorrow at" + event.getStartDate());
//                    log.info("Email sent to" + registration.getRequester().getEmail());
//                }
//            }
//        }else{
//            log.info("No email need to send");
//        }
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
