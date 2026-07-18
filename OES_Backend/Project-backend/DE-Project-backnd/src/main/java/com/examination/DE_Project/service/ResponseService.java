package com.examination.DE_Project.service;

import com.examination.DE_Project.model.StudentAnswer;
import com.examination.DE_Project.reposatory.Responserepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ResponseService {

    @Autowired
    Responserepo repo;

    public void SubmitResponce(StudentAnswer responce){
        repo.save(responce);
    }



}