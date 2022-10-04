package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.User;

import java.security.Principal;
import java.util.List;

public interface EventService {

    void createEvent(Principal user, Event event);
    List<Event> userEvents(Principal principal);
    Event eventDetail(Principal principal, String eventId);
    void deleteEvent(Principal principal, String eventId);
    void updateEvent(Principal principal, String eventId, Event event);
}
