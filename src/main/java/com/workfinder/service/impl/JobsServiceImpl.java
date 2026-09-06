package com.workfinder.service.impl;

import com.workfinder.dto.JobDto;
import com.workfinder.entity.Employer;
import com.workfinder.entity.Job;
import com.workfinder.entity.User;
import com.workfinder.enums.*;
import com.workfinder.enums.Currency;
import com.workfinder.exception.InvalidFileException;
import com.workfinder.mapper.JobMapper;
import com.workfinder.repository.JobRepository;
import com.workfinder.request.CreateJobOfferRequest;
import com.workfinder.request.UpdateJobOfferRequest;
import com.workfinder.service.JobsService;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.Param;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class JobsServiceImpl implements JobsService {

    private final JobRepository jobRepository;
    private final AuthServiceImpl authService;

    public JobsServiceImpl(JobRepository jobRepository, AuthServiceImpl authService) {
        this.jobRepository = jobRepository;
        this.authService = authService;
    }

    @Override
    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    public JobDto createAJobOffer(CreateJobOfferRequest request, String email,MultipartFile file) throws IOException {

        Job job = new Job();
        job.setPosition(request.getPosition());
        job.setCreateAt(LocalDateTime.now());
        job.setExpiresAt(LocalDateTime.now().plusDays(request.getExpiresAt()));
        job.setDescription(request.getDescription());
        job.setDeleted(false);
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setWorkSchedule(request.getWorkSchedule());
        job.setDuties(request.getDuties());
        job.setRequirements(request.getRequirements());
        job.setWeOffer(request.getWeOffer());
        job.setShiftSystem(request.getShiftSystem());
        job.setWorkingHours(request.getWorkingHours());
        job.setNightShift(request.getNightShift());
        job.setAboutCompany(request.getAboutCompany());
        job.setSalarySystem(request.getSalarySystem());
        job.setBenefit(request.getBenefit());
        job.setPhoneNumber(request.getPhoneNumber());
        job.setCurrency(request.getCurrency());


        User user = authService.findByEmail(email);
        Employer employer = user.getEmployer();

        if (file != null && !file.isEmpty()){
            String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
            if (fileName.contains("..")){
                throw new InvalidFileException("Invalid file name");
            }
            String contentType = file.getContentType();
            if ( contentType == null || !(contentType.equals("image/png") ||
                    contentType.equals("image/jpeg")
                    || contentType.equals("image/webp"))){
                throw new InvalidFileException("Only image files are allowed");
            }
            if (file.getSize() > 10 * 1024 * 1024){
                throw new InvalidFileException("Maximum file size is 10 MB.");
            }
            job.setPicture(file.getBytes());
        }else if (user.getPicture() != null){
            job.setPicture(user.getPicture());
        }


        job.setWorkMode(request.getWorkMode());
        job.setJobStart(request.getJobStart());
        job.setContractType(request.getContractType());
        job.setEmploymentType(request.getEmploymentType());
        job.setJobCategory(request.getJobCategory());
        job.setSalaryType(request.getSalaryType());
        job.setSalaryPeriod(request.getSalaryPeriod());
        job.setEmployer(employer);
        job.setCompanyName(request.getCompanyName());

        jobRepository.save(job);
        return JobMapper.jobDto(job);

    }

    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    @Override
    public JobDto updateJobOffer(Long id ,UpdateJobOfferRequest request,String email,MultipartFile file) throws IOException {
        Job job = jobRepository.getReferenceById(id);
        User user = authService.findByEmail(email);
        Employer employer = user.getEmployer();

        job.setPosition(request.getPosition());
        job.setDescription(request.getDescription());
        job.setSalary(request.getSalary());
        job.setLocation(request.getLocation());
        job.setDeleted(false);
        job.setWorkSchedule(request.getWorkSchedule());
        job.setDuties(request.getDuties());
        job.setRequirements(request.getRequirements());
        job.setWeOffer(request.getWeOffer());
        job.setShiftSystem(request.getShiftSystem());
        job.setWorkingHours(request.getWorkingHours());
        job.setNightShift(request.getNightShift());
        job.setAboutCompany(request.getAboutCompany());
        job.setSalarySystem(request.getSalarySystem());
        job.setBenefit(request.getBenefit());
        job.setPhoneNumber(request.getPhoneNumber());
        job.setWorkMode(request.getWorkMode());
        job.setJobStart(request.getJobStart());
        job.setContractType(request.getContractType());
        job.setEmploymentType(request.getEmploymentType());
        job.setJobCategory(request.getJobCategory());
        job.setSalaryType(request.getSalaryType());
        job.setSalaryPeriod(request.getSalaryPeriod());
        job.setCompanyName(request.getCompanyName());
        job.setEmployer(employer);

        if (request.getExpiresAt() != null ){
            job.setExpiresAt(LocalDateTime.now().plusDays(request.getExpiresAt()));
        }


        if (file != null &&  !file.isEmpty()){
           String fileName = StringUtils.cleanPath(Objects.requireNonNull(file.getOriginalFilename()));
           if (fileName.contains("..")){
               throw new InvalidFileException("Invalid file Name");
           }
           String contentType = file.getContentType();
           if (contentType == null || !(contentType.equals("image/png") || contentType.equals("image/jpeg")
                   || contentType.equals("image/webp"))){
               throw new InvalidFileException("Only image files are allowed");
           }
           if (file.getSize() > 10 * 1024 *1024){
               throw new InvalidFileException("Maximum file size is 10 MB.");
           }
           job.setPicture(file.getBytes());
        }
        jobRepository.save(job);
        return JobMapper.jobDto(job);
    }


    @Override
    public Map<String,Object> jobDtoList(int page, int size, String keyword, String location, String sort, WorkMode workMode
    , ContractType contractType, EmploymentType employmentType, JobCategory jobCategory,
    List<String> publicationDate, SalaryPeriod salaryPeriod, SalaryType salaryType, BigDecimal salary,
     SalaryPeriod selectedSalaryPeriod, Currency currency){

        Sort sorting = switch (sort){
            case "positionAsc" -> Sort.by("position").ascending();
            case "companyAsc" -> Sort.by("companyName").ascending();
            default -> Sort.by("createAt").descending();
            };

        LocalDateTime now = LocalDateTime.now();
       LocalDateTime  publicationDateTime = null;


        if (publicationDate != null){
           publicationDateTime = publicationDate.stream().map(date -> switch (date) {
               case "24h" -> now.minusHours(24);
               case "3d" -> now.minusDays(3);
               case "7d" -> now.minusDays(7);
               case "14d" -> now.minusDays(14);
               case "30d" -> now.minusDays(30);
               case "60d" -> now.minusDays(60);
               default -> null;
           }) .filter(Objects::nonNull)
                   .min(LocalDateTime::compareTo)
                   .orElse(null);

        }

        Pageable pageable = PageRequest.of(page,size,sorting);

        Page<JobDto> jobs = jobRepository.findByExpiresAtAfterAndDeletedFalse(LocalDateTime.now(),
                location,keyword,workMode,contractType,employmentType,jobCategory,salaryPeriod,salaryType,salary,
        selectedSalaryPeriod,currency,publicationDateTime,pageable).map(JobMapper :: jobDto);

        List<Object[]> jobCategoryCounts = jobRepository.countJobCategories(LocalDateTime.now(),keyword,
                location,workMode,contractType,employmentType,salaryPeriod);

        List<Object[]> jobWorkModeCount = jobRepository.countWorkMode(LocalDateTime.now(),keyword,location,jobCategory,contractType
        ,employmentType,salaryPeriod);

        List<Object[]> countJobContactType = jobRepository.countJobContactType(LocalDateTime.now(),keyword,location,
                workMode,jobCategory,employmentType,salaryPeriod);

        List<Object[]> countJobEmploymentType = jobRepository.countJobEmploymentType(LocalDateTime.now(),keyword,location
        ,workMode,contractType,jobCategory,salaryPeriod);

        List<Object[]> countJobSalaryPeriod = jobRepository.countJobSalaryPeriod(LocalDateTime.now(),
                keyword,location,workMode,contractType,jobCategory,employmentType);

        Object[] counts = jobRepository.countJobPublicationTime(now,now.minusHours(24),now.minusDays(3),
                now.minusDays(7),now.minusDays(14),now.minusDays(30),now.minusDays(60),keyword,location,workMode
        ,contractType,jobCategory,employmentType);

        long countJobSalary = jobRepository.countJobSalary(LocalDateTime.now(),keyword,location,workMode,contractType
        ,jobCategory,employmentType,selectedSalaryPeriod,salaryType,currency,salary);



        Map<String ,Object> response = new HashMap<>();
        response.put("countJobSalary",countJobSalary);
        response.put("jobs",jobs);
        response.put("jobCategoryCounts",jobCategoryCounts);
        response.put("jobWorkModeCount",jobWorkModeCount);
        response.put("countJobContactType",countJobContactType);
        response.put("countJobEmploymentType",countJobEmploymentType);
        response.put("countJobSalaryPeriod",countJobSalaryPeriod);
        response.put("publicationDate",counts[0]);

        return response;
        }




    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    @Override
    public Page<JobDto> findAllExpiredJobs(int page ,int size ,String sort,String keyword,String email){

        User user = authService.findByEmail(email);

        Sort sorting = switch (sort){
        case "positionAsc" -> Sort.by("position").ascending();
        case "companyNameASC" -> Sort.by("companyName").ascending();
        case "expiresAtAsc" ->  Sort.by("expiresAt").ascending();
        case "expiresAtDesc" -> Sort.by("expiresAt").descending();
        default -> Sort.by("expiresAt").descending();
        };
        Pageable pageable = PageRequest.of(page,size,sorting);
        if (user.hasRole("ADMIN")){
            return jobRepository.findAllExpiresJobOffers(LocalDateTime.now(),pageable,keyword).map(JobMapper :: jobDto);
        }else if (user.hasRole("EMPLOYER")){
       return jobRepository.findAllExpiredEmployerJobs(LocalDateTime.now(),user.getEmployer().getId(),keyword,pageable)
       .map(JobMapper :: jobDto);
        }
        return Page.empty(pageable);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public Page<JobDto> findAllDeletedOffers(int page,int size ,String sort,String keyword){

        Sort sorting = switch (sort){
            case "positionAsc" -> Sort.by("position").ascending();
            case "companyNameASC" -> Sort.by("companyName").ascending();
            case "createAtAsc" ->  Sort.by("createAt").ascending();
            case "createAtDesc" -> Sort.by("createAt").descending();
            default -> Sort.by("createAt").descending();
        };
        Pageable pageable = PageRequest.of(page,size,sorting);
        return jobRepository.findAllDeletedJobs(keyword,pageable).map(JobMapper :: jobDto);

    }

    @Override
    public void  deleteOldSoftDeletedJobs(){
        LocalDateTime date = LocalDateTime.now().minusMonths(3);

        List<Job> jobs = jobRepository.findJobsToHardDelete(date);

        jobs.forEach(job -> jobRepository.deleteById(job.getId()));
    }


    @Override
    public JobDto findJobById(Long id){
        Job job =  jobRepository.findById(id).get();
        return JobMapper.jobDto(job);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public long amountsOfDeletedJobs(){
     return jobRepository.countByDeletedJobs();
    }


    @Override
    public void checkedJobOfferOwner(Job job,User user){
        if (user.hasRole("ADMIN")){
           return;
        }
       if (job.getEmployer() == null || user.getEmployer() == null
       || !job.getEmployer().getId().equals(user.getEmployer().getId())){
           throw new AccessDeniedException("Access denied");
       }
    }

    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    @Override
    public JobDto findJobOfferById(Long id,User user){
        Job job = jobRepository.findById(id).get();
        checkedJobOfferOwner(job,user);
        return  JobMapper.jobDto(job);
    }

    @Transactional
    @PreAuthorize("hasAnyRole('EMPLOYER','ADMIN')")
    @Override
    public void softJobDelete(Long id){
       Job job =  jobRepository.findById(id).get();
       job.setDeletedAt(LocalDateTime.now());
       job.setDeletedJobs(job.getDeletedJobs() + 1);
       job.setDeleted(true);
    }

    @Override
    @PreAuthorize("hasRole('ADMIN')")
    public void hardDelete(Long id){
         jobRepository.deleteById(id);
    }

    @Transactional
    @PreAuthorize("hasRole('ADMIN')")
    @Override
    public void recoverDeletedOffer(Long id){
        Job job = jobRepository.findById(id).get();
        job.setDeletedJobs(job.getDeletedJobs() -1);
        job.setDeletedAt(null);
        job.setDeleted(false);
    }
}

