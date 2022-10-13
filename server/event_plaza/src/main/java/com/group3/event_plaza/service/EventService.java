package com.group3.event_plaza.service;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.dto.EventDTO;

import java.security.Principal;
import java.util.List;
import java.util.Map;

public interface EventService {

    int createEvent(Principal user ,Event event);

    // TODO Find method need to be throw DataNotFoundException


    void updateEvent(Event event);

    EventDTO getBriefEventDetails(int eventId) throws DataNotFoundException;

    Event getEvent(int eventId);

    Map<String,Object> getEventDetail(int eventId,String registerEmail);

    Map<String,Object> getEventDetailForEdit(int eventId,String registerEmail);

    List<Event> searchEvent(String keyword);

    List<Event> searchEventByCategory(String category);

    List<Event> searchEventByCategoryAndKeyword(String keyword, String category);

    List<Event> getLatestEvent();

    List<Event> getCurrentUserEvents(String email);

    List<Event> getAllEvent();

    List<Event> getEventLess24();

    List<Registration> getUserRegistrationEvents(String email);

    List<Event> getNoCancelledEvents(String email);

    void cancelEvent(int id);
}
