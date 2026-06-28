package com.workfinder.security;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TurnstileResponse {

    private boolean success;
    private String challenge_ts;
    private String hostname;
    @JsonProperty("error-codes")
    private String[] errorCodes;
}
