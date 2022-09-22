package com.group3.event_plaza.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity
public class Event {


    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name = "event_id")
    private int eventId;

    private String description;


    private int maxParticipant;

    private String status;

    private String image;

    private String title;

    private String location;

    private Timestamp startDate;

    private Timestamp endDate;

    @ManyToOne
    private User owner;

    @OneToMany(mappedBy = "event")
    private List<Registration> registrationList;
}
