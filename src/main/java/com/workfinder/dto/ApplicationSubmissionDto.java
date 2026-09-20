package com.workfinder.dto;

import com.workfinder.enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApplicationSubmissionDto {

    private Long id;
    private String sendCv;
    private String sendCvName;
    private ApplicationStatus applicationStatus;
    private UserDto userDto;
    private JobDto jobDto;

    public ApplicationSubmissionDto() {
    }

    public ApplicationSubmissionDto(Long id, String sendCv, String sendCvName, ApplicationStatus applicationStatus,
                                    UserDto userDto, JobDto jobDto) {
        this.id = id;
        this.sendCv = sendCv;
        this.sendCvName = sendCvName;
        this.applicationStatus = applicationStatus;
        this.userDto = userDto;
        this.jobDto = jobDto;
    }
}
