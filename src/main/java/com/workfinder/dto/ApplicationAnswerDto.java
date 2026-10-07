package com.workfinder.dto;

import com.workfinder.entity.ApplicationSubmission;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ApplicationAnswerDto {

    private Long id;
    private List<String> answer;
    private ApplicationDto applicationDto;
    private UserDto userDto;
    private ApplicationSubmissionDto applicationSubmissionDto;

    public ApplicationAnswerDto() {
    }

    public ApplicationAnswerDto(Long id, List<String> answer, ApplicationDto applicationDto, UserDto userDto,
                                ApplicationSubmissionDto applicationSubmissionDto) {
        this.id = id;
        this.answer = answer;
        this.applicationDto = applicationDto;
        this.userDto = userDto;
        this.applicationSubmissionDto = applicationSubmissionDto;
    }
}
