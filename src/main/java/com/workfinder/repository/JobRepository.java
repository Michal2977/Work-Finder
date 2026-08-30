package com.workfinder.repository;

import com.workfinder.entity.Job;
import com.workfinder.enums.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;


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
            "AND (:employmentType IS NULL OR j.employmentType IN  :employmentType)" +
            "AND (:jobCategory IS NULL OR j.jobCategory In :jobCategory)" +
            "AND (:salaryPeriod IS NULL OR j.salaryPeriod IN :salaryPeriod)")
    Page<Job> findByExpiresAtAfterAndDeletedFalse(@Param("now") LocalDateTime now, @Param("location") String location,
                                                  @Param("keyword") String keyword, WorkMode workMode,
                                                  ContractType contractType, EmploymentType employmentType,
                                                  JobCategory jobCategory, SalaryPeriod salaryPeriod, Pageable pageable);

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




}

