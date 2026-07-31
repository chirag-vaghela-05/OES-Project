package com.examination.DE_Project.service;
import com.examination.DE_Project.dto.LoginRequestDTO;
import com.examination.DE_Project.dto.LoginResponseDTO;
import java.util.Optional;
import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.reposatory.Adminrepo;
import com.examination.DE_Project.reposatory.Studentrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.examination.DE_Project.model.Admin;

import java.util.List;

@Service
public class Studentservice {


    @Autowired
    private Adminrepo repo_admin;

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
    public LoginResponseDTO login(LoginRequestDTO request) {

        // Check Admin
        Optional<Admin> optionalAdmin = repo_admin.findByEmail(request.getEmail());

        if (optionalAdmin.isPresent()) {
            Admin admin = optionalAdmin.get();

            if (admin.getPassword().equals(request.getPassword())) {
                return new LoginResponseDTO(
                        admin.getId(),
                        "Admin",
                        admin.getEmail(),
                        "ADMIN"
                );
            }
        }

        // Check Student
        Optional<Student> optionalStudent = repo_student.findByEmail(request.getEmail());

        if (optionalStudent.isPresent()) {
            Student student = optionalStudent.get();

            if (student.getPassword().equals(request.getPassword())) {
                return new LoginResponseDTO(
                        student.getId(),
                        student.getName(),
                        student.getEmail(),
                        "STUDENT"
                );
            }
        }

        throw new RuntimeException("Invalid email or password");
    }

}
