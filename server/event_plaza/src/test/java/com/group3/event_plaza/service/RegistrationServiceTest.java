package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.model.Registration;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.security.Principal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class RegistrationServiceTest {

    @Autowired
    private RegistrationService registrationService;

    @Test
    void createRegistration() {
        Principal user = new Principal() {
            @Override
            public String getName() {
                return "378031309@qq.com";
            }
        };
        registrationService.createRegistration(user, 1);
    }

    @Test
    void deleteRegistration() {
        Principal user = new Principal() {
            @Override
            public String getName() {
                return "378031309@qq.com";
            }
        };
        registrationService.deleteRegistration(user, 1);
    }

    @Test
    void approveRegistration() {
        registrationService.approveRegistration(1);
    }

    @Test
    void rejectRegistration() {
        registrationService.rejectRegistration(1);
    }

    @Test
    void getParticipantsByEventId() {
        List<Registration> participantsByEventId = registrationService.getParticipantsByEventId(1);
        System.out.println(participantsByEventId.size());
    }
}