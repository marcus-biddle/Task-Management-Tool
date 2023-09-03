import React, { useState } from 'react'
import Card from '../Cards'
import './style.css'
import AddGoal from '../Buttons/AddCards'
import { AddGoalModal } from '../Modal/addGoal'

const GOALS = [
    {
        title: 'Cleanup Github',
        miniGoals: [
            {
                title: 'Add Readme to all projects',
            },
            {
                title: 'Complete profile design',
            },
            {
                title: 'Delete bad repos'
            }
        ]
    }
]

const Goals = () => {
    const [openModal, setOpenModal] = useState(false);
    const [goals, setGoals] = useState(GOALS);

    const onSubmit = (goalText: string) => {
        const newGoal = { title: goalText, miniGoals: []}
        const updateGoals = [...goals, newGoal];
        setGoals(updateGoals);
    }

  return (
    <>
    {openModal && <AddGoalModal showModal={setOpenModal} onSubmit={onSubmit}/>}
    <div>
        <h1 className='title'>Goals</h1>
        <div className='header'>
            <h2>Primary </h2>
            <div className='update-btn'>Update</div>
            <div className='card-container'>
                <Card 
                title='Add the backend to this project.'
                description='Everything is hardcoded as an example. Eventually I want to add ExpressJS and MySQL.'
                date=''
                difficultyRating='Medium'
                />
                <Card 
                title='Code For 100 Days'
                description='Long term goal is to be a better engineer.'
                date=''
                difficultyRating='High'
                />
            </div>
        </div>
        <div className='longterm-container'>
            <h2>Long Term</h2>
            <div style={{ display: 'flex', justifyContent: 'right'}}>
                <button>Delete</button>
            </div>
            {goals && goals.map((goal) => {
                return (
                    <Card
                    title={goal.title}
                    mini={true}
                    miniGoalsCount={goal.miniGoals.length}
                    />
                )
            })}
            <AddGoal setOpenModal={setOpenModal}/>
        </div>
    </div>
    </>
    
  )
}

export default Goals