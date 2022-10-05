package com.group3.event_plaza;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class EventPlazaApplication {



    public static void main(String[] args) {


        SpringApplication.run(EventPlazaApplication.class, args);
    }

}
