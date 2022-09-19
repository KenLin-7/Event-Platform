package com.group3.event_plaza.common;

import com.group3.event_plaza.common.lang.HttpStatus;


public class ResponseResult<T> {


    protected String msg;

    protected T data;

    protected String code;


    /**
     * Return success response with data
     * @param data
     * @return
     * @param <T>
     */

    public static <T>ResponseResult<T> success(T data){
        return new ResponseResult<>(data);
    }


    public static <T>ResponseResult<T> success(){
        return new ResponseResult<>(HttpStatus.SUCCESS);
    }

    /**
     * Return fail response with no data
     * @return
     * @param <T>
     */
    public static <T>ResponseResult<T> fail(){
        return new ResponseResult<>(HttpStatus.FAIL);
    }

    /**
     * Return 401 response with custom msg
     * @param msg
     * @return
     * @param <T>
     */

    public static <T>ResponseResult<T> unAuthenticated(String msg){
        return new ResponseResult<>(msg, HttpStatus.STATUS_401);
    }


    /**
     * Default response
     * @param status
     */

    public ResponseResult(HttpStatus status){
        this.data = null;
        this.code = status.getStatusCode();
        this.msg = status.getMsg();
    }

    /**
     * success response with data
     * @param data
     */
    public ResponseResult(T data){
        this.data = data;
        this.msg = HttpStatus.SUCCESS.getMsg();
        this.code = HttpStatus.SUCCESS.getStatusCode();
    }

    /**
     * response with custom msg and status
     * @param msg
     * @param code
     */
    public ResponseResult(String msg, HttpStatus code){
        this.msg = msg;
        this.code = code.getStatusCode();
    }

    /**
     * Custom response
     * @param msg
     * @param code
     * @param data
     */

    public ResponseResult(String msg, HttpStatus code, T data){
        this.msg = msg;
        this.data = data;
        this.code = code.getStatusCode();
    }



    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
