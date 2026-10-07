package com.workfinder.repository;

import com.workfinder.entity.QuickApplication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuickApplicationRepository extends JpaRepository<QuickApplication,Long> {

    boolean existsByUserIdAndJobId(Long userId,Long jobId);
    public long countByJobId(Long jobId);
    List<QuickApplication> findAllByJobId(Long jobId);
}
