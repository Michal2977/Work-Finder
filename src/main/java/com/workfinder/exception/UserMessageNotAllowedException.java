package com.workfinder.exception;

public class UserMessageNotAllowedException extends RuntimeException {
    public UserMessageNotAllowedException(String message) {
        super(message);
    }
}
