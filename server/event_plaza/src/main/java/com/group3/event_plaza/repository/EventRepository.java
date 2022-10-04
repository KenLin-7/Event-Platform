package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findEventByEventId(int id);

    List<Event> findByTitleContains(String keyword);

    List<Event> findTop9ByOrderByEventIdDesc();

    List<Event> findEventByOwner(int id);

    List<Event> findAll();
}
