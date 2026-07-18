package com.examination.DE_Project.model;

import jakarta.persistence.*;

@Entity
public class StudentAnswer {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    int id;
    @ManyToOne
    Student student;
    @ManyToOne
    Paper paper;
    @ManyToOne
    Question question;

    String selectedAnswer;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }

    public Question getQuestion() {
        return question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public String getSelectedAnswer() {
        return selectedAnswer;
    }

    public void setSelectedAnswer(String selectedAnswer) {
        this.selectedAnswer = selectedAnswer;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }
}
