package com.workfinder.repository;

import com.workfinder.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository  extends JpaRepository<User ,Long> {

    @Query("Select u From User u Where u.email = ?1")
    User findByEmail(@Param("email")String email);
    long countByRole_Role(String role);
    boolean existsByEmail(String email);
}
