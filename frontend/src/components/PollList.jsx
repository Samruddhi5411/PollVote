import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPolls } from '../api';

export default function PollList() {
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getPolls()
      .then((res) => setPolls(res.data))
      .catch(() => setError('Could not load polls. Is the backend running on :8080?'))
      .finally(() => setLoading(false));
  }, []);

  const totalVotes = (poll) =>
    poll.options.reduce((sum, o) => sum + o.voteCount, 0);

  return (
    <div className="panel">
      <div className="top-row">
        <h2>All Polls</h2>
        <Link className="btn" to="/create">+ New Poll</Link>
      </div>

      {loading && <p>Loading polls...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && polls.length === 0 && (
        <div className="empty-state">
          <p>No polls yet. Be the first to create one!</p>
        </div>
      )}

      {polls.map((poll) => (
        <Link key={poll.id} to={`/polls/${poll.id}`} className="poll-card">
          <div>
            <strong>{poll.question}</strong>
            <div className="meta">{poll.options.length} options</div>
          </div>
          <span className="badge">{totalVotes(poll)} votes</span>
        </Link>
      ))}
    </div>
  );
}
