package com.workfinder.mapper;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Job;

public class JobMapper {
    public static JobDto jobDto(Job job){

        return new JobDto(job.getTitle(),job.getDescription(),job.getSalary(),job.getLocation()
        ,job.getContractType(),job.getWorkSchedule(),job.getEmploymentType(),job.getJobStart(),
                job.getWorkMode(),job.getDuties(),job.getRequirements(),job.getWeOffer(),job.getJobCategory()
        ,EmployerMapper.employerDto(job.getEmployer()));
    }
}
