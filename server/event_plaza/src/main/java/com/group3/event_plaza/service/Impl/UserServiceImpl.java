package com.group3.event_plaza.service.Impl;
import com.group3.event_plaza.common.exception.authorization.EmailExistException;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.Role;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.RoleRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.EmailService;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Random;


@Service
public class UserServiceImpl implements UserService, UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private RoleRepository roleRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;

        @Autowired
        private EmailService emailService;



        @Override
        public void register(User user) throws EmailExistException {
                User existUser = userRepository.findByEmail(user.getEmail());
                if(existUser != null){
                        throw new EmailExistException("Email was taken");
                }else{
                        Role role = roleRepository.findByRoleId(RoleUser.ROLE_USER.getId());
                        user.getRole().add(role);
                        user.setPassword(passwordEncoder.encode(user.getPassword()));
                        userRepository.save(user);
                }



        }

        @Override
        public User getUserInfo(String email) throws DataNotFoundException {
                User user = userRepository.findByEmail(email);
                if (user == null) {
                        throw new DataNotFoundException("Can not found user with " + email);
                }
                return userRepository.findByEmail(email);
        }


        @Override
        public void updateUserInfo(User user) {
                User currentUser = userRepository.findByEmail(user.getEmail());
                if (currentUser != null){
                        currentUser.setGender(user.getGender());
                        currentUser.setNickname(user.getNickname());
                        currentUser.setDob(user.getDob());
                        currentUser.setPhone(user.getPhone());
                        currentUser.setAvatar(user.getAvatar());
                        userRepository.save(currentUser);
                }
        }

        @Override
        public void removeRole(String email){
                Role role = roleRepository.findByRoleId(RoleUser.ROLE_USER.getId());
                User user = userRepository.findByEmail(email);
                user.getRole().remove(role);
                userRepository.save(user);
        }

        @Override
        public String updateUserAvatar(String email, String avatar) {
                User currentUser = userRepository.findByEmail(email);
                if (currentUser != null){
                        currentUser.setAvatar(avatar);
                        userRepository.save(currentUser);
                        return "Avatar updated";
                }else{
                        return "User not found";
                }
        }

        @Override
        public String updateUserEmail(String email, String newEmail) {
                User currentUser = userRepository.findByEmail(email);
                if (currentUser != null){
                        currentUser.setEmail(newEmail);
                        userRepository.save(currentUser);
                        return "Email updated";
                }else{
                        return "User not found";
                }
        }

        @Override
        public String updateUserPassword(String email, String password) {
                User currentUser = userRepository.findByEmail(email);
                if (currentUser != null){
                        currentUser.setPassword(passwordEncoder.encode(password));
                        userRepository.save(currentUser);
                        return "Password updated";
                }else{
                        return "User not found";
                }
        }

        @Override
        public StringBuilder sendMail(String email) {
                StringBuilder s = new StringBuilder(6);
                Random random = new Random();
                for(int i=0;i<6;i++){
                        s.append(random.nextInt(10));
                }
                String result = emailService.sendSimpleMail(email,"The validation code for updating email address: "+s, "You are updating your email address!");
                return s;
        }

        @Override
        @Transactional
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                User currentUser = userRepository.findByEmail(email);
                if(currentUser != null){
                        return new org.springframework.security.core.userdetails.User(
                                currentUser.getEmail(),currentUser.getPassword(),getAuthorities(currentUser));
                }
            throw new UsernameNotFoundException("User not found");
        }

        private Collection<? extends GrantedAuthority> getAuthorities(User user){

                List<GrantedAuthority> authorities = new ArrayList<>();
                for(Role role: user.getRole()){
                        authorities.add(new SimpleGrantedAuthority(role.getRoleName().toString()));
                }
                return  authorities;
        }
}
