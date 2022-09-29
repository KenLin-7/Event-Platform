package com.group3.event_plaza.security.filter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.util.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CustomAuthenticationFilter extends UsernamePasswordAuthenticationFilter {


    private AuthenticationManager authenticationManager;

    private JwtUtils jwtUtils;



    public CustomAuthenticationFilter(AuthenticationManager authenticationManager, JwtUtils jwtUtils){
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
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
        String token = jwtUtils.createJwt(authResult.getName(), request.getRequestURL().toString(), convertAuthorities(authResult.getAuthorities().toArray()));
        response.setHeader("access_token",token);
        response.setContentType("application/json;charset=UTF-8");
        ServletOutputStream outputStream = response.getOutputStream();
        ObjectMapper mapper = new ObjectMapper();
        mapper.writeValue(outputStream,ResponseResult.success("Successfully login"));
        outputStream.flush();
        outputStream.close();
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
