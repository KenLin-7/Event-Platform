package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {


    @Query(value = "SELECT * from notification  as n where n.is_read = false AND n.receiver = ?1" ,nativeQuery = true)
    List<Notification> findAllUnRead(int id);

    Notification findByNotificationId(int id );

    Integer countByReceiver_UserId(int id);
}
