package com.examination.DE_Project.model;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
public class Paper {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    long id;

    String paper_title;
    int duration;
    int attempts;
    LocalDate publish_start;
    LocalDate publish_end;
    @OneToMany(mappedBy = "paper", cascade = CascadeType.ALL)
    List<Question> paper_question;
    int marks;

    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }

    public int getAttempts() {
        return attempts;
    }

    public void setAttempts(int attempts) {
        this.attempts = attempts;
    }

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public List<Question> getPaper_question() {
        return paper_question;
    }

    public void setPaper_question(List<Question> paper_question) {
        this.paper_question = paper_question;
    }

    public String getPaper_title() {
        return paper_title;
    }

    public void setPaper_title(String paper_title) {
        this.paper_title = paper_title;
    }

    public LocalDate getPublish_end() {
        return publish_end;
    }

    public void setPublish_end(LocalDate publish_end) {
        this.publish_end = publish_end;
    }

    public LocalDate getPublish_start() {
        return publish_start;
    }

    public void setPublish_start(LocalDate publish_start) {
        this.publish_start = publish_start;
    }
}
