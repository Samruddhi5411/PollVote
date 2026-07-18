import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPoll, castVote } from '../api';

export default function PollDetail() {
  const { id } = useParams();
  const [poll, setPoll] = useState(null);
  const [error, setError] = useState('');
  const [votedOptionId, setVotedOptionId] = useState(null);

  const loadPoll = useCallback(() => {
    getPoll(id)
      .then((res) => setPoll(res.data))
      .catch(() => setError('Poll not found.'));
  }, [id]);

  useEffect(() => {
    loadPoll();
  }, [loadPoll]);

  const totalVotes = poll
    ? poll.options.reduce((sum, o) => sum + o.voteCount, 0)
    : 0;

  const handleVote = async (optionId) => {
    try {
      await castVote(optionId);
      setVotedOptionId(optionId);
      loadPoll();
    } catch {
      setError('Could not cast vote. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="panel">
        <p className="error-text">{error}</p>
        <Link className="btn btn-outline" to="/">Back to Polls</Link>
      </div>
    );
  }

  if (!poll) {
    return <div className="panel"><p>Loading poll...</p></div>;
  }

  return (
    <div className="panel">
      <div className="top-row">
        <h2>{poll.question}</h2>
        <span className="badge">{totalVotes} votes</span>
      </div>

      {poll.options.map((option) => {
        const pct = totalVotes === 0 ? 0 : Math.round((option.voteCount / totalVotes) * 100);
        return (
          <div className="option-bar-wrap" key={option.id}>
            <div className="option-bar-label">
              <span>{option.text}</span>
              <span>{pct}% ({option.voteCount})</span>
            </div>
            <div className="option-bar-track">
              <div className="option-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            <button
              className="vote-btn"
              onClick={() => handleVote(option.id)}
              disabled={votedOptionId === option.id}
            >
              {votedOptionId === option.id ? 'Voted ✓' : 'Vote'}
            </button>
          </div>
        );
      })}

      <Link className="btn btn-outline" to="/">← Back to Polls</Link>
    </div>
  );
}
