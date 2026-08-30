package com.workfinder.service;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.enums.*;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.request.UpdateJobOfferRequest;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface JobsService {
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException;
    Map<String,Object> jobDtoList(int page, int size, String keyword, String location, String sort, WorkMode workMode
    , ContractType contractType, EmploymentType employmentType, JobCategory jobCategory, SalaryPeriod salaryPeriod);
    JobDto findJobById(Long id);
    void checkedJobOfferOwner(Job job, User user);
    JobDto findJobOfferById(Long id,User user);
    JobDto updateJobOffer(Long id , UpdateJobOfferRequest request, String email, MultipartFile file) throws IOException;
    void softJobDelete(Long id);
    List<JobDto> findAllExpiredJobs(String email);
    List<JobDto> findAllDeletedOffers();
    void recoverDeletedOffer(Long id);

}
