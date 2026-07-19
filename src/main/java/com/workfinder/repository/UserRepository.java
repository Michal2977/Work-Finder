package com.workfinder.repository;

import com.workfinder.entity.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository  extends JpaRepository<User ,Long> {

    @Query("Select u From User u Where u.email = ?1")
    User findByEmail(@Param("email")String email);
    long countByRole_Role(String role);
    boolean existsByEmail(String email);
    @Query("Select u From User u Where u.verificationCode = ?1")
    User findByVerificationCode(String code);

    @Modifying
    @Transactional
    @Query("Update User u Set isEnabled = true Where u.id = ?1")
    void isEnabled(Long id);

    @Query("Select u From User u Where verificationToken = ?1")
    User findByVerificationToken(String token);

    @Query("Select u From User u left join fetch u.providers left join fetch u.role Where u.email = ?1")
    Optional<User> findByEmailWithProviders(@Param("email") String email);

}
