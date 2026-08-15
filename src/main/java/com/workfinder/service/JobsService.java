package com.workfinder.service;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.request.UpdateJobOfferRequest;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface JobsService {
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException;
    List<JobDto> jobDtoList();
    JobDto findJobById(Long id);
    void checkedJobOfferOwner(Job job, User user);
    JobDto findJobOfferById(Long id,User user);
    JobDto updateJobOffer(Long id , UpdateJobOfferRequest request, String email, MultipartFile file) throws IOException;
    void softJobDelete(Long id);
    List<JobDto> findAllExpiredJobs(String email);
    List<JobDto> findAllDeletedOffers();
    void recoverDeletedOffer(Long id);
}
