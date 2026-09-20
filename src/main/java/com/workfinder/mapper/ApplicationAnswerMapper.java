package com.workfinder.mapper;

import com.workfinder.dto.ApplicationAnswerDto;
import com.workfinder.entity.ApplicationAnswer;
import com.workfinder.entity.ApplicationSubmission;

public class ApplicationAnswerMapper {
    public static ApplicationAnswerDto applicationAnswerDto(ApplicationAnswer applicationAnswer){
        return new ApplicationAnswerDto(applicationAnswer.getId(),applicationAnswer.getAnswer(),
                ApplicationMapper.applicationDto(applicationAnswer.getApplication()),
                UserMapper.userDto(applicationAnswer.getUser()), ApplicationSubmissionMapper.applicationSubmissionDto
                (applicationAnswer.getApplicationSubmission()));
    }
}
