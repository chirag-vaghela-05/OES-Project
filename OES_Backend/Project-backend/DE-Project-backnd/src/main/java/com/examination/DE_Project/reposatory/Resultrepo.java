package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.Result;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface Resultrepo extends JpaRepository<Result,Long> {

    List<Result> findByStudentId(long studentId);
}
