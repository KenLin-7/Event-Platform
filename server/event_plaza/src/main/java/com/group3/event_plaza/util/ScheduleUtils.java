package com.group3.event_plaza.util;

import org.quartz.*;

import java.util.Date;

public class ScheduleUtils {

    private ScheduleUtils() {}

    public static JobDetail buildJobDetail(Class jobClass){
        final JobDataMap jobDataMap = new JobDataMap();
        jobDataMap.put(jobClass.getSimpleName(),1);
        return JobBuilder
                .newJob(jobClass)
                .withIdentity(jobClass.getSimpleName())
                .build();
    }

    public static CronTrigger buildCronTrigger(Class jobClass){
        // Daily 7:00 am schedule
        CronScheduleBuilder cronBuilder = CronScheduleBuilder.dailyAtHourAndMinute(7,0);

        return TriggerBuilder
                .newTrigger()
                .withIdentity(jobClass.getSimpleName())
                .withSchedule(cronBuilder)
                .startAt(new Date(System.currentTimeMillis()))
                .build();
    }
}
