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
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public interface JobsService {
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException;
    Map<String,Object> jobDtoList(int page, int size, String keyword, String location, String sort, WorkMode workMode
            , ContractType contractType, EmploymentType employmentType, JobCategory jobCategory,
                                  List<String> publicationDate, SalaryPeriod salaryPeriod, SalaryType salaryType,
                                  BigDecimal salary,SalaryPeriod selectedSalaryPeriod,Currency currency);
    JobDto findJobById(Long id);
    void checkedJobOfferOwner(Job job, User user);
    JobDto findJobOfferById(Long id,User user);
    JobDto updateJobOffer(Long id , UpdateJobOfferRequest request, String email, MultipartFile file) throws IOException;
    void softJobDelete(Long id);
    Page<JobDto> findAllExpiredJobs(int page ,int size ,String sort,String keyword,String email);
    Page<JobDto> findAllDeletedOffers(int page,int size ,String sort,String keyword);
    void recoverDeletedOffer(Long id);
    long amountsOfDeletedJobs();

}
