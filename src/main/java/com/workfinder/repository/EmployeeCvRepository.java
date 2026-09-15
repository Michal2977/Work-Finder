package com.workfinder.repository;

import com.workfinder.entity.EmployeeCv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeCvRepository extends JpaRepository<EmployeeCv,Long> {
}
