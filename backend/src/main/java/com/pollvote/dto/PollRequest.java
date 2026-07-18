package com.pollvote.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

/** Payload used to create a new poll. */
public class PollRequest {

    @NotBlank(message = "Question is required")
    private String question;

    @Size(min = 2, message = "A poll needs at least 2 options")
    private List<String> options;

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }

    public List<String> getOptions() { return options; }
    public void setOptions(List<String> options) { this.options = options; }
}
