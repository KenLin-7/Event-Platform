package com.group3.event_plaza;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;

@SpringBootApplication
@EnableScheduling
public class EventPlazaApplication {



    public static void main(String[] args) {


        SpringApplication.run(EventPlazaApplication.class, args);
    }

}
