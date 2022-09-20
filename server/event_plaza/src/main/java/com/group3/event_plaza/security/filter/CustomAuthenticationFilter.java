package com.group3.event_plaza.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.util.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;

    private JwtUtil jwtUtil;



    public CustomAuthenticationFilter(AuthenticationManager authenticationManager,JwtUtil jwtUtil){
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username,password);
        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        // create token
        String token = jwtUtil.createJwt(authResult.getName(), request.getRequestURL().toString(), convertAuthorities(authResult.getAuthorities().toArray()));
        response.setHeader("access_token",token);
        response.setContentType("application/json;charset=UTF-8");
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        // return output to client
        ServletOutputStream outputStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(outputStream,ResponseResult.unAuthenticated("incorrect email/password"));
        outputStream.flush();
        outputStream.close();

    }


    // convert to String[] for jwt claim
     private  String[] convertAuthorities(Object[] authorities){
        String[] roles = new String[authorities.length];
        for(int i = 0 ; i  < authorities.length;i++){
            roles[i] = authorities[i].toString();
        }

        return roles;
    }

}
