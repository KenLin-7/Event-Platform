package com.group3.event_plaza.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

@Entity
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int registrationId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties(value = "registrations")
    private User requester;

    @ManyToOne
    @JoinColumn(name ="event_id")
    @JsonIgnoreProperties(value = "registrationList")

    private Event event;

    private String status;

    public Registration() {
    }

    public Registration(User requester, String status) {
        this.requester = requester;
        this.status = status;
    }

    public int getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(int registrationId) {
        this.registrationId = registrationId;
    }

    public User getRequester() {
        return requester;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Event getEvent() {
        return event;
    }

    public void setEvent(Event event) {
        this.event = event;
    }
}
