package com.group3.event_plaza.service;
import com.group3.event_plaza.model.Event;
import java.security.Principal;
import java.util.List;

public interface EventService {

    void createEvent(Principal user ,Event event);

    // TODO Find method need to be throw DataNotFoundException



    Event getEvent(int eventId);

    List<Event> searchEvent(String keyword);

    List<Event> getLatestEvent();

    List<Event> getCurrentUserEvents(int id);

    List<Event> getAllEvent();

    List<Event> getEventLess24();

}
