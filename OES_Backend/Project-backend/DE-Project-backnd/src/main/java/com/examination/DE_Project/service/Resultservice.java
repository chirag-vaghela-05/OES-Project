package com.examination.DE_Project.service;

import com.examination.DE_Project.model.*;
import com.examination.DE_Project.reposatory.Questionrepo;
import com.examination.DE_Project.reposatory.Responserepo;
import com.examination.DE_Project.reposatory.Resultrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class Resultservice {
    @Autowired
    Resultrepo repo_result;


    @Autowired
    Responserepo repo_response;


    public Result calculateResult(long studentId,long paperId){

        List<StudentAnswer> answers = repo_response.findByStudentIdAndPaperId(studentId,paperId);
        if(answers.isEmpty()){
            throw new RuntimeException("No answers submmited...");
        }

        int totalMark=0;
        int achieve=0;

        //compare answer
        for(StudentAnswer answer : answers){
            Question question= answer.getQuestion();

            totalMark+= question.getMarks_question();

            //check answer

            if(question.getCorrect_ans().equalsIgnoreCase(answer.getSelectedAnswer())){
                achieve += question.getMarks_question();
            }
        }
        //save result
        Result result=new Result();

        result.setStudentId(studentId);
        result.setPaper_id(paperId);

        result.setStudent_name(answers.get(0).getStudent().getStudent_name());

        result.setPaper_name(answers.get(0).getPaper().getPaper_title());

        result.setTotal_marks(totalMark);
        result.setAchieve_marks(achieve);

        result.setAttempts_date(new Date());

        result.setAttempt(1);

        return repo_result.save(result);

    }

    public List<Result> getallresult(){
        return repo_result.findAll();
    }
    public List<Result> getAllByStudentId(long studentId){
        return repo_result.findByStudentId(studentId);
    }
    public Result getResultById(long resultId){
        return repo_result.findById(resultId).orElseThrow(() -> new RuntimeException("Result not found"));
    }

}
