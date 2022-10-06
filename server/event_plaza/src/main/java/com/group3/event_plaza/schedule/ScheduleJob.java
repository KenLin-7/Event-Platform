package com.group3.event_plaza.schedule;

import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.service.MessageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ScheduleJob {
    private static final Logger log = LoggerFactory.getLogger(ScheduleJob.class);

    @Autowired
    private MessageService messageService;

    @Autowired
    private EventRepository eventRepository;


//    @Scheduled()
    public void sendEmail(){


    }
}
