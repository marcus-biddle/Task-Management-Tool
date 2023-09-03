
import './style.css'

interface AddGoalProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddGoal = ({ setOpenModal }: AddGoalProps) => {
  
  return (
    <>
     <div className='card-layout' onClick={() => setOpenModal(true)}>
      <h2 style={{ textAlign: 'center', padding: '3px', fontSize: '16px',}}>+</h2>
      <p style={{ fontSize: '14px' }}>Add A Goal</p>
    </div>
    </>
   
  )
}

export default AddGoal