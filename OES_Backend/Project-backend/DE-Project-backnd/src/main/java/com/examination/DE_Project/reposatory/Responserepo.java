package com.examination.DE_Project.reposatory;

import com.examination.DE_Project.model.Student;
import com.examination.DE_Project.model.StudentAnswer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Responserepo extends JpaRepository<StudentAnswer,Long> {

    List<StudentAnswer> findByStudentIdAndPaperId(long studentId, long PaperId);
}
