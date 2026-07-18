package com.examination.DE_Project.service;

import com.examination.DE_Project.model.Paper;
import com.examination.DE_Project.model.Question;
import com.examination.DE_Project.reposatory.Paperrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
public class Paperservice {

    @Autowired
    Paperrepo repo;

    public List<Paper> getallpaper(){
        return repo.findAll();
    }

    public List<Question> getQuestion(long id){
        Paper paper= repo.findById(id).orElseThrow(()->new RuntimeException("Paper Not Found"));

        return paper.getPaper_question();

    }




    public void createpaper(Paper paper){
        repo.save(paper);
    }
}
