package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Notification;
import com.group3.event_plaza.model.result.NotificationResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification,Integer> {


    @Query(value = "SELECT notification_id,message,created_time,receiver,event_id from notification  where is_read = false AND receiver = ?1" ,nativeQuery = true)
    List<List<NotificationResult>> findAllUnRead(int id);

    @Query(value = "SELECT notification_id,message,created_time,receiver from notification where notification_id= ?1",nativeQuery = true)
    List<NotificationResult> findByNotificationId(int id);


    Integer countByReceiver_UserId(int id);

    @Query(value = "UPDATE  Notification set is_read = true", nativeQuery = true)
    @Modifying
    @Transactional
    void readNotification(int id);
}
