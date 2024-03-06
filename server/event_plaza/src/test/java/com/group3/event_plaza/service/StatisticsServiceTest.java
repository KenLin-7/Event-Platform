package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.model.dto.StatisticsDTO;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class StatisticsServiceTest {

    @Autowired
    private StatisticsService statisticsService;

    @Test
    void getStatistics() {
        StatisticsDTO statistics = statisticsService.getStatistics();
        System.err.println(statistics);
    }
}