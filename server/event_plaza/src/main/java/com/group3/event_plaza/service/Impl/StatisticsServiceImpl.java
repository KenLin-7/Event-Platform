package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.model.dto.StatisticsDTO;
import com.group3.event_plaza.repository.EventRepository;
import com.group3.event_plaza.repository.RegistrationRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

@Service
public class StatisticsServiceImpl implements StatisticsService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private RegistrationRepository registrationRepository;


    /**
     * Get statistics of website (number of active user, event, finished event, registration)
     * @return StatisticsDTO
     */
    @Override
    public StatisticsDTO getStatistics() {
        Date today  = new Date();
        StatisticsDTO statistics = new StatisticsDTO();
        statistics.setActiveUsers((int) userRepository.count());
        statistics.setRegistrations((int) registrationRepository.count());
        statistics.setFinishedEvents(eventRepository.countFinishEvent(new Timestamp(today.getTime())));
        statistics.setTotalEvents((int) eventRepository.count());
        return statistics;
    }
}
