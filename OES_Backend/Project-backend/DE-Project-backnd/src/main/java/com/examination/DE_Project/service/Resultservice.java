package com.examination.DE_Project.service;

import com.examination.DE_Project.model.*;
import com.examination.DE_Project.reposatory.ExamAttemptRepo;
import com.examination.DE_Project.reposatory.Responserepo;
import com.examination.DE_Project.reposatory.Resultrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class Resultservice {

    @Autowired
    Resultrepo repo_result;

    @Autowired
    Responserepo repo_response;

    @Autowired
    ExamAttemptRepo repo_attempt;


    public Result calculateResult(int attemptId) {

        // 1. Find the particular exam attempt
        ExamAttempt attempt = repo_attempt.findById(attemptId)
                .orElseThrow(() ->
                        new RuntimeException("Exam attempt not found"));


        // 2. Check whether this attempt is already submitted
        Optional<Result> existingResult =
                repo_result.findByAttemptId(attemptId);

        if (existingResult.isPresent()) {

            // Result already exists for this attempt
            return existingResult.get();
        }


        // 3. Get only answers for this particular attempt
        List<StudentAnswer> answers =
                repo_response.findByAttemptId(attemptId);

        if (answers.isEmpty()) {
            throw new RuntimeException("No answers submitted...");
        }


        // 4. Calculate marks
        int totalMark = 0;
        int achieve = 0;

        for (StudentAnswer answer : answers) {

            Question question = answer.getQuestion();

            totalMark += question.getMarks();

            if (question.getCorrectOption() != null
                    && answer.getSelectedAnswer() != null
                    && question.getCorrectOption()
                    .equalsIgnoreCase(answer.getSelectedAnswer())) {

                achieve += question.getMarks();
            }
        }


        // 5. Update ExamAttempt
        attempt.setScore(achieve);
        attempt.setEnd(LocalDateTime.now());

        repo_attempt.save(attempt);


        // 6. Create Result
        Result result = new Result();

        result.setUserId(attempt.getStudent().getId());

        result.setPaperId(attempt.getPaper().getId());

        // Connect Result to this exact attempt
        result.setAttemptId(attempt.getId());

        result.setTotalMarks(totalMark);

        result.setScore(achieve);


        double percentage = totalMark == 0
                ? 0
                : ((double) achieve / totalMark) * 100;

        result.setPercentage(percentage);


        // Use actual exam attempt start time
        result.setStartTime(attempt.getStart());


        // 7. Save result
        return repo_result.save(result);
    }


    public List<Result> getallresult() {

        return repo_result.findAll();
    }


    public List<Result> getAllByStudentId(long studentId) {

        return repo_result.findByUserId(studentId);
    }



    public Result getResultByAttemptId(long attemptId) {

        return repo_result.findByAttemptId(attemptId)
                .orElseThrow(() ->
                        new RuntimeException("Result not found")
                );
    }
}