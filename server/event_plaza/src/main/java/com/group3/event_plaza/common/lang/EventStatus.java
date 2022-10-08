package com.group3.event_plaza.common.lang;

public enum EventStatus {
    NORMAL("NORMAL",1),
    CANCELLED("CANCELLED",2);

    private final int id;
    private final String value;

    EventStatus(String value, int id) {
        this.id = id;
        this.value = value;
    }

    public int getId() {
        return id;
    }

    public String getValue() {
        return value;
    }
}
