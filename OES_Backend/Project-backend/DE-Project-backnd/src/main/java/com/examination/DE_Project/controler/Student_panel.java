package com.examination.DE_Project.controler;

import com.examination.DE_Project.model.Question;
import com.examination.DE_Project.model.Result;
import com.examination.DE_Project.model.Paper;
import com.examination.DE_Project.model.StudentAnswer;
import com.examination.DE_Project.service.ResponseService;
import com.examination.DE_Project.service.Resultservice;
import com.examination.DE_Project.service.Paperservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student/{studentid}")
public class Student_panel {

    @Autowired
    ResponseService service_responce;

    @Autowired
    Paperservice service_paper;
    @Autowired
    Resultservice service_result;

    @GetMapping("/available_exam")
    public List<Paper> total_paper(){
        return service_paper.getallpaper();
    }
    @GetMapping("/available_exam/exam/{paperid}")
    public List<Question> exam(@PathVariable long paper_id){
        return service_paper.getQuestion(paper_id);
    }

    @GetMapping("/result")
    public List<Result> myresult(@PathVariable long studentid){
        return service_result.getAllByStudentId(studentid);
    }

    @GetMapping("available_exam/exam/{paperid}/submit")
    public void SubmitResponse(@PathVariable  StudentAnswer responce){
        service_responce.SubmitResponce(responce);
    }

    @GetMapping("result/{resultId}")
    public Result getResult(@PathVariable long resultId){
        return service_result.getResultById(resultId);
    }

    @GetMapping("exam/{paperId}/final_submit")
    public void calculatemarks(@PathVariable long studentId, @PathVariable long paperId){
        service_result.calculateResult(studentId,paperId);
    }
}
