package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.ExamAttempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExamAttemptRepo extends JpaRepository<ExamAttempt, Integer> {

        List<ExamAttempt> findByStudentIdAndPaperId(long studentId, long paperId);

        long countByStudentIdAndPaperId(long studentId, long paperId);
}
