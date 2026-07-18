package com.pollvote.controller;

import com.pollvote.dto.PollRequest;
import com.pollvote.model.Poll;
import com.pollvote.model.PollOption;
import com.pollvote.model.Vote;
import com.pollvote.repository.PollOptionRepository;
import com.pollvote.repository.PollRepository;
import com.pollvote.repository.VoteRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/polls")
public class PollController {

    private final PollRepository pollRepository;
    private final PollOptionRepository pollOptionRepository;
    private final VoteRepository voteRepository;

    public PollController(PollRepository pollRepository,
                           PollOptionRepository pollOptionRepository,
                           VoteRepository voteRepository) {
        this.pollRepository = pollRepository;
        this.pollOptionRepository = pollOptionRepository;
        this.voteRepository = voteRepository;
    }

    // GET /api/polls - list every poll
    @GetMapping
    public List<Poll> getAllPolls() {
        return pollRepository.findAll();
    }

    // GET /api/polls/{id} - single poll with its options
    @GetMapping("/{id}")
    public ResponseEntity<Poll> getPoll(@PathVariable Long id) {
        return pollRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/polls - create a poll with 2+ options
    @PostMapping
    public ResponseEntity<Poll> createPoll(@Valid @RequestBody PollRequest request) {
        Poll poll = new Poll(request.getQuestion());
        request.getOptions().forEach(text -> poll.addOption(new PollOption(text)));
        Poll saved = pollRepository.save(poll);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // POST /api/polls/options/{optionId}/vote - cast a vote for an option
    @PostMapping("/options/{optionId}/vote")
    public ResponseEntity<?> vote(@PathVariable Long optionId) {
        return pollOptionRepository.findById(optionId)
                .map(option -> {
                    option.setVoteCount(option.getVoteCount() + 1);
                    pollOptionRepository.save(option);
                    voteRepository.save(new Vote(option));
                    return ResponseEntity.ok(Map.of(
                            "optionId", option.getId(),
                            "voteCount", option.getVoteCount()
                    ));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // DELETE /api/polls/{id} - remove a poll
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePoll(@PathVariable Long id) {
        if (!pollRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        pollRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
