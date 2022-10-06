package com.group3.event_plaza.service;

import java.security.Principal;

public interface RegistrationService {

    void createRegistration(Principal user , int eventId);

    void deleteRegistration(Principal principal, int eventId);
}
