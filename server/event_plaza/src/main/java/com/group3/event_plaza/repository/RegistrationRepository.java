package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration,Integer> {


    @Query(value = "SELECT * from registration where user_id = ?1",nativeQuery = true)
    List<Registration> findByUserId(int id);


    @Query(value = "SELECT event_id from registration where user_id = ?1 and status = 'confirmed'",nativeQuery = true)
    List<Integer> findUserJoinedEventId(int id);

    Registration findByEventAndRequester(Event event, User user);

    @Query(value = "SELECT user_id from registration where event_id = ?1 and status = 'confirmed'",nativeQuery = true)
    List<Integer> findUseIdByEvents(int eventId);

}