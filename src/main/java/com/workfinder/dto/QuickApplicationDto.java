package com.workfinder.dto;

import com.workfinder.enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class QuickApplicationDto {

    private Long id;
    private LocalDateTime appliedAt;
    private String sendCvDto;
    private String sendCvName;
    private ApplicationStatus applicationStatus;
    private UserDto userDto;
    private JobDto jobDto;

    public QuickApplicationDto() {
    }

    public QuickApplicationDto(Long id, LocalDateTime appliedAt, String sendCvDto, String sendCvName,
                               ApplicationStatus applicationStatus, UserDto userDto, JobDto jobDto) {
        this.id = id;
        this.appliedAt = appliedAt;
        this.sendCvDto = sendCvDto;
        this.sendCvName = sendCvName;
        this.applicationStatus = applicationStatus;
        this.userDto = userDto;
        this.jobDto = jobDto;
    }
}
