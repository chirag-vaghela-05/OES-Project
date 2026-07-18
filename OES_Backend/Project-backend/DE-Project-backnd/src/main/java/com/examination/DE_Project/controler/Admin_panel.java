package com.examination.DE_Project.controler;

import com.examination.DE_Project.model.Result;
import com.examination.DE_Project.model.Paper;
import com.examination.DE_Project.model.Question;
import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.service.Resultservice;
import com.examination.DE_Project.service.Paperservice;
import com.examination.DE_Project.service.Questionservice;
import com.examination.DE_Project.service.Studentservice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("admin")
public class Admin_panel {

    @Autowired
    Questionservice service_que;
    @Autowired
    Paperservice service_paper;
    @Autowired
    Studentservice service_student;
    @Autowired
    Resultservice service_attempt;

    @RequestMapping("/homepage")
    public void homepage(){
        System.out.println("admin in home page");

    }

    @GetMapping("/questions")
    public List<Question> Questions(){
           return service_que.getallquestion();
    }

    @PostMapping("/questions/addquestion")
    public void addquestion(@RequestBody Question question){
        service_que.addquestion(question);
    }

    @DeleteMapping("/questions/deletequestion/{id}")
    public void deletequestion(@PathVariable long id){
        service_que.deletequestion(id);
    }

    @PutMapping("/questions/updatequestion")
    public void updatequestion(@RequestBody Question question){
        service_que.updatequestion(question);
    }

    //paper method

    @GetMapping("/paper")
    public List<Paper> paper(){
        //list of paper
        return service_paper.getallpaper();
    }

    @PostMapping("/paper/create")
    public void createpaper(@RequestBody Paper paper){
        service_paper.createpaper(paper);
    }

    //student method

    @GetMapping("/studentlist")
    public  List<Student> getallstudent(){
        return service_student.getallstudent();
    }

    @PostMapping("/studentlist/createstudent")
    public void createstudent(@RequestBody Student student){
        service_student.createstudent(student);
    }

    @DeleteMapping("studentlist/deletestudent/{id}")
    public void deletestudent(@PathVariable long id){
        service_student.deletestudent(id);
    }

    @PutMapping("studentlist/updatestudent")
    public void updatestudent(@RequestBody Student student){
        service_student.updatestudent(student);
    }

    //result method
    @GetMapping("/result")
    public List<Result> getattempts(){
        return service_attempt.getallresult();
    }

}
