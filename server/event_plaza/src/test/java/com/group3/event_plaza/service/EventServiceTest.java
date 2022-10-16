package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.dto.EventDTO;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class EventServiceTest {

    @Autowired
    private EventService eventService;

    @Test
    void createEvent() {
        Event event = new Event("description", 1, "1", "", "title", "location", new Timestamp(new Date().getTime()));
        eventService.createEvent(null, event);
    }

    @Test
    void updateEvent() {
        Event event = new Event();
        event.setEventId(1);
        event.setTitle("test update");
        eventService.updateEvent(event);
    }

    @Test
    void getBriefEventDetails() throws DataNotFoundException {
        EventDTO briefEventDetails = eventService.getBriefEventDetails(1);
        System.out.println(briefEventDetails);
    }

    @Test
    void getEvent() {
        Event event = eventService.getEvent(1);
        System.out.println(event);
    }

    @Test
    void getEventDetail() {
        Map<String, Object> eventDetail = eventService.getEventDetail(1, "378031309@qq.com");
        System.err.println(eventDetail);
    }

    @Test
    void getEventDetailForEdit() {
        Map<String, Object> eventDetailForEdit = eventService.getEventDetailForEdit(1, "378031309@qq.com");
        System.out.println(eventDetailForEdit);
    }

    @Test
    void searchEvent() {
        List<Event> key = eventService.searchEvent("key");
        System.out.println(key.size());
    }

    @Test
    void searchEventByCategory() {
        List<Event> events = eventService.searchEventByCategory("1");
        System.out.println(events.size());
    }

    @Test
    void searchEventByCategoryAndKeyword() {
        List<Event> key = eventService.searchEventByCategoryAndKeyword("key", "1");
        System.out.println(key);
    }

    @Test
    void getLatestEvent() {
        List<Event> latestEvent = eventService.getLatestEvent();
        System.out.println(latestEvent);
    }

    @Test
    void getCurrentUserEvents() {
        List<Event> currentUserEvents = eventService.getCurrentUserEvents("378031309@qq.com");
        System.out.println(currentUserEvents);
    }

    @Test
    void getAllEvent() {
        List<Event> allEvent = eventService.getAllEvent();
        System.out.println(allEvent);
    }

    @Test
    void getEventLess24() {
        List<Event> eventLess24 = eventService.getEventLess24();
        System.out.println(eventLess24);

    }

    @Test
    void getUserRegistrationEvents() {
        List<Registration> userRegistrationEvents = eventService.getUserRegistrationEvents("zjl378031309@gmail.com");
        System.out.println(userRegistrationEvents);
    }

    @Test
    void getNoCancelledEvents() {
        List<Event> noCancelledEvents = eventService.getNoCancelledEvents("378031309@qq.com");
        System.out.println(noCancelledEvents);
    }

    @Test
    void cancelEvent() {
        eventService.cancelEvent(1);
    }
}