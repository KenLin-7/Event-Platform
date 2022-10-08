package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.result.NotificationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {


    @Query(value = "SELECT notification_id,message,created_time,receiver from notification  where is_read = false AND receiver = ?1" ,nativeQuery = true)
    List<List<NotificationResult>> findAllUnRead(int id);

    @Query(value = "SELECT notification_id,message,created_time,receiver from notification where notification_id= ?1",nativeQuery = true)
    List<NotificationResult> findByNotificationId(int id);


    Integer countByReceiver_UserId(int id);
}
