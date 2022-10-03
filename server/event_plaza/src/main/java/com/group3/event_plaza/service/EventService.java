package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Event;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

public interface EventService {

    void createEvent(Principal user ,Event event);

    List<Event> searchEvent(String keyword);
}
