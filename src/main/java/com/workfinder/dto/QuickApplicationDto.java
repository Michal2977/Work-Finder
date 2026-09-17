package com.workfinder.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuickApplicationDto {

    private Long id;
    private LocalDateTime appliedAt;
    private UserDto userDto;
    private JobDto jobDto;

    public QuickApplicationDto() {
    }

    public QuickApplicationDto(Long id, LocalDateTime appliedAt, UserDto userDto, JobDto jobDto) {
        this.id = id;
        this.appliedAt = appliedAt;
        this.userDto = userDto;
        this.jobDto = jobDto;
    }
}
