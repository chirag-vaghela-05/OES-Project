package com.examination.DE_Project.model;

import jakarta.persistence.*;


import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
public class Paper {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    long id;

    String title;
    int durationMinutes;
    int maxAttempts;
    LocalDate publishStart;
    LocalDate publishEnd;
    boolean randomize;
    @OneToMany(mappedBy = "paper", cascade = CascadeType.ALL)
    List<Question> paper_question =new ArrayList<>();
    int marks;


    public void addQuestion(Question question){

        paper_question.add(question);
        question.setPaper(this);

    }

    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMaxAttempts() {
        return maxAttempts;
    }

    public void setMaxAttempts(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }

    public LocalDate getPublishEnd() {
        return publishEnd;
    }

    public void setPublishEnd(LocalDate publishEnd) {
        this.publishEnd = publishEnd;
    }

    public List<Question> getPaper_question() {
        return paper_question;
    }

    public void setPaper_question(List<Question> paper_question) {
        this.paper_question = paper_question;
    }

    public boolean isRandomize() {
        return randomize;
    }

    public void setRandomize(boolean randomize) {
        this.randomize = randomize;
    }

    public LocalDate getPublishStart() {
        return publishStart;
    }

    public void setPublishStart(LocalDate publishStart) {
        this.publishStart = publishStart;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}

