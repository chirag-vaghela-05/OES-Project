package com.examination.DE_Project.service;

import com.examination.DE_Project.model.ExamAttempt;
import com.examination.DE_Project.model.Paper;
import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.reposatory.ExamAttemptRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ExamAttemptService {

    @Autowired
    ExamAttemptRepo repo;


    public ExamAttempt startAttempt(Student student, Paper paper) {

        // Count previous attempts of this student for this paper
        long attemptCount =
                repo.countByStudentIdAndPaperId(
                        student.getId(),
                        paper.getId()
                );


        // Check maximum attempts
        if (paper.getMaxAttempts() > 0
                && attemptCount >= paper.getMaxAttempts()) {

            throw new RuntimeException(
                    "Maximum attempts reached for this exam"
            );
        }


        // Create new attempt
        ExamAttempt attempt = new ExamAttempt();

        attempt.setStudent(student);
        attempt.setPaper(paper);
        attempt.setStart(LocalDateTime.now());
        attempt.setScore(0);

        return repo.save(attempt);
    }


    public ExamAttempt getAttempt(int attemptId) {

        return repo.findById(attemptId)
                .orElseThrow(() ->
                        new RuntimeException("Exam attempt not found"));
    }
}