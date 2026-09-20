package com.workfinder.mapper;

import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.entity.QuickApplication;

import java.util.Base64;

public class QuickApplicationMapper {
    public static QuickApplicationDto quickApplicationDto(QuickApplication quickApplication){

        String base64Byte = Base64.getEncoder().encodeToString(quickApplication.getSendCv());

        return new QuickApplicationDto(quickApplication.getId(),quickApplication.getAppliedAt(),
               base64Byte,quickApplication.getSendCvName(),quickApplication.getApplicationStatus(),
                UserMapper.userDto(quickApplication.getUser()),JobMapper.jobDto(quickApplication.getJob()));
    }
}
