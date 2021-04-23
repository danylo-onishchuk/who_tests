/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import './answers.css';

interface AnswersProps {
  answers: string[][],
  handleChange(value: string): void,
}

export const Answers: React.FC<AnswersProps> = ({ answers, handleChange }) => (
  <div className="answers">
    {answers.map((answer) => (
      <button
        key={answer[0]}
        className={answer[2]}
        onClick={() => handleChange(answer[1])}
        type="button"
      >
        <p className="answers__answer-letter">
          {answer[0]}
        </p>
        <p className="answers__answer-content">
          {answer[1]}
        </p>
      </button>
    ))}
  </div>
);
