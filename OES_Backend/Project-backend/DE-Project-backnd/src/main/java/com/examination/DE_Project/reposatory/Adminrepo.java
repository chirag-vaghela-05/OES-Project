package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


public interface Adminrepo extends JpaRepository<Admin, Long> {

    Optional<Admin> findByEmail(String email);
}
