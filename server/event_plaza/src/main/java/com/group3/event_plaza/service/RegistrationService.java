package com.group3.event_plaza.service;

import com.group3.event_plaza.model.Registration;

import java.security.Principal;
import java.util.List;

public interface RegistrationService {

    void createRegistration(Principal user , int eventId);

    void deleteRegistration(Principal principal, int eventId);

    void approveRegistration(int registrationId);

    void rejectRegistration(int registrationId);

    List<Registration> getParticipantsByEventId(int eventId);
}
