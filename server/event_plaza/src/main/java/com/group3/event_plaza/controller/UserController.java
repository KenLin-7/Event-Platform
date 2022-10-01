package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.Impl.UserServiceImpl;
import com.group3.event_plaza.service.UserService;
import com.nimbusds.oauth2.sdk.Request;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.Multipart;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserService userService;

    @Autowired
    HttpSession session;

    @PostMapping("/register")
    public ResponseResult<String> register(@RequestBody User user){
        userService.register(user);
        return ResponseResult.success();
    }

    @PostMapping("/current")
    public ResponseResult<String> getCurrentUser(Principal principal){
        return ResponseResult.success(principal.getName());
    }

    @PostMapping("/updateUser")
    public ResponseResult<User> updateUser(@RequestBody User user){
        userService.updateUserInfo(user);
        return ResponseResult.success();
    }

    @PostMapping("/profile")
    public ResponseResult<User> profile(@RequestBody String email){
        System.out.println("profile: "+email);
        User userProfile = userService.getUserInfo(email);
        return ResponseResult.success(userProfile);
    }

    @PostMapping("/sendEmail")
    public ResponseResult<String> sendEmail(HttpServletRequest request, Principal principal){
        session = request.getSession();
        String s = userService.sendMail(principal.getName()).toString();
        session.setAttribute("code",s);
        String code = (String)session.getAttribute("code");
        return ResponseResult.success(code);
    }

    @PostMapping("/updateEmail")
    public ResponseResult<String> updateEmail(Principal principal , @RequestBody Map<String,String> map){
        String sessionCode = (String)session.getAttribute("code");
        String result;
        String email = map.get("email");
        String code = map.get("code");
        System.out.println("email: "+email);
        System.out.println("code: "+code);
        if(sessionCode.equals(code)){
            result = userService.updateUserEmail(principal.getName(), email);
            session.invalidate();
        }else{
            result = "code not match";
        }
        return ResponseResult.success(result);
    }

    @PostMapping("/updatePassword")
    public ResponseResult<String> updatePassword(Principal principal, @RequestBody Map<String,String> map){
        String sessionCode = (String)session.getAttribute("code");
        String result;
        String password = map.get("password");
        String code = map.get("code");
        System.out.println("email: "+password);
        System.out.println("code: "+code);
        if(sessionCode.equals(code)){
            result = userService.updateUserPassword(principal.getName(), password);
            session.invalidate();
        }else{
            result = "code not match";
        }
        return ResponseResult.success(result);
    }

    @PostMapping("/updateAvatar")
    public ResponseResult<String> updateAvatar(Principal principal, @RequestBody String avatar){
        String result = userService.updateUserAvatar(principal.getName(), avatar);
        return ResponseResult.success(result);
    }

    @GetMapping("/remove/role")
    public ResponseResult<String> removeRole(Principal principal){
        userService.removeRole(principal.getName());
        return ResponseResult.success();
    }
}
