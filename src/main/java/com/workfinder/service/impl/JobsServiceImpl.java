package com.workfinder.service.impl;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Employer;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.mapper.JobMapper;
import com.workfinder.repository.JobRepository;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.service.JobsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobsServiceImpl implements JobsService {

    private final JobRepository jobRepository;
    private final AuthServiceImpl authService;

    public JobsServiceImpl(JobRepository jobRepository, AuthServiceImpl authService) {
        this.jobRepository = jobRepository;
        this.authService = authService;
    }

    @Override
    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email){

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setWorkSchedule(request.getWorkSchedule());
        job.setDuties(request.getDuties());
        job.setRequirements(request.getRequirements());
        job.setWeOffer(request.getWeOffer());

        User user = authService.findByEmail(email);
        Employer employer = user.getEmployer();


        job.setWorkMode(request.getWorkMode());
        job.setJobStart(request.getJobStart());
        job.setContractType(request.getContractType());
        job.setEmploymentType(request.getEmploymentType());
        job.setJobCategory(request.getJobCategory());
        job.setEmployer(employer);

        jobRepository.save(job);
        return JobMapper.jobDto(job);

    }

    @Override
    public List<JobDto> jobDtoList(){
        return jobRepository.findAll().stream().map(JobMapper :: jobDto).toList();
    }
}

