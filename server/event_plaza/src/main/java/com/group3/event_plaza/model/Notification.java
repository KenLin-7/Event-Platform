package com.group3.event_plaza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
public class Notification implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    private String message;

    private String status;

    @ManyToOne
    @JoinColumn(name = "receiver")
    @JsonIgnoreProperties(value = "receiver")
    private User receiver;

    @CreationTimestamp
    private Timestamp createdTime;

    private boolean isRead;

    public Notification() {
    }



    public Notification(String message,String status){
        this.message = message;
        this.status = status;
    }

    public int getNotificationId() {
        return notificationId;
    }

    public void setNotificationId(int notificationId) {
        this.notificationId = notificationId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String type) {
        this.status = type;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public boolean isRead() {
        return isRead;
    }

    public void setRead(boolean read) {
        isRead = read;
    }

    @Override
    public String toString() {
        return "Notification{" +
                "notificationId=" + notificationId +
                ", message='" + message + '\'' +
                ", status='" + status + '\'' +
                ", receiver=" + receiver +
                ", createdTime=" + createdTime +
                ", isRead=" + isRead +
                '}';
    }
}
