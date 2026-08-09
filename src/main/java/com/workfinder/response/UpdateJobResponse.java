package com.workfinder.response;

import com.workfinder.dto.JobDto;

public record UpdateJobResponse(String message, JobDto jobDto) {
}
