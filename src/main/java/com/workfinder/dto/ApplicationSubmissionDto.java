package com.workfinder.dto;

import com.workfinder.entity.Application;
import com.workfinder.entity.ApplicationAnswer;
import com.workfinder.enums.ApplicationStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class ApplicationSubmissionDto {

    private Long id;
    private String sendCv;
    private String sendCvName;
    private ApplicationStatus applicationStatus;
    private UserDto userDto;
    private JobDto jobDto;
    private LocalDateTime sentAt;
    private List<ApplicationAnswerDto> applicationAnswerDto;

    public ApplicationSubmissionDto() {
    }

    public ApplicationSubmissionDto(Long id, String sendCv, String sendCvName, ApplicationStatus applicationStatus,
                                    UserDto userDto, JobDto jobDto, LocalDateTime sentAt, List<ApplicationAnswerDto>
                                            applicationAnswerDto) {
        this.id = id;
        this.sendCv = sendCv;
        this.sendCvName = sendCvName;
        this.applicationStatus = applicationStatus;
        this.userDto = userDto;
        this.jobDto = jobDto;
        this.sentAt = sentAt;
        this.applicationAnswerDto = applicationAnswerDto;
    }
}
