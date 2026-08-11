package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface Resultrepo extends JpaRepository<Result, Long> {

    List<Result> findByUserId(long userId);

    Optional<Result> findByAttemptId(long attemptId);
}