package com.workfinder.repository;

import com.workfinder.entity.Job;
import com.workfinder.enums.*;
import com.workfinder.mapper.JobMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;


import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {


    @Query("Select j From Job j Where j.expiresAt > :now And j.deleted = false And (" +
            ":keyword Is Null Or :keyword = '' Or Lower(j.position) Like Lower (Concat('%', :keyword, '%'))" +
            "Or Lower (j.companyName) Like Lower(Concat('%', :keyword, '%')))" +
            "And (:location Is Null Or :location = '' Or Lower(j.location) Like Lower(Concat('%', :location, '%')))" +
            "And (:workMode Is NULL Or :workMode Member Of j.workMode)" +
            "And (:contractType IS NULL OR :contractType Member Of j.contractType)" +
            "AND (:employmentType IS NULL OR j.employmentType  =  :employmentType)" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod)" +
            "AND (:salaryType IS NULL  OR  j.salaryType = :salaryType)" +
            "AND (:salary IS NULL OR j.salary >= :salary) " +
            "AND (:selectedSalaryPeriod IS NULL OR j.salaryPeriod = :selectedSalaryPeriod) " +
            "AND (:currency is NULL OR j.currency = :currency)" +
            "AND (:publicationDateTime IS NULL OR j.createAt >= :publicationDateTime)")
    Page<Job> findByExpiresAtAfterAndDeletedFalse(@Param("now") LocalDateTime now, @Param("location") String location,
                                                  @Param("keyword") String keyword,@Param("workMode") WorkMode workMode,
                                                  @Param("contractType") ContractType contractType,
                                                  @Param("employmentType") EmploymentType employmentType,
       @Param("jobCategory") JobCategory jobCategory,@Param("salaryPeriod") SalaryPeriod salaryPeriod,
       @Param("salaryType")SalaryType salaryType,@Param("salary") BigDecimal salary,
       @Param("selectedSalaryPeriod")SalaryPeriod selectedSalaryPeriod,
       @Param("currency")Currency currency,
       @Param("publicationDateTime") LocalDateTime publicationDateTime,Pageable pageable);


    @Query("SELECT j.jobCategory, COUNT(j) FROM Job j Where j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode)" +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType)" +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod) GROUP BY j.jobCategory")
    List<Object[]> countJobCategories(@Param("now") LocalDateTime now,
                                      @Param("keyword")String keyword,
                                      @Param("location")String location,
                                      @Param("workMode")WorkMode workMode,
                                      @Param("contractType")ContractType contractType,
                                      @Param("employmentType")EmploymentType employmentType,
                                      @Param("salaryPeriod")SalaryPeriod salaryPeriod);

    @Query("SELECT workMode, COUNT(j) FROM Job j JOIN j.workMode workMode Where j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory )" +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType)" +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod) GROUP BY workMode")
    List<Object[]> countWorkMode(@Param("now") LocalDateTime now,
                                      @Param("keyword")String keyword,
                                      @Param("location")String location,
                                      @Param("jobCategory")JobCategory jobCategory,
                                      @Param("contractType")ContractType contractType,
                                      @Param("employmentType")EmploymentType employmentType,
                                      @Param("salaryPeriod")SalaryPeriod salaryPeriod);


    @Query("SELECT contractType, COUNT(j) FROM Job j JOIN j.contractType contractType  Where j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode)" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory)" +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod) GROUP BY contractType")
    List<Object[]> countJobContactType(@Param("now") LocalDateTime now,
                                      @Param("keyword")String keyword,
                                      @Param("location")String location,
                                      @Param("workMode")WorkMode workMode,
                                      @Param("jobCategory")JobCategory jobCategory,
                                      @Param("employmentType")EmploymentType employmentType,
                                      @Param("salaryPeriod")SalaryPeriod salaryPeriod);

    @Query("SELECT j.employmentType, COUNT(j) FROM Job j Where j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode)" +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType)" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod) GROUP BY j.employmentType")
    List<Object[]> countJobEmploymentType(@Param("now") LocalDateTime now,
                                      @Param("keyword")String keyword,
                                      @Param("location")String location,
                                      @Param("workMode")WorkMode workMode,
                                      @Param("contractType")ContractType contractType,
                                      @Param("jobCategory")JobCategory jobCategory,
                                      @Param("salaryPeriod")SalaryPeriod salaryPeriod);

    @Query("SELECT j.salaryPeriod, COUNT(j) FROM Job j Where j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))" +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode)" +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType)" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory)" +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType) GROUP BY j.salaryPeriod")
    List<Object[]> countJobSalaryPeriod(@Param("now") LocalDateTime now,
                                          @Param("keyword")String keyword,
                                          @Param("location")String location,
                                          @Param("workMode")WorkMode workMode,
                                          @Param("contractType")ContractType contractType,
                                          @Param("jobCategory")JobCategory jobCategory,
                                          @Param("employmentType")EmploymentType employmentType);



    @Query("SELECT SUM(CASE WHEN j.createAt >= :now24h THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN j.createAt >= :now3d THEN 1 ELSE 0 END)," +
            "SUM(CASE WHEN j.createAt >= :now7d THEN 1 ELSE 0 END)," +
            "SUM(CASE WHEN j.createAt >= :now14d THEN 1 ELSE 0 END)," +
            "SUM(CASE WHEN j.createAt >= :now30d THEN 1 ELSE 0 END)," +
            "SUM(CASE WHEN j.createAt >= :now60d THEN 1 ELSE 0 END) FROM Job j WHERE j.expiresAt >= :now " +
            "AND j.deleted = false AND (:keyword IS NULL OR :keyword = ''" +
            "OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))" +
            "AND(:location IS NULL OR :location= ''" +
            "OR LOWER(j.location) LIKE LOWER(CONCAT('%' , :location, '%')))" +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode)" +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType)" +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory)" +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType)")
    Object[] countJobPublicationTime(@Param("now") LocalDateTime now
                                    ,@Param("now24h")LocalDateTime now24h,
                                     @Param("now3d") LocalDateTime now3d,
                                     @Param("now7d") LocalDateTime now7d,
                                     @Param("now14d") LocalDateTime now14d,
                                     @Param("now30d") LocalDateTime now30d,
                                     @Param("now60d") LocalDateTime now60d,
      @Param("keyword")String keyword,@Param("location")String location,@Param("workMode")WorkMode workMode,
      @Param("contractType")ContractType contractType,@Param("jobCategory")JobCategory jobCategory,
      @Param("employmentType")EmploymentType employmentType);



    @Query("SELECT  COUNT(j) FROM Job j " +
            "WHERE j.expiresAt > :now AND j.deleted = false " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
            "AND (:location IS NULL OR :location = '' OR LOWER(j.location) LIKE LOWER(CONCAT('%', :location, '%')))  " +
            "AND (:workMode IS NULL OR :workMode MEMBER OF j.workMode) " +
            "AND (:contractType IS NULL OR :contractType MEMBER OF j.contractType) " +
            "AND (:jobCategory IS NULL OR j.jobCategory = :jobCategory) " +
            "AND (:employmentType IS NULL OR j.employmentType = :employmentType) " +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod = :salaryPeriod) " +
            "AND (:salaryType IS NULL OR j.salaryType = :salaryType) " +
            "AND (:currency IS NULL OR j.currency = :currency)" +
            "AND (:salary IS NULL OR j.salary >= :salary)")
     long countJobSalary(@Param("now") LocalDateTime now,@Param("keyword")String keyword,
              @Param("location")String location,@Param("workMode")WorkMode workMode,
              @Param("contractType")ContractType contractType,@Param("jobCategory")JobCategory jobCategory,
              @Param("employmentType")EmploymentType employmentType,@Param("salaryPeriod")SalaryPeriod salaryPeriod,
              @Param("salaryType")SalaryType salaryType,@Param("currency")Currency currency
              ,@Param("salary")BigDecimal salary);


    @Query("SELECT j FROM Job j WHERE j.expiresAt <= :now AND j.deleted = false AND " +
            "(:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER (j.companyName) LIKE LOWER(CONCAT('%', :keyword , '%')))")
    Page<Job> findAllExpiresJobOffers(@Param("now")LocalDateTime now,Pageable pageable,@Param("keyword")String keyword);

    @Query("SELECT j FROM Job j WHERE j.expiresAt <= :now AND j.deleted = false AND j.employer.id = :employerId " +
            "AND (:keyword IS NULL OR :keyword = '' OR LOWER(j.position)LIKE LOWER(CONCAT('%', :keyword , '%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Job> findAllExpiredEmployerJobs(@Param("now")LocalDateTime now,@Param("employerId") Long employerId
                                      ,@Param("keyword")String keyword, Pageable pageable);

    @Query("SELECT j FROM Job j WHERE j.deleted = true AND " +
            "(:keyword IS NULL OR :keyword = '' OR LOWER(j.position) LIKE LOWER(CONCAT('%',:keyword,'%'))" +
            "OR LOWER(j.companyName) LIKE LOWER(CONCAT('%',:keyword,'%')))")
    Page<Job> findAllDeletedJobs(@Param("keyword")String keyword,Pageable pageable);


    @Query("SELECT COUNT(j) FROM Job j Where deleted = true")
    long countByDeletedJobs();


    @Query("SELECT j From Job j WHERE j.deleted = true AND j.deletedAt <= :date")
    List<Job>findJobsToHardDelete(@Param("date")LocalDateTime date);




}

