package com.group3.event_plaza.service;

import com.group3.event_plaza.EventPlazaApplication;
import com.group3.event_plaza.common.exception.authorization.EmailExistException;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.User;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.jupiter.api.Assertions.*;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = EventPlazaApplication.class)
class UserServiceTest {

    @Autowired
    private UserService userService;

    @Test
    void register() throws EmailExistException {
        User user = new User();
        user.setUserId(1);
        user.setNickname("test register");
        user.setPassword("111111");
        user.setEmail("user@qq.com");
        userService.register(user);
    }

    @Test
    void getUserInfo() throws DataNotFoundException {
        userService.getUserInfo("user@qq.com");
    }

    @Test
    void updateUserInfo() {
        User user = new User();
        user.setUserId(1);
        user.setNickname("test register update");
        user.setPassword("111111");
        user.setEmail("user@qq.com");
        userService.updateUserInfo(user);
    }

    @Test
    void removeRole() {
        userService.removeRole("user@qq.com");
    }

    @Test
    void updateUserAvatar() {
        userService.updateUserAvatar("user@qq.com", "http://www.baidu.com");
    }

    @Test
    void updateUserEmail() {
        userService.updateUserEmail("user@qq.com", "user2@qq.com");
    }

    @Test
    void updateUserPassword() {
        userService.updateUserPassword("user@qq.com", "111111");
    }

    @Test
    void sendMail() {
        userService.sendMail("user@qq.com");
    }
}