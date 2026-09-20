package com.workfinder.repository;

import com.workfinder.entity.ApplicationSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationSubmissionRepository extends JpaRepository<ApplicationSubmission,Long> {
}
