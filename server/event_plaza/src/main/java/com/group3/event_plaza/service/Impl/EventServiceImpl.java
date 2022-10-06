package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.*;
import com.group3.event_plaza.repository.CategoryRepository;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.repository.RoleRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.model.*;
import com.group3.event_plaza.repository.*;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    CategoryRepository categoryRepository;

    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RegistrationRepository registrationRepository;


    @Override
    public void createEvent(Principal user, Event event) {
        User owner = userRepository.findByEmail(user.getName());
        Role organizer = roleRepository.findByRoleId(RoleUser.ROLE_ORGANIZER.getId());
        owner.getRole().add(organizer);
        event.setOwner(owner);
        Category category = categoryRepository.findByCategoryId(1);
        event.setCategory(category);
        eventRepository.save(event);
    }

    @Override
    public Event getEvent(int eventId) {
        Event event = eventRepository.findByEventId(eventId);
        return event;
    }

    @Override
    public Map<String, Object> getEventDetail(int eventId, int requesterId) {
        Event event = eventRepository.findByEventId(eventId);
        Registration registration = registrationFlag(event.getRegistrationList(), requesterId);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("registBtnFlag", "");
        result.put("event",event);

        if (requesterId == event.getOwner().getUserId()) {
            result.replace("registBtnFlag", "owner");
        } else {
            if (registration != null) {
                result.replace("registBtnFlag", registration.getStatus());

            }else{
                result.replace("registBtnFlag", "available");
            }
        }

        return result;
    }

    public Registration registrationFlag(List<Registration> registrations, Integer requesterId) {

        for (int i = 0; i < registrations.size(); i++) {
            if (registrations.get(i).getRequester().getUserId() == requesterId) {
                return registrations.get(i);
            }
        }
        return null;
    }


    @Override
    public List<Event> searchEvent(String keyword) {
        List<Event> list = eventRepository.findByTitleContains(keyword);
        return list;
    }

    @Override
    public List<Event> getLatestEvent() {
        List<Event> list = eventRepository.findTop9ByOrderByEventIdDesc();
        return list;
    }

    @Override
    public List<Event> getCurrentUserEvents(String email){
        User currentUser = userRepository.findByEmail(email);
        List<Event> list = eventRepository.findByOwner(currentUser);
        return list;
    }

    @Override
    public List<Event> getAllEvent(){
        List<Event> list = eventRepository.findAll();
        return list;
    }

    @Override
    public List<Event> getEventLess24() {
        Calendar calendar =Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.set(Calendar.HOUR_OF_DAY,0);
        calendar.set(Calendar.MINUTE,0);
        calendar.set(Calendar.SECOND,0);
        return eventRepository.getEventBy24Hour(new Timestamp(calendar.getTime().getTime()));
    }


    public List<Registration> getUserRegistrationEvents(String email) {
        User currentUser = userRepository.findByEmail(email);
        List<Registration> registrationList = registrationRepository.findByUserId(currentUser.getUserId());
        return registrationList;
    }
}
