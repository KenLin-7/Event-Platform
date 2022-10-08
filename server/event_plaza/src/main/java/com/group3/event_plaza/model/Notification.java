package com.group3.event_plaza.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.group3.event_plaza.model.dto.NotificationDTO;
import org.hibernate.annotations.*;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.sql.Timestamp;

@Entity
@JsonIgnoreProperties(value = {"receiver"})
@SqlResultSetMapping(
        name="NotificationMapping",
        classes = @ConstructorResult(
                targetClass = NotificationDTO.class,
                columns = {
                        @ColumnResult(name="notificationId",type = Integer.class),
                        @ColumnResult(name="message" ,type = String.class),
                        @ColumnResult(name="createdTime", type = Timestamp.class),
                        @ColumnResult(name = "receiver",type = Integer.class)
                }
        )
)
public class Notification  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int notificationId;

    private String message;

    private String status;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "receiver")
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
