package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.dto.EventDTO;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class EventServiceTest {

    private static int id;

    @Autowired
    private EventService eventService;

    @Test
    @Order(1)
    void createEvent() {
        Principal user = new Principal() {
            @Override
            public String getName() {
                return "378031309@qq.com";
            }
        };
        Event event = new Event("test new event", 1, "1", "", "test new event", "location", new Timestamp(new Date().getTime()),"Business");
        eventService.createEvent(user, event);
        id = event.getEventId();
    }

    @Test
    @Order(2)
    void updateEvent() {
        System.out.println("-----------------------"+id);
        Event event = eventService.getEvent(id);
        event.setTitle("test update event");
        eventService.updateEvent(event);
    }

    @Test
    @Order(3)
    void getBriefEventDetails() throws DataNotFoundException {
        EventDTO briefEventDetails = eventService.getBriefEventDetails(id);
        System.out.println(briefEventDetails);
    }

    @Test
    @Order(4)
    void getEvent() {
        Event event = eventService.getEvent(id);
        System.out.println(event);
    }

    @Test
    @Order(5)
    void getEventDetail() {
        Map<String, Object> eventDetail = eventService.getEventDetail(id, "378031309@qq.com");
        System.err.println(eventDetail);
    }

    @Test
    @Order(6)
    void getEventDetailForEdit() {
        Map<String, Object> eventDetailForEdit = eventService.getEventDetailForEdit(id, "378031309@qq.com");
        System.out.println(eventDetailForEdit);
    }

    @Test
    @Order(7)
    void searchEvent() {
        List<Event> key = eventService.searchEvent("key");
        System.out.println(key.size());
    }

    @Test
    @Order(8)
    void searchEventByCategory() {
        List<Event> events = eventService.searchEventByCategory("1");
        System.out.println(events.size());
    }

    @Test
    @Order(9)
    void searchEventByCategoryAndKeyword() {
        List<Event> key = eventService.searchEventByCategoryAndKeyword("key", "1");
        System.out.println(key);
    }

    @Test
    @Order(10)
    void getLatestEvent() {
        List<Event> latestEvent = eventService.getLatestEvent();
        System.out.println(latestEvent);
    }

    @Test
    @Order(11)
    void getCurrentUserEvents() {
        List<Event> currentUserEvents = eventService.getCurrentUserEvents("378031309@qq.com");
        System.out.println(currentUserEvents);
    }

    @Test
    @Order(12)
    void getAllEvent() {
        List<Event> allEvent = eventService.getAllEvent();
        System.out.println(allEvent);
    }

    @Test
    @Order(13)
    void getEventLess24() {
        List<Event> eventLess24 = eventService.getEventLess24();
        System.out.println(eventLess24);

    }

    @Test
    @Order(14)
    void getUserRegistrationEvents() {
        List<Registration> userRegistrationEvents = eventService.getUserRegistrationEvents("zjl378031309@gmail.com");
        System.out.println(userRegistrationEvents);
    }

    @Test
    @Order(15)
    void getNoCancelledEvents() {
        List<Event> noCancelledEvents = eventService.getNoCancelledEvents("378031309@qq.com");
        System.out.println(noCancelledEvents);
    }

    @Test
    @Order(16)
    void cancelEvent() {
        eventService.cancelEvent(id);
    }
}