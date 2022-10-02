package com.group3.event_plaza.service;

import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.model.User;


public interface UserService {

    void register(User user);

    User getUserInfo(String email) throws DataNotFoundException;

    void updateUserInfo(User user);

    void removeRole(String email);


}
