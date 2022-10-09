package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.dto.StatisticsDTO;
import com.group3.event_plaza.service.StatisticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/statistic")
public class StatisticController {


    @Autowired
    StatisticsService statisticsService;

    @GetMapping("/get")
    public ResponseResult<StatisticsDTO> getStatistic(){
        return ResponseResult.success(statisticsService.getStatistics());
    }
}
