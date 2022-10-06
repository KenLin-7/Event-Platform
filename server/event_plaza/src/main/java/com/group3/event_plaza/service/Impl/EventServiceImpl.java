package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.*;
import com.group3.event_plaza.repository.*;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.util.List;

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
    public void createEvent(Principal user,Event event) {
        User owner =  userRepository.findByEmail(user.getName());
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
    public List<Event> searchEvent(String keyword){
        List<Event> list = eventRepository.findByTitleContains(keyword);
        return list;
    }

    @Override
    public  List<Event> getLatestEvent(){
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
    public List<Registration> getUserRegistrationEvents(String email) {
        User currentUser = userRepository.findByEmail(email);
        List<Registration> registrationList = registrationRepository.findByUserId(currentUser.getUserId());
        return registrationList;
    }

    @Override
    public List<Event> getNoCancelledEvents(String email){
        User currentUser = userRepository.findByEmail(email);
        List<Event> noCancelledEvents = eventRepository.findByUserId(currentUser.getUserId());
        return noCancelledEvents;
    }

    @Override
    public void cancelEvent(int id){
         eventRepository.cancelEvent(id);
    }
}
