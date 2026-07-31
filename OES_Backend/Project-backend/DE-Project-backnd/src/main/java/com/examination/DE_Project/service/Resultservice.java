package com.examination.DE_Project.service;


import com.examination.DE_Project.model.*;
import com.examination.DE_Project.reposatory.Responserepo;
import com.examination.DE_Project.reposatory.Resultrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

            totalMark+= question.getMarks();

            //check answer

            if(question.getCorrectOption().equalsIgnoreCase(answer.getSelectedAnswer())){
                achieve += question.getMarks();
            }
        }
        //save result
        Result result=new Result();

        result.setUserId(studentId);
        result.setPaperId(paperId);


        result.setTotalMarks(totalMark);
        result.setScore(achieve);

        result.setStartTime(LocalDateTime.now());

        return repo_result.save(result);

    }

    public List<Result> getallresult(){
        return repo_result.findAll();
    }
    public List<Result> getAllByStudentId(long studentId){
        return repo_result.findByUserId(studentId);
    }
    public Result getResultById(long resultId){
        return repo_result.findById(resultId).orElseThrow(() -> new RuntimeException("Result not found"));
    }

}
