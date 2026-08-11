package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface Responserepo extends JpaRepository<StudentAnswer, Long> {

    List<StudentAnswer> findByAttemptId(int attemptId);

    Optional<StudentAnswer> findByAttemptIdAndQuestionId(
            int attemptId,
            long questionId
    );
}