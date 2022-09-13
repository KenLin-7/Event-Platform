package com.group3.event_plaza.config;

import com.group3.event_plaza.security.filter.CustomAuthenticationFilter;
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


@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    private static final String[] URL_WHITELISTS ={
        "/",
        "/test/*"
    };

    private static final String[] ORGANIZER_URLS = {
    };
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
        http.csrf().disable().cors();
        http.authorizeHttpRequests()
                .antMatchers(URL_WHITELISTS).permitAll()
                .antMatchers(ORGANIZER_URLS).hasRole("ROLE_ORGANIZER")
                .anyRequest().authenticated();
        http.formLogin();
        http.addFilter(new CustomAuthenticationFilter(authenticationManager));
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        http.headers().xssProtection().and().contentSecurityPolicy("'script-src','self'");
        return http.build();
    }
}
