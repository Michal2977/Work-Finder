package com.workfinder.mapper;

import com.workfinder.dto.ApplicationSubmissionDto;
import com.workfinder.entity.ApplicationSubmission;


import java.util.Base64;

public class ApplicationSubmissionMapper {
    public static ApplicationSubmissionDto applicationSubmissionDto(ApplicationSubmission applicationSubmission){

       String base64File = Base64.getEncoder().encodeToString(applicationSubmission.getSendCv());

        return new ApplicationSubmissionDto(applicationSubmission.getId(),base64File,
                applicationSubmission.getSendCvName(),applicationSubmission.getApplicationStatus(),
                UserMapper.userDto(applicationSubmission.getUser()),JobMapper.jobDto(applicationSubmission.getJob()));
    }
}
