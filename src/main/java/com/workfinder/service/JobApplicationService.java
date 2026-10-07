package com.workfinder.service;

import com.workfinder.dto.ApplicationAnswerDto;
import com.workfinder.dto.ApplicationDto;
import com.workfinder.dto.ApplicationSubmissionDto;
import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.request.FormApplicationAnswerRequest;
import com.workfinder.request.QuickApplicationRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JobApplicationService {
    QuickApplicationDto quickApplication(String email, Long id, MultipartFile file
    , QuickApplicationRequest request) throws IOException;
    ApplicationDto findFormQuestionByJobId(Long id);
    ApplicationAnswerDto formAnswer(FormApplicationAnswerRequest request, String email, MultipartFile file) throws IOException;
    List<ApplicationSubmissionDto> findAllJobApplicationForEmployee(String email);
    List<?> findAllApplications(Long jobId);
    long amountsOfJobApplication(Long jobId);
    long amountsOfQuickApplication(Long jobId);
    Object RejectACandidate(Long id,Long applicationId);
    Object viewed(Long jobId,Long applicationId);
}
