package com.group3.event_plaza.common.lang;

public enum UserRole {
    ROLE_USER("ROLE_USER",1)
    ,ROLE_ORGANIZER("ROLE_ORGANIZER",2);

    private int id;
    private String value;

    UserRole(String value,int id) {
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
