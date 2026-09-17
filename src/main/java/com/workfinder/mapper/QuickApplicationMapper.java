package com.workfinder.mapper;

import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.entity.QuickApplication;

public class QuickApplicationMapper {
    public static QuickApplicationDto quickApplicationDto(QuickApplication quickApplication){
        return new QuickApplicationDto(quickApplication.getId(),quickApplication.getAppliedAt(),
                UserMapper.userDto(quickApplication.getUser()),JobMapper.jobDto(quickApplication.getJob()));
    }
}
