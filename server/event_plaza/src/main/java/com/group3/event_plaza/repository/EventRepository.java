package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByEventId(int eventId);

    List<Event> findByTitleContains(String keyword);

    List<Event> findTop9ByOrderByEventIdDesc();

    List<Event> findByOwner(User user);

    List<Event> findAll();
    @Query(value = "SELECT * from event where owner = ?1 and status = 1",nativeQuery = true)
    List<Event> findByUserId(int id);

    @Modifying
    @Transactional
    @Query("update Event e set e.status = 2 where e.eventId = ?1")
    void cancelEvent(int id);
}
