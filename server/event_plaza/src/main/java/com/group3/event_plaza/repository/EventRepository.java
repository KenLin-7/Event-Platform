package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface EventRepository extends JpaRepository<Event,Integer> {
    Event findByEventId(int eventId);
}
