package com.group3.event_plaza.service;

import com.group3.event_plaza.model.User;


public interface UserService {

    void register(User user);

    User getUserInfo(String email);

    void updateUserInfo(User user);

    void removeRole(String email);

    String updateUserAvatar(String email, String avatar);

    String updateUserEmail(String email, String newEmail);

    String updateUserPassword(String email, String password);

    StringBuilder sendMail(String email);


}
