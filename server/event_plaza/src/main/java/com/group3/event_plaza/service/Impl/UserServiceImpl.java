package com.group3.event_plaza.service.Impl;

import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.model.Role;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.repository.RoleRepository;
import com.group3.event_plaza.repository.UserRepository;
import com.group3.event_plaza.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
public class UserServiceImpl implements UserService, UserDetailsService {

        @Autowired
        private UserRepository userRepository;

        @Autowired
        private RoleRepository roleRepository;

        @Autowired
        private PasswordEncoder passwordEncoder;



        @Override
        public void register(User user) {
                Role role = roleRepository.findByRoleId(RoleUser.ROLE_USER.getId());
                user.getRole().add(role);
                user.setPassword(passwordEncoder.encode(user.getPassword()));
                userRepository.save(user);
        }

        @Override
        public User getUserInfo(String email) throws DataNotFoundException {
                User user = userRepository.findUserByEmail(email);
                if(user == null){
                        throw new DataNotFoundException("Can not found user with "+email);
                }
            return userRepository.findUserByEmail(email);
        }

        @Override
        public void updateUserInfo(User user) {

        }

        @Override
        public void removeRole(String email){
                Role role = roleRepository.findByRoleId(RoleUser.ROLE_USER.getId());
                User user = userRepository.findUserByEmail(email);
                user.getRole().remove(role);
                userRepository.save(user);
        }

        @Override
        public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
                User currentUser = userRepository.findUserByEmail(email);
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
