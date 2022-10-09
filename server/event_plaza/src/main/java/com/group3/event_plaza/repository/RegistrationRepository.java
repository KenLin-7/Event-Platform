package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.Event;
import com.group3.event_plaza.model.Registration;
import com.group3.event_plaza.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface RegistrationRepository extends JpaRepository<Registration,Integer> {


    @Query(value = "SELECT * from registration where user_id = ?1",nativeQuery = true)
    List<Registration> findByUserId(int id);


    @Query(value = "SELECT event_id from registration where user_id = ?1 and status = 'confirmed'",nativeQuery = true)
    List<Integer> findUserJoinedEventId(int id);


    Registration findByEventAndRequester(Event event, User user);

    @Modifying
    @Transactional
    @Query("update Registration r set r.status = 'confirmed' where r.registrationId = ?1")
    void approveRegistration(int registrationId);

    @Modifying
    @Transactional
    @Query("update Registration r set r.status = 'rejected' where r.registrationId = ?1")
    void rejectRegistration(int registrationId);
}