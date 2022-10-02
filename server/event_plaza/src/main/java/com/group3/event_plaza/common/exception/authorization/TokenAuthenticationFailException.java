package com.group3.event_plaza.common.exception.authorization;

import org.springframework.security.core.AuthenticationException;

public class TokenAuthenticationFailException extends AuthenticationException {

    public TokenAuthenticationFailException(String explanation) {
        super(explanation);
    }
}
