/* eslint-disable react/prop-types */
import React from 'react';
import './question.css';

interface QuestionProps {
  question: string;
}

export const Question: React.FC<QuestionProps> = ({ question }) => (
  <div className="question">
    {question}
  </div>
);
