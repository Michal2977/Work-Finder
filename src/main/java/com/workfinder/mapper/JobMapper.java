package com.workfinder.mapper;

import com.workfinder.dto.EmployerDto;
import com.workfinder.dto.JobDto;
import com.workfinder.entity.Job;

import java.util.Base64;

public class JobMapper {
    public static JobDto jobDto(Job job){

        String base64Picture = null;
        if (job.getPicture() != null){
            base64Picture = Base64.getEncoder().encodeToString(job.getPicture());
        }

        EmployerDto employerDto = job.getEmployer() != null
                ? EmployerMapper.employerDto(job.getEmployer())
                : null;


        return new JobDto(job.getId(),job.getPosition(),job.getDescription(),job.getSalary(),job.getLocation()
        ,job.getContractType(),job.getWorkSchedule(),job.getEmploymentType(),job.getJobStart(),
                job.getWorkMode(),job.getDuties(),job.getRequirements(),job.getWeOffer(),job.getJobCategory()
                ,job.getSalaryPeriod(),job.getSalaryType(),base64Picture,job.getCompanyName()
                ,job.getShiftSystem(),job.getWorkingHours(),job.getNightShift(),job.getAboutCompany(),
                job.getSalarySystem(),job.getBenefit(),job.getPhoneNumber(),job.getExpiresAt(),
                employerDto);
    }
}
