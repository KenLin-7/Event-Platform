package com.group3.event_plaza.util;

import io.jsonwebtoken.Jwts;

import java.util.Date;

public class JwtUtil {

    private String secret;

    private long expire;

    private String header;

    public String createToken(String email){
        Date createDate = new Date();
        Date expireDate = new Date(createDate.getTime()+1000*expire);

        return Jwts.builder().
                setHeaderParam("typ","JWT")
                .setSubject(email)
                .setIssuedAt(createDate)
                .setExpiration(expireDate)
                .compact();
    }
}
