import React from 'react';
import { Link } from 'react-router-dom';
import './startPage.css';

export const StartPage: React.FC = () => (
  <div className="startPage">
    <div className="startPage__container">
      <div className="startPage__picture" />
    </div>
    <div className="startPage__content">
      <h1>
        Who wants to be a millionaire?
      </h1>
      <Link to="./game" className="startPage__button">
        Start
      </Link>
    </div>
  </div>
);
