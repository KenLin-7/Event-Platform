package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository extends JpaRepository<Notification,Integer> {
}
