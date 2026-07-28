package com.workfinder.mapper;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Job;
import org.springframework.util.StringUtils;

import java.util.Base64;
import java.util.Objects;

public class JobMapper {
    public static JobDto jobDto(Job job){

        String base64Picture = null;
        if (job.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(job.getPicture());
        }

        return new JobDto(job.getId(),job.getTitle(),job.getDescription(),job.getSalary(),job.getLocation()
        ,job.getContractType(),job.getWorkSchedule(),job.getEmploymentType(),job.getJobStart(),
                job.getWorkMode(),job.getDuties(),job.getRequirements(),job.getWeOffer(),job.getJobCategory()
                ,job.getSalaryPeriod(),job.getSalaryType(),base64Picture,EmployerMapper.employerDto(job.getEmployer()));
    }
}
