package com.workfinder.service;

import com.workfinder.dto.JobDto;
import com.workfinder.request.CreateJobOfferRequest;

import java.util.List;

public interface JobsService {
    JobDto createAJobOffer(CreateJobOfferRequest request, String email);
    List<JobDto> jobDtoList();
}
