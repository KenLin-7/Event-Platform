package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.repository.RegistrationRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.security.Principal;


@Service
@Transactional
public class RegistrationImpl implements RegistrationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    EventRepository eventRepository;

    @Autowired
    RegistrationRepository registrationRepository;

    @Override
    public void createRegistration(Principal user, int eventId) {
        User requester = userRepository.findByEmail(user.getName());
        Event event = eventRepository.findByEventId(eventId);
        Registration registration = new Registration();
        registration.setRequester(requester);
        registration.setStatus("pending");
        registration.setEvent(event);
        registrationRepository.save(registration);
    }

    @Override
    public void deleteRegistration(Principal principal, int eventId) {
        User requester = userRepository.findByEmail(principal.getName());
        Event event = eventRepository.findByEventId(eventId);
        Registration registration = registrationRepository.findByEventAndRequester(event, requester);
        registrationRepository.delete(registration);
    }

    @Override
    public void approveRegistration(int registrationId) {
        registrationRepository.approveRegistration(registrationId);
    }

    @Override
    public void rejectRegistration(int registrationId) {
        registrationRepository.rejectRegistration(registrationId);
    }
}
