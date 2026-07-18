import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPoll } from '../api';

export default function CreatePoll() {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState(['', '']);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const updateOption = (index, value) => {
    const next = [...options];
    next[index] = value;
    setOptions(next);
  };

  const addOption = () => setOptions([...options, '']);

  const removeOption = (index) => {
    if (options.length <= 2) return;
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanedOptions = options.map((o) => o.trim()).filter(Boolean);
    if (!question.trim()) {
      setError('Please enter a poll question.');
      return;
    }
    if (cleanedOptions.length < 2) {
      setError('Please provide at least 2 options.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await createPoll({ question: question.trim(), options: cleanedOptions });
      navigate(`/polls/${res.data.id}`);
    } catch {
      setError('Failed to create poll. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel">
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label>Question</label>
          <input
            type="text"
            placeholder="What do you want to ask?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Options</label>
          {options.map((opt, i) => (
            <div className="option-row" key={i}>
              <input
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => updateOption(i, e.target.value)}
              />
              {options.length > 2 && (
                <button
                  type="button"
                  className="remove-option"
                  onClick={() => removeOption(i)}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button type="button" className="btn btn-outline" onClick={addOption}>
            + Add Option
          </button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
}
