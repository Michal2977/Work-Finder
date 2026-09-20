package com.workfinder.repository;

import com.workfinder.entity.QuickApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface QuickApplicationRepository extends JpaRepository<QuickApplication,Long> {

    boolean existsByUserIdAndJobId(Long userId,Long jobId);
}
