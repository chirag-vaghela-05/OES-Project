package com.examination.DE_Project.service;

import com.examination.DE_Project.model.ExamAttempt;
import com.examination.DE_Project.model.StudentAnswer;
import com.examination.DE_Project.reposatory.ExamAttemptRepo;
import com.examination.DE_Project.reposatory.Responserepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ResponseService {

    @Autowired
    Responserepo repo;

    @Autowired
    ExamAttemptRepo attemptRepo;


    // =========================================================
    // SAVE / UPDATE STUDENT ANSWER
    // =========================================================

    public void SubmitResponce(
            StudentAnswer responce,
            int attemptId) {

        // -----------------------------------------------------
        // 1. Find exam attempt
        // -----------------------------------------------------

        ExamAttempt attempt =
                attemptRepo.findById(attemptId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Exam attempt not found"
                                )
                        );


        // -----------------------------------------------------
        // 2. Check whether exam is already submitted
        // -----------------------------------------------------

        if (attempt.getEnd() != null) {

            throw new RuntimeException(
                    "This exam attempt has already been submitted"
            );
        }


        // -----------------------------------------------------
        // 3. Check exam time limit
        // -----------------------------------------------------

        LocalDateTime deadline =
                attempt.getStart()
                        .plusMinutes(
                                attempt.getPaper()
                                        .getDurationMinutes()
                        );


        if (LocalDateTime.now().isAfter(deadline)) {

            throw new RuntimeException(
                    "Exam time has expired"
            );
        }


        // -----------------------------------------------------
        // 4. Check whether this question was already answered
        // -----------------------------------------------------

        if (responce.getQuestion() == null) {

            throw new RuntimeException(
                    "Question is required"
            );
        }


        Optional<StudentAnswer> existingAnswer =
                repo.findByAttemptIdAndQuestionId(
                        attemptId,
                        responce.getQuestion().getId()
                );


        // -----------------------------------------------------
        // 5. Update existing answer
        // -----------------------------------------------------

        if (existingAnswer.isPresent()) {

            StudentAnswer answer =
                    existingAnswer.get();

            answer.setSelectedAnswer(
                    responce.getSelectedAnswer()
            );

            repo.save(answer);

        }


        // -----------------------------------------------------
        // 6. Create new answer
        // -----------------------------------------------------

        else {

            /*
             * IMPORTANT:
             * Get student and paper from the attempt.
             * Do not trust the frontend for these relationships.
             */

            responce.setAttempt(attempt);

            responce.setStudent(
                    attempt.getStudent()
            );

            responce.setPaper(
                    attempt.getPaper()
            );


            repo.save(responce);
        }
    }


    // =========================================================
    // GET ANSWERS OF ONE ATTEMPT
    // =========================================================

    public List<StudentAnswer> getAnswersByAttemptId(
            int attemptId) {

        // -----------------------------------------------------
        // Check that attempt exists
        // -----------------------------------------------------

        attemptRepo.findById(attemptId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Exam attempt not found"
                        )
                );


        // -----------------------------------------------------
        // Get answers belonging to this attempt
        // -----------------------------------------------------

        return repo.findByAttemptId(attemptId);
    }
}