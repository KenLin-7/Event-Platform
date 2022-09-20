package com.group3.event_plaza.common.lang;

public enum HttpStatus {
    SUCCESS("200","Success"),
    FAIL("500","Internal error"),
    STATUS_401("401","UnAuthenticated"),
    HTTP_STATUS_403("403","Forbidden");

    private final String msg;

    private final String statusCode;

    HttpStatus(String statusCode, String msg) {
        this.msg  = msg;
        this.statusCode = statusCode;
    }

    public String getMsg() {
        return msg;
    }

    public String getStatusCode() {
        return statusCode;
    }
}
