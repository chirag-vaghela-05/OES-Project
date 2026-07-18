package com.examination.DE_Project.service;

import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.reposatory.Studentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class Studentservice {


    @Autowired
    Studentrepo repo_student;

    public List<Student> getallstudent(){
        return repo_student.findAll();
    }

    public void createstudent(Student student){
        repo_student.save(student);
    }

    public void deletestudent(long id){
        repo_student.deleteById(id);
    }

    public void updatestudent(Student student){
        repo_student.save(student);
    }


}
