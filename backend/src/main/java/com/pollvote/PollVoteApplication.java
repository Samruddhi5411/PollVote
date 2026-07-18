package com.pollvote;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * PollVote - a full-stack polling application.
 * Users can create polls with multiple options and cast votes.
 */
@SpringBootApplication
public class PollVoteApplication {
    public static void main(String[] args) {
        SpringApplication.run(PollVoteApplication.class, args);
        System.err.println("app started");
    }
}
