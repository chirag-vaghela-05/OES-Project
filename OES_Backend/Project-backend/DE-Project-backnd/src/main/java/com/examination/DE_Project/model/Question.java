package com.examination.DE_Project.model;

import jakarta.persistence.*;

@Entity

public class Question {


    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    long id;

    String content_question;
    String option_a;
    String option_b;
    String option_c;
    String option_d;
    String correct_ans;
    int marks_question;

    @ManyToOne
    @JoinColumn(name = "paper_id")
    private Paper paper;
    int time_question;
    //time feature is required

    public String getContent_question() {
        return content_question;
    }

    public void setContent_question(String content_question) {
        this.content_question = content_question;
    }

    public String getCorrect_ans() {
        return correct_ans;
    }

    public void setCorrect_ans(String correct_ans) {
        this.correct_ans = correct_ans;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public int getMarks_question() {
        return marks_question;
    }

    public void setMarks_question(int marks_question) {
        this.marks_question = marks_question;
    }

    public String getOption_a() {
        return option_a;
    }

    public void setOption_a(String option_a) {
        this.option_a = option_a;
    }

    public String getOption_b() {
        return option_b;
    }

    public void setOption_b(String option_b) {
        this.option_b = option_b;
    }

    public String getOption_c() {
        return option_c;
    }

    public void setOption_c(String option_c) {
        this.option_c = option_c;
    }

    public String getOption_d() {
        return option_d;
    }

    public void setOption_d(String option_d) {
        this.option_d = option_d;
    }

    public int getTime_question() {
        return time_question;
    }

    public void setTime_question(int time_question) {
        this.time_question = time_question;
    }

    public Paper getPaper() {
        return paper;
    }

    public void setPaper(Paper paper) {
        this.paper = paper;
    }
}
