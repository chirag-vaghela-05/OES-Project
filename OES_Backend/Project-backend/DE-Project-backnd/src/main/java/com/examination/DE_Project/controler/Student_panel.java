package com.examination.DE_Project.controler;

import com.examination.DE_Project.model.ExamAttempt;
import com.examination.DE_Project.model.Paper;
import com.examination.DE_Project.model.Question;
import com.examination.DE_Project.model.Result;
import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.model.StudentAnswer;

import com.examination.DE_Project.service.ExamAttemptService;
import com.examination.DE_Project.service.Paperservice;
import com.examination.DE_Project.service.ResponseService;
import com.examination.DE_Project.service.Resultservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student/{studentid}")
public class Student_panel {

    @Autowired
    ResponseService service_responce;

    @Autowired
    ExamAttemptService service_attempt;

    @Autowired
    Paperservice service_paper;

    @Autowired
    Resultservice service_result;


    // =========================================================
    // 1. GET ALL AVAILABLE EXAMS
    // =========================================================

    @GetMapping("/available_exam")
    public List<Paper> total_paper(
            @PathVariable long studentid) {

        return service_paper.getallpaper();
    }


    // =========================================================
    // 2. GET QUESTIONS OF ONE PAPER
    // =========================================================

    @GetMapping("/available_exam/exam/{paperid}")
    public List<Question> exam(
            @PathVariable long studentid,
            @PathVariable long paperid) {

        return service_paper.getQuestion(paperid);
    }


    // =========================================================
    // 3. START EXAM
    // =========================================================

    @PostMapping("/available_exam/exam/{paperid}/start")
    public ExamAttempt startExam(
            @PathVariable long studentid,
            @PathVariable long paperid) {

        Student student = new Student();
        student.setId(studentid);

        Paper paper =
                service_paper.getPaperById(paperid);

        return service_attempt.startAttempt(
                student,
                paper
        );
    }


    // =========================================================
    // 4. GET ALL RESULTS OF THIS STUDENT
    // =========================================================

    @GetMapping("/result")
    public List<Result> myresult(
            @PathVariable long studentid) {

        return service_result.getAllByStudentId(
                studentid
        );
    }


    // =========================================================
    // 5. SAVE / UPDATE ANSWER
    // =========================================================

    @PostMapping(
            "/available_exam/exam/{paperid}/submit/{attemptId}"
    )
    public void SubmitResponse(
            @PathVariable long studentid,
            @PathVariable long paperid,
            @PathVariable int attemptId,
            @RequestBody StudentAnswer responce) {

        service_responce.SubmitResponce(
                responce,
                attemptId
        );
    }


    // =========================================================
    // 6. GET RESULT OF ONE PARTICULAR ATTEMPT
    // =========================================================

    @GetMapping("/result/{attemptId}")
    public Result getResult(
            @PathVariable long studentid,
            @PathVariable int attemptId) {

        return service_result.getResultByAttemptId(
                attemptId
        );
    }


    // =========================================================
    // 7. GET ALL ANSWERS OF ONE ATTEMPT
    // =========================================================

    @GetMapping("/exam/{attemptId}/answers")
    public List<StudentAnswer> getAttemptAnswers(
            @PathVariable long studentid,
            @PathVariable int attemptId) {

        return service_responce.getAnswersByAttemptId(
                attemptId
        );
    }


    // =========================================================
    // 8. FINAL SUBMIT EXAM
    // =========================================================

    @GetMapping(
            "/exam/{paperId}/final_submit/{attemptId}"
    )
    public Result calculatemarks(
            @PathVariable long studentid,
            @PathVariable long paperId,
            @PathVariable int attemptId) {

        return service_result.calculateResult(
                attemptId
        );
    }
}