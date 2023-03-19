import { checkIfTrue, showIfOrElse } from "../../helpers/conditionals"
import { InfoWrapper, TaskMessage } from "./styled"

export const UserInfo = ({changeTask}: any) => {
    <>
        <InfoWrapper>
            {showIfOrElse(changeTask)(
                <>
                Edit "<TaskMessage editMode={checkIfTrue(changeTask)}>{changeTask.title}</TaskMessage>" Task Below
                </>
            )(
                <>
                Add A <TaskMessage editMode={checkIfTrue(changeTask)}>Task</TaskMessage> Below
                </>
            )}
            
        </InfoWrapper>
    </>
}