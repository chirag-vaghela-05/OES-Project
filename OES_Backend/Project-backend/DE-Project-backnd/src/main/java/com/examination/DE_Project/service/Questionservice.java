package com.examination.DE_Project.service;

import com.examination.DE_Project.model.Question;
import com.examination.DE_Project.reposatory.Questionrepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@Service
public class Questionservice {

    @Autowired
    Questionrepo repo_question;

    public List<Question> getallquestion(){
        return repo_question.findAll();
    }
    public void addquestion(Question question){
        repo_question.save(question);
    }
    public void updatequestion(Question question){
        repo_question.save(question);
    }
    public void deletequestion(@PathVariable long id){
        repo_question.deleteById(id);
    }


}