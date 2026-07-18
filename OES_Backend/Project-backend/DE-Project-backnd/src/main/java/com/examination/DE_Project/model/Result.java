package com.examination.DE_Project.model;

import jakarta.persistence.*;

import java.util.Date;

@Entity
public class Result {



    @Id
    @GeneratedValue(strategy= GenerationType.SEQUENCE)
    long id;
    @Column(name = "student_id")
    long studentId;
    long paper_id;

    int attempt;
    String student_name;
    String paper_name;
    int total_marks;
    int achieve_marks;
    Date attempts_date;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getAttempt() {
        return attempt;
    }

    public void setAttempt(int attempt) {
        this.attempt = attempt;
    }

    public int getAchieve_marks() {
        return achieve_marks;
    }

    public void setAchieve_marks(int achieve_marks) {
        this.achieve_marks = achieve_marks;
    }

    public Date getAttempts_date() {
        return attempts_date;
    }

    public void setAttempts_date(Date attempts_date) {
        this.attempts_date = attempts_date;
    }


    public String getPaper_name() {
        return paper_name;
    }

    public void setPaper_name(String paper_name) {
        this.paper_name = paper_name;
    }

    public String getStudent_name() {
        return student_name;
    }

    public void setStudent_name(String student_name) {
        this.student_name = student_name;
    }

    public int getTotal_marks() {
        return total_marks;
    }

    public void setTotal_marks(int total_marks) {
        this.total_marks = total_marks;
    }

    public long getStudentId() {
        return studentId;
    }

    public void setStudentId(long studentId) {
        this.studentId = studentId;
    }

    public long getPaper_id() {
        return paper_id;
    }

    public void setPaper_id(long paper_id) {
        this.paper_id = paper_id;
    }
}
