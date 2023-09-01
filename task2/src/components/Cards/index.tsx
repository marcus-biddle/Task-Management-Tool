import React from 'react'
import './style.css'

interface CardProps {
    title: string;
    description?: string;
    date?: string;
    difficultyRating?: 'Easy' | 'Medium' | 'High';
    mini?: boolean;
    miniGoalsCount?: number;
}

const Card = ({ title, description, date, difficultyRating, mini, miniGoalsCount}: CardProps) => {
  return (
    <div className={mini ? "mini-card" : "goal-card"}>
      <h2 className={mini ? "mini-title" : "goal-title"}>{title}</h2>
      {mini ? 
      <div style={{ textAlign: 'center'}}>
        <p className="mini-footer">Mini Goals: {miniGoalsCount}</p>
      </div>
      : 
      <>
        <p className="goal-description">{description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between'}}>
            <p className="goal-footer">Complete By: {date}</p>
            <p className="goal-footer">Difficulty: {difficultyRating}</p>
        </div>
      </>
      }
      
    </div>
  )
}

export default Card