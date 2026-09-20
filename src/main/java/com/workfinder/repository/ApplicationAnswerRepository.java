package com.workfinder.repository;

import com.workfinder.entity.ApplicationAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ApplicationAnswerRepository extends JpaRepository<ApplicationAnswer,Long> {
}
