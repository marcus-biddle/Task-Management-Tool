import React from 'react'
import Card from '../Cards'
import './style.css'
import AddGoal from '../Buttons/AddCards'

const Goals = () => {
  return (
    <div>
        <h1>Test</h1>
        <div className='header'>
            <h2>Primary Goals</h2>
            <div className='update-btn'>Update</div>
            <div className='card-container'>
                <Card 
                title='Drink Gallon Of Water'
                description='Long term to improve my health'
                date=''
                difficultyRating='High'
                />
                <Card 
                title='Code For 100 Days'
                description='Long term goal be a better engineer'
                date=''
                difficultyRating='Medium'
                />
            </div>
        </div>
        <div className='longterm-container'>
            <h2>Long Term Goals</h2>
            <div style={{ display: 'flex', justifyContent: 'right'}}>
                <button>Delete</button>
            </div>
            <div>
                <Card
                title="Clean up Github"
                mini={true}
                miniGoalsCount={3}
                />
                <AddGoal />
            </div>
        </div>
    </div>
  )
}

export default Goals