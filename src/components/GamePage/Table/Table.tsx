/* eslint-disable react/prop-types */
import React from 'react';
import './table.css';
import { QuestionType } from '../../../interfaces';

interface TableProps {
  questions: QuestionType[]
}

export const Table: React.FC<TableProps> = ({ questions }) => (
  <ul className="table">
    {questions.map((question) => (
      <li key={question.id} className={question.class}>
        <p>
          {question.money}
        </p>
      </li>
    ))}
  </ul>
);
