package com.workfinder.mapper;

import com.workfinder.dto.ApplicationDto;
import com.workfinder.entity.Application;

public class ApplicationMapper {
    public static ApplicationDto applicationDto(Application application){
        return new ApplicationDto(application.getId(),application.getQuestion(),
                JobMapper.jobDto(application.getJob()));
    }
}
