package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.common.exception.authorization.EmailExistException;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.User;
import org.junit.jupiter.api.*;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    @Order(1)
    void register() throws EmailExistException {
        User user = new User();
        user.setUserId(1);
        user.setNickname("test register");
        user.setPassword("111111");
        user.setEmail("user@qq.com");
        userService.register(user);
    }

    @Test
    @Order(2)
    void getUserInfo() throws DataNotFoundException {
        userService.getUserInfo("user@qq.com");
    }

    @Test
    @Order(3)
    void updateUserInfo() {
        User user = new User();
        user.setUserId(1);
        user.setNickname("test register update");
        user.setPassword("111111");
        user.setEmail("user@qq.com");
        userService.updateUserInfo(user);
    }

    @Test
    @Order(4)
    void updateUserAvatar() {
        //userService.updateUserAvatar("user@qq.com", "http://www.baidu.com");
        userService.updateUserAvatar("user@qq.com", "https://firebasestorage.googleapis.com/v0/b/eventplazaweb.appspot.com/o/avatar%2F131a-b1f9575526f72a3993c31b0c7ecd315f.jpeg1665735467064?alt=media&token=75d3c535-3aa3-4f9c-ad0a-02426fdd6104");
    }

    @Test
    @Order(5)
    void sendMail() {
        userService.sendMail("user@qq.com");
    }

    @Test
    @Order(6)
    void updateUserPassword() {
        userService.updateUserPassword("user@qq.com", "111111");
    }

    @Test
    @Order(7)
    void removeRole() {
        userService.removeRole("user@qq.com");
    }

    @Test
    @Order(8)
    void updateUserEmail() {
        userService.updateUserEmail("user@qq.com", "user2@qq.com");
    }





}