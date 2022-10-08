package com.group3.event_plaza.model.dto;

import java.sql.Timestamp;
import java.util.Objects;

public class NotificationDTO {

    private int notificationId;

    private String message;

    private Timestamp createdTime;

    private int receiver;

    public NotificationDTO() {
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

    public Timestamp getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Timestamp createdTime) {
        this.createdTime = createdTime;
    }

    public int getReceiver() {
        return receiver;
    }

    public void setReceiver(int receiver) {
        this.receiver = receiver;
    }

    public NotificationDTO(int notificationId, String message, Timestamp createdTime) {
        this.notificationId = notificationId;
        this.message = message;
        this.createdTime = createdTime;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        NotificationDTO that = (NotificationDTO) o;
        return notificationId == that.notificationId && receiver == that.receiver && message.equals(that.message) && createdTime.equals(that.createdTime);
    }

    @Override
    public int hashCode() {
        return Objects.hash(notificationId, message, createdTime, receiver);
    }
}
