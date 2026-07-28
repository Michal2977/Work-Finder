package com.workfinder.service.impl;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Employer;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.mapper.JobMapper;
import com.workfinder.repository.JobRepository;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.service.JobsService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

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
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException {

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

        if (file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            if (fileName.contains("..")){
                throw new InvalidFileException("Invalid file name");
            }
            String contentType = file.getContentType();
            if ( contentType == null || !(contentType.equals("image/png") ||
                    contentType.equals("image/jpeg")
                    || contentType.equals("image/webp"))){
                throw new InvalidFileException("Only image files are allowed");
            }
            if (file.getSize() > 10 * 1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            job.setPicture(file.getBytes());
        }else if (user.getPicture() != null){
            job.setPicture(user.getPicture());
        }


        job.setWorkMode(request.getWorkMode());
        job.setJobStart(request.getJobStart());
        job.setContractType(request.getContractType());
        job.setEmploymentType(request.getEmploymentType());
        job.setJobCategory(request.getJobCategory());
        job.setSalaryType(request.getSalaryType());
        job.setSalaryPeriod(request.getSalaryPeriod());
        job.setEmployer(employer);

        jobRepository.save(job);
        return JobMapper.jobDto(job);

    }

    @Override
    public List<JobDto> jobDtoList(){
        return jobRepository.findAll().stream().map(JobMapper :: jobDto).toList();
    }
}

