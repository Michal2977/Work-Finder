package com.workfinder.service;

import com.workfinder.dto.JobDto;
import com.workfinder.request.CreateJobOfferRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JobsService {
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException;
    List<JobDto> jobDtoList();
}
