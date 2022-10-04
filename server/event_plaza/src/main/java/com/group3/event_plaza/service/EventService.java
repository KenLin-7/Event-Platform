package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Event;

import java.security.Principal;

public interface EventService {

    void createEvent(Principal user ,Event event);

    Event getEvent(int eventId);
}
