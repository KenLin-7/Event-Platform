package com.group3.event_plaza.security.filter;

import com.auth0.jwt.interfaces.DecodedJWT;
import com.group3.event_plaza.model.Role;
import com.group3.event_plaza.model.User;
import com.group3.event_plaza.security.TokenAuthenticationEntryPoint;
import com.group3.event_plaza.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;


@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;


    @Autowired
    private TokenAuthenticationEntryPoint authenticationEntryPoint;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if(request.getServletPath().equals("/login") || request.getServletPath().equals("/api/account/register")){
            filterChain.doFilter(request,response);
        }else{

            String header = request.getHeader("Authorization");
            if(header != null && header.startsWith("Bearer ")){
                try {
                    String token  = header.substring("Bearer ".length()).trim();
                    // verify token, throw exception if invalidated
                    DecodedJWT decodedJWT = jwtUtil.isVerified(token);
                    String username = decodedJWT.getSubject();
                    System.out.println(decodedJWT.getClaim("role").toString());
                    UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username,null,
                            Collections.singleton(new SimpleGrantedAuthority("ROLE_ORGANIZER")));
                    SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
                    filterChain.doFilter(request,response);
                } catch (Exception e) {
                    logger.error(e.getMessage());
                    e.printStackTrace();
                }

            }else{
                filterChain.doFilter(request,response);

            }

        }
    }

//    private Collection<? extends GrantedAuthority> getAuthorities(String roles){
//
//        List<GrantedAuthority> authorities = new ArrayList<>();
//        for(Role role: roles){
//            authorities.add(new SimpleGrantedAuthority(role.getRoleName().toString()));
//        }
//        return  authorities;
//    }
}
