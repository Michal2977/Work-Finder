package com.workfinder.exception;

public class FavoriteJobAlreadyExistsException extends RuntimeException {
    public FavoriteJobAlreadyExistsException(String message) {
        super(message);
    }
}
