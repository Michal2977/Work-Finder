package com.workfinder.service.impl;


import com.workfinder.dto.*;
import com.workfinder.entity.*;
import com.workfinder.enums.ApplicationStatus;
import com.workfinder.enums.ApplicationType;
import com.workfinder.exception.AlreadyAppliedException;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.exception.JobNotFoundException;
import com.workfinder.mapper.ApplicationAnswerMapper;
import com.workfinder.mapper.ApplicationMapper;
import com.workfinder.mapper.ApplicationSubmissionMapper;
import com.workfinder.mapper.QuickApplicationMapper;
import com.workfinder.repository.*;
import com.workfinder.request.FormApplicationAnswerRequest;
import com.workfinder.request.QuickApplicationRequest;
import com.workfinder.service.JobApplicationService;
import jakarta.persistence.Transient;
import jakarta.transaction.Transactional;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.print.DocFlavor;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;

@Service
public class JobApplicationServiceImpl implements JobApplicationService {

    private final AuthServiceImpl authService;

    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;
    private final ApplicationAnswerRepository applicationAnswerRepository;
    private final ApplicationSubmissionRepository applicationSubmissionRepository;
    private final QuickApplicationRepository quickApplicationRepository;

    public JobApplicationServiceImpl(AuthServiceImpl authService, JobRepository jobRepository, ApplicationRepository applicationRepository1, ApplicationAnswerRepository applicationAnswerRepository, ApplicationSubmissionRepository applicationSubmissionRepository,
                                     QuickApplicationRepository applicationRepository) {
        this.authService = authService;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository1;
        this.applicationAnswerRepository = applicationAnswerRepository;
        this.applicationSubmissionRepository = applicationSubmissionRepository;
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


    @Override
    @PreAuthorize("hasRole('EMPLOYEE')")
    public ApplicationDto findFormQuestionByJobId(Long id){
       Application application =  applicationRepository.findByJobId(id);
       return ApplicationMapper.applicationDto(application);
    }

    @PreAuthorize("hasRole('EMPLOYEE')")
    @Override
    public ApplicationAnswerDto formAnswer(FormApplicationAnswerRequest request,String email,MultipartFile file) throws IOException {

        User user = authService.findByEmail(email);
        Application application = applicationRepository.getReferenceById(request.getApplicationId());
        Job job = jobRepository.getReferenceById(application.getJob().getId());

        ApplicationAnswer applicationAnswer = new ApplicationAnswer();
        applicationAnswer.setAnswer(request.getAnswer());
        applicationAnswer.setUser(user);
        applicationAnswer.setApplication(application);

        ApplicationSubmission applicationSubmission = new ApplicationSubmission();
        applicationSubmission.setUser(user);
        applicationSubmission.setSentAt(LocalDateTime.now());
        applicationSubmission.setApplicationStatus(ApplicationStatus.SENT);
        applicationSubmission.setJob(job);
        applicationSubmission.setApplicationAnswers(List.of(applicationAnswer));

        String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
        if (fileName.contains("..")){
            throw new InvalidFileException("Invalid file name");
        }
        String contentType = file.getContentType();
        if (contentType == null || !(contentType.equals("application/pdf"))){
            throw new InvalidFileException("Only PDF files are allowed");
        }
        if (file.getSize() > 5 * 1024 * 1024){
            throw new InvalidFileException("Maximum file size is 5 MB.");
        }
        applicationSubmission.setSendCv(file.getBytes());
        applicationSubmission.setSendCvName(request.getSendCvName());

        applicationSubmissionRepository.save(applicationSubmission);

        applicationAnswer.setApplicationSubmission(applicationSubmission);

        applicationAnswerRepository.save(applicationAnswer);

        return ApplicationAnswerMapper.applicationAnswerDto(applicationAnswer);
    }


    @PreAuthorize("hasRole('EMPLOYEE')")
    @Override
    public List<ApplicationSubmissionDto> findAllJobApplicationForEmployee(String email){
        User user = authService.findByEmail(email);

        List<ApplicationSubmission> applicationSubmission =
                applicationSubmissionRepository.findAllByUserId(user.getId());

        return applicationSubmission.stream().map(ApplicationSubmissionMapper :: applicationSubmissionDto).toList();

    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public long amountsOfJobApplication(Long jobId){
        return applicationSubmissionRepository.countByJobId(jobId);
    }

    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public long amountsOfQuickApplication(Long jobId){
        return quickApplicationRepository.countByJobId(jobId);
    }

    @PreAuthorize("hasRole('EMPLOYER')")
    @Override
    public List<?> findAllApplications(Long jobId){
        Job job = jobRepository.findById(jobId).get();
        if (job.getApplicationType() == ApplicationType.FORM){
            List<ApplicationSubmission> applications = applicationSubmissionRepository.findAllByJobId(jobId);
           return applications.stream().map(ApplicationSubmissionMapper :: applicationSubmissionDto).toList();
        }else {
         List<QuickApplication> quickApplications = quickApplicationRepository.findAllByJobId(jobId);
         return quickApplications.stream().map(QuickApplicationMapper :: quickApplicationDto).toList();
        }
    }

    @Transactional
    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public Object RejectACandidate(Long jobId,Long applicationId){
        Job job = jobRepository.findById(jobId).get();

        if (job.getApplicationType() == ApplicationType.FORM){
            ApplicationSubmission applicationSubmission = applicationSubmissionRepository.getReferenceById(applicationId);
            applicationSubmission.setApplicationStatus(ApplicationStatus.REJECTED);
            return ApplicationSubmissionMapper.applicationSubmissionDto(applicationSubmission);
        }
         else {
            QuickApplication quickApplication = quickApplicationRepository.getReferenceById(applicationId);
            quickApplication.setApplicationStatus(ApplicationStatus.REJECTED);
            return QuickApplicationMapper.quickApplicationDto(quickApplication);
        }

    }

    @Transactional
    @Override
    @PreAuthorize("hasRole('EMPLOYER')")
    public Object viewed(Long jobId,Long applicationId){
        Job job = jobRepository.findById(jobId).get();

        if (job.getApplicationType() == ApplicationType.FORM){
            ApplicationSubmission applicationSubmission = applicationSubmissionRepository.getReferenceById(applicationId);
            applicationSubmission.setApplicationStatus(ApplicationStatus.VIEWED);
            return ApplicationSubmissionMapper.applicationSubmissionDto(applicationSubmission);
        }
        else {
            QuickApplication quickApplication = quickApplicationRepository.getReferenceById(applicationId);
            quickApplication.setApplicationStatus(ApplicationStatus.VIEWED);
            return QuickApplicationMapper.quickApplicationDto(quickApplication);
        }

    }



}
