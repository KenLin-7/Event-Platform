package com.group3.event_plaza.config;

import com.group3.event_plaza.common.lang.RoleUser;
import com.group3.event_plaza.security.TokenAuthenticationEntryPoint;
import com.group3.event_plaza.security.filter.CustomAuthenticationFilter;
import com.group3.event_plaza.security.filter.JwtTokenFilter;
import com.group3.event_plaza.security.handler.LogoutSuccessfulHandler;
import com.group3.event_plaza.util.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private static final String[] URL_WHITELISTS ={
            "/",
            "/api/user/register",
            "/api/user/logout",
            "/ws/socket/**",
            "/api/user/forgotPassword",
            "/api/user/sendEmail",
            "/api/user/resetPassword",
            "/api/event/search/{keyword}",
            "/api/test/*",
            "/api/event/search/{keyword}",
            "/api/event/latestEvent",

    };

    private static final String[] ORGANIZER_URLS = {
    };

    private static final String[] USER_URLS = {
            "/api/user/current",
            "/api/notification/all",
    };


    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private JwtTokenFilter jwtTokenFilter;

    @Autowired
    private LogoutSuccessfulHandler logoutSuccessfulHandler;


    @Autowired
    private TokenAuthenticationEntryPoint tokenAuthenticationEntryPoint;

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    };



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        AuthenticationManager authenticationManager =authenticationManager(http.getSharedObject(AuthenticationConfiguration.class));

        // security config
        http.csrf().disable().cors();
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.headers().xssProtection().and().contentSecurityPolicy("'script-src','self'");

        // authorize api url
        http.authorizeHttpRequests()
                .antMatchers(URL_WHITELISTS).permitAll()
                .antMatchers(ORGANIZER_URLS).hasAnyAuthority(RoleUser.ROLE_ORGANIZER.getValue())
                .antMatchers(USER_URLS).hasAnyAuthority(RoleUser.ROLE_USER.getValue())
                .anyRequest().authenticated();
        http.httpBasic().authenticationEntryPoint(tokenAuthenticationEntryPoint);

        http.logout().logoutUrl("/api/user/logout").logoutSuccessHandler(logoutSuccessfulHandler);

        // validate login status
        http.addFilter(new CustomAuthenticationFilter(authenticationManager, jwtUtils));
        http.addFilterAfter(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
