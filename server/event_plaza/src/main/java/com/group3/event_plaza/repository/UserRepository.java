package com.group3.event_plaza.repository;

import com.group3.event_plaza.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;


@Repository
public interface UserRepository extends JpaRepository<User,Integer> {

    User findByEmail(String email);

    @Query(value = "SELECT  user_id from user where email = ?1",nativeQuery = true)
    Integer findUseIdBYEmail(String email);

    User findByUserId(int userId);
    @Query(value = "SELECT  email from user where user_id = ?1",nativeQuery = true)
    String findEmailByUserId(int userId);


    @Query(value =  "SELECT  avatar  from user where email =  ?1",nativeQuery = true)
    String getAvatar(String email);


}
