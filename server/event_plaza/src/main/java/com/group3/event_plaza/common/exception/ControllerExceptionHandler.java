package com.group3.event_plaza.common.exception;


import com.group3.event_plaza.common.ResponseResult;
import com.group3.event_plaza.common.exception.business.DataNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;


@RestControllerAdvice
public class ControllerExceptionHandler {


    /**
     * Handle data not found in database exception
     * @param exception
     * @return
     */
    @ExceptionHandler(DataNotFoundException.class)
    public ResponseResult<String> handleDataNotFound(DataNotFoundException exception){
        return ResponseResult.fail(exception.getMessage());
    }



}
