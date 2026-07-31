package com.examination.DE_Project.dto;

import java.time.LocalDate;
import java.util.List;

public class PaperRequestDTO {

    private String title;

    private int durationMinutes;

    private int maxAttempts;

    private LocalDate publishStart;

    private LocalDate publishEnd;

    private boolean randomize;

    private int marks;

    private List<Long> questionIds;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public int getDurationMinutes() {
        return durationMinutes;
    }

    public void setDurationMinutes(int durationMinutes) {
        this.durationMinutes = durationMinutes;
    }


    public int getMaxAttempts() {
        return maxAttempts;
    }

    public void setMaxAttempts(int maxAttempts) {
        this.maxAttempts = maxAttempts;
    }


    public LocalDate getPublishStart() {
        return publishStart;
    }

    public void setPublishStart(LocalDate publishStart) {
        this.publishStart = publishStart;
    }


    public LocalDate getPublishEnd() {
        return publishEnd;
    }

    public void setPublishEnd(LocalDate publishEnd) {
        this.publishEnd = publishEnd;
    }


    public boolean isRandomize() {
        return randomize;
    }

    public void setRandomize(boolean randomize) {
        this.randomize = randomize;
    }


    public int getMarks() {
        return marks;
    }

    public void setMarks(int marks) {
        this.marks = marks;
    }


    public List<Long> getQuestionIds() {
        return questionIds;
    }

    public void setQuestionIds(List<Long> questionIds) {
        this.questionIds = questionIds;
    }
}