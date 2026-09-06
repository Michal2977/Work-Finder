package com.workfinder.repository;

import com.workfinder.entity.Contact;
import com.workfinder.entity.Job;
import com.workfinder.enums.ContactStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Persistable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface ContactRepository extends JpaRepository<Contact ,Long> {

    long countByContactStatusNot(ContactStatus contactStatus);


    @Query("Select c FROM Contact c Where (:keyword IS NULL OR :keyword = '' OR LOWER(c.title)LIKE LOWER" +
            "(CONCAT('%', :keyword , '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', :keyword, '%'))" +
            "OR LOWER(CAST(c.contactStatus AS string)) LIKE LOWER(CONCAT('%', :keyword, '%')))")
    Page<Contact> findAll(@Param("keyword")String keyword,Pageable pageable);
}
