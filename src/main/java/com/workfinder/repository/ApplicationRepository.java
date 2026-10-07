package com.workfinder.repository;

import com.workfinder.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository  extends JpaRepository<Application,Long> {

    Application findByJobId(Long id);
}
