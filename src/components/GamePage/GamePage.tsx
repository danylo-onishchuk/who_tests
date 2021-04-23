/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './gamePage.css';
import { Question } from './Question/Question';
import { Answers } from './Answers/Answers';
import { Table } from './Table/Table';
import questions from '../../api/questions.json';
import { QuestionType } from '../../interfaces';

const questionsPrizes: QuestionType[] = [...questions].map((question) => ({
  ...question,
  class: 'table__item-future',
}));

questionsPrizes.reverse();

const questionsBody: QuestionType[] = [...questions];

questionsBody.forEach((question) => (
  question.answers.map((answer) => (
    answer.push('answers__button')
  ))
));

interface GamePageProps {
  setFinalScore(finalScore: string): void
}

export const GamePage: React.FC<GamePageProps> = (props) => {
  window.history.pushState(null, 'null', window.location.href);
  window.onpopstate = function event() {
    window.history.go(1);
  };

  const [selectQuestion, setSelectQuestion] = useState<number>(0);
  const [counter, setCounter] = useState<number>(0);
  const [burgerClass, setBurgerClass] = useState<string>('gamePage__burger-open');
  const [tableMob, setTableMob] = useState<string>('none');

  questionsPrizes[questionsPrizes.length - selectQuestion - 1].class = 'table__item-selected';

  const handleChange = (value: string) => {
    const needButton: string[] = questionsBody[selectQuestion].answers.find((answer) => (
      answer.includes(value)
    )) ?? [];
    const trueButton: string[] = questionsBody[selectQuestion].answers.find((answer) => (
      answer.includes(questionsBody[selectQuestion].trueAnswers[0])
    )) ?? [];

    if (counter === 0) {
      needButton[2] = 'answers__button-selected';
      setCounter(1);

      setTimeout(() => {
        if (questionsPrizes[questionsPrizes.length - selectQuestion - 1].trueAnswers
          .includes(value)) {
          needButton[2] = 'answers__button-true';
          setCounter(2);
        } else {
          needButton[2] = 'answers__button-false';
          trueButton[2] = 'answers__button-true';
          setCounter(2);
        }
      }, 1000);

      setTimeout(() => {
        if (selectQuestion === 11) {
          props.setFinalScore(questionsPrizes[questionsPrizes.length - selectQuestion - 1].money);
          window.history.pushState(null, 'null', './end');
          window.history.pushState(null, 'null', './end');
          window.history.back();
          return;
        }

        if (questionsPrizes[questionsPrizes.length - selectQuestion - 1].trueAnswers
          .includes(value)) {
          questionsPrizes[questionsPrizes.length - selectQuestion - 1].class = 'table__item-past';
          setSelectQuestion(selectQuestion + 1);
          setCounter(0);
        } else {
          if (selectQuestion > 0) {
            props.setFinalScore(questionsPrizes[questionsPrizes.length - selectQuestion].money);
          }

          window.history.pushState(null, 'null', './end');
          window.history.pushState(null, 'null', './end');
          window.history.back();
        }
      }, 2500);
    }
  };

  const openBurger = (): void => {
    if (burgerClass === 'gamePage__burger-open') {
      setBurgerClass('gamePage__burger-close');
      setTableMob('flex');
    } else {
      setBurgerClass('gamePage__burger-open');
      setTableMob('none');
    }
  };

  return (
    <div className="gamePage">
      <div className="gamePage__content">
        <button
          type="button"
          className={burgerClass}
          onClick={openBurger}
          aria-label="open"
        />
        <div className="gamePage__answerBlock">
          <Question question={questions[selectQuestion].question} />
          <Answers
            answers={questionsBody[selectQuestion].answers}
            handleChange={handleChange}
          />
        </div>
      </div>
      <div className="gamePage__tableBlock-mobile" style={{ display: tableMob }}>
        <Table questions={questionsPrizes} />
      </div>
      <div className="gamePage__tableBlock">
        <Table questions={questionsPrizes} />
      </div>
    </div>
  );
};
