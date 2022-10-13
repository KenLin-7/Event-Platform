package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.*;
import com.group3.event_plaza.model.dto.EventDTO;
import com.group3.event_plaza.model.result.EventResult;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.repository.RoleRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.repository.*;
import com.group3.event_plaza.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;
import java.sql.Timestamp;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class EventServiceImpl implements EventService {

    @Autowired
    EventRepository eventRepository;

    @Autowired
    UserRepository userRepository;


    @Autowired
    RoleRepository roleRepository;

    @Autowired
    RegistrationRepository registrationRepository;

    String defaultImage = "https://firebasestorage.googleapis.com/v0/b/eventplazaweb.appspot.com/o/default%2Fxxxxxxxx.png?alt=media&token=451eb7a8-9b68-4d80-b676-5353435ed8db";

    @Override
    public int createEvent(Principal user, Event event) {
        User owner = userRepository.findByEmail(user.getName());
        Role organizer = roleRepository.findByRoleId(RoleUser.ROLE_ORGANIZER.getId());
        owner.getRole().add(organizer);
        if(event.getImage().equals("")||event.getImage()==null){
            event.setImage(defaultImage);
        }
        event.setOwner(owner);
        return eventRepository.save(event).getEventId();
    }

    @Override
    public void updateEvent(Event event) {
        Event oldEvent = eventRepository.findByEventId(event.getEventId());
        oldEvent.setDescription(event.getDescription());
        oldEvent.setImage(event.getImage());
        oldEvent.setLocation(event.getLocation());
        oldEvent.setMaxParticipant(event.getMaxParticipant());
        oldEvent.setStartDate(event.getStartDate());
        oldEvent.setTitle(event.getTitle());
        oldEvent.setCategoryName(event.getCategoryName());
        eventRepository.save(oldEvent);

    }


    @Override
    public EventDTO getBriefEventDetails(int eventId) throws DataNotFoundException {
        EventDTO eventDTO = new EventDTO();
        List<EventResult> events = eventRepository.findBriefEventDetails(eventId);
        if(events.size() > 0) {
            EventResult result = events.get(0);
            String ownerEmail = userRepository.findEmailByUserId(result.getOwner());
            eventDTO.setDescription(result.getDescription());
            eventDTO.setImage(result.getImage());
            eventDTO.setTitle(result.getTitle());
            eventDTO.setOwnerEmail(ownerEmail);
        }else{
            throw  new DataNotFoundException("Can't found the event ");
        }
        return eventDTO;
    }

    @Override
    public Event getEvent(int eventId) {
        Event event = eventRepository.findByEventId(eventId);
        return event;
    }

    /**
     * Get Event details page data
     * @param eventId
     * @param requesterEmail
     * @return
     */
    @Override
    public Map<String, Object> getEventDetail(int eventId, String requesterEmail) {
        Event event = eventRepository.findByEventId(eventId);

        // TODO Allow No login

        Registration registration = registrationFlag(event.getRegistrationList(), requesterEmail);
        Map<String, Object> result = new HashMap<String, Object>();
        result.put("registBtnFlag", "");

        if (requesterEmail.equals(event.getOwner().getEmail()) ) {
            result.replace("registBtnFlag", "owner");
        } else {
            if (registration != null) {
                result.replace("registBtnFlag", registration.getStatus());

            }else{
                result.replace("registBtnFlag", "available");
            }
        }

        List<Registration> registrationList=event.getRegistrationList();
        for(int i=0;i<registrationList.size();i++){
            if(!registrationList.get(i).getStatus().equals("confirmed")){
                registrationList.remove(i);
            }
        }

        result.put("registrationList",registrationList);
        result.put("location",processLocation(event.getLocation()));
        result.put("time",event.getStartDate());
        result.put("maxParticipant",event.getMaxParticipant());
        result.put("image",event.getImage());
        result.put("owner",event.getOwner());
        result.put("description",event.getDescription());
        result.put("title",event.getTitle());


        return result;
    }

    @Override
    public Map<String, Object> getEventDetailForEdit(int eventId, String registerEmail) {
        Event event = eventRepository.findByEventId(eventId);

        Map<String, Object> result = new HashMap<String, Object>();
        String[] splitString = event.getLocation().split("\\+");
        if (splitString.length == 5) {
            if (splitString[1].equals("NoAddress2") ) {
                result.put( "address1",splitString[0]);
                result.put("address2","");
            } else {
                result.put( "address1",splitString[0]);
                result.put("address2",splitString[1]);

            }
            result.put( "suburb",splitString[2]);
            result.put( "state",splitString[3]);
            result.put( "postcode",splitString[4]);
        }

        result.put("time",event.getStartDate());
        result.put("maxParticipant",event.getMaxParticipant());
        result.put("image",event.getImage());
        result.put("description",event.getDescription());
        result.put("title",event.getTitle());
        result.put("category",event.getCategoryName());
        return result;
    }


    public Registration registrationFlag(List<Registration> registrations, String requesterEmail) {

        for (int i = 0; i < registrations.size(); i++) {
            if (registrations.get(i).getRequester().getEmail().equals(requesterEmail) ) {
                return registrations.get(i);
            }
        }
        return null;
    }

    public Map<String,String> processLocation(String location){
        String[] splitString = location.split("\\+");
        Map<String,String>  result= new HashMap<>();
        if (splitString.length == 5) {
            if (splitString[1].equals("NoAddress2") ) {
                result.put( "street",splitString[0]);
            } else {
                String street = splitString[0] + " " + splitString[1];
                result.put( "street",street);

            }
            result.put( "suburb",splitString[2]);
            result.put( "state",splitString[3]);
            result.put( "postcode",splitString[4]);
        }
        return result;
    }




    @Override
    public List<Event> searchEvent(String keyword) {
        List<Event> list = eventRepository.findByTitleContains(keyword);
        return list;
    }

    @Override
    public List<Event> searchEventByCategory(String category) {
        List<Event> list = eventRepository.findEventByCategory(category);
        return list;
    }

    @Override
    public List<Event> searchEventByCategoryAndKeyword(String keyword, String category) {
        List<Event> list = eventRepository.findEventByCategoryAndKeyword(keyword,category);
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
    @Transactional
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
