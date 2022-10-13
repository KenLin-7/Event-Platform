package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.model.result.EventResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByEventId(int eventId);

    List<Event> findByTitleContains(String keyword);


    @Query(value = "SELECT * FROM event where status = 1 ORDER BY event_id DESC LIMIT 9",nativeQuery = true)
    List<Event> findTop9EventNoCancellation();

    List<Event> findByOwner(User user);

    List<Event> findAll();
    @Query(value = "SELECT * FROM event where status = 1",nativeQuery = true)
    List<Event> findAllNonCancelledEvents();

    @Query(value = "SELECT * FROM event where start_date > ?1 AND TIMESTAMPDIFF(DAY ,?1,start_date) <= 1",nativeQuery = true)
    List<Event> getEventBy24Hour(Timestamp today);

    @Query(value = "SELECT * from event where owner = ?1 and status = 1",nativeQuery = true)
    List<Event> findByUserId(int id);


    @Query(value = "select description,image,title,owner,status from event where event_id = ?1",nativeQuery = true)
    List<EventResult> findBriefEventDetails(int eventId);

    @Modifying
    @Transactional
    @Query("update Event e set e.status = 2 where e.eventId = ?1")
    void cancelEvent(int id);


    @Query(value = "SELECT COUNT(event_id) from event where start_date < ?1", nativeQuery = true)
    Integer countFinishEvent(Timestamp today);

    @Query(value = "SELECT * from event where category_name = ?1 and status = 1",nativeQuery = true)
    List<Event> findEventByCategory(String category);

    @Query(value = "SELECT * from event where status = 1 and category_name = ?2 and title LIKE %?1%",nativeQuery = true)
    List<Event> findEventByCategoryAndKeyword(String keyword, String category);


}
