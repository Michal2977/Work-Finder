package com.workfinder.service;

import com.workfinder.dto.QuickApplicationDto;
import com.workfinder.request.QuickApplicationRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface JobApplicationService {
    QuickApplicationDto quickApplication(String email, Long id, MultipartFile file
    , QuickApplicationRequest request) throws IOException;
}
