package com.group3.event_plaza.model.dto;

public class StatisticsDTO {

    private int activeUsers;

    private int totalEvents;

    private int finishedEvents;

    private int registrations;

    public StatisticsDTO() {
    }

    public int getActiveUsers() {
        return activeUsers;
    }

    public void setActiveUsers(int activeUsers) {
        this.activeUsers = activeUsers;
    }

    public int getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(int totalEvents) {
        this.totalEvents = totalEvents;
    }

    public int getFinishedEvents() {
        return finishedEvents;
    }

    public void setFinishedEvents(int finishedEvents) {
        this.finishedEvents = finishedEvents;
    }

    public int getRegistrations() {
        return registrations;
    }

    public void setRegistrations(int registrations) {
        this.registrations = registrations;
    }
}
