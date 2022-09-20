package com.group3.event_plaza.util;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Component
public class JwtUtil {

    private static final long EXPIRE_DURATION = 24*60*60*1000; // 24h

    @Value("${app.jwt.secret}")
    private String secretKey;

    @Value("${app.jwt.header")
    private String header;

    public String createJwt(String name, String url, String[] role){

        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());

        return "Bearer  "+ JWT.create()
                .withSubject(name)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .withIssuer(url)
                .withArrayClaim("roles", role)
                .withIssuedAt(new Date())
                .sign(algorithm);
    }

    public DecodedJWT isVerified (String token) throws Exception {
        Algorithm algorithm = Algorithm.HMAC256(secretKey.getBytes());
        JWTVerifier verifier = JWT.require(algorithm).build();
        return verifier.verify(token);
    }

    public String getHeader() {
        return header;
    }
}
