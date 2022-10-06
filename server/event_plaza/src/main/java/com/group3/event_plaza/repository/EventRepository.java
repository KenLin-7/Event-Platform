package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByEventId(int eventId);

    List<Event> findByTitleContains(String keyword);

    List<Event> findTop9ByOrderByEventIdDesc();

    List<Event> findEventByOwner(int id);

    List<Event> findAll();

    @Query(value = "SELECT * FROM event where start_date > ?1 AND TIMESTAMPDIFF(DAY ,?1,start_date) <= 1",nativeQuery = true)
    List<Event> getEventBy24Hour(Timestamp today);

}
