package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.Category;
import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Role;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.CategoryRepository;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.repository.RoleRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Principal;
import java.sql.Timestamp;
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
    public List<Event> userEvents(Principal principal) {
        User user = userRepository.findByEmail(principal.getName());
        List<Event> allEvent = eventRepository.findAllByOwner(user);
        if(allEvent!=null){
            return allEvent;
        }else{
            return null;
        }

    }

    @Override
    public Event eventDetail(Principal principal, String eventId) {
        User user = userRepository.findByEmail(principal.getName());
        Event event = eventRepository.findEventById(eventId);
        if(event!=null){
            return event;
        }else{
            return null;
        }
    }

    @Override
    public void deleteEvent(Principal principal, String eventId) {
        User user = userRepository.findByEmail(principal.getName());
        Event event = eventRepository.findEventById(eventId);
        if(event!=null){
            eventRepository.deleteById(eventId);
        }
    }

    @Override
    public void updateEvent(Principal principal, String eventId, Event event) {
        Event currentEvent = eventRepository.findEventById(eventId);
        if (currentEvent != null){
            currentEvent.setDescription(event.getDescription());
            currentEvent.setMaxParticipant(event.getMaxParticipant());
            currentEvent.setStatus(event.getStatus());
            currentEvent.setImage(event.getImage());,
            currentEvent.setTitle(event.getTitle());,
            currentEvent.setLocation(event.getLocation());
            currentEvent.setStartDate(event.getStartDate());
            currentEvent.setEndDate(event.getEndDate());
            eventRepository.save(currentEvent);
        }
    }
}
