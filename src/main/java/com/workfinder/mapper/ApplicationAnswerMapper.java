package com.workfinder.mapper;

import com.workfinder.dto.ApplicationAnswerDto;
import com.workfinder.entity.ApplicationAnswer;


public class ApplicationAnswerMapper {
    public static ApplicationAnswerDto applicationAnswerDto(ApplicationAnswer applicationAnswer){
        return new ApplicationAnswerDto(applicationAnswer.getId(),applicationAnswer.getAnswer(),
                ApplicationMapper.applicationDto(applicationAnswer.getApplication()),
                UserMapper.userDto(applicationAnswer.getUser()),
                ApplicationSubmissionMapper.applicationSubmissionDto(applicationAnswer.getApplicationSubmission()));
    }

    public static ApplicationAnswerDto applicationAnswerDtoForSubmission(ApplicationAnswer applicationAnswer){
        return new ApplicationAnswerDto(applicationAnswer.getId(), applicationAnswer.getAnswer(),
                ApplicationMapper.applicationDto(applicationAnswer.getApplication()),
                UserMapper.userDto(applicationAnswer.getUser()),null);
    }

}
