package com.workfinder.service.impl;

import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.entity.Job;
import com.workfinder.entity.QuickApplication;
import com.workfinder.entity.User;
import com.workfinder.exception.JobNotFoundException;
import com.workfinder.mapper.QuickApplicationMapper;
import com.workfinder.repository.JobRepository;
import com.workfinder.repository.QuickApplicationRepository;
import com.workfinder.service.JobApplicationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final AuthServiceImpl authService;

    private final JobRepository jobRepository;
    private final QuickApplicationRepository applicationRepository;

    public JobApplicationServiceImpl(AuthServiceImpl authService,JobRepository jobRepository,
                                     QuickApplicationRepository applicationRepository) {
        this.authService = authService;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @Override
    public QuickApplicationDto quickApplication(String email, Long id){

        User user = authService.findByEmail(email);

        Job job = jobRepository.findById(id).orElse(null);
        if (job == null){
            throw new JobNotFoundException("This job offer does not exist.");
        }
        QuickApplication quickApplication = new QuickApplication();
        quickApplication.setAppliedAt(LocalDateTime.now());
        quickApplication.setUser(user);
        user.getQuickApplication().add(quickApplication);
        quickApplication.setJob(job);

        applicationRepository.save(quickApplication);
        return QuickApplicationMapper.quickApplicationDto(quickApplication);
    }
}
