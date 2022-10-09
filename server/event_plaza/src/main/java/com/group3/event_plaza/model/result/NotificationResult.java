package com.group3.event_plaza.model.result;

import java.sql.Timestamp;

public interface NotificationResult {
    String getMessage();
    Timestamp getCreated_Time();
    Integer getNotification_Id();
    int getReceiver();

    int getEvent_Id();
}
