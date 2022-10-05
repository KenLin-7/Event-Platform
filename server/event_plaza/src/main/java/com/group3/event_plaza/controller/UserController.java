package com.group3.event_plaza.controller;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public ResponseResult<String> sendEmail(HttpServletRequest request, Principal principal, String email){
        session = request.getSession();
        String s;
        if(email!=null){
            if(principal!=null){
                s = userService.sendMail(principal.getName()).toString();
            }else{
                s = userService.sendMail(email).toString();
            }
            session.setAttribute("code",s);
            return ResponseResult.success();
        }else{
            return ResponseResult.unAuthenticated("Please enter email");
        }
    }

    @PostMapping("/updateEmail")
    public ResponseResult<String> updateEmail(Principal principal , @RequestBody Map<String,String> map){
        String sessionCode = (String)session.getAttribute("code");
        String result;
        String email = map.get("email");
        String code = map.get("code");
        if(sessionCode != null && sessionCode.equals(code)){
            result = userService.updateUserEmail(principal.getName(), email);
            session.invalidate();
            return ResponseResult.success(result);
        }else{
            return ResponseResult.success("code not match");
        }
    }

    @PostMapping("/updatePassword")
    public ResponseResult<String> updatePassword(Principal principal, @RequestBody Map<String,String> map){
        String sessionCode = (String)session.getAttribute("code");
        String result;
        String password = map.get("password");
        String code = map.get("code");
        if(sessionCode != null && sessionCode.equals(code)){
            result = userService.updateUserPassword(principal.getName(), password);
            session.invalidate();
            return ResponseResult.success(result);
        }else{
            return ResponseResult.success("code not match");
        }
    }

    @PostMapping("/resetPassword")
    public ResponseResult<String> resetPassword(@RequestBody String password){
        String email = (String)session.getAttribute("resetPassword");
        String result;
        result = userService.updateUserPassword(email, password);
        return ResponseResult.success(result);
    }

    @PostMapping("/updateAvatar")
    public ResponseResult<String> updateAvatar(Principal principal, @RequestBody String avatar){
        String result = userService.updateUserAvatar(principal.getName(), avatar);
        return ResponseResult.success(result);
    }

    @PostMapping("/forgotPassword")
    public ResponseResult<String> forgotPassword(HttpServletRequest request, @RequestBody Map<String,String> map){
        String sessionCode = (String)session.getAttribute("code");
        String result;
        String email = map.get("email");
        String code = map.get("code");
        if(userService.getUserInfo(email) == null){
            return ResponseResult.unAuthenticated("email not exists");
        }else{
            if(sessionCode != null && sessionCode.equals(code)){
                session = request.getSession();
                session.setAttribute("resetPassword",email);
                session.removeAttribute("code");
                return ResponseResult.success("code match");
            }else{
                return ResponseResult.unAuthenticated("code not match");
            }
        }
    }

    @GetMapping("/remove/role")
    public ResponseResult<String> removeRole(Principal principal){
        userService.removeRole(principal.getName());
        return ResponseResult.success();
    }

    @GetMapping("/loggedIn-userInfo")
    public ResponseResult<User> getLoggedInUserInfo(Principal principal){
        String email = principal.getName();
        User user = userService.getUserInfo(email);
        return ResponseResult.success(user);
    }
}
