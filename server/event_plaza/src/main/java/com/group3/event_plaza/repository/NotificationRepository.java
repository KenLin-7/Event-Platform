package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {

    List<Notification> findAllByReceiver_UserId(int id);

    Notification findByNotificationId(int id );

    Integer countByReceiver_UserId(int id);
}
