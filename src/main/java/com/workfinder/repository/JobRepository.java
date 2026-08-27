package com.workfinder.repository;

import com.workfinder.entity.Job;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import java.time.LocalDateTime;

@Repository
public interface JobRepository extends JpaRepository<Job,Long> {

    @Query("Select j From Job j Where j.expiresAt > :now And j.deleted = false And (" +
            ":keyword Is Null Or :keyword = '' Or Lower(j.position) Like Lower (Concat('%', :keyword, '%'))" +
            "Or Lower (j.companyName) Like Lower(Concat('%', :keyword, '%')))" +
            "And (:location Is Null Or :location = '' Or Lower(j.location) Like Lower(Concat('%', :location, '%')))")
    Page<Job> findByExpiresAtAfterAndDeletedFalse(@Param("now") LocalDateTime now, @Param("location") String location,
            @Param("keyword") String keyword, Pageable pageable);

}
