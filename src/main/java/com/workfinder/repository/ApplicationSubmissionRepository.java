package com.workfinder.repository;

import com.workfinder.entity.ApplicationSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationSubmissionRepository extends JpaRepository<ApplicationSubmission,Long> {

   boolean existsByUserIdAndJobId(Long userId,Long jobId);
   List<ApplicationSubmission> findAllByUserId(Long userId);
   List<ApplicationSubmission> findAllByJobId(Long jobId);
   long countByJobId(Long jobId);
}
