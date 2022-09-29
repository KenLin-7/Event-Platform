package com.group3.event_plaza.model;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    private String message;

    private String type;

    @ManyToOne()
    @JoinColumn(name = "user_id")
    private User receiver;

    private Timestamp createdTime;

}
