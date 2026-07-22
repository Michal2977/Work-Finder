package com.workfinder.exception;

public class PasswordChangeNotAllowedException extends RuntimeException {
    public PasswordChangeNotAllowedException(String message) {
        super(message);
    }
}
