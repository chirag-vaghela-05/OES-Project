package com.examination.DE_Project.service;
import com.examination.DE_Project.dto.PaperRequestDTO;
import com.examination.DE_Project.reposatory.Questionrepo;
import java.util.ArrayList;
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

    @Autowired
    Questionrepo questionrepo;

    public List<Paper> getallpaper(){
        return repo.findAll();
    }

    public Paper getPaperById(Long id) {

        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Paper Not Found"));

    }

    public List<Question> getQuestion(long id){
        Paper paper= repo.findById(id).orElseThrow(()->new RuntimeException("Paper Not Found"));

        return paper.getPaper_question();

    }
    public Paper createpaper(PaperRequestDTO dto){

        Paper paper = new Paper();
    System.out.println(paper);
        paper.setTitle(dto.getTitle());
        paper.setDurationMinutes(dto.getDurationMinutes());
        paper.setMaxAttempts(dto.getMaxAttempts());
        paper.setPublishStart(dto.getPublishStart());
        paper.setPublishEnd(dto.getPublishEnd());
        paper.setRandomize(dto.isRandomize());
        paper.setMarks(dto.getMarks());


        List<Question> questions =
                questionrepo.findAllById(dto.getQuestionIds());


        for(Question question : questions){
            paper.addQuestion(question);
        }


        return repo.save(paper);
    }
//
//    public Paper createpaper(Paper paper){
//       return repo.save(paper);
//    }
}
