package com.workfinder.repository;

import com.workfinder.entity.UserProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserProviderRepository extends JpaRepository<UserProvider ,Long> {
}
