package com.workfinder.repository;

import com.workfinder.entity.FavoriteJob;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteJobRepository extends JpaRepository<FavoriteJob,Long> {

    @Query("SELECT f From FavoriteJob f Where f.user.id = :userId")
    List<FavoriteJob> findMySavedJobs(@Param("userId")Long userId);

    @Query("SELECT COUNT(f) FROM FavoriteJob f Where f.user.id = :userId")
    long countMySavedJobs(@Param("userId")Long id);

    boolean existsByUserIdAndJobId(Long userId, Long jobId);
}
