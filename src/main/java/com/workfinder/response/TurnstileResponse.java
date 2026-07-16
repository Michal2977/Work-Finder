package com.workfinder.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class TurnstileResponse {

    private boolean success;
    private String hostName;
    private String challenge_ts;

    @JsonProperty("error_codes")
    private String[] error_codes;
}
