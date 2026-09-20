package com.workfinder.service.impl;

import com.workfinder.dto.ApplicationDto;
import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.entity.Job;
import com.workfinder.entity.QuickApplication;
import com.workfinder.entity.User;
import com.workfinder.enums.ApplicationStatus;
import com.workfinder.exception.AlreadyAppliedException;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.JobNotFoundException;
import com.workfinder.mapper.QuickApplicationMapper;
import com.workfinder.repository.JobRepository;
import com.workfinder.repository.QuickApplicationRepository;
import com.workfinder.request.QuickApplicationRequest;
import com.workfinder.service.JobApplicationService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final AuthServiceImpl authService;

    private final JobRepository jobRepository;
    private final QuickApplicationRepository quickApplicationRepository;

    public JobApplicationServiceImpl(AuthServiceImpl authService,JobRepository jobRepository,
                                     QuickApplicationRepository applicationRepository) {
        this.authService = authService;
        this.jobRepository = jobRepository;
        this.quickApplicationRepository = applicationRepository;
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @Override
    public QuickApplicationDto quickApplication(String email, Long id, MultipartFile file
            , QuickApplicationRequest request) throws IOException {

        User user = authService.findByEmail(email);

        Job job = jobRepository.findById(id).orElse(null);
        if (job == null){
            throw new JobNotFoundException("This job offer does not exist.");
        }

        if (quickApplicationRepository.existsByUserIdAndJobId(user.getId(),job.getId())){
             throw new AlreadyAppliedException("You have already applied for this job.");
        }
        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if (fileName.contains("..")){
            throw new InvalidFileException("Invalid file name");
        }
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("application/pdf"))){
            throw new InvalidFileException("Only PDF files are allowed");
        }
        if (file.getSize() > 5 * 1024 * 1024 ){
            throw new InvalidFileException("Maximum file size is 5 MB.");
        }

        QuickApplication quickApplication = new QuickApplication();
        quickApplication.setAppliedAt(LocalDateTime.now());
        quickApplication.setSendCvName(request.getSendCvName());
        quickApplication.setSendCv(file.getBytes());
        quickApplication.setUser(user);
        quickApplication.setApplicationStatus(ApplicationStatus.SENT);
        user.getQuickApplication().add(quickApplication);
        quickApplication.setJob(job);

        quickApplicationRepository.save(quickApplication);
        return QuickApplicationMapper.quickApplicationDto(quickApplication);
    }



}
