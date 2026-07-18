package com.pollvote.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "votes")
public class Vote {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "poll_option_id", nullable = false)
    private PollOption pollOption;

    @Column(nullable = false, updatable = false)
    private LocalDateTime votedAt = LocalDateTime.now();

    public Vote() {}

    public Vote(PollOption pollOption) {
        this.pollOption = pollOption;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public PollOption getPollOption() { return pollOption; }
    public void setPollOption(PollOption pollOption) { this.pollOption = pollOption; }

    public LocalDateTime getVotedAt() { return votedAt; }
    public void setVotedAt(LocalDateTime votedAt) { this.votedAt = votedAt; }
}
