package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Questionrepo extends JpaRepository<Question,Long> {
    List<Question> findByPaperId(long PaperId);
}
