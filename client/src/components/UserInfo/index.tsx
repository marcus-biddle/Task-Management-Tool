import { checkIfTrue, showIfOrElse } from "../../helpers/conditionals"
import { InfoWrapper, TaskMessage } from "./styled"

export const UserInfo = ({editMode}: any) => {
    return (
        <>
        <InfoWrapper>
            {showIfOrElse(editMode)(
                <>
                Edit "<TaskMessage editMode={checkIfTrue(editMode)}>{editMode.title}</TaskMessage>" Task Below
                </>
            )(
                <>
                Add A <TaskMessage editMode={checkIfTrue(editMode)}>Task</TaskMessage> Below
                </>
            )}
            
        </InfoWrapper>
    </>
    )
    
}