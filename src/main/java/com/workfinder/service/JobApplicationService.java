package com.workfinder.service;

import com.workfinder.dto.QuickApplicationDto;

public interface JobApplicationService {
    QuickApplicationDto quickApplication(String email, Long id);
}
